"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { forgotPassword } from "../../../../actions/auth";

const ForgotPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await forgotPassword(formData);

    if (result.status === "success") {
      //add toast
      alert("Check your email for the reset link");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            id="Email"
            name="email"
            className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>

        <div>
        <p className='text-sm'>Enter your user account's verified email address and we will send you a password reset link.</p>
        </div>

        <div className="mt-4">
          <AuthButton type="Forgot Password" loading={loading} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
