"use client";
import Card from '@/components/Card'
import Loader from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DraftsPage = () => {

    const [stories, setStories] = useState([]);
    const session = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            const { data } = await axios.get("/api/get/drafts");
            if (data.success) {
                setStories(data.stories);
                setLoading(false);
            }
        }
        fetchStories();
    }, [stories]);

    if (session?.status === "unauthenticated") {
        router.push("/login");
    }

    return loading ? <Loader /> : (
        <div className='px-2 md:px-16 flex flex-col gap-5 py-5'>
            <h1 className='text-xl font-medium'>Your Drafts</h1>
            <div className='grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-6 gap-4'>
                {stories?.length > 0 ? (
                    stories?.map(story => (
                        <Card
                            key={story._id}
                            story={story}
                        />
                    ))
                ) : (
                    <h1 className='text-lg font-semibold'>No Drafts...</h1>
                )}
            </div>
        </div>
    )
}

export default DraftsPage