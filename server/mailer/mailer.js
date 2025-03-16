const nodemailer=require("nodemailer");
require('dotenv').config();

const transporter=nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASSWORD
    }
});

const sendMail=async(email,subject,content)=>{
    try {
        var mailOption={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        };
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error);
            }
            console.log("Mail Sent:" ,info.messageId);
        });
    } catch (err) {
        console.log(err);
        
    }
};
module.exports=sendMail;