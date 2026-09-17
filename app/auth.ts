import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import z from "zod"
import { sql } from "./lib/db";
import bcrypt from "bcryptjs";

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials){
                const parsedCredentials = z
                    .object({email : z.string().email(), password: z.string().min(6)})
                    .safeParse(credentials);

                if(parsedCredentials.success){
                    const {email, password} = parsedCredentials.data;
                    const user = await getUser(email)

                    if(!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user
                
                }
                console.log("Invalid Credentials");
                return null
            }
        })

    ]
})

async function getUser(email: string){
    const users = await sql `
                SELECT * FROM users WHERE email = ${email}
             `
    return users[0];
}