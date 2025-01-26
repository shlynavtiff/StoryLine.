'use client'

import React, { useState } from "react";
import Image from "next/image";
import testing from '../assets/wasd.jpg'
import { IoIosMore } from "react-icons/io";
import Header from "@/components/Header";
import { ArrowUpRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

const page = () => {
    const [activeTab, setActiveTab] = useState("Notifications");

    return (
        <>

            <Header />

            <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[1280px] mx-auto px-6">


                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center">
                        <p className="text-[35px] sm:text-[40px] font-semibold ">Settings</p>
                    </div>

                    <div>
                        <IoIosMore />
                    </div>

                </div>

                {/* Tabs */}
                <div className="flex space-x-6 border-b border-gray-300 mb-8">
                    {["Account", "Publishing", "Notifications"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 text-sm font-medium ${activeTab === tab
                                ? "text-gray-800 border-b-2  border-black"
                                : "text-gray-500 hover:text-gray-800"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>



                {/* Main Profile Section */}
                <main className="flex-grow bg-white  rounded-lg ">

                    {/* Content Based on Active Tab */}
                    {activeTab === "Account" && (
                        <section className="flex flex-col gap-3">

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <h2 className="text-[15px]">Email address</h2>
                                <p className="sm:text-[15px] text-[12px]">shlynavtiff@gmail.com</p>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] text-[15px] cursor-pointer">
                                <h2 >Username</h2>
                                <p>@shylnav.tiff</p>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className="">
                                    <h2 className="text-[15px]">Profile information</h2>
                                    <p className="text-[9px] max-w-[150px]">Edit your photo, name, pronouns, short bio, etc.</p>
                                </div>

                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-[15px]">shylnav.tiff</p>
                                    <Image src={testing} alt="pfp" className="w-[28px] h-[28px] rounded-full" />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <h2 className="text-[15px]">Muted writers and publications</h2>
                                <ArrowUpRight size={20} />
                            </div>

                            <div className="flex =flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <h2 className="text-[15px]">Blocked users</h2>
                                <ArrowUpRight size={20} />
                            </div>

                        </section>
                    )}

                    {activeTab === "Publishing" && (
                        <section className="flex flex-col gap-4">

                            <h2 className="text-[20px]">Manage publications</h2>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className=" ">
                                    <h3 className="text-[15px]">Allow reader to leave private notes on your stories</h3>
                                    <p className="text-[9px]">Private notes are visible to you and (if left in a publication) all Editors of the publication.</p>
                                </div>
                                <div className="ml-4 flex items-center jusitfy-center">
                                    <Checkbox />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className="">
                                    <h3 className="text-[15px]">Allow email replies</h3>
                                    <p className="text-[9px]">Let readers reply to your stories directly from their email.</p>
                                </div>
                                <div className="ml-4 flex items-center jusitfy-center">
                                    <Checkbox />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className=" ">
                                    <h3 className="text-[15px]">‘Reply To’ email address</h3>
                                    <p className="text-[9px]">Shown to your subscribers when they reply.</p>
                                </div>
                                <div className=" flex items-center jusitfy-center underline text-[10px] md:text-[12px]">
                                    shlynavtiff@gmail.com
                                </div>
                            </div>

                        </section>
                    )}

{
                    activeTab === "Notifications" && (
                        <section className="flex flex-col gap-4">
                            <h2 className="text-[20px]">Email notifications</h2>
                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className="text-[15px]">
                                    When someone follows you or highlights the same passage in a story
                                </div>

                                <div className="ml-4 flex items-center jusitfy-center">
                                    <Checkbox />
                                </div>
                            </div>

                            <div className="flex flex-row justify-between items-start md:items-center max-w-[550px] cursor-pointer">
                                <div className="text-[15px]">
                                    When someone mentions you in their story
                                </div>

                                <div className="ml-4 flex items-center jusitfy-center">
                                    <Checkbox />
                                </div>
                            </div>
                        </section>
                    )}
                </main>

               
            </div>

        </>


    );
};

export default page;
