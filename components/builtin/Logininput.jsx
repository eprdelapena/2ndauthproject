'use client'

import React, {useState} from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Logininput = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState(""); 

    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try{ 
        const res = await signIn("credentials", {  
          email,
          password,
          redirect: false
        });

        if(res?.error === "CredentialsSignin"){
          throw new Error("Invalid Credentials");
        }
        router.replace("dashboard"); 
      }
      catch(error){
        setError("Invalid username or password")
      }

    }
    
  return (
    <>  
        
        <form onSubmit={handleSubmit}>
            <input onChange={e => setEmail(e.target.value)} className="border-2 border-gray-500 w-full mb-2 p-2" type="email" name="email" placeholder="Email..." />
            <input onChange={e => setPassword(e.target.value)} className="border-2 border-gray-500 w-full mb-2 p-2" type="password" name="password" placeholder="Password..." />
            {errors && <div className="w-full text-center text-red-600"> {errors}</div>}
            <div className="my-2">
              <a href="/auth/forgetpassword" className="hover:underline text-blue-500"> Forget password? </a>
            </div>
            <input type="submit" className="w-full mt-2 cursor-pointer hover:bg-violet-700 rounded-md text-white bg-violet-500 h-[40px]" value="Sign-in"/>
        </form>
        <div className="w-full pt-2 text-center mt-3">────────────Or Sign-in with────────────</div>
        
    </>

  )
}

export default Logininput

