import React from 'react'

const page = () => {
    return (
        <div className='max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8' >

            <div className='text-[2rem] font-semibold mt-12'>
                Accessibility Policy
            </div>

            <div className='mt-5'>
                Effective Date: January 24, 2025
            </div>

            <div className='mt-5'>
                At StoryLine. ("we," "our," or "us"), we are committed to ensuring that our platform
                is accessible to all users, including those with disabilities. We strive to provide an
                inclusive digital environment that allows everyone to engage fully with our content and services.
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Our Commitment</h2>
                <p>We are dedicated to making our platform as accessible as possible by:</p>
                <div className='pl-3 mt-3'>
                <ul className='pl-5 list-disc flex flex-col gap-2'>
                    <li>Adhering to recognized accessibility standards, such as the Web Content Accessibility Guidelines (WCAG) 2.1.</li>
                    <li>Regularly evaluating and updating our platform to improve accessibility.</li>
                    <li>Providing alternative means of accessing content or assistance where accessibility challenges arise.</li>
                </ul>
                </div>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Accessibility Features</h2>
                <p>Our platform includes the following features to support accessibility:</p>
                <div className='pl-3 mt-3'>
                <ul className='pl-5 list-disc flex flex-col gap-2'>
                    <li>Keyboard Navigation: All interactive elements, including menus and forms, can be accessed using a keyboard.</li>
                    <li>Screen Reader Compatibility: Our site is designed to work with common screen readers to provide a seamless experience for visually impaired users.</li>
                    <li>Text Alternatives: Images and non-text elements include descriptive alternative text (alt text).</li>
                    <li>High Contrast Mode: We use color combinations that enhance readability and provide sufficient contrast.</li>
                    <li>Responsive Design: Our platform is optimized for use across various devices and screen sizes, including assistive technologies.</li>
                </ul>
                </div>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Ongoing Efforts</h2>
                <p>We recognize that accessibility is an ongoing process. To maintain and improve the accessibility of our platform, we:</p>
                <div className='pl-3 mt-3'>
                    <ul className='pl-5 list-disc flex flex-col gap-2'>
                        <li>Conduct regular audits and testing of our website to identify and address accessibility issues.</li>
                        <li>Train our team on accessibility best practices.</li>
                        <li>Seek feedback from users to better understand their needs and challenges.</li>
                    </ul>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Requesting Assistance</h2>
                <p className='mt-3'>
                    If you experience any difficulty accessing our platform or require additional support, please contact us. We are here
                    to help and will work with you to provide the information or service you need.
                </p>
            </div>

            <div className='my-12'>
            By using StoryLine., you acknowledge our commitment to accessibility and agree to work with us in creating an inclusive experience for all.


            </div>

        </div>
    )
}

export default page