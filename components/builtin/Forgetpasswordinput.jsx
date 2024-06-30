'use client'

import React, {useState} from 'react' //2. import this
import { useRouter } from 'next/navigation';

const Forgetpasswordinput = () => {
    const [email, setEmail] = useState(""); //3. do this for errors and email
    const [errors, setError] = useState(""); 

    const router = useRouter();

    // 4. set function to capture the email data upon submission and post it into the route.js specified on the field
    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        if(!email){
            setError("*Please fill-up the necessary field");
            return;
        }
        //5. set fetch function that will capture data email and convert it into JSON using JSON.stringify
        // use a method post that will pass to the route.js file in the /api/forgetpassword directory
        const response = await fetch("/api/forgetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        })

        //6. set response status
        if(response.status === 400){
            setError("This email does not exists");
            return;
        }
        if(response.status === 200){
            setError("");
            return;
        }
      }
      catch(error){
        console.error(error);
      }


    }
    
    //1. create forms for your forget password
  return (
    <>  
        
        <form onSubmit={handleSubmit}>
            <input onChange={e => setEmail(e.target.value)} className="border-2 border-gray-500 w-full mb-2 p-2" type="email" name="email" placeholder="Input your Email..." />
            {errors && <div className="w-full text-center text-red-600"> {errors}</div>}
            <input type="submit" className="w-full mt-2 cursor-pointer hover:bg-violet-700 rounded-md text-white bg-violet-500 h-[40px]" value="Submit"/>
        </form>
        <div className="w-full mt-5">
                <a className="text-blue-500 hover:underline" href={'/auth/login'}> Already have an account? </a>
        </div>
        
    </>

  )
}

export default Forgetpasswordinput

