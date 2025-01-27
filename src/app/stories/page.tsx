'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import testing from '../assets/wasd.jpg'
import { IoIosMore } from "react-icons/io";
import Header from "@/components/Header";
import { ArrowUpRight } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import { IoMdArrowDropdown } from "react-icons/io";
import { FiShare } from "react-icons/fi";

const page = () => {
    const [activeTab, setActiveTab] = useState("Published");
    const [isDropdownOpenShare, setIsDropdownOpenShare] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const dropdownRefShare = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to toggle share dropdown visibility
    const toggleDropdownShare = () => {
        setIsDropdownOpenShare((prev) => !prev);
    };

    // Function to toggle main dropdown visibility
    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close share dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRefShare.current &&
                !dropdownRefShare.current.contains(event.target as Node)
            ) {
                setIsDropdownOpenShare(false);
            }
        };

        if (isDropdownOpenShare) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpenShare]);

    // Close main dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <>

            <Header />

            <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[900px] mx-auto px-6">

                <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center">
                        <p className="text-[35px] sm:text-[40px] font-semibold ">Your stories</p>
                    </div>

                    <button className="bg-[#242424] py-2 px-4 text-sm rounded-full cursor-pointer text-white border-[1px] border-[#414141] hover:bg-[#414141] hidden md:block">
                        Write a story
                    </button>

                </div>

                {/* Tabs */}
                <div className="flex space-x-6 border-b border-gray-300 mb-8">
                    {["Drafts", "Published", "Responses"].map((tab) => (
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
                    {activeTab === "Drafts" && (
                        <section className="flex flex-col gap-3">

                            <div className="flex flex-col justify-between items-start max-w-[550px] cursor-pointer">
                                <h2 className="text-[18px]">Weak Messages Create Bad Situations.</h2>
                                <div className="text-[12px] flex flex-row items-center gap-2 relative" ref={dropdownRef}>
                                    <p>Last edited 22 minutes ago • (# words) so far</p>
                                    <div onClick={toggleDropdown} className="flex items-center">
                                        <IoMdArrowDropdown />
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="absolute right-2 top-6 bg-white border border-gray-200 rounded shadow-lg">
                                            <ul className="py-1">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log('Edit clicked')}
                                                >
                                                    Edit story
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log('Delete clicked')}
                                                >
                                                    Delete story
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>


                        </section>
                    )}

                    {activeTab === "Published" && (
                        <section className="flex flex-col gap-">

                            <div className="flex flex-col justify-between items-start max-w-[550px] cursor-pointer">
                                <div>
                                    <h2 className="text-[18px]">Weak Messages Create Bad Situations.</h2>
                                    <p className="text-[14px]">
                                        Even the gods are bound to slip, for perfection is not the absence of
                                        falling but the wisdom to rise again. In their faltering, they teach…
                                    </p>
                                </div>

                                <div className="text-[12px] flex flex-row items-center gap-2 relative">
                                    <p>Published less than a minute ago</p>

                                    {/* Share dropdown */}
                                    <div
                                        onClick={toggleDropdownShare}
                                        className="flex items-center"
                                        ref={dropdownRefShare}
                                    >
                                        <FiShare />
                                    </div>
                                    {isDropdownOpenShare && (
                                        <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded shadow-lg">
                                            <ul className="py-1">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log("Copy link clicked")}
                                                >
                                                    Copy link
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                    {/* Main dropdown */}
                                    <div
                                        onClick={toggleDropdown}
                                        className="flex items-center"
                                        ref={dropdownRef}
                                    >
                                        <IoMdArrowDropdown />
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute right-2 top-6 bg-white border border-gray-200 rounded shadow-lg">
                                            <ul className="py-1">
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log("Edit story clicked")}
                                                >
                                                    Edit story
                                                </li>
                                                <li
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => console.log("Delete story clicked")}
                                                >
                                                    Delete story
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </section>
                    )}

                    {
                        activeTab === "Responses" && (
                            <section className="flex flex-col gap-4">
                                <div>borat</div>
                            </section>
                        )}
                </main>


            </div>

        </>


    );
};

export default page;
