import React from 'react'
import { //1. import this
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import Verificationinput from './Verificationinput'


const Verificationform = () => {
  return (
    <>
        <Card className="w-[500px]">
            <CardHeader>
                <div className="w-full flex flex-col gap-y-4 items-center justify center">
                    <h1 className="text-3xl font-semibold"> 🔒 Auth Codebase </h1>
                </div>
            </CardHeader>

            <CardContent>
                <Verificationinput/>
            </CardContent>

            <CardFooter>

            </CardFooter>

            <CardFooter>

            </CardFooter>
        </Card>
    </>
  )
}

export default Verificationform