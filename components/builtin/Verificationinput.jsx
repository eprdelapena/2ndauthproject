'use client'

import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

const Verificationinput = () => {

    const [errors, setError] = useState("");  

    const router = useRouter();
    const currentPathname = usePathname();
    const currentToken = currentPathname.split("/")[3];
    
    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const response = await fetch("/api/verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentToken
            }),
        })

        if(response.status === 400){
            setError("*Token has expired or invalid");
        }

        if(response.status === 200){
            alert("Email verified, redirecting to the Login page");
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
            
            <input type="submit" className="w-full mt-2 cursor-pointer hover:bg-violet-700 rounded-md text-white bg-violet-500 h-[40px]" value="Verify account"/>
            {errors && <div className="w-full text-center text-red-600"> {errors}</div>}
        </form>
        
    </>

  )
}

export default Verificationinput

