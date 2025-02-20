'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { signIn } from "../../../../actions/auth";
import { toast } from "react-hot-toast";

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
        const result = await signIn(formData)
    
        if (result.status === "success"){
          toast.success("You are now logged in, redirecting you to your dashboard");
          router.push("/private");
        } else {
          setError(result.status);
          toast.error("Something went wrong. Please try again.");
        }

    setLoading(false);
  };


    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* add toast */}

            <Button type="submit" className="w-full bg-[#353535] hover:bg-[#454545] text-white">
                Continue →
            </Button>

            <p className="text-xs text-gray-500 mt-6">
                By creating an account, you agree to the <a href="/terms-and-conditions" className='underline'>Terms of Service.</a> For more information about StoryLine's privacy practices, see the <a href="/privacy-policy" className='underline'>StoryLine Privacy Statement.</a> We'll occasionally send you account-related emails.
            </p>
        </form>
    )
}
