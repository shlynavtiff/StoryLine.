"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { createClient } from "@/utils/supabase/client";
import Header from "@/components/Header";
import { ArrowUpRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const [userId, setUserId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.error("Error fetching user:", error);
        return;
      }

      setUserId(data.user.id);

      // Fetch current avatar
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        setImageUrl(profile.avatar_url);
      }
    };

    fetchUser();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}.${fileExt}`;

    try {
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL of the uploaded image
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const avatarUrl = data.publicUrl;

      // Update user profile
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      console.log("Profile updated with avatar:", avatarUrl);
      setImageUrl(avatarUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[600px] mx-auto px-6">
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
                activeTab === tab
                  ? "text-gray-800 border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Profile Section */}
        <main className="flex-grow bg-white rounded-lg">
          {/* Account Tab */}
          {activeTab === "Account" && (
            <section className="flex flex-col gap-3 justify-center mx-auto">
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <h2 className="text-[15px]">Email address</h2>
                <p className="sm:text-[15px] text-[12px]">shlynavtiff@gmail.com</p>
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] text-[15px] cursor-pointer">
                <h2>Username</h2>
                <p>@shylnav.tiff</p>
              </div>

              {/* Profile Image Upload Section */}
              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div>
                  <h2 className="text-[15px]">Profile information</h2>
                  <p className="text-[9px] max-w-[150px]">
                    Edit your photo, name, pronouns, short bio, etc.
                  </p>
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
                        src={imageUrl}
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
                  <h3 className="text-[15px]">
                    Allow readers to leave private notes on your stories
                  </h3>
                  <p className="text-[9px]">
                    Private notes are visible to you and (if left in a publication)
                    all Editors of the publication.
                  </p>
                </div>
                <Checkbox />
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div>
                  <h3 className="text-[15px]">Allow email replies</h3>
                  <p className="text-[9px]">
                    Let readers reply to your stories directly from their email.
                  </p>
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
                <div className="text-[15px]">
                  When someone follows you or highlights the same passage in a story
                </div>
                <Checkbox />
              </div>

              <div className="flex flex-row justify-between items-center max-w-[550px] cursor-pointer">
                <div className="text-[15px]">
                  When someone mentions you in their story
                </div>
                <Checkbox />
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default Page;