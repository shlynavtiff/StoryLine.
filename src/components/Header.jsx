'use client'

import React from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testimage from '../app/assets/wasd.jpg'

const Header = () => {
  return (
    <div className='flex flex-row gap-5 items-center justify-between w-full'>
      <div>
        StoryLine.
      </div>
      <div className='flex flex-row gap-5 items-center'>
        <div className='flex flex-row items-center cursor-pointer'><BsPencilSquare />Write</div>
        <div className='cursor-pointer'><IoNotifications /></div>
        <div className='cursor-pointer'>
          <Avatar>
            <AvatarImage src={testimage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default Header