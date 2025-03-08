"use client"

import { useState, useEffect, useRef } from "react"
import { BsPencilSquare } from "react-icons/bs"
import { IoNotificationsOutline } from "react-icons/io5"
import { createClient } from "../utils/supabase/client"
import Image from "next/image"
import type { User } from "@supabase/supabase-js"
import HeaderSignin from "./HeaderSignin"
import testimage from "../app/assets/wasd.jpg"
import Link from "next/link"
import { CiSettings, CiUser, CiBookmark, CiViewList, CiCircleQuestion, CiLogout } from "react-icons/ci"
import { RiBuilding2Line } from "react-icons/ri"
import Logout from "@/app/(auth)/authComp/Logout"
import { signOut } from "../../actions/auth"


const DynamicHeader = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        setUser(null)
        return
      }
      setUser(data.user)
      fetchProfile(data.user.id)
    }

    async function fetchProfile(userId: string) {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("avatar_url, username")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error fetching profile:", error)
        return
      }

      if (profile) {
        setAvatarUrl(profile.avatar_url)
        setUsername(profile.username)
      }
    }

    fetchUser()

    // Listen for auth and user profile updates
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id) // Refresh profile on auth change
      } else {
        setUser(null)
        setAvatarUrl(null)
        setUsername(null)
      }
    })

    // Listen for avatar updates in `user_profiles`
    const channel = supabase
      .channel("user-profile-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "user_profiles", filter: `id=eq.${user?.id}` },
        (payload) => {
          if (payload.new.avatar_url) {
            setAvatarUrl(payload.new.avatar_url) // Update avatar dynamically
          }
        },
      )
      .subscribe()

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      authListener.subscription.unsubscribe()
      supabase.removeChannel(channel)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [user?.id])

  const handleLogout = async (event: React.FormEvent) => {
      event.preventDefault();
      setLoading(true);
  
      await signOut();
  
      setLoading(false);
  
      console.log("Signed out");
    };

  if (!user) {
    return <HeaderSignin />
  }

  return (
    <div className="flex flex-row gap-5 items-center justify-between max-w-[1500px] mx-auto w-full p-6">
      <div className="text-2xl ">
        <a href="/">StoryLine.</a>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div className="hidden md:block">
          <div className="flex flex-row items-start cursor-pointer">
            <BsPencilSquare size={20} />
            <Link href={"/publish"} className="ml-2 text-sm ">
              Write
            </Link>
          </div>
        </div>
        <Link href={`/notifications`} passHref>
          <div className="cursor-pointer">
            <IoNotificationsOutline size={24} />
          </div>
        </Link>

        {/* Profile with dropdown */}
        <div className="relative">
          <div
            ref={profileRef}
            className="cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseEnter={() => setShowDropdown(true)}
            aria-expanded={showDropdown}
            aria-haspopup="true"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt="User Profile"
                className="w-[32px] h-[32px] rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src={testimage || "/placeholder.svg"}
                alt="User Profile"
                className="w-[32px] h-[32px] rounded-full"
                width={32}
                height={32}
              />
            )}
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="py-1" role="none">
                <Link
                  href="/publish"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <BsPencilSquare className="mr-3" size={18} />
                  Write
                </Link>
                <Link
                  href={`/profile/${username || ""}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <CiUser className="mr-3" size={18} />
                  Profile
                </Link>
                <Link
                  href="/library"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <CiBookmark className="mr-3" size={18} />
                  Library
                </Link>
                <Link
                  href="/stories"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <CiViewList className="mr-3" size={18} />
                  Stories
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <CiSettings className="mr-3" size={18} />
                  Settings
                </Link>
                <Link
                  href="/publications"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <RiBuilding2Line className="mr-3" size={18} />
                  Manage Publications
                </Link>
                <Link
                  href="/help"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <CiCircleQuestion className="mr-3" size={18} />
                  Help
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem">
                  <CiLogout className="mr-3" size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DynamicHeader

