import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "StoryVerse - Bring out your Imagination as words",
    description: "A stroy writing website using nextjs",
    icons: {
        icon: "/favicon.ico"
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#A0BFC7]`}>
                <main className="flex h-screen w-full items-center justify-center">
                    <AuthContext>
                        <Toaster />
                        {children}
                    </AuthContext>
                </main>
            </body>
        </html>
    );
}
