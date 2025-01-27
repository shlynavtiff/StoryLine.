'use client'

import React, { useState } from "react";
import Image from "next/image";
import testing from '../assets/wasd.jpg'
import { IoIosMore } from "react-icons/io";
import Header from "@/components/Header";
import { ArrowUpRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"

const page = () => {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <>

            <Header />

            <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[900px] mx-auto px-6">


                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center">
                        <p className="text-[35px] sm:text-[40px] font-semibold ">Notifications</p>
                    </div>

                    <div>
                        <IoIosMore />
                    </div>

                </div>

                {/* Tabs */}
                <div className="flex space-x-6 border-b border-gray-300 mb-8">
                    {["All", "Responses",].map((tab) => (
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
                    {activeTab === "All" && (
                        <section className="flex flex-col gap-3">

                            <div>You're all caught up.</div>

                        </section>
                    )}

                    {activeTab === "Responses" && (
                        <section className="flex flex-col gap-4">

                            <div>You're all caught up.</div>

                        </section>
                    )}


                </main>


            </div>

        </>


    );
};

export default page;
