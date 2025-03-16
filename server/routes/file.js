const express=require("express");
const fileRoutes=express.Router();
const { GetObjectCommand, PutObjectCommand, S3Client, ListObjectsV2Command, DeleteBucketCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const authMiddleWare = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const fileAuthMiddleware = require("../middleware/fileAuthMiddleware");
console.log(process.env.AWS_BUCKET_NAME);
const prisma=new PrismaClient();

function categorizeFile(fileType) {
    switch (true) {
        case fileType.startsWith('image/'):
            return 'Images';

        case fileType.startsWith('video/'):
            return 'Videos';

        case fileType.startsWith('application/pdf'):
        case fileType.startsWith('application/msword'):
        case fileType.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document'):
        case fileType.startsWith('application/vnd.ms-excel'):
        case fileType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'):
        case fileType.startsWith('application/vnd.ms-powerpoint'):
        case fileType.startsWith('application/vnd.openxmlformats-officedocument.presentationml.presentation'):
        case fileType.startsWith('text/plain'):
        case fileType.startsWith('text/csv'):
            return 'Documents';

        default:
            return 'Others';
    }
}

const s3Client=new S3Client({
    region:process.env.AWS_BUCKET_REGION,
    credentials:{
        accessKeyId:process.env.AWS_BUCKET_ACCESSKEY_ID,
        secretAccessKey:process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
    }
});
async function getObjectURL(key){
    const command=new GetObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:key
    })
    const url=await getSignedUrl(s3Client,command);
    return url;
}
async function getUploadUrl(fileKey,contentType) {
    const command=new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:fileKey,
        ContentType:contentType
    });
    const url=await getSignedUrl(s3Client,command);
    return url;   
}

fileRoutes.post("/upload", authMiddleWare, async (req, res) => {
    try {
        const { fileName, contentType, fileSize,ownerName } = req.body;
        const userId = req.user; 

        const fileKey = `uploads/${userId}/${categorizeFile(contentType)}/${Date.now()}_${fileName}`;
        const url = await getUploadUrl(fileKey, contentType);

        // Store file metadata in the database
        const file = await prisma.file.create({
            data: {
                name: fileName,
                extension: fileName.split('.').pop(),
                type: contentType,
                s3Key: fileKey,
                size: fileSize,
                isUploaded: false,
                ownerId: userId,
                ownerName: ownerName,
                fileUsers: {
                    create: {
                        userId: userId,
                        role: "OWNER"
                    }
                }
            }
        });
        console.log("FILE UPDATED");

        // Update the user's used storage
        await prisma.user.update({
            where: { id: userId },
            data: {
                usedStorage: {
                    increment: fileSize
                }
            }
        });
        console.log("USER UPDATED")

        return res.json({ url, key: fileKey, fileId: file.id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

fileRoutes.patch("/upload/confirm",authMiddleWare,fileAuthMiddleware,async(req,res)=>{
    try{
        const {fileId}=req.body;
        const file=await prisma.file.findUnique({
            where:{id:fileId},
        });
        if(!file) return res.status(404).json({error:"File not found"});
        if(file.isUploaded) return res.status(400).json({error:"File is already uploaded"});
        await prisma.file.update({
            where:{id:fileId},
            data:{
                isUploaded:true,
            }
        });
        return res.json({msg:"File Uploaded"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

fileRoutes.delete("/delete",authMiddleWare,fileAuthMiddleware, async(req,res)=>{
    try {
        console.log("hit delete");
        const {fileId}=req.body;
        const userId=req.user;
        const file=await prisma.file.findUnique({
            where:{id:fileId},
        });
        if(!file) return res.status(404).json({error:"File not found"});
        console.log(file.s3Key);
        await prisma.file.delete({
            where:{id:fileId},
        });
        const command=new DeleteObjectCommand({
            Bucket:process.env.AWS_BUCKET_NAME,
            Key:file.s3Key,
        });
        await s3Client.send(command);
        await prisma.user.update({
            where: { id: userId },
            data: {
                usedStorage: {
                    decrement: file.size
                }
            }
        });
        return res.json({msg:"File Deleted"});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

fileRoutes.get("/getList", authMiddleWare, async (req, res) => {
    try {
        console.log("hit");
        const { category } = req.query;
        if (!category) return res.status(400).json({ error: "Category is required" });
        if (!req.user) return res.status(401).json({ error: "Unauthorized" });

        const s3Command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `uploads/${req.user}/${category}/`,
        });

        const s3Response = await s3Client.send(s3Command);
        if (!s3Response.Contents || s3Response.Contents.length === 0) {
            return res.status(404).json({ error: "No files found" });
        }

        // Extract S3 keys
        const s3Files = await Promise.all(
            s3Response.Contents.map(async (file) => {
                return {
                    s3Key: file.Key,
                    url: await getObjectURL(file.Key),
                };
            })
        );

        // Fetch file metadata from PostgreSQL
        const dbFiles = await prisma.file.findMany({
            where: {
                ownerId: req.user, // Match user
                s3Key: { in: s3Files.map((f) => f.s3Key) }, // Match S3 keys
            },
            select: {
                id: true,
                name: true,
                extension: true,
                type: true,
                s3Key: true,
                size: true,
                isUploaded: true,
                createdAt: true,
                ownerName: true,
            },
        });

 
        const files = s3Files.map((s3File) => {
            const dbFile = dbFiles.find((db) => db.s3Key === s3File.s3Key);
            return {
                ...s3File,
                ...dbFile,
            };
        });
        return res.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

fileRoutes.get("/getRecentFile", authMiddleWare, async (req, res) => {
    try {
        console.log("hit recent file");

        if (!req.user) return res.status(401).json({ error: "Unauthorized" });

        const s3Command = new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: `uploads/${req.user}/`,
            MaxKeys: 10,

        });

        const s3Response = await s3Client.send(s3Command);
        if (!s3Response.Contents || s3Response.Contents.length === 0) {
            return res.status(404).json({ error: "No files found" });
        }


        const s3Files = await Promise.all(
            s3Response.Contents.map(async (file) => {
                return {
                    s3Key: file.Key,
                    url: await getObjectURL(file.Key),
                };
            })
        );

        const dbFiles = await prisma.file.findMany({
            where: {
                ownerId: req.user, // Match user
                s3Key: { in: s3Files.map((f) => f.s3Key) }, // Match S3 keys
            },
            select: {
                id: true,
                name: true,
                extension: true,
                type: true,
                s3Key: true,
                size: true,
                isUploaded: true,
                createdAt: true,
                ownerName: true,
            },
        });

    
        const files = s3Files.map((s3File) => {
            const dbFile = dbFiles.find((db) => db.s3Key === s3File.s3Key);
            return {
                ...s3File,
                ...dbFile, 
            };
        });

        return res.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

fileRoutes.get("/download",authMiddleWare,fileAuthMiddleware,async(req,res)=>{
    try{
        const {fileId}=req.body;
        const file=await prisma.file.findUnique({
            where:{id:fileId},
        });
        if(!file) return res.status(404).json({error:"File not found"});
        const url=await getObjectURL(file.s3Key);
        return res.json({url});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});
fileRoutes.patch("/rename",authMiddleWare,fileAuthMiddleware,async(req,res)=>{
    try {

        const {fileId,newName}=req.body;
        console.log(newName);
        const file=await prisma.file.findUnique({
            where:{
                id:fileId,
            }
        });
        if(!file) return res.status(404).json({error:"File not found"});
        await prisma.file.update({
            where:{id:fileId},
            data:{
                name:newName,
            }
        });
        const newfile=await prisma.file.findUnique({
            where:{
                id:fileId,
            }
        });
        console.log(newfile.name);
        return res.json({msg:"File Renamed"});
        
    } catch (error) {
        console.log(error);
        return res.json({error});
        
    }
});

fileRoutes.get("/search",authMiddleWare,async(req,res)=>{
    try {
        const searchText=req.query.text;
        const userId=req.user;
        const files=await prisma.file.findMany({
            where:{
                ownerId:userId,
                name:{
                    contains:searchText,
                    mode:"insensitive",
                }
            }
        });
        return res.json(files);
        
    } catch (error) {
        console.log(error);
        return res.json({error});
    }
});

fileRoutes.get("/getStorageUsed",authMiddleWare,async(req,res)=>{
    try {
        const userId=req.user;
        const user=await prisma.user.findUnique({
            where:{id:userId},
            select:{
                usedStorage:true,
            }
        });
        return res.json(user);
        
    } catch (error) {
        console.log(error);
        return res.json({error});

        
    }

});


module.exports=fileRoutes;