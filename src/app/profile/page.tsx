'use client'

import React, { useState } from "react";
import Image from "next/image";
import testing from '../assets/wasd.jpg'
import { IoIosMore } from "react-icons/io";
import Header from "@/components/Header";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <>

      <Header />

      <div className="min-h-screen justify-between bg-gray-50 flex flex-col py-6 max-w-[1280px] mx-auto px-6">


        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex flex-row items-center">
            <Image src={testing} alt="tangina" className="h-[66px] w-[66px] rounded-full" />
            <p className="text-[24px] font-semibold ml-4">shlynav.tiff</p>
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
              className={`pb-2 text-sm font-medium ${activeTab === tab
                ? "text-gray-800 border-b-2 border-black"
                : "text-gray-500 hover:text-gray-800"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>



        {/* Main Profile Section */}
        <main className="flex-grow bg-white  rounded-lg p-6">

          {/* Content Based on Active Tab */}
          {activeTab === "Home" && (
            <section>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Reading list
              </h3>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 flex justify-center items-center">
                <p className="text-gray-500">No stories</p>
              </div>
            </section>
          )}

          {activeTab === "About" && (
            <section className="flex items-center justify-center flex-col gap-4">
              <h3 className="text-lg font-medium text-gray-800">Tell the world about yourself.</h3>
              <div className="max-w-md">
                <p className="text-gray-600 text-center">
                  You can tell more about yourself here, including your background, professional
                  background, achievements, hobbies, aspirations, and more. To make your bio more
                  unique.
                </p>
              </div>
              <button className="bg-[#242424] text-sm py-2 px-4 rounded-full cursor-pointer text-white border-[1px] border-[#414141] hover:bg-[#414141]">Get started</button>
            </section>
          )}

        </main>
      </div>

    </>


  );
};

export default ProfilePage;
