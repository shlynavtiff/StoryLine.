'use client'

import React, { FormEvent, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
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
    <form onSubmit={createUserAccount}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Username"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Repeat Password"
        value={repPassword}
        onChange={(e) => setRepPassword(e.target.value)}
      />
      <button>
        {isLoading ? "loading.."  : "Sign Up"}
      </button>

      </form>
  )
}

export default page