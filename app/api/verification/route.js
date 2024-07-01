import { connectDB } from "@/database/connectDB"; 
import { registerSchema } from "@/schemas/registerSchema"; 
import { NextResponse } from "next/server"; 
import { sendVerificationEmail } from "@/app/lib/mail";
import dotenv from 'dotenv';
import { cp } from "fs";
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; 

dotenv.config();

export const POST = async (request) => {
    const {currentToken} = await request.json();

    const hashedToken= crypto
    .createHash("sha256")
    .update(currentToken)
    .digest("hex");

    await connectDB();
    const existingUser = await registerSchema.findOne({"verificationToken": hashedToken});

    if(existingUser){
        existingUser.verified = true;
        existingUser.save();
        console.log("Email verified")
        return new NextResponse("Email verified", {status: 200});
    }
    else{
        return new NextResponse("*Token has expired or invalid ", {status: 400});
    }
}