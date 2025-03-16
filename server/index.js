const  express = require("express");
const cors=require("cors");
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otp");
const fileRoutes=require("./routes/file");
const app=express();
const dotenv =require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT;

app.use("/auth",authRoutes);
app.use("/otp",otpRoutes);
app.use("/file",fileRoutes);

app.get("/",async(req,res)=>{
    res.json({"msg":"Hello World"});
});

app.listen(PORT,()=>{
    console.log("Server is running on port");
    console.log(process.env.PORT);
});


