"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UsernameFormProps {
  currentUsername: string
  onSubmit: (username: string) => Promise<void>
}

export default function UsernameForm({
  currentUsername = "@shylnav.tiff",
  onSubmit = async () => {},
}: UsernameFormProps) {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset states
    setError(null)
    setSuccess(null)

    // Basic validation
    if (!username) {
      setError("Username cannot be empty")
      return
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long")
      return
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
      setError("Username can only contain letters, numbers, periods, underscores, and hyphens")
      return
    }

    try {
      setIsLoading(true)
      await onSubmit(username)
      setSuccess("Username updated successfully")
      setUsername("")
    } catch (err) {
      setError("Failed to update username. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Change Username</CardTitle>
        <CardDescription>Update your username that will be visible to others</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-username">Current Username</Label>
            <Input id="current-username" value={currentUsername} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-username">New Username</Label>
            <div className="flex items-center">
              <span className="mr-1 text-muted-foreground">@</span>
              <Input
                id="new-username"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Username can contain letters, numbers, periods, underscores, and hyphens.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 py-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Username"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Note: Changing your username will also change your profile URL.
      </CardFooter>
    </Card>
  )
}

