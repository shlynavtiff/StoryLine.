import React from 'react'

const HeaderSignin = () => {
    return (
        <div className='flex flex-row gap-5 items-center justify-between w-full p-6  '>
            <div className='text-2xl '>
                <a href="/">StoryLine.</a>
            </div>
            <div className='flex flex-row  items-center'>
                <ul className='flex flex-row sm:gap-4 md:gap-8 text-sm items-center'>
                    <li><a href="/about" className='hidden md:block'>About</a></li>
                    <li><a href="" className='hidden sm:block'>Sign in</a></li>
                    <li><a href="" className='hidden md:block'>Write</a></li>
                    <button className='bg-[#242424] py-2 rounded-full cursor-pointer text-white px-4 border-[1px]border-[#414141]  hover:bg-[#414141]'>
                        Get started
                    </button>
                </ul>
            </div>
        </div>
    )
}

export default HeaderSignin