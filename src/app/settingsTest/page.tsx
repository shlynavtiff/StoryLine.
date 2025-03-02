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
      console.log("User ID:", data.user.id); // Debugging

      // Fetch the existing profile image
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("avatar_url")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      if (profile?.avatar_url) {
        setImageUrl(profile.avatar_url);
        console.log("Existing Avatar URL:", profile.avatar_url); // Debugging
      }
    }

    fetchUser();
  }, []);

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
    const filePath = `avatars/${userId}.${fileExt}`;
  
    try {
      // 🛑 First, delete any existing avatar to prevent duplicate uploads
      await supabase.storage.from("avatars").remove([filePath]);
  
      // ✅ Upload the new file
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
  
      if (uploadError) throw uploadError;
  
      // ✅ Get the new public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const avatarUrl = `${data.publicUrl}?timestamp=${Date.now()}`; // Force refresh
  
      console.log("Generated Public URL:", avatarUrl);
  
      // ✅ Update database with new avatar URL
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ avatar_url: avatarUrl })
        .eq("id", userId);
  
      if (updateError) throw updateError;
  
      console.log("Profile updated successfully!");
      setImageUrl(avatarUrl); // Update state with the new image
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      event.target.value = ""; // Reset file input
    }
  };
  

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-semibold mb-4">Upload Profile Picture</h1>

      <div className="relative w-24 h-24">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full object-cover w-24 h-24" // Tailwind CSS for fixed size
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
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:bg-blue-300"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </label>
    </div>
  );
};

export default Page;