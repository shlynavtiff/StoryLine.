'use client'

import React, { FormEvent, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const page = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repPassword, setRepPassword] = useState<string>("")
    const [Username, setUsername] = useState<string>("")

    const [isLoading, setIsLoading] = useState<boolean>(false)


    async function createUser(params: string) {
        try {
            const { error } = await supabase.from('accounts').insert({
                userid: params,
                username: Username,
                password: password,
                email: email,
            })
            if (error) {
                console.error('Error inserting data:', error);
            } else {
                setUsername("")
                setEmail("")
                setRepPassword("")
                setPassword("")
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
        }
    }

    function createUserAccount(e: FormEvent) {
        e.preventDefault();


        if (!Username || !email || !password || !repPassword) {
            return console.log("Please fill up all inputs!");
        }

        if (password !== repPassword) {
            return console.log("Password fields do not match!");
        }

        if (password.length < 7) {
            return alert("Please make your password stronger!");
        }

        if (isLoading) {
            return; // Prevent duplicate requests
        }

        setIsLoading(true);


        // Sign up user with Supabase
        supabase.auth
            .signUp({
                email: email,
                password: password,
            })
            .then((response) => {
                const user = response as any;
                setIsLoading(false);

                if (user) {
                    createUser(user.data.user.id);
                    console.log("User signed up successfully:", user);

                }
            })
            .catch((error: { message: string | string[] }) => {
                setIsLoading(false);

                if (error) {
                    console.log(error);

                    if (error.message.includes('For security purposes, you can only request')) {
                        return alert("For security purposes, you can only request a new verification email every 5 minutes.");
                    }
                    if (error.message.includes("already registered") || error.message.includes("email already in use")) {
                        return alert("Email is already in use!");
                    }

                    console.error("Signup error:", error.message);
                    return alert("An error occurred. Please try again.");
                }

                alert("Something went wrong. Please try again later.");
            });
    }




    return (

        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* Left section with background */}
            <div className="lg:flex lg:w-1/2 hidden relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/qweqwe.jpg')`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative z-10 flex items-center justify-center w-full">
                    <h1 className="text-4xl  text-white">Join StoryLine.</h1>
                </div>
            </div>

            <div className=' lg:hidden lg:w-1/2 relative h-[180px] items-center flex'> 
                    <div className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/qweqwe.jpg')`,
                    }}>
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-full">
                    <h1 className="text-4xl  text-white">Join StoryLine.</h1>
                </div>
            </div>

            {/* Right section with form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 items-center">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-8">Sign up to StoryLine.</h2>

                    <form onSubmit={createUserAccount} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full"
                            />
                            <p className="text-xs text-gray-500">
                                Password should be at least 15 characters OR at least 8 characters including a number and a lowercase
                                letter.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">
                                Username
                            </label>
                            <Input
                                id="username"
                                type="text"
                                required
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full"
                            />
                            <p className="text-xs text-gray-500">
                                Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a
                                hyphen.
                            </p>
                        </div>

                        <Button type="submit" className="w-full bg-[#353535] hover:bg-[#454545] text-white">
                            Continue →
                        </Button>

                        <p className="text-xs text-gray-500 mt-6">
                            By creating an account, you agree to the <a href="/terms-and-conditions" className='underline'>Terms of Service.</a>  For more information about StoryLines.'s privacy
                            practices, see the <a href="/privacy-policy" className='underline'>StoryLine Privacy Statement.</a>  We'll occasionally send you account-related emails.
                        </p>
                    </form>


                </div>
            </div>
        </div>


    )
}

export default page