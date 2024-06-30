import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv'; 
import { connectDB } from "@/api/connectDB";
import { registerSchema } from "@/schemas/registerSchema";
import bcrypt from 'bcryptjs' 

dotenv.config(); 

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials", 
            credentials: {},
            async authorize(credentials){ 
                try{
                    await connectDB();
                    const user = await registerSchema.findOne({"emailadd": credentials.email});
                    if(!user){
                        throw new Error("user not found");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    
                    if(!isPasswordCorrect){
                        throw new Error("Password do not match");
                    }
                    console.log("Successfully logged in");
                    console.log("the user: ", user);
                    return user; 
                }
                catch(error){
                    console.error(error);
                    return null;
                }
            }
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET, 
    pages: {
        signIn: "/auth/login" 
    },
    callbacks: {
        async session({ session, token }) {
            session.user = token.user;
            return session;
          },
        async jwt({ token, user }) {
            if (user) {
              token.user = user;
            }
            return token;
          },
        async signIn({user, account, profile}){
            if(account.provider === "credentials"){ 
                try{
                    return true;
                }
                catch(error){
                    return false;
                }
            }
        },
    }
};

const handler = NextAuth(authOptions); 
export { handler as GET, handler as POST } 