'use client'

import React, { useState, useEffect } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { createClient } from '../utils/supabase/client';
import toast from "react-hot-toast";
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import HeaderSignin from './HeaderSignin';
import testimage from '../app/assets/wasd.jpg';
import Link from 'next/link';

const DynamicHeader = () => {
    const [user, setUser] = useState<User | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        async function fetchUser() {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                setUser(null);
                return;
            }
            setUser(data.user);

            const { data: profile } = await supabase
                .from("user_profiles")
                .select('avatar_url, username')
                .eq("id", data.user.id)
                .single();

            if (profile) {
                setAvatarUrl(profile.avatar_url);
                setUsername(profile.username);
            }
        }

        fetchUser();

        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                setUser(session.user);
                fetchUser(); // Refresh user data
            } else {
                setUser(null);
                setAvatarUrl(null);
                setUsername(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (!user) {
        return <HeaderSignin />;
    }

    return (
        <div className='flex flex-row gap-5 items-center justify-between max-w-[1500px] mx-auto w-full p-6'>
            <div className='text-2xl '>
                <a href="/">StoryLine.</a>
            </div>
            <div className='flex flex-row gap-5 items-center'>
                <div className='hidden md:block'>
                    <div className='flex flex-row items-start cursor-pointer'>
                        <BsPencilSquare size={20} />
                        <Link href={'/publish'} className='ml-2 text-sm '>Write</Link>
                    </div>
                </div>
                <Link href={`/notifications`} passHref>
                    <div className='cursor-pointer'>
                        <IoNotificationsOutline size={24} />
                    </div>
                </Link>

                {/* ✅ Use username state instead of user_metadata */}
                <Link href={`/profile/${username || ""}`} passHref>
                    <div className='cursor-pointer'>
                        {avatarUrl ? (
                            <Image src={avatarUrl} alt='User Profile' className='w-[32px] h-[32px] rounded-full' width={32} height={32} />
                        ) : (
                            <Image src={testimage} alt='User Profile' className='w-[32px] h-[32px] rounded-full' width={32} height={32} />
                        )}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default DynamicHeader;
