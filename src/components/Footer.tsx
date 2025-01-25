'use client'

import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
    return (
        <div>
            <div className="h-auto  flex flex-col gap-[3rem] bg-[#1b1b1b] items-center text-white border-t-[1px] border-t-[#535353] p-5 overflow-auto">
                <div className="block lg:hidden mr-auto pt-[3rem]">
                    <div className="w-[30px] h-[30px]">
                        <img src="/assets/Orgamix-DHQ1UM2f.png" alt="" className="w-32" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:flex  xl:flex gap-5 w-full max-w-[1200px] justify-between items-start lg:pt-[3rem]">
                    <div className="flex flex-col gap-5 items-start jsutify-between">
                        <div className="text-lg font-semibold">StoryLine.</div>
                        <div className="flex gap-2 flex-col text-[#b3b3b3] text-sm">
                            <div className="cursor-pointer">Home</div>
                            <div className="cursor-pointer"><a href="/about">About</a></div>
                            <div className="cursor-pointer">Articles</div>
                            <div className="cursor-pointer">Contact</div>
                            <div className="cursor-pointer"><a href="/faqs">FAQs</a></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start jsutify-between">
                        <div className="text-lg font-semibold">Legal</div>
                        <div className="flex gap-2 flex-col text-[#b3b3b3] text-sm">
                            <div className="cursor-pointer"><a href="/privacy-policy">Privacy &amp; Policy</a> </div>
                            <div className="cursor-pointer"><a href="/terms-and-conditions">Terms &amp; Conditions</a></div>
                            <div className="cursor-pointer"><a href="/accessibility">Accessibility</a></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start jsutify-between">
                        <div className="text-lg font-semibold">Guide</div>
                        <div className="flex gap-2 flex-col text-[#b3b3b3] text-sm">
                            <div className="cursor-pointer">Notifications</div>
                            <div className="cursor-pointer">Profile</div>
                            <div className="cursor-pointer">Publishing</div>
                            <div className="cursor-pointer">Settings</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start jsutify-between">
                        <div className="text-lg font-semibold">Socials</div>
                        <div className="flex gap-2 flex-col text-[#b3b3b3] text-sm">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <a href="https://github.com/shlynavtiff" target='_blank' className="flex items-center gap-2 cursor-pointer">
                                    <FaGithub/>
                                    GitHub
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href="https://www.facebook.com/shlynavtiff/" target='_blank' className="flex items-center gap-2 cursor-pointer">
                                    <FaFacebook/>
                                    Facebook
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href="https://www.instagram.com/shlynav.tiff/" target='_blank' className="flex items-center gap-2 cursor-pointer">
                                    <FaInstagram/>
                                    Instagram
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <a href="mailto:naval.ashleyjames.redacto@gmail.com" target='_blank' className="flex items-center gap-2 cursor-pointer">
                                <HiOutlineMail />
                                    Gmail
                                    
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div className="w-[30px] h-[30px]">
                            <img src="/assets/Orgamix-DHQ1UM2f.png" alt="" className="w-32" />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[1200px] flex sm:flex-row flex-col  gap-5 items-center justify-between pt-5 pb-[5rem] ">
                    <div>
                        <div className="text-[#b3b3b3] text-sm">
                            © 2025 StoryLine. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer