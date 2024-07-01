'use client'

import { useFormState } from "react-dom";
import { RegisterAction } from '@/components/Features/RegisterAction';
import { useRouter } from "next/navigation";
import React, {useEffect} from 'react';

const Registerinput = () => {
    const [state, formAction] = useFormState(RegisterAction, undefined);
    const router = useRouter();

    useEffect(() => {
        if(state?.success !== null && state?.success === true){
          alert("Email sent, please verify your email");
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

            <input type="submit" className="w-full mt-2 cursor-pointer rounded-md text-white bg-violet-500 h-[40px]" value="Register"/>
        </form>
        <div className="w-full pt-2 text-center mt-3">────────────Or Sign-in with────────────</div>
    </>

  )
}

export default Registerinput

