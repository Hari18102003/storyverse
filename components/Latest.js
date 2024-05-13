"use client";
import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import Loader from './Loader';

const Latest = () => {

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            const { data } = await axios.get("/api/get/allstories");
            if (data.success) {
                setStories(data.stories);
                setLoading(false);
            }
        }
        fetchStories();
    }, []);

    return loading ? <Loader /> : (
        <section className='flex flex-col items-center md:items-start gap-5 my-5'>
            <h1 className='text-xl text-[#FF4550] font-medium'>Latest Stories</h1>
            <div className='grid grid-cols-1 md:grid-cols-6 gap-3'>
                {stories?.length > 0 && (
                    stories?.slice(0, 12)?.map(story => (
                        <Card
                            key={story._id}
                            story={story}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default Latest