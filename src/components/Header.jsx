'use client'

import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testimage from '../app/assets/wasd.jpg'
import Image from 'next/image';

const Header = () => {
  return (
    <div className='flex flex-row gap-5 items-center justify-between w-full p-6'>
      <div className='text-2xl '>
        <a href="/">StoryLine.</a>
      </div>
      <div className='flex flex-row gap-5 items-center'>
        <div className='flex flex-row items-start  cursor-pointer'><BsPencilSquare size={20} /><a href="" className='ml-2 text-sm '>Write</a></div>
        <div className='cursor-pointer'><IoNotificationsOutline size={24} /></div>
        <div className='cursor-pointer'>
          <Image src={testimage} className='w-[32px] h-[32px] rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default Header