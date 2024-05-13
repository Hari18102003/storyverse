"use client";
import React, { useEffect, useState } from 'react'
import { IoFilter } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import Card from '@/components/Card';
import Loader from '@/components/Loader';

const AllStories = () => {

    const [stories, setStories] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

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

    let searchStories = stories.filter(story => story.title.toLowerCase().includes(search.toLowerCase()));

    function handleFilter(e) {
        e.preventDefault();
        const filteredStories = stories.filter(story => story.category.toLowerCase() === category.toLowerCase());
        setStories(filteredStories);
    }


    return loading ? <Loader /> : (
        <div className='md:px-16 px-2 flex md:flex-row flex-col py-5 items-center md:justify-between'>
            <div className='w-[300px] h-[350px] bg-[#31363F] rounded-md p-5'>
                <h1 className='font-medium flex items-center gap-2 mb-5 text-[#FF4550]'><IoFilter className='text-xl' /><span>Filter</span></h1>
                <div className='relative'>
                    <input type='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search..' className='p-2 w-full rounded-lg mb-5 relative' />
                    <IoMdSearch className='absolute text-[25px] right-1 text-[#FF4550] top-2' />
                </div>
                <form onSubmit={handleFilter}>
                    <div className='flex flex-col gap-3 mb-5'>
                        <label className='text-white'>Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className='rounded-lg p-2'>
                            <option value={"select"}>select</option>
                            <option value={"Comedy"}>Comedy</option>
                            <option value={"Biography"}>Biography</option>
                            <option value={"Random"}>Random</option>
                            <option value={"Romance"}>Romance</option>
                            <option value={"Horror"}>Horror</option>
                            <option value={"Crime"}>Crime</option>
                            <option value={"Drama"}>Drama</option>
                            <option value={"Fantasy"}>Fantasy</option>
                            <option value={"Fiction"}>Fiction</option>
                            <option value={"Thriller"}>Thriller</option>
                            <option value={"Adventure"}>Adventure</option>
                        </select>
                    </div>
                    <button type='submit' className='w-full py-1 text-white bg-[#FF4550] rounded-md' >Apply</button>
                </form>
            </div>
            <div className='grid grid-cols-1 mt-5 md:mt-0 md:grid-cols-5 gap-4 mr-9'>
                {searchStories?.length > 0 && (
                    searchStories?.map(story => (
                        <Card
                            key={story._id}
                            story={story}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default AllStories