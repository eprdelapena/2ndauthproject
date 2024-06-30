import React from 'react'
import { //1. import this
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Social from './Social'
import Backbutton from './Backbutton'
import Logininput from './Logininput'
import Forgetpasswordinput from './Forgetpasswordinput'


const Forgetpassword = () => {
  return (
    <>
        <Card className="w-[500px]">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify center">
                    <h1 className="text-3xl font-semibold"> 🔒 Auth Codebase </h1>
                    <p className="text-sm"> Reset your password </p>
                </div>
            </CardHeader>

            <CardContent>
                <Forgetpasswordinput/>
            </CardContent>

            <CardFooter>

            </CardFooter>

            <CardFooter>

            </CardFooter>
        </Card>
    </>
  )
}

export default Forgetpassword