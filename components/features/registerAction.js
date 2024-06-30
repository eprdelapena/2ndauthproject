// import { registerSchema } from "@/schemas/registerSchema";
// import { connectDB } from "@/api/connectDB";
import { getUser } from "@/api/getUser";

export const registerAction = async (previousState, formData) => {
    
    const firstName = formData.get("firstName"); 
    const lastName = formData.get("lastName");
    const emailAdd = formData.get("emailAdd");
    const password = formData.get("password");
    const confirmPassword = formData.get("passwordMatch");

    const errors = {}

    if(!firstName){
        errors.firstName = "*Please fill-up this field"
    }

    if(!lastName){
        errors.lastName = "*Please fill-up this field"
    }

    if(!emailAdd){
        errors.emailAdd = "*Email is required"
    }

    if(!password || password.length < 6){
        if(!password){
            errors.password = "*Password is required"
        }
        if(password && password.length < 6){
            errors.password = "*Password must be a minimum of six(6) characters"
        }
    }

    if(confirmPassword != password  && password.length >= 6 ){
        errors.passwordMatch = "*Password do not match"
    }

    let user = {
        firstName,
        lastName,
        emailAdd, 
        password
    }
    const result = await getUser(user);
    if(result === 1){
        errors.emailAdd = "*User already exists"
    }

    if(Object.keys(errors).length > 0){
        return errors;
    }

    if(result?.success){
        return {
            success: true
        }
    }
}