"use client";
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useState } from 'react'
import { IoImage } from "react-icons/io5";
// import ReactQuill from 'react-quill';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Write = () => {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [story, setStory] = useState("");
    const [file, setFile] = useState("");
    const [previews, setPreviews] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState(null);
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

    const session = useSession();
    const router = useRouter();

    const params = useSearchParams();
    const newId = params.get("id");

    useEffect(() => {
        setId(newId);
    }, [newId]);

    useEffect(() => {
        if (id) {
            async function fetchStory() {
                const { data } = await axios.get(`/api/get/drafts/${id}`);
                if (data.success) {
                    setTitle(data.story.title);
                    setCategory(data.story.category);
                    setStory(data.story.story);
                    setPreviews(data.story.image);
                    setDescription(data.story.description);
                }
            }
            fetchStory();
        }
    }, [id]);

    useEffect(() => {
        if (!file) return;
        let tmp = [];
        tmp.push(URL.createObjectURL(file));
        const objectUrls = tmp[0];
        setPreviews(objectUrls);
        return URL.revokeObjectURL(objectUrls[0]);
    }, [file]);

    function handleCategory(e) {
        setCategory(e.target.value)
    }

    async function handlePublishDraft(id) {
        toast.loading("Publishing..");
        if (!title || !category || !description || !story) {
            toast.dismiss();
            toast.error("Insufficient informations to Publish");
            return;
        }
        if (file) {
            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("upload_preset", "storyverse");
            fileData.append("cloud_name", cloudName);
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fileData);
            const res = await axios.post(`/api/publish/${id}`, { title, category, image: data.url, story, description });
            if (res.data.success) {
                toast.dismiss();
                toast.success("Published");
                setFile("");
                setTitle("");
                setPreviews("");
                setCategory("");
                setDescription("");
                setStory("");
            } else {
                toast.dismiss();
                toast.success("Publish unsuccessful");
            }
        } else {
            const res = await axios.post(`/api/publish/${id}`, { title, category, image: previews, story, description });
            if (res.data.success) {
                toast.dismiss();
                toast.success("Published");
                setFile("");
                setTitle("");
                setPreviews("");
                setCategory("");
                setStory("");
                setDescription("");
                router.push("/yourstories");
            } else {
                toast.dismiss();
                toast.success("Publish unsuccessful");
            }
        }

    }

    async function handlePublish() {
        toast.loading("Publishing..");
        if (!file || !title || !category || !description || !story) {
            toast.dismiss();
            toast.error("Insufficient informations to Publish");
            return;
        }
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("upload_preset", "storyverse");
        fileData.append("cloud_name", cloudName);
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fileData);
        const res = await axios.post("/api/publish", { title, category, image: data.url, story, description });
        if (res.data.success) {
            toast.dismiss();
            toast.success("Published");
            setFile("");
            setTitle("");
            setPreviews("");
            setCategory("");
            setStory("");
            setDescription("");
            router.push("/yourstories");
        } else {
            toast.dismiss();
            toast.success("Publish unsuccessful");
        }

    }

    async function handleSave() {
        toast.loading("Saving as draft");
        if (!file || !title || !category || !description || !story) {
            toast.dismiss();
            toast.error("Need atleast a word in each field to save as draft");
            return;
        }
        const fileData = new FormData();
        fileData.append("file", file);
        fileData.append("upload_preset", "storyverse");
        fileData.append("cloud_name", cloudName);
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fileData);
        const res = await axios.post("/api/save", { title, category, image: data.url, story, description });
        if (res.data.success) {
            toast.dismiss();
            toast.success("Saved as Draft");
        } else {
            toast.dismiss();
            toast.success("Save unsuccessful");
        }
    }

    async function handleSaveDraft(id) {
        toast.loading("Saving as draft");
        if (!title || !category || !description || !story) {
            toast.dismiss();
            toast.error("Need atleast a word in each field to save as draft");
            return;
        }
        if (file) {
            const fileData = new FormData();
            fileData.append("file", file);
            fileData.append("upload_preset", "storyverse");
            fileData.append("cloud_name", cloudName);
            const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fileData);
            const res = await axios.post(`/api/save/${id}`, { title, category, image: data.url, story, description });
            if (res.data.success) {
                toast.dismiss();
                toast.success("Saved as Draft");
            } else {
                toast.dismiss();
                toast.success("Save unsuccessful");
            }
        } else {
            const res = await axios.post(`/api/save/${id}`, { title, category, image: previews, story, description });
            if (res.data.success) {
                toast.dismiss();
                toast.success("Saved as Draft");
            } else {
                toast.dismiss();
                toast.success("Save unsuccessful");
            }
        }

    }

    if (session?.status === "unauthenticated") {
        router.push("/login");
    }

    const ReactQuillComponent = typeof window !== 'undefined' ? require('react-quill') : null;

    return (
        <div className='py-5 px-2 md:px-36 flex md:flex-row flex-col justify-between'>
            <div className='relative md:w-1/4 h-[400px] flex items-center justify-center rounded-lg bg-slate-300'>
                {previews ? (
                    <label htmlFor='image' className='w-full h-full relative'>
                        <Image
                            src={previews}
                            alt='cover image'
                            fill
                            className='rounded-lg'
                        />
                    </label>

                ) : (
                    <>
                        <label htmlFor='image' className='flex flex-col gap-1 items-center'>
                            <IoImage className='text-4xl' />
                            <p>Add Cover</p>
                        </label>
                    </>
                )}

                <input
                    id='image'
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0]);
                        }
                    }}
                />

            </div>
            <div className='flex flex-col gap-5 md:w-1/2 mr-10'>
                <div className='flex flex-col gap-2'>
                    <label className='text-xl font-semibold'>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type='text' className='bg-slate-200 p-2 rounded-md' placeholder="Untitled Story" />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-xl font-semibold'>Category</label>
                    <select onChange={handleCategory} value={category} className='bg-slate-200 p-2 rounded-md w-[150px]'>
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
                <div className='flex flex-col gap-2'>
                    <label className='text-xl font-semibold'>Description</label>
                    <textarea rows={5} value={description} className='border-2 p-2' onChange={e => setDescription(e.target.value)} />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-xl font-semibold'>Your Story</label>
                    <p className='text-sm text-gray-400'>{story.split(" ").length}{" "}words</p>
                    {ReactQuillComponent && (
                        <ReactQuillComponent
                            value={story}
                            className='h-[500px] mb-10'
                            onChange={setStory}
                        />
                    )}
                </div>
                <div className='flex mt-10 md:mt-0 items-center gap-5 text-white'>
                    <button onClick={id ? () => handleSaveDraft(id) : handleSave} title='saving as draft' className='px-5 py-2 rounded-lg bg-[#31363F]'>Save as Draft</button>
                    <button onClick={id ? () => handlePublishDraft(id) : handlePublish} title='publishing to the public for others to read' className='px-5 py-2 rounded-lg bg-[#FF4550]'>Publish</button>
                </div>
            </div>
        </div>
    )
}

export default Write