import React from 'react'

const page = () => {
    return (
        <div className='max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8'>

            <div className='text-[2rem] font-semibold mt-5'>
                Privacy Policy
            </div>

            <div className='mt-5'>
                <i>Effective Date:</i> January 23, 2025
            </div>

            <div className='mt-5'>
                It's good to see you here. We're dedicated to keeping your privacy safe. We are going to
                only utilize the data we get about you in a way that is permitted by law (in compliance with the
                The 2012 Data Privacy Act (Republic Act 10173). We gather your personal data for two purposes:

                In order to give you the best service possible, we must first process your profile. We are going to
                not send you another email unless you have instructed us to do so. You will have the option to decline.
                any upcoming marketing emails from us.
            </div>


            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Information We Collect</h2>
                <p className=''>We may collect the following types of information:</p>
                <div className='mt-2'>
                    <ul className=' flex flex-col gap-2'>
                        <li>Information You Provide to Us:</li>
                        <div className='pl-5'>
                            <ul className='list-disc pl-3 flex flex-col gap-2 '>
                                <li>
                                    Account Information: When you create an account, we collect your name, email address, username, and password.
                                </li>
                                <li>
                                    Profile Information: Any optional profile details you choose to provide, such as a bio or profile picture.
                                </li>
                                <li>
                                    Content: Any blog posts, comments, or messages you create or share on the platform.
                                </li>
                            </ul>
                        </div>

                        <li>Automatically Collected Information:</li>
                        <div className='pl-5'>
                        <ul className='list-disc pl-3 flex flex-col gap-2 '>
                            <li>
                                Usage Data: Information about your interactions with the platform, such as pages viewed, time spent, and navigation paths.
                            </li>
                            <li>
                                Device Information: Information about the device you use to access the platform, including IP address, browser type, operating system, and device identifiers.
                            </li>
                            <li>
                                Cookies and Similar Technologies: Information collected through cookies, pixels, and other tracking technologies.
                            </li>
                        </ul>
                        </div>
                        
                        <li>Third-Party Information</li>
                    </ul>
                    
                    <div className='pl-5'>
                        <ul className='list-disc pl-3 flex flex-col gap-2 '>
                            <li>We may collect information about you from third-party services if you link your account to external platforms (e.g., social media or payment processors).</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>How We Use Your Information</h2>
                <p className=''>We use the information we collect to:</p>
                <div className='pl-5'>
                <ul className='mt-2 list-disc pl-3 flex flex-col gap-2 '>
                    <li>Provide and Improve the Platform: Ensure proper functionality, personalize user experiences, and improve our services.</li>
                    <li>Communicate with You: Respond to inquiries, send updates, and notify you about changes to the platform or policies.</li>
                    <li>Analyze Usage: Monitor and analyze trends, usage, and activities to enhance the platform.</li>
                    <li>Enforce Policies: Detect and prevent fraud, abuse, and other harmful activities.</li>
                    <li>Legal Compliance: Fulfill legal obligations and resolve disputes.</li>
                </ul>
                </div>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>How We Share Your Information</h2>
                <p className=''>We do not sell your personal information. However, we may share your information in the following circumstances:</p>
                <div className='pl-5'>
                <ul className='mt-2 list-disc pl-3 flex flex-col gap-2 '>
                    <li>With Service Providers: Third-party vendors who help us operate the platform, such as hosting services, analytics providers, or email services.</li>
                    <li>Legal Obligations: When required by law, court order, or legal process.</li>
                    <li>Protection of Rights: To protect the rights, safety, or property of StoryLine., its users, or others.</li>
                    <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
                </ul>
                </div>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Your Privacy Choices</h2>
                <p className=''>You have control over your information and can:</p>
                <div className='pl-5'>
                <ul className='mt-2 list-disc pl-3 flex flex-col gap-2 '>
                    <li>Update Your Account Information: Edit or update your profile and account settings at any time.</li>
                    <li>Opt-Out of Communications: Unsubscribe from marketing emails or notifications.</li>
                    <li>Manage Cookies: Adjust your browser settings to manage or block cookies.</li>
                    <li>Delete Your Account: Request account deletion by contacting us at [Insert Contact Email]. Note that some information may be retained as required by law.</li>
                </ul>
                </div>
                
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Data Retention</h2>
                <p className='mt-2'>
                    We retain your information as long as necessary to fulfill the purposes outlined in this Privacy Policy unless
                    a longer retention period is required by law. When no longer needed, your information will be securely deleted
                    or anonymized.
                </p>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Data Security</h2>
                <p className='mt-2'>
                    We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure,
                    or destruction. However, no method of transmission over the internet is entirely secure. Use the platform at your own risk.
                </p>
            </div>

            <div className='mt-5'>
                <h2 className='text-2xl font-semibold'>Changes to This Privacy Policy</h2>
                <p className='mt-2'>
                    We may update this Privacy Policy from time to time. Changes will be effective upon posting the revised policy. We will notify
                    you of significant updates by email or platform notifications.
                </p>
            </div>

            <div className='my-12'>
                By using StoryLine., you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </div>

        </div>
    )
}

export default page