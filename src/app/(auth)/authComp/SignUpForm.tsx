"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "../../../../actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await signUp(formData)

    if (result.status === "success") {
      router.push("/")
    } else {
      setError(result.status)
    }

    setLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-md font-medium">
            Email
          </label>
          <Input id="email" name="email" type="email" required className="w-full" />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-md font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Password should be at least 15 characters OR at least 8 characters including a number and a lowercase
            letter.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-md font-medium">
            Username
          </label>
          <Input id="username" name="username" type="text" required className="w-full" />
          <p className="text-xs text-gray-500">
            Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
          </p>
        </div>

        {/* add toast */}

        <Button type="submit" className="w-full bg-[#353535] hover:bg-[#454545] text-white">
          Continue →
        </Button>

        <p className="text-xs text-gray-500 mt-6">
          By creating an account, you agree to the{" "}
          <a href="/terms-and-conditions" className="underline">
            Terms of Service.
          </a>{" "}
          For more information about StoryLine's privacy practices, see the{" "}
          <a href="/privacy-policy" className="underline">
            StoryLine Privacy Statement.
          </a>{" "}
          We'll occasionally send you account-related emails.
        </p>
      </form>
    </div>
  )
}

export default SignUpForm

