import React from 'react'

const page = () => {
    return (
        <div className='max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8'>

            <div className='text-[2rem] font-semibold mt-5'>
                About us
            </div>

            <div className='mt-5'>
                Welcome to StoryLine., where stories come alive and connections are built
                through words. Our mission is to empower individuals to share their unique voices, discover
                inspiring content, and connect with a diverse community of creators and readers.
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Our Story</h2>
                <div className='mt-3'>
                    <p>
                        Founded with the belief that everyone has a story worth sharing, StoryLine. was
                        created to provide a space where creativity thrives. Whether you're a seasoned writer, a passionate
                        storyteller, or someone looking to discover new perspectives, StoryLine. is here to support your journey.
                    </p>

                    <p className='mt-3'>
                        We started this project with a simple goal: to make blogging accessible,
                        enjoyable, and meaningful for everyone. Today, we’re proud to be a hub for creators and
                        readers worldwide.</p>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>What We Offer</h2>
                <p className='mt-3'>At StoryLine., we’re dedicated to making your blogging experience seamless and rewarding. Here’s what you can expect:</p>
                <div className='pl-5 mt-2'>
                    <ul className='pl-3 list-disc'>
                        <li>Simple Tools for Writing: A user-friendly editor to bring your ideas to life. Share stories, tutorials, opinions, or creative writing with ease.</li>
                        <li>Community Engagement: Connect with like-minded individuals, comment on posts, and build meaningful relationships.</li>
                        <li>Content Discovery: Explore a wide range of topics, from personal blogs to professional insights.</li>
                        <li>Privacy and Security: Your data and content are safe with us, thanks to robust security measures.</li>
                    </ul>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Our Vision</h2>
                <p className='mt-3'>
                    We envision a world where everyone’s voice matters. Our platform fosters creativity, learning, and connection, making
                    it a space where all stories—big and small—find their audience.</p>
            </div>

            <div className='mt-5 mb-12'> 
                <h2 className='text-2xl font-semibold'>Join Us</h2>
                <p className='mt-3'>
                    Whether you’re here to share, read, or connect, we’re thrilled to have you as part of our community. Together, we can
                    build a platform that celebrates individuality and creativity.
                </p>
                <p className='mt-3'>Start your journey with us today—because your story deserves to be heard.</p>
            </div>

        </div>
    )
}

export default page