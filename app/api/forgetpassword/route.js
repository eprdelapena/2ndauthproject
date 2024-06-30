import { connectDB } from "@/api/connectDB"; 
import { registerSchema } from "@/schemas/registerSchema"; 
import crypto from 'crypto'; 
import { NextResponse } from "next/server"; 
import dotenv from 'dotenv';

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
    
    console.log("this is the reset url: ", resetURL);
}