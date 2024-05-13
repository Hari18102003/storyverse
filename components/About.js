"use client";
import React, { useEffect, useState } from 'react'
import { GrEdit } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import axios from 'axios';

const About = () => {

    const [readers, setReaders] = useState("");
    const [creators, setCreators] = useState("");
    const [stories, setStories] = useState("");

    useEffect(() => {
        async function fetchAbout() {
            const { data } = await axios.get("/api/about");
            if (data.success) {
                setReaders(data.readers);
                setCreators(data.creators);
                setStories(data.stories);
            }
        }
        fetchAbout();
    }, []);

    return (
        <section className='w-full h-[250px] my-5'>
            <h1 className='text-xl text-center md:text-start text-[#FF4550] font-medium'>Our Path to Success</h1>
            <div className='w-full h-[250px] flex md:flex-row flex-col items-center justify-center gap-5 mt-5 md:mt-0 md:gap-28'>
                <div className='bg-slate-300 rounded-md w-[250px] h-[170px] flex flex-col items-center justify-center'>
                    <div className='flex gap-2 items-center text-3xl'>
                        <GrEdit />
                        <span>{creators}</span>
                    </div>
                    <p className='text-sm'>Creators</p>
                </div>
                <div className='bg-slate-300 rounded-md w-[250px] h-[170px] flex flex-col items-center justify-center'>
                    <div className='flex gap-2 items-center text-3xl'>
                        <MdOutlineMessage />
                        <span>{stories}</span>
                    </div>
                    <p className='text-sm'>Stories Shared</p>
                </div>
                <div className='bg-slate-300 rounded-md w-[250px] h-[170px] flex flex-col items-center justify-center'>
                    <div className='flex gap-2 items-center text-3xl'>
                        <IoBookOutline />
                        <span>{readers}</span>
                    </div>
                    <p className='text-sm'>Readers</p>
                </div>
            </div>

        </section>
    )
}

export default About