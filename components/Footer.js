"use client";
import { usePathname } from 'next/navigation';
import React from 'react'

const Footer = () => {

    const pathname = usePathname();

    return (
        <footer className={pathname === "/" ? `flex bg-[#31363F] text-slate-400 items-center justify-between w-full text-sm p-3` : `flex bg-white text-slate-400 items-center justify-between w-full text-sm p-3`}>
            <p>All rights reserved</p>
            <p>Hari18</p>
        </footer >
    )
}

export default Footer