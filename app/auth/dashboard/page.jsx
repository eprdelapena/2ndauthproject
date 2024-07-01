"use client"

'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

const Page = () => {
  const {data: session} = useSession();
  
  return (
    <>
      <div className="w-[500px] flex-col flex items-center font-serif justify-center bg-blue-200 p-5 rounded-md">
        <div className='flex-1'>
          <h1 className="text-center my-6 font-serif"> Welcome to the dashboard page </h1>
          <h5 className="text-center my-6 font-serif"> Hello ! <b> {session?.user?.name} {session?.user?.firstname} </b> </h5>
          <p className="text-center my-6 font-serif text-justify"> This dashboard page is for application purposes only.
          This shows that the maker of this page is able to make a Login and Registration System using NextAuth.
          I could also make a login system through google and github accounts and provide a
          forget password and verification email systems. Unfortunately, such requires a domain name 
          which I do not have. Anyway again welcome to my page!
          </p>
        </div>
        <div className="flex-1 flex items-center justify center">
          <Button variant="destructive" className="hover:bg-red-700" onClick={() => signOut()}> Signout </Button>
        </div>
      </div>

    </>

  )
}

export default Page