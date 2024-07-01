'use server'; 
import { connectDB } from "./connectDB";
import { registerSchema } from "@/schemas/registerSchema";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmailRegistration } from "@/app/lib/mail";
import dotenv from 'dotenv';

dotenv.config();

export const getUser = async (data) => { 
    await connectDB();
    const checkUser = await registerSchema.findOne({"emailadd": data.emailAdd});
    if(checkUser && checkUser?.verified === true){
        return 1;
    }
    if(checkUser && checkUser?.verified === false){
        const paramLink = process.env.URLVERIFICATION // /auth/verification/
        const domainName = process.env.NEXT_PUBLIC_AUTH_URL // http://localhost:3000
        const token = crypto.randomBytes(20).toString("hex");

        const hashedToken =  crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const verificationPath = token;
        const verificationURL = `${domainName}${paramLink}${verificationPath}`;

        checkUser.verificationToken = hashedToken;

        let emailSend = await sendVerificationEmailRegistration(checkUser.emailadd, verificationURL);
        console.log("User verification sent");
        console.log("status: ", emailSend);

        checkUser.save();
    }
    
    if(!checkUser){
        const paramLink = process.env.URLVERIFICATION // /auth/verification/
        const domainName = process.env.NEXT_PUBLIC_AUTH_URL // http://localhost:3000

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const token = crypto.randomBytes(20).toString("hex");
        const hashedToken =  crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

        const verificationPath = token;
        const verificationURL = `${domainName}${paramLink}${verificationPath}`;

        const user = new registerSchema({ 
            firstname: data.firstName,
            lastname: data.lastName,
            emailadd: data.emailAdd,
            password: hashedPassword,
            verificationToken: hashedToken,
            verified: false
        }, {strict: false});

        let emailSend = await sendVerificationEmailRegistration(user.emailadd, verificationURL);
        console.log("User verification sent");
        console.log("status: ", emailSend);

        user.save();


        console.log("user successfully saved to database");
        return {success: true};
    }
}
