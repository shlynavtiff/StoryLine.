"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const Page = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.log("User not authenticated");
        return;
      }

      setUserId(data.user.id);

      // Fetch the existing profile image
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", data.user.id)
        .single();

      if (profile?.avatar_url) {
        setImageUrl(profile.avatar_url);
      }
    }

    console.log(userId);

    fetchUser();
  }, []);

  console.log(userId);
  console.log("Public URL:", imageUrl);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}.${fileExt}`;

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL of uploaded image
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatarUrl = urlData.publicUrl;

      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId as unknown as string); // Ensure the correct type



      if (updateError) {
        throw updateError;
      }

      console.log("Profile updated with avatar:", avatarUrl);
      setImageUrl(avatarUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  console.log("Generated Public URL:", imageUrl);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-semibold mb-4">Upload Profile Picture</h1>

      <div className="relative w-90 h-90">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            width={96}
            height={96}
            className=" object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            +
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
        id="fileInput"
      />

      <label
        htmlFor="fileInput"
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </label>
    </div>
  );
};

export default Page;
