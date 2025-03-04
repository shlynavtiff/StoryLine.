

import React from 'react'
import HeaderSignin from "@/components/HeaderSignin";
import Footer from "@/components/Footer";
import ClientComponent from './(auth)/authComp/ClientComponent';
import Logout from './(auth)/authComp/Logout';
// import UserGreetText from "@/components/UserGreetText";
// import LoginLogoutButton from "@/components/LoginLogoutButton";

const page = () => {
  return (
    <div className="flex flex-col bg-hero-bg justify-between min-h-screen">

      {/* Main Content */}
      <div className="flex flex-col gap-4 px-4 items-center justify-center h-[100dvh]">
        <div className="min-w-[280px] text-center">
          <h1 className="font-semibold text-6xl sm:text-7xl">
            Headlines, Stories & Ideas.
          </h1>
        </div>
        <div className="text-lg">
          <ClientComponent/>
          <Logout/>
          A place to read, write, and deepen your understanding.
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Buttons */}
          <button className="bg-[#242424] py-3 px-6 rounded-full text-white border-[1px] border-[#414141] hover:bg-[#414141] max-w-[150px]">
            Start reading
          </button>
          <button className="bg-[#242424] py-3 px-6 rounded-full text-white border-[1px] border-[#414141] hover:bg-[#414141] hidden md:block">
            Our story
          </button>
          {/* Login/Logout and Greet */}
          {/* <LoginLogoutButton />
          <UserGreetText /> */}
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default page