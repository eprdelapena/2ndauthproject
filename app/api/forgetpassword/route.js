import { connectDB } from "@/database/connectDB"; 
import { registerSchema } from "@/schemas/registerSchema"; 
import crypto from 'crypto'; 
import { NextResponse } from "next/server"; 
import { sendVerificationEmail } from "@/app/lib/mail";
import dotenv from 'dotenv';
import { cp } from "fs";

dotenv.config();

export const POST = async (request) => {
    const {email} = await request.json();
    const paramLink = process.env.URLRESET

    await connectDB(); 

    const existingUser = await registerSchema.findOne({"emailadd": email});

    if(!existingUser){
        return new NextResponse("Email does not exists. ", {status: 400});
    }

    const resetToken = crypto.randomBytes(20).toString("hex"); 
    const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const passwordResetExpires = Date.now() + 3600000;
    
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;
    

    const resetURL = `${paramLink}${resetToken}`;

    let emailSend = await sendVerificationEmail(email, resetURL);
    console.log("User verification sent");
    console.log("status: ", emailSend);
    existingUser.save();
    
    return new NextResponse("Reset password, for verification", {status: 200});
}