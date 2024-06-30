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
import Registerinput from './Registerinput'
import Backbuttonregister from './Backbuttonregister'


const Registerform = () => {
  return (
    <>
        <Card className="w-[500px]">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify center">
                    <h1 className="text-3xl font-semibold"> 🔒 Auth Codebase </h1>
                    <p className="text-sm"> Register to Sign-In! </p>
                </div>
            </CardHeader>

            <CardContent>
                <Registerinput/>
            </CardContent>

            <CardFooter>
            </CardFooter>

            <CardFooter>
                <Backbuttonregister/>
            </CardFooter>
        </Card>
    </>
  )
}

export default Registerform