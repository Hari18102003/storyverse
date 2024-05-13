"use client";
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { FiMenu } from "react-icons/fi";
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LuLogOut } from 'react-icons/lu';

const Topbar = () => {

    const pathname = usePathname();
    const session = useSession();
    const { status } = session;

    return (
        <div className='md:hidden flex items-center justify-between w-full p-3'>
            <Link href={"/"}>
                <div className='flex items-center gap-2 text-xl font-bold text-[#FF4550]'>
                    <Image
                        src={"/images/logo.png"}
                        alt='logo'
                        width={44}
                        height={44}
                    />
                    <h1>StoryVerse</h1>
                </div>
            </Link>
            <Sheet>
                <SheetTrigger className='px-2 py-1 rounded-md bg-[#FF4550] flex items-center justify-center text-white'><FiMenu className='text-[20px]' /></SheetTrigger>
                <SheetContent className="bg-white">
                    <div className='flex flex-col gap-5 justify-center'>
                        <ul className='flex flex-col gap-5 font-normal'>
                            <Link href={"/allstories"} className={pathname === "/allstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>All Stories</li></Link>
                            <Link href={"/yourstories"} className={pathname === "/yourstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Your Stories</li></Link>
                            <Link href={"/likedstories"} className={pathname === "/likedstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Liked Stories</li></Link>
                            <Link href={"/yourreading"} className={pathname === "/yourreading" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Your Readings</li></Link>
                            <Link href={"/drafts"} className={pathname === "/drafts" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Drafts</li></Link>
                        </ul>
                        <div className='flex gap-5 items-center'>
                            {pathname !== "/write" && (
                                <Link href={"/write"}><button className='px-6 py-1 text-white bg-black rounded-lg'>Write</button></Link>
                            )}
                            {status === "authenticated" ? (
                                <button onClick={() => signOut()} className='px-6 py-1 flex items-center gap-1 border border-black rounded-lg'><span>Logout</span><LuLogOut /></button>
                            ) : (
                                <Link href={"/register"}><button className='px-6 py-1 border border-black rounded-lg'>Log In</button></Link>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

    )
}

export default Topbar