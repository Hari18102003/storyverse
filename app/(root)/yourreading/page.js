"use client";
import Card from '@/components/Card'
import Loader from '@/components/Loader';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const YourReadingPage = () => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const session = useSession();
    const router = useRouter();

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

    if (session?.status === "unauthenticated") {
        router.push("/login");
    }

    return loading ? <Loader /> : (
        <div className='px-2 md:px-16 flex flex-col gap-5 py-5'>
            <h1 className='text-xl font-medium'>Your Readings</h1>
            <div className='grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-6 gap-4'>
                {user?.readings?.length > 0 ? (
                    user?.readings?.map(story => (
                        <Card
                            key={story._id}
                            story={story}
                        />
                    ))
                ) : (
                    <h1 className='font-semibold'>Start Reading your favourite ones...</h1>
                )}
            </div>
        </div>
    )
}

export default YourReadingPage