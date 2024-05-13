"use client";
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const LoginPage = () => {

    const session = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        toast.loading("Please wait..");
        setDisabled(true);
        if (!email.trim() || !password.trim()) {
            toast.dismiss();
            setDisabled(false);
            toast.error("Enter email and password");
            return;
        }
        const result = await signIn("credentials", { email, password, redirect: false });
        console.log(result);
        if (!result.ok) {
            toast.dismiss();
            setDisabled(false);
            toast.error("Invalid credentials");
        } else {
            toast.dismiss();
            setDisabled(false);
            toast.success("Logged In");
            redirect("/");
        }
        setEmail("");
        setPassword("");
    }

    async function handleGoogle() {
        await signIn("google", { callbackUrl: "/" });
    }

    if (session?.status === "authenticated") {
        redirect("/");
    }

    return (
        <div className='flex flex-col gap-4 shadow-md p-5 items-center bg-white rounded-md'>
            <div>
                <Image
                    src={"/images/logo.png"}
                    alt='logo'
                    width={60}
                    height={60}
                />
            </div>
            <h1 className='text-lg text-center text-[#FF4550] font-semibold'>Login</h1>
            <form className="w-[300px]" onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Email" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='*******' />
                </div>
                <button type="submit" disabled={disabled} className="text-white mb-5 bg-[#FF4550] w-full hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                <div className='border-b mb-5 border-gray-300 relative'>
                    <p className='text-gray-500 absolute left-1/2 -top-4 bg-white p-1'>or</p>
                </div>
                <button onClick={handleGoogle} type='button' className='w-full mb-5 flex items-center justify-center gap-5 rounded-lg border-2 py-2'><FcGoogle className='text-xl' /><span>Login with Google</span></button>
                <p className='text-center text-sm'>New account? <Link href={"/register"} className='underline'>Signup</Link></p>
            </form>

        </div>
    )
}

export default LoginPage