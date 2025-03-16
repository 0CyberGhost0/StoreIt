const jwt=require("jsonwebtoken");
const authMiddleWare=async(req,res,next)=>{
    try {
        const token=req.header("x-auth-token");
        if(!token) return res.status(500).json({error:"No Token Found!! Authorization failed"});
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        if(!verified) console.log("Invalid Token");
        if(!verified) return res.status(500).json({error:"Invalid Token!"});
        req.user=verified.userId;
        req.token=token;
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};
module.exports=authMiddleWare;