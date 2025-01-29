'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/navigation'

const page = () => {
  const [email, setEmail] = React.useState('')  
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  async function signIn(e: FormEvent) {
    console.log("signing in")
    e.preventDefault()


    setLoading(true)
    if (loading) {
        return
    }

    console.log("signing in")
    if (!email || !password) {
        setLoading(false)
        return alert("Please type something!")

    }

    try {
        const { data: session, error: signInError }: any = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) throw signInError;
        const user = session?.user;

        if (user?.email_confirmed_at === null) {
            setLoading(false)
            return alert("Please verify your email first!")
        } else {

            setLoading(false)
          router.push('/')

        }

    }
    catch (err: any) {
        console.log(err)
        if (err.status === 400) {
            alert('Invalid login credentials')
        } else if (err.status === 404) {
            alert('User not found')
        } else {
            alert('An unexpected error occurred')
        }
        setLoading(false)
    }
}

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

export default page