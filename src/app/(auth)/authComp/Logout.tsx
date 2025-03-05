"use client";

import React, { useState } from "react";
import { signOut } from "../../../../actions/auth";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    await signOut();

    setLoading(false);

    console.log("Signed out");
  };

  return (
    <div className=" text-black text-sm  rounded-md cursor-pointer">
      <form onSubmit={handleLogout}>
        <button type="submit" disabled={loading}>
          {loading ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </div>
  );
};

export default Logout;
