'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from '@/lib/auth-actions'

export const LoginForm = () => {

    return (
        <form className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                    Email
                </label>
                <Input
                    id="email"
                    name='email'
                    type="email"
                    required
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                    Password
                </label>
                <Input
                    id="password"
                    name='password'
                    type="password"
                    required
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
                    // value={Username}
                    // onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                />
                <p className="text-xs text-gray-500">
                    Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a
                    hyphen.
                </p>
            </div>

            <Button type="submit" formAction={login} className="w-full bg-[#353535] hover:bg-[#454545] text-white">
                Continue →
            </Button>

            <p className="text-xs text-gray-500 mt-6">
                By creating an account, you agree to the <a href="/terms-and-conditions" className='underline'>Terms of Service.</a> For more information about StoryLine's privacy practices, see the <a href="/privacy-policy" className='underline'>StoryLine Privacy Statement.</a> We'll occasionally send you account-related emails.
            </p>
        </form>
    )
}
