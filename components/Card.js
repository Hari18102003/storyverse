"use client";
import Image from 'next/image'
import React from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import formatter from 'numbuffix';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ story }) => {

    const pathname = usePathname();
    const router = useRouter();

    async function handleDeleteStory(id) {
        const { data } = await axios.delete(`/api/delete/story/${id}`);
        if (data.success) {
            toast('Deleted!', {
                icon: '🗑️',
            });
            router.push("/yourstories");
        }
    }

    async function handleDeleteDraft(id) {
        const { data } = await axios.delete(`/api/delete/draft/${id}`);
        if (data.success) {
            toast('Deleted!', {
                icon: '🗑️',
            });
            router.push("/drafts");
        }
    }

    return (
        <Link href={pathname !== "/drafts" ? `/story/${story._id}` : "/drafts"}>
            <div className='w-[180px] h-[300px] flex flex-col justify-center gap-2'>
                <div className='relative w-full h-[300px]'>
                    <Image
                        src={story?.image}
                        alt='card-image'
                        fill
                        className='rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <h1 className='font-medium'>{story?.title}</h1>
                    {pathname !== "/drafts" && (
                        <div className='flex gap-4'>
                            <p className='flex gap-1 items-center'><IoEyeOutline /><span className='text-sm'>{formatter(story?.views, "")}</span></p>
                            <p className='flex gap-1 items-center'><CiHeart /><span className='text-sm'>{formatter(story?.likes, "")}</span></p>
                        </div>
                    )}
                </div>
                {pathname !== "/drafts" && (
                    <div className='flex items-center justify-between'>
                        <p className='w-fit px-2 py-1 border text-xs border-slate-400 text-slate-400 rounded-md flex items-center justify-center'>{story?.category?.toUpperCase()}</p>
                        {pathname === "/yourstories" && (
                            <button onClick={() => handleDeleteStory(story._id)}><MdDelete className='text-[22px] text-red-500' /></button>
                        )}
                    </div>
                )}
                {pathname === "/drafts" && (
                    <>
                        <Link className='w-full rounded-lg text-center py-1 bg-[#FF4550] text-white' href={`/write?id=${story._id}`}>Continue writing</Link>
                        <button onClick={() => handleDeleteDraft(story._id)} className='w-full rounded-lg flex items-center gap-1 justify-center text-center py-1 bg-black text-white'>Delete <MdDelete /></button>
                    </>
                )}
            </div>
        </Link>
    )
}

export default Card