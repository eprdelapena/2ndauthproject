import { connectDB } from "@/database/connectDB"; 
import { registerSchema } from "@/schemas/registerSchema"; 
import crypto from 'crypto'; 
import { NextResponse } from "next/server"; 
import { sendVerificationEmail } from "@/app/lib/mail";
import dotenv from 'dotenv';
import { cp } from "fs";
import bcrypt from 'bcryptjs';

dotenv.config();

export const POST = async (request) => {
    const {newPassword, currentToken} = await request.json();

    const passwordResetToken = crypto
    .createHash("sha256")
    .update(currentToken)
    .digest("hex");

    await connectDB();

    const existingUser = await registerSchema.findOne({"resetToken": passwordResetToken});
    
    if(!existingUser || Date.now() > existingUser.resetTokenExpiry){
        return new NextResponse("*Token has expired or invalid ", {status: 400});
    }

    if(existingUser && Date.now() < existingUser.resetTokenExpiry){
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(newPassword, salt); 
        existingUser.password = hashedPassword;
        existingUser.save();
        console.log("changed password successfully")
    }
    
    return new NextResponse("Reset password successful", {status: 200});
}