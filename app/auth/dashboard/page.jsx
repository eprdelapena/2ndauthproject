

'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import Loginform from '@/components/builtin/Loginform'

import { //1. import this
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const Page = () => {
  const {data: session} = useSession();
  
  return (
    <>

<Card className="w-[500px]">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify center">
                    <h1 className="text-3xl font-semibold"> 🔒 Auth Codebase </h1>
                    <h5 className="text-sm"> Welcome Back! <b> {session?.user?.name} {session?.user?.firstname}</b> </h5>
                </div>
            </CardHeader>

            <CardContent>
              <p className="text-center my-6 font-serif text-justify"> This dashboard page is for application purposes only.
                This shows that the maker of this page is able to make a Login and Registration System using NextAuth.
                I could also make a login system through google and github accounts and provide a
                forget password and two-factor authentication through verification email systems. 
                This would provide a better security for accounts database. Furthermore, API routes are also protected
                in this site, you cannot access register, login, and forget password page if session-logged in is ongoing
                and vice versa you cannot access the dashboard page unless authenticated through the login page.
                Anyway, again welcome to my page!
              </p>
            </CardContent>

            <CardFooter>
              <Button variant="secondary" className="hover:bg-red-700 hover:text-white" onClick={() => signOut()}> Signout </Button>
            </CardFooter>

            <CardFooter>

            </CardFooter>
        </Card>

      
    </>

  )
}

export default Page