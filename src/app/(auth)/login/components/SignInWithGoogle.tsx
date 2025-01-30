'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from "../../../../lib/auth-actions"

const SignInWithGoogle = () => {
    return (
        <Button onClick={() => {signInWithGoogle()}} variant="outline" className="w-full rounded-full font-normal"
            type='button'

        >
            Sign in with Google
        </Button>
    )
}

export default SignInWithGoogle