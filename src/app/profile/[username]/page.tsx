"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosMore } from "react-icons/io";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";


const ProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "Home";

  const { username } = useParams();
  const [activeTab, setActiveTab] = useState(tab);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchProfileAndPosts = async () => {
      setLoading(true);

      // Fetch authenticated user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        console.log("User not authenticated", authError);
        setLoading(false);
        return;
      }
      console.log("Authenticated User ID:", authData.user.id);
      setAuthUserId(authData.user.id);

      // Fetch profile by username
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("id, username, avatar_url, bio")
        .eq("username", username)
        .single();

      if (profileError || !profileData) {
        console.error("User not found or error fetching profile:", profileError);
        setUserNotFound(true);
        setLoading(false);
        return;
      }

      console.log("Fetched Profile Data:", profileData);

      setProfile(profileData);
      setIsOwner(authData.user.id === profileData?.id);
      setImageUrl(profileData?.avatar_url);
      setBio(profileData?.bio || "");
      setUserNotFound(false);

      // Fetch posts for the specific user and JOIN with user_profiles for debugging
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")  // Fetch all columns for debugging
        .eq("user_id", profileData.id)
        .order("created_at", { ascending: false });

      console.log("Fetched posts data:", postsData);


      console.log("Raw post data response:", postsData, "Error:", postsError);
      console.log(postsData);

      if (postsError) {
        console.error("Error fetching posts:", postsError);
      } else {
        if (postsData.length === 0) {
          console.warn("No posts found for this user.");
        } else {
          console.log("Fetched Posts:", postsData);
        }
        setPosts(postsData);
      }

      setLoading(false);
    };

    fetchProfileAndPosts();

    const subscription = supabase
      .channel("posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, fetchProfileAndPosts)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [username]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    router.push(`/profile/${username}?tab=${tabName}`, { scroll: false });
  };

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);



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

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags and trim spaces
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
              {["Home", "About", "Library"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`pb-2 text-sm font-medium ${activeTab === tab ? "text-gray-800 border-b-2 border-black" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <main className="flex-grow bg-white rounded-lg p-6">
              {activeTab === "Home" && (
                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Latest Posts</h3>

                  {loading ? (
                    <p className="text-gray-500">Loading posts...</p>
                  ) : posts.length === 0 ? (
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                      <p className="text-gray-500">No stories yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
  {posts.map((post) => {
    const cleanContent = stripHtml(post.content); // Remove all HTML tags
    return (
      <div key={post.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
        <h4 className="text-xl font-semibold">{post.title}</h4>
        <p className="text-gray-700">
          {cleanContent.length > 100 ? cleanContent.substring(0, 100) + "..." : cleanContent}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Posted on {new Date(post.created_at).toLocaleDateString()}
        </p>
      </div>
    );
  })}
</div>


                  )}
                </section>
              )}

              {activeTab === "Library" && (
                <section>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Library</h3>
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                    <p className="text-gray-500">No saved stories yet.</p>
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
