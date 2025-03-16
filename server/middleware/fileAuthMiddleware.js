const { PrismaClient } = require("@prisma/client");

const prisma=new PrismaClient();
const fileAuthMiddleware = async (req, res, next) => {
    try {
        const {fileId}=req.body;
        const userId=req.user;
        const file=await prisma.file.findUnique({
            where:{id:fileId},
            select:{
                ownerId:true
            }
        });
        if(!file) return res.status(404).json({error:"File not found"});
        console.log(file.ownerId);
        console.log(userId);
        if(file.ownerId!==userId) return res.status(401).json({error:"Unauthorized"});
        next();
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}

const viewerAuthMiddleware = async (req, res, next) => {
    try {
        const {fileId}=req.body;
        const userId=req.user;
        const fileUser=await prisma.fileUser.findFirst({
            where:{
                fileId:fileId,
                userId:userId
            }
        });
        if(!fileUser) return res.status(401).json({error:"Unauthorized"});
        next();
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}
module.exports=fileAuthMiddleware;
// module.exports=viewerAuthMiddleware;