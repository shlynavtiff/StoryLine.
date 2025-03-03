"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import UsernameForm from "./usernameForm"

interface UsernameChangeModalProps {
  currentUsername: string
  onSubmit: (username: string) => Promise<void>
}

export default function UsernameChangeModal({
  currentUsername = "@shylnav.tiff",
  onSubmit = async () => {},
}: UsernameChangeModalProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (username: string) => {
    await onSubmit(username)
    // Close the modal after successful submission
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row justify-between items-center max-w-[550px] text-[15px] cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
          <h2>Username</h2>
          <p>{currentUsername}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <UsernameForm currentUsername={currentUsername} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}

