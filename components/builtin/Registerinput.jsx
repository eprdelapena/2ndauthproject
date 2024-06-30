'use client'

import { useFormState } from "react-dom";
import { registerAction } from '../features/registerAction';
import { useRouter } from "next/navigation";
import React, {useEffect} from 'react';

const Registerinput = () => {
    const [state, formAction] = useFormState(registerAction, undefined);
    const router = useRouter();

    useEffect(() => {
        if(state?.success !== null && state?.success === true){
          alert("Registered Successfuly, Redirecting to the Login page");
          router.push("/auth/login");
        }
      }, [state, router]);
  return (
    <>
        <form action={formAction}>
        
            <input className="border-2 border-gray-500 w-full mb-2 p-2" type="text" name="firstName" placeholder="First Name..." />
            {state?.firstName && <div className="w-full text-center mb-2 text-red-600"> {state?.firstName}</div>}

            <input className="border-2 border-gray-500 w-full mb-2 p-2" type="text" name="lastName" placeholder="Last Name..." />
            {state?.lastName && <div className="w-full text-center mb-2 text-red-600"> {state?.lastName}</div>}
            
            <input className="border-2 border-gray-500 w-full mb-2 p-2" type="email" name="emailAdd" placeholder="Email..." />
            {state?.emailAdd && <div className="w-full text-center mb-2 text-red-600"> {state?.emailAdd}</div>}
            
            <input className="border-2 border-gray-500 w-full mb-2 p-2" type="password" name="password" placeholder="Password..." />
            {state?.password && <div className="w-full text-center mb-2 text-red-600"> {state?.password}</div>}

            <input className="border-2 border-gray-500 w-full mb-2 p-2" type="password" name="passwordMatch" placeholder="Confirm Password..." />
            {state?.passwordMatch && <div className="w-full text-center mb-2 text-red-600"> {state?.passwordMatch}</div>}

            <input type="submit" className="w-full mt-2 cursor-pointer rounded-md text-white bg-violet-500 hover:bg-violet-700 h-[40px]" value="Register"/>
        </form>
        
        
    </>

  )
}

export default Registerinput

