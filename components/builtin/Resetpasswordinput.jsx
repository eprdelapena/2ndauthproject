'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const Resetpasswordinput = () => {
    const [newPassword, setnewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");
    const [errors, setError] = useState("");  

    const router = useRouter();
    const currentPathname = usePathname();
    const currentToken = currentPathname.split("/")[3];
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        if(!newPassword || !confirmNewPassword){
            setError("*Please fill-up all fields");
            return;
        }

        if(newPassword.length < 6){
            setError("*Password must be a minimum of six (6) characters");
            return;
        }

        if(newPassword !== confirmNewPassword){
            setError("*Password do not match");
            return;
        }

        const response = await fetch("/api/resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newPassword,
                currentToken
            }),
        })

        if(response.status === 400){
            setError("*Token has expired or invalid");
        }
        if(response.status === 200){
            alert("Changed Password Successfuly, Redirecting to the Login page");
            router.replace("/");
        }

      }
      catch(error){
        console.error(error);
      }

    }
  return (
    <>  
        
        <form onSubmit={handleSubmit}>
            <input onChange={e => setnewPassword(e.target.value)} className="border-2 border-gray-500 w-full mb-2 p-2" type="password" name="password" placeholder="Input new password..." />
            <input onChange={e => setconfirmNewPassword(e.target.value)} className="border-2 border-gray-500 w-full mb-2 p-2" type="password" name="confirmPassword" placeholder="Re-type password..." />
            {errors && <div className="w-full text-center text-red-600"> {errors}</div>}
            <input type="submit" className="w-full mt-2 cursor-pointer hover:bg-violet-700 rounded-md text-white bg-violet-500 h-[40px]" value="Submit"/>
        </form>
        <div className="w-full mt-5">
                <a className="text-blue-500 hover:underline" href={'/auth/login'}> Already have an account? </a>
        </div>
        
    </>

  )
}

export default Resetpasswordinput

