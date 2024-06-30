'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const onClick = () => {
        router.push('/auth/login')
    }
  return (
    <Button onClick={onClick}> Sign-In </Button>
  )
}

export default Login