import NextAuth from "next-auth/next"; 
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from 'dotenv'; 
import { connectDB } from "@/database/connectDB";
import { registerSchema } from "@/schemas/registerSchema";
import GoogleProvider from "next-auth/providers/google"
import bcrypt from 'bcryptjs' 
import Github from "next-auth/providers/github"; //1. import this

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
                    if(!user?.verified){
                        console.log("user not verified")
                        throw new Error("User not verified");
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
        GoogleProvider({ 
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Github({ 
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET, 
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
            if(account.provider === "google"){
                try{
                    connectDB();
                    const user = await registerSchema.findOne({"emailadd": profile.email});
                    if(user){
                        return true;
                    }
                    else{
                        const user = new registerSchema({ 
                            firstname: profile.given_name,
                            lastname: profile.family_name,
                            emailadd: profile.email,
                            password: profile.at_hash
                        });
                        user.save();
                    }
                    return true;
                }
                catch(error){
                    console.error(error);
                    return false;
                }

            }

            if(account.provider === "github"){ 
                try{
                    connectDB();
                    const user = await registerSchema.findOne({"emailadd": profile.email});
                    if(user){
                        return true;
                    }
                    else{
                        const user = new registerSchema({ 
                            firstname: profile.login,
                            lastname: profile.login,
                            emailadd: profile.email,
                            password: profile.node_id
                        });
                        user.save();
                    }
                    return true;
                }
                catch(error){
                    console.error(error);
                    return false;
                }
            }

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