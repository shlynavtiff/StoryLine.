'use client';

import React, { useState } from 'react';
import AuthModal from './AuthModal';
import AuthModalSignIn from './AuthModalSignIn';
import AuthModalWrite from './AuthModalWrite';

const HeaderSignin = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isAuthModalOpenSignIn, setIsAuthModalOpenSignIn] = useState(false);
    const [isAuthModalOpenWrite, setIsAuthModalOpenWrite] = useState(false);

    const openAuthModalSignIn = (e) => {
        e.preventDefault(); // Prevent the default behavior of the <a> tag
        setIsAuthModalOpenSignIn(true);
    }; const closeAuthModalSignIn = () => setIsAuthModalOpenSignIn(false);

    const openAuthModalWrite = (e) => {
        e.preventDefault(); // Prevent the default behavior of the <a> tag
        setIsAuthModalOpenWrite(true);
    }; const closeAuthModalWrite = () => setIsAuthModalOpenWrite(false);

    const openAuthModal = () => setIsAuthModalOpen(true);
    const closeAuthModal = () => setIsAuthModalOpen(false);

    return (
        <div className='flex flex-row gap-5 items-center justify-between w-full p-6'>
            <div className='text-2xl'>
                <a href="/">StoryLine.</a>
            </div>
            <div className='flex flex-row items-center'>
                <ul className='flex flex-row sm:gap-4 md:gap-8 text-sm items-center'>
                    <li>
                        <a href="/about" className='hidden md:block'>
                            About
                        </a>
                    </li>
                    <li>
                        <a href="" className='hidden sm:block' onClick={openAuthModalSignIn}>
                            Sign in
                        </a>
                    </li>
                    <li>
                        <a href="" className='hidden md:block' onClick={openAuthModalWrite}>
                            Write
                        </a>
                    </li>
                    <button
                        className='bg-[#242424] py-2 rounded-full cursor-pointer text-white px-4 border-[1px] border-[#414141] hover:bg-[#414141]'
                        onClick={openAuthModal} // Open the modal when clicked
                    >
                        Get started
                    </button>
                </ul>
            </div>

            {/* Render the AuthModal */}
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
            <AuthModalSignIn isOpen={isAuthModalOpenSignIn} onClose={closeAuthModalSignIn} />
            <AuthModalWrite isOpen={isAuthModalOpenWrite} onClose={closeAuthModalWrite} />
        </div>
    );
};

export default HeaderSignin;    