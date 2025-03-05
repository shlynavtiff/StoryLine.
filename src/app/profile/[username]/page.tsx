"use client"

import type React from "react"
import { useState, useEffect, } from "react"
import Image from "next/image"
import { IoIosMore } from "react-icons/io"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { createClient } from "@/utils/supabase/client"
import toast from "react-hot-toast"

const ProfilePage = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("Home")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [bio, setBio] = useState<string>("")
  const [newBio, setNewBio] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [authUserId, setAuthUserId] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProfile() {
      console.log("Fetching profile for username:", username);
      const supabase = createClient();
      const { data: user, error: authError } = await supabase.auth.getUser();
      if (authError || !user?.user) {
        console.log("User not authenticated", authError);
        return;
      }
      console.log("Authenticated user ID:", user.user.id);
      setAuthUserId(user.user.id);

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("id, username, avatar_url, bio")
        .eq("username", username)
        .single();

      if (profileError || !profileData) {
        console.error("User not found or error fetching profile:", profileError);
        setUserNotFound(true);
        return;
      }

      console.log("Profile data fetched:", profileData);
      setProfile(profileData);
      setIsOwner(user.user.id === profileData?.id);
      setImageUrl(profileData?.avatar_url);
      setBio(profileData?.bio || "");
      setUserNotFound(false);
    }

    if (username) fetchProfile();
  }, [username]);

  const handleBioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwner || !profile?.id) return;
    setSaving(true);

    console.log("Updating bio for user ID:", profile.id);
    const supabase = createClient();
    const { error } = await supabase
      .from("user_profiles")
      .update({ bio: newBio })
      .eq("id", profile.id);

    if (error) {
      console.error("Error updating bio:", error);
      toast.error("Error updating bio");
    } else {
      setBio(newBio);
      toast.success("Bio updated successfully");
      setIsEditingBio(false);
    }
    setSaving(false);
  };

  return (
    <>
      <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[1280px] mx-auto px-6">
        {userNotFound ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-800">User not found</h2>
            <p className="text-gray-600">The profile you are looking for does not exist.</p>
          </div>
        ) : (
          <>
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
                <p className="text-[24px] font-semibold ml-4">{username || "null"}</p>
              </div>
              <div>
                <IoIosMore />
              </div>
            </div>

            <div className="flex space-x-6 border-b border-gray-300 mb-8">
              {["Home", "About", "Reads"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-medium ${activeTab === tab ? "text-gray-800 border-b-2 border-black" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <main className="flex-grow bg-white rounded-lg p-6">
            {activeTab === "Home" && (
            <section>
              <h3 className="text-lg font-medium text-gray-800 mb-4">No posts yet.</h3>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                <p className="text-gray-500">No stories yet.</p>
              </div>
            </section>
          )}

          {activeTab === "Reads" && (
            <section>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Reading list</h3>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                <p className="text-gray-500">No stories</p>
              </div>
            </section>
          )}

            {activeTab === "About" && (
            <section className="flex items-center justify-center flex-col gap-2">
              <div className="w-full max-w-md">
                {!isEditingBio && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-800">{bio ? (
                        <p>Bio</p>
                      ) : (
                        <p>Tell the world about yourself.</p>
                      )}</h4>
                      {isOwner && (
                        <button onClick={() => setIsEditingBio(true)} className="text-sm text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-wrap">{bio || "You can tell more about yourself here, including your background, professional background, achievements, hobbies, aspirations, and more. To make your bio more unique."}
                    </p>
                  </div>
                )}

                {isEditingBio && isOwner && (
                  <form onSubmit={handleBioSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="mb-4">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Your Bio</label>
                      <textarea
                        id="bio"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="w-full min-h-[150px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button type="button" onClick={() => setIsEditingBio(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100" disabled={saving}>Cancel</button>
                      <button type="submit" className="px-4 py-2 text-sm bg-[#242424] rounded-full text-white hover:bg-[#414141] disabled:opacity-50" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          )}
            </main>
          </>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
