import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation";

export const loginAction = async (previousState, formData) => {
    const Uusername = formData.get("email"); 
    const Upassword = formData.get("password");
    const errors = {}
    if(!Uusername){
        errors.userError = "*Username is required"
    }
    if(!Upassword){
        errors.userPass = "*Password is required"
    }
    if(errors?.userError || errors?.userPass){
        return errors;
    }
    
    try{
        console.log("hello world");
         const res = await signIn("credentials", {
            Uusername,
            Upassword,
            redirect: false
        })
        const router = useRouter();
        router.replace("dashboard");
    }
    catch(error){
        console.error(error);
        return;
    }
    
}