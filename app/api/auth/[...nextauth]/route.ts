import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { connect } from "@/db"
import { User } from "@/models/User"


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Your username"
                },
                password: {
                    label: "Password",
                    type: "Password",
                    placeholder: "Your password"
                }
            },
            async authorize(credentials, req) {
                try {
                    await connect()
                    const user = await User.findOne({ username: credentials?.username })
                    if (user) {
                        if (credentials?.password == user.password) {
                            return user
                        } else {
                            return null
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    return null
                }
            }
        }),
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }