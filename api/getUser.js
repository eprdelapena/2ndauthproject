'use server'; 
import { connectDB } from "./connectDB";
import { registerSchema } from "@/schemas/registerSchema";
import bcrypt from 'bcryptjs';


export const getUser = async (data) => { 
    await connectDB();
    const checkUser = await registerSchema.findOne({"emailadd": data.emailAdd});
    if(checkUser){
        return 1;
    }
    else{
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(data.password, salt); 
        const user = new registerSchema({ 
            firstname: data.firstName,
            lastname: data.lastName,
            emailadd: data.emailAdd,
            password: hashedPassword
        });

        user.save();
        console.log("user successfully saved to database");
        return {success: true};
    }
}
