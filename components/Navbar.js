"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { LuLogOut } from "react-icons/lu";

const Navbar = () => {

    const session = useSession();
    const { status } = session;
    const pathname = usePathname();

    return (
        <div className='md:flex w-full hidden py-5 items-center justify-between px-16'>
            <Link href={"/"}>
                <div className='flex items-center gap-2 text-2xl font-bold text-[#FF4550]'>
                    <Image
                        src={"/images/logo.png"}
                        alt='logo'
                        width={60}
                        height={60}
                    />
                    <h1>StoryVerse</h1>
                </div>
            </Link>
            <div className='flex items-center'>
                <ul className='flex items-center gap-10 font-normal'>
                    <Link href={"/allstories"} className={pathname === "/allstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>All Stories</li></Link>
                    <Link href={"/yourstories"} className={pathname === "/yourstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Your Stories</li></Link>
                    <Link href={"/likedstories"} className={pathname === "/likedstories" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Liked Stories</li></Link>
                    <Link href={"/yourreading"} className={pathname === "/yourreading" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Your Readings</li></Link>
                    <Link href={"/drafts"} className={pathname === "/drafts" ? 'text-[#FF4550]' : 'hover:text-[#FF4550]'}><li>Drafts</li></Link>
                </ul>
            </div>
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
    )
}

export default Navbar