import { getToken } from 'next-auth/jwt';
import { NextResponse } from "next/server";

export async function middleware(request){
    const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });

    const isOnLoginPage = request.nextUrl?.pathname.startsWith("/auth/login");
    const isOnRegisterPage = request.nextUrl?.pathname.startsWith("/auth/register");
    const isOnDashboard = request.nextUrl?.pathname.startsWith("/auth/dashboard");
    const isOnForgetPassword = request.nextUrl?.pathname.startsWith("/auth/forgetpassword");

    if(session && isOnLoginPage){
        return NextResponse.redirect(new URL("/auth/dashboard", request.nextUrl));
    }

    if(session && isOnForgetPassword){
        return NextResponse.redirect(new URL("/auth/dashboard", request.nextUrl));
    }

    if(session && isOnRegisterPage){
        return NextResponse.redirect(new URL("/auth/dashboard", request.nextUrl));
    }

    if(!session && isOnDashboard){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

}

export const config = { 
    matcher: ["/", "/auth/login", "/auth/register", "/auth/dashboard", "/auth/forgetpassword"]
}