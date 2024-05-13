import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className='w-full'>
            <div className='w-full h-[500px] md:h-[400px] px-3 rounded-lg bg-[#31363F] text-white flex flex-col md:flex-row items-center'>
                <div className='flex flex-col gap-8 md:w-3/4 p-6'>
                    <h1 className='md:text-3xl text-xl font-bold'>Welcome to StoryVerse,<br></br>Home of Creativity!</h1>
                    <p className='text-xs md:text-[15px]'>Place where stories find their home and words dance on digital pages. Explore a world of imagination, share your tales, and discover the magic of storytelling together.</p>
                    <Link href={"/allstories"}><button className='px-4 py-2 bg-[#FF4550] rounded-lg w-[150px]'>Browse Stories</button></Link>
                </div>
                <div className='p-2 md:w-1/4'>
                    <div className='rounded-lg w-64 h-48 md:w-[300px] md:h-[350px] relative'>
                        <Image
                            src={"/images/hero.jpg"}
                            alt='hero-image'
                            fill
                            className='rounded-lg'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero