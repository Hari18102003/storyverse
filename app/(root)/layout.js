import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/components/AuthContext";
import Topbar from "@/components/Topbar";

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
      <body className={inter.className}>
        <main className="flex flex-col gap-5">
          <AuthContext>
            <Toaster />
            <Topbar />
            <Navbar />
            {children}
            <Footer />
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
