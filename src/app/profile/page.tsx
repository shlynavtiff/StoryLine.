"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { IoIosMore } from "react-icons/io"
import Header from "@/components/Header"
import { createClient } from "@/utils/supabase/client"
import toast from "react-hot-toast"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Home")
  const [userId, setUserId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("")
  const [newUsername, setNewUsername] = useState<string>("")
  const [bio, setBio] = useState<string>("")
  const [newBio, setNewBio] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [isEditingBio, setIsEditingBio] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.log("User not authenticated")
        return
      }

      setUserId(data.user.id)
      console.log("User ID:", data.user.id) // Debugging

      // Fetch the existing profile image
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
        return
      }

      if (profile?.avatar_url) {
        setImageUrl(profile.avatar_url)
        console.log("Existing Avatar URL:", profile.avatar_url) // Debugging
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    async function fetchUsername() {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.log("User not authenticated", error)
        return
      }

      setUserId(data.user.id)

      // Fetch username
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
        return
      }

      if (profile?.username) {
        setUsername(profile.username)
        setNewUsername(profile.username)
        console.log("Existing Username:", profile.username)
      }
    }

    fetchUsername()
  }, [])

  useEffect(() => {
    async function fetchUserBio() {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        console.log("User not authenticated", error)
        return
      }

      setUserId(data.user.id)

      // Fetch username
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("bio")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching profile:", profileError)
        return
      }

      if (profile?.bio) {
        setBio(profile.bio)
        setNewBio(profile.bio)
        console.log("User Bio:", profile.bio)
      }
    }

    fetchUserBio()
  }, [])

  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return
    setSaving(true)

    const supabase = createClient()
    const { error } = await supabase.from("user_profiles").update({ bio: newBio }).eq("id", userId)

    if (error) {
      console.error("Error updating bio:", error)
      toast.error("Error updating bio")
    } else {
      setBio(newBio)
      toast.success("Bio updated successfully")
      setIsEditingBio(false)
    }
    setSaving(false)
  }

  return (
    <>
      <Header />

      <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[1280px] mx-auto px-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-row items-center">
            {imageUrl ? (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Profile Picture"
                className="rounded-full"
                width={66}
                height={66}
              />
            ) : (
              <div className="w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center">+</div>
            )}

            {username ? (
              <p className="text-[24px] font-semibold ml-4">{username}</p>
            ) : (
              <p className="text-[24px] font-semibold ml-4">null</p>
            )}
          </div>

          <div>
            <IoIosMore />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-8">
          {["Home", "About"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${activeTab === tab ? "text-gray-800 border-b-2 border-black" : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Profile Section */}
        <main className="flex-grow bg-white rounded-lg p-6">
          {/* Content Based on Active Tab */}
          {activeTab === "Home" && (
            <section>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Reading list</h3>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                <p className="text-gray-500">No stories</p>
              </div>
            </section>
          )}

          {activeTab === "About" && (
            <section className="flex items-center justify-center flex-col gap-2">

              {/* {
                bio ? (
                  <p>{bio}</p>
                ) : (
                  <div  className="flex items-center justify-center flex-col gap-2">
                    <h3 className="text-lg font-medium text-gray-800">Tell the world about yourself.</h3>
                    <div className="max-w-md">
                      <p className="text-gray-600 text-center mb-4">
                        You can tell more about yourself here, including your background, professional background,
                        achievements, hobbies, aspirations, and more. To make your bio more unique.
                      </p>
                    </div>
                  </div>

                )
              } */}

              {/* Bio Display and Edit Form */}
              <div className="w-full max-w-md">
                {!isEditingBio && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">{bio ? (
                        <p>Bio</p>
                      ) : (
                        <p>Tell the world about yourself.</p>
                      )}</h4>
                      <button
                        onClick={() => setIsEditingBio(true)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{bio || "No bio yet. Click edit to add one. You can tell more about yourself here, including your background, professional background, achievements, hobbies, aspirations, and more. To make your bio more unique."}</p>
                  </div>
                )}

                {isEditingBio && (
                  <form onSubmit={handleBioSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="mb-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Bio
                      </label>
                      <textarea
                        id="bio"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Write a short bio to tell people about yourself, your interests, and experience.
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingBio(false)
                          setNewBio(bio)
                        }}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm bg-[#242424] rounded-full text-white hover:bg-[#414141] disabled:opacity-50"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {!isEditingBio && !bio && (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="mt-4 bg-[#242424] text-sm py-2 px-4 rounded-full cursor-pointer text-white border-[1px] border-[#414141] hover:bg-[#414141]"
                >
                  Get started
                </button>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  )
}

export default ProfilePage

