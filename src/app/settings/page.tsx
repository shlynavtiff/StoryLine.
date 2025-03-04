"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { IoIosMore } from "react-icons/io"
import { createClient } from "@/utils/supabase/client"
import Header from "@/components/Header"
import { ArrowUpRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "react-hot-toast"

const Page = () => {
  const [activeTab, setActiveTab] = useState("Account")
  const [userId, setUserId] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [username, setUsername] = useState<string>("")

  const [newUsername, setNewUsername] = useState<string>("")
  const [showUsernameForm, setShowUsernameForm] = useState(false)

  const [email, setEmail] = useState<string | null>(null);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserProfile() {
      const supabase = createClient();
      
      const { data: profileData, error: authError } = await supabase.auth.getUser();
      if (authError || !profileData?.user) {
        console.log("User not authenticated", authError);
        return;
      }
  
      // Fetch additional profile details (username, avatar, etc.)
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("username, avatar_url, email")
        .eq("id", profileData.user.id)
        .single();
  
      if (profileError || !profile) {
        console.error("Error fetching profile:", profileError);
        setUserNotFound(true);
        return;
      }

      setUserId(profileData.user.id);
      setEmail(profileData.user.email ?? null);
      setImageUrl(profile?.avatar_url);
      setUsername(profile.username);
      setNewUsername(profile.username);
    }
    fetchUserProfile();
  }, []);
  
  const handleUsernameChange = async () => {
    if (!userId || newUsername.trim() === "") {
      console.error("Username cannot be empty")
      toast.error("Username cannot be empty")
      return
    }

    setUploading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("user_profiles").update({ username: newUsername }).eq("id", userId)

      if (error) throw error

      setUsername(newUsername)
      setShowUsernameForm(false)
      toast.success("Username updated successfully")
    } catch (error) {
      console.error("Error updating username:", error)
      toast.error("Failed to update username. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId) {
      console.error("User not logged in")
      return
    }

    const file = event.target.files?.[0]
    if (!file) {
      console.error("No file selected")
      return
    }

    setUploading(true)
    const supabase = createClient()
    const fileExt = file.name.split(".").pop()
    const filePath = `avatars/${userId}.${fileExt}`

    try {
      
      await supabase.storage.from("avatars").remove([filePath])

      
      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)
      const avatarUrl = `${data.publicUrl}?timestamp=${Date.now()}` // Force refresh

      console.log("Generated Public URL:", avatarUrl)

      
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId)

      if (updateError) throw updateError

      console.log("Profile updated successfully!")
      setImageUrl(avatarUrl) // Update state with the new image
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
      event.target.value = "" // Reset file input
    }
  }

  return (
    <>
      <div className="min-h-dvh justify-between bg-gray-50 flex flex-col py-6 max-w-[600px] mx-auto px-6 ">
        <div className="flex flex-row items-center justify-between mb-4">
          <p className="text-[35px] sm:text-[40px] font-semibold">Settings</p>
          <IoIosMore />
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-8">
          {["Account", "Publishing", "Notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab ? "text-gray-800 border-b-2 border-black" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Profile Section */}
        <main className="flex-grow rounded-lg p-4">
          {/* Account Tab */}
          {activeTab === "Account" && (
            <section className="flex flex-col gap-3 justify-center mx-auto">
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <h2 className="text-[15px]">Email address</h2>
                <p className="sm:text-[15px] text-[12px]">{email || "No email available"}</p>
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] text-[15px] cursor-pointer">
                <h2>Username</h2>
                {!showUsernameForm ? (
                  <div className="flex items-center gap-2" onClick={() => setShowUsernameForm(true)}>
                    <p>@{username}</p>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={handleUsernameChange}
                      disabled={uploading}
                      className="bg-black text-white rounded px-2 py-1 text-sm"
                    >
                      {uploading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setShowUsernameForm(false)
                        setNewUsername(username)
                      }}
                      className="text-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Image Upload Section */}
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div>
                  <h2 className="text-[15px]">Profile information</h2>
                  <p className="text-[9px] max-w-[150px]">Edit your photo, name, pronouns, short bio, etc.</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="hidden"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer">
                    {imageUrl ? (
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt="Profile"
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center">
                        +
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <h2 className="text-[15px]">Muted writers and publications</h2>
                <ArrowUpRight size={20} />
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <h2 className="text-[15px]">Blocked users</h2>
                <ArrowUpRight size={20} />
              </div>
            </section>
          )}

          {/* Publishing Tab */}
          {activeTab === "Publishing" && (
            <section className="flex flex-col gap-4">
              <h2 className="text-[20px]">Manage publications</h2>
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div>
                  <h3 className="text-[15px]">Allow readers to leave private notes on your stories</h3>
                  <p className="text-[9px]">
                    Private notes are visible to you and (if left in a publication) all Editors of the publication.
                  </p>
                </div>
                <Checkbox />
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div>
                  <h3 className="text-[15px]">Allow email replies</h3>
                  <p className="text-[9px]">Let readers reply to your stories directly from their email.</p>
                </div>
                <Checkbox />
              </div>
            </section>
          )}

          {/* Notifications Tab */}
          {activeTab === "Notifications" && (
            <section className="flex flex-col gap-4">
              <h2 className="text-[20px]">Email notifications</h2>
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div className="text-[15px]">When someone follows you or highlights the same passage in a story</div>
                <Checkbox />
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div className="text-[15px]">When someone mentions you in their story</div>
                <Checkbox />
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  )
}

export default Page

