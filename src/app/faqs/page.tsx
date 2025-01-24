import React from 'react'

const page = () => {
    return (
        <div className='max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8'>

            <div className='text-[2rem] font-semibold mt-5'>
                Frequently Asked Questions (FAQs)
            </div>

            <div className='mt-5'>
                Welcome to the FAQ section of StoryLine. Here, we aim to address the most common questions and
                concerns you may have. If you don’t see your question answered here, feel free to reach out to us directly.
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Getting Started</h2>
                <div className='mt-3'>
                    <div className=''>
                        <h2 className='font-semibold'>How do I create an account?</h2>
                        <p >
                            To create an account, click on the "Sign Up" button on the homepage, fill out the
                            required details (e.g., name, email, and password), and submit the form. Once completed,
                            you will receive a confirmation email to activate your account.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> Is using the platform free?</h2>
                        <p>
                            Yes, our platform offers a free tier with access to essential features. We also
                            provide premium plans with additional features for users who want to enhance their experience.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> How do I reset my password?</h2>
                        <p>
                            If you forget your password, click on the "Forgot Password" link on the login page. Enter
                            your registered email address, and we’ll send you instructions to reset your password.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Using the Platform</h2>
                <div className='mt-3'>
                    <div>
                        <h2 className='font-semibold'> How do I publish a blog post?</h2>
                        <p>
                        After logging in, go to the "Create Post" section in your dashboard. Write your content,
                         add relevant tags and images, and click "Publish" to share your blog post with the community.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> Can I edit or delete my published posts?</h2>
                        <p>
                        Yes, you can edit or delete your posts anytime by navigating to the "Your stories" section in your account dashboard.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> How do I reset my password?</h2>
                        <p>
                            If you forget your password, click on the "Forgot Password" link on the login page. Enter
                            your registered email address, and we’ll send you instructions to reset your password.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Account Management</h2>
                <div className='mt-3'>
                    <div>
                        <h2 className='font-semibold'> How do I update my profile information?</h2>
                        <p>
                        To update your profile, log in and go to the "Profile Settings" section. Here, 
                        you can change your username, bio, profile picture, and other details.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> How do I delete my account?</h2>
                        <p>
                        If you wish to delete your account, please contact our support team at [Insert Contact Email]. 
                        Keep in mind that deleting your account will permanently remove your data and posts.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Privacy and Security</h2>
                <div className='mt-3'>
                    <div>
                        <h2 className='font-semibold'> How is my personal information protected?</h2>
                        <p>
                        We use industry-standard encryption and security measures to protect your personal data.
                        For more details, please refer to our [Privacy Policy].
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'> How do I delete my account?</h2>
                        <p>
                        Yes, when creating or editing a post, you can select the visibility settings to make it public,
                         private, or visible only to your followers.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Technical Support</h2>
                <div className='mt-3'>
                    <div>
                        <h2 className='font-semibold'>What should I do if I encounter a bug or issue?</h2>
                        <p>
                        If you experience any technical issues, please report them to our support team at [Insert Contact Email] or
                         through the "Report a Problem" link in your account dashboard.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'>Which browsers are supported?</h2>
                        <p>
                        Our platform is optimized for modern browsers, including Chrome, Firefox, Safari, and Edge. For 
                        the best experience, ensure your browser is up to date.
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-3xl font-semibold'>Additional Questions</h2>
                <div className='mt-3'>
                    <div>
                        <h2 className='font-semibold'>How can I contact customer support?</h2>
                        <p>
                        You can reach out to our support team at [Insert Contact Email] or via the "Contact Us" form on our website.
                        </p>
                    </div>
                    <div className='mt-2'>
                        <h2 className='font-semibold'>Can I suggest new features?</h2>
                        <p>
                        Absolutely! We value your feedback. Please send your feature suggestions to [Insert Contact Email], and our team will consider them for future updates.
                        </p>
                    </div>
                </div>
            </div>

            <div className='my-12'>
                If you have further questions, please don’t hesitate to reach out. We’re here to help!
            </div>


        </div>
    )
}

export default page