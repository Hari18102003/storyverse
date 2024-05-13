"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';

const StoryPage = ({ params }) => {

    const [story, setStory] = useState("");
    const [user, setUser] = useState("");
    const searchparams = useSearchParams();
    const read = searchparams.get("read");
    const router = useRouter();
    const { id } = params;
    const session = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            const { data } = await axios.get("/api/get/user");
            if (data.success) {
                setUser(data.user);
                setLoading(false);
            }
        }
        fetchUser();
    }, [user]);

    useEffect(() => {
        async function fetchStory() {
            const { data } = await axios.get(`/api/get/story/${id}`);
            if (data.success) {
                setStory(data.story);
                setLoading(false);
            }
        }
        fetchStory();
    }, [id, story]);

    async function handleAddReading(id) {
        const { data } = await axios.put(`/api/read/add`, { id });
        if (data.success) {
            toast('Happy Reading!', {
                icon: '🤩',
            });
            router.push(`/story/${story._id}?read=true`);
        }
    }

    async function handleLike(id) {
        const { data } = await axios.put("/api/like", { id });
        if (data.success) {
            toast.success(data.message);
        }
    }

    async function handleCompleteReading(id) {
        const { data } = await axios.put("/api/complete", { id });
        if (data.success) {
            toast('Hope you liked!,go for next one!', {
                icon: '😍',
            });
            router.push("/allstories");
        }
    }

    if (session?.status === "unauthenticated") {
        router.push("/login");
    }

    return loading ? <Loader /> : (
        <div className='py-5 px-2 md:px-36 flex md:flex-row flex-col gap-7 md:gap-0 justify-between'>
            <div className='md:w-1/4'>
                <div className='relative w-full h-[360px] rounded-lg'>
                    <Image
                        src={story?.image}
                        alt='cover-image'
                        fill
                        className='rounded-lg'
                    />
                </div>
                <div className='flex flex-col gap-1 mt-2'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-lg font-normal'>Author</h1>
                        <p className='font-medium text-[#FF4550]'>{story?.creator?.username}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='flex items-center gap-1'><CiHeart /><span>Likes</span></p>
                        <p className='text-[#FF4550]'>{story?.likes}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='flex items-center gap-1'><IoEyeOutline /><span>Reads</span></p>
                        <p className='text-[#FF4550]'>{story?.views}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-5 md:w-1/2 mr-10'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-10'>
                        <h1 className='text-2xl font-semibold'>{story?.title}</h1>
                        <p className='w-fit px-2 py-1 border text-xs border-slate-400 text-slate-400 rounded-md flex items-center justify-center'>{story?.category?.toUpperCase()}</p>
                    </div>
                    {user?.likedstories?.find(story => story._id === id) ? (
                        <button onClick={() => handleLike(id)}><FaHeart className='text-[30px] text-[#FF4550]' /></button>

                    ) : (
                        <button onClick={() => handleLike(id)}><CiHeart className='text-[30px] text-[#FF4550]' /></button>
                    )}
                </div>

                <div className='my-3'>
                    <p>
                        {story?.description}
                    </p>
                </div>
                {!read ? (
                    user?.readings?.find(read => read._id === id) || user?.stories?.find(story => story._id === id) ? (
                        <>
                            <h1 className='text-lg font-semibold'>Story</h1>
                            <div
                                dangerouslySetInnerHTML={{ __html: story?.story }}
                            ></div>
                            {!user?.stories?.find(story => story._id === id) && (
                                <button onClick={() => handleCompleteReading(id)} className='rounded-lg flex items-center justify-center gap-2 text-center py-2 bg-[#FF4550] text-white'>Completed</button>
                            )}
                        </>
                    ) : (
                        <button onClick={() => handleAddReading(id)} className='w-full rounded-lg flex items-center justify-center gap-2 text-center py-2 bg-[#FF4550] text-white'><span>Start Reading</span><IoBookOutline className='text-[22px]' /></button>
                    )
                ) : (
                    <>
                        <h1 className='text-lg font-semibold'>Story</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: story?.story }}
                        ></div>
                        {!user?.stories?.find(story => story._id === id) && (
                            <button onClick={() => handleCompleteReading(id)} className='rounded-lg flex items-center justify-center gap-2 text-center py-2 bg-[#FF4550] text-white'>Completed</button>
                        )}
                    </>

                )}
            </div>
        </div>
    )
}

export default StoryPage