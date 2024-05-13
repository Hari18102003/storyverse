import { User } from "@/libs/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/connectDB";

export const authOptions = {
    secret: process.env.SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                connectDB();
                const user = await User.findOne({ email });
                if (user) {
                    const match = bcrypt.compareSync(password, user?.password);
                    if (match) {
                        return user;
                    }
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                if (profile) {
                    connectDB();
                    const { email, picture, name } = profile;
                    const user = await User.findOne({ email });
                    if (!user) {
                        await User.create({ username: name, email, image: picture });
                    }
                    return true;
                }

            }
            return true;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }