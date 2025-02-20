"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { FaGithub } from "react-icons/fa";
import { signInWithGithub } from "../../../../actions/auth";
import {toast } from "react-hot-toast"; 


const LoginGithub = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    toast.loading("Redirecting...");

    startTransition(async () => {
      try {
        await signInWithGithub();
      } catch (error) {
        toast.dismiss(); // Remove loading toast
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <Button
      onClick={handleGithubLogin}
      variant="outline" className="w-full rounded-full font-normal text-black"
    >
      {/* <FaGithub className="text-black" /> */}
      <p className="text-black">
        {isPending ? "Redirecting..." : "Sign in with GitHub"}
      </p>
    </Button>
  );
};

export default LoginGithub;
