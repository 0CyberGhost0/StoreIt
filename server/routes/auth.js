const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

authRoutes.post("/signup", async (req, res) => {
  try {
    const { name, email, password} = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
      await prisma.user.delete({ where: { email } });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isVerified: true,
        is2FAEnabled,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);


    res.status(200).json({ message: "User created successfully", user: newUser,token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide both email and password" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isVerified) return res.status(400).json({ error: "Invalid email or password" });
    // if (user.isGoogleLogin) return res.status(400).json({ error: "Login with Google to continue" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)  return res.status(400).json({ error: "Invalid email or password" });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


authRoutes.get("/getData", authMiddleWare, async (req, res) => {
  try {
    const userId = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(400).json({ error: "No User Found" });

    res.status(200).json({ ...user, token: req.token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
authRoutes.patch("/toggle2FA", authMiddleWare, async (req, res) => {
  try {
    const userId = req.user;
    const { is2FAEnabled } = req.body;
    console.log(is2FAEnabled);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { is2FAEnabled },
    });

    res.status(200).json({ message: "2FA updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// authRoutes.post("/google-signin", async (req, res) => {
//   try {
//     const { email, firstName, lastName, profileImageUrl } = req.body;

//     let user = await prisma.user.findUnique({ where: { email } });

//     if (user) {
//       if (!user.isGoogleLogin) {
//         await prisma.user.update({
//           where: { email },
//           data: { isGoogleLogin: true, isVerified: true },
//         });
//       }
//     } else {
//       user = await prisma.user.create({
//         data: {
//           email,
//           firstName,
//           lastName,
//           profileImageUrl,
//           isGoogleLogin: true,
//           isVerified: true,
//         },
//       });
//     }

//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.status(200).json({ ...user, token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

authRoutes.post("/resetPass", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = authRoutes;
