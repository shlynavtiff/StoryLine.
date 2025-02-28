'use client'

import React, { useState, useEffect } from 'react'
import { BsPencilSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";

import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import testimage from '../app/assets/wasd.jpg'
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';

const Header = () => {
  const [user, setUser] = useState < User | null > (null)
  const [avatarUrl, setAvatarUrl] = useState < string | null > (null)


  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.error("No user is logged in")
        toast.error('No user is logged in')
        return;
      }

      setUser(data.user)

      const { data: profile } = await supabase
        .from("user_profiles").select('avatar_url').eq("id", data.user.id).single()

      if (profile) setAvatarUrl(profile.avatar_url)

    }

    fetchUser()
  }, [])


  return (
    <div className='flex flex-row gap-5 items-center justify-between max-w-[1500px] mx-auto w-full p-6'>
      <div className='text-2xl '>
        <a href="/">StoryLine.</a>
      </div>
      <div className='flex flex-row gap-5 items-center'>
        <div className='hidden md:block'>
          <div className='flex flex-row items-start cursor-pointer'><BsPencilSquare size={20} /><a href="" className='ml-2 text-sm '>Write</a></div>
        </div>
        <div className='cursor-pointer'><IoNotificationsOutline size={24} /></div>
        <div className='cursor-pointer'>
          <Image src={testimage} alt='User Profile' className='w-[32px] h-[32px] rounded-full' />
        </div>
      </div>
    </div>
  )
}

export default Header