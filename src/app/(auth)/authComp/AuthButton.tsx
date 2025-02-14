import { Button } from "@/components/ui/button";
import React from "react";

const AuthButton = ({
  type,
  loading,
}: {
  type: "login" | "Sign up" | "Reset Password" | "Forgot Password";
  loading: boolean;
}) => {
  return (
    <Button
      disabled={loading}
      type="submit"
      className="w-full bg-[#353535] hover:bg-[#454545] text-white"
    >
      {loading ? "Loading..." : type === "Forgot Password" ? "Send password reset email" : type}
    </Button>
  );
};

export default AuthButton;
