'use client'
import React from 'react'
import {FcGoogle} from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '../ui/button';
import {useSession, signIn, signOut} from 'next-auth/react';


const Social = () => {
  return (
    <>
        <div className="w-full flex items-center justify-center gap-x-2">
            <div className="w-full flex items-center justify-center">
                <Button size="lg" className="w-full hover:bg-blue-300" variant="secondary" onClick={() => {signIn("google")}}>
                    <FcGoogle/>
                </Button>
            </div>
            <div className="w-full flex items-center justify-center">
                <Button size="lg" className="w-full hover:bg-blue-300" variant="secondary" onClick={() => {signIn("github")}}>
                    <FaGithub/>
                </Button>
            </div>
        </div>
    </>

  )
}

export default Social