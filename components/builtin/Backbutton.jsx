'use client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';


const Backbutton = () => {
  return (
    <>
        <div className="w-full flex items-center justify-center gap-x-2">
            <Button className="w-full" variant="link">
                <a href={'/auth/register'}> Do not have an account? Register here </a>
            </Button>
        </div>
    </>

  )
}

export default Backbutton