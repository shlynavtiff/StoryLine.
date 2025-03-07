"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import { EditorProvider } from '../context/EditorContext'
import { useState } from "react"
import {Bold, Italic, Underline, Strikethrough, Quote, List, ListOrdered, Indent, Outdent, Link, AlignLeft, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Tiptap from "@/components/TipTap"
import StarterKit from '@tiptap/starter-kit'
export default function TextEditor() {
  const [title, setTitle] = useState("")
  const [fontStyle, setFontStyle] = useState("Normal")
  const [fontFamily, setFontFamily] = useState("Sans Serif")
  const [fontSize, setFontSize] = useState("Normal")

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
  })

  

  return (
    <EditorProvider value={editor}>
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-background rounded-md shadow-sm border">
      {/* <Input
        type="text"
        placeholder="title"
        className="border-0 rounded-t-md focus-visible:ring-0 text-lg px-4 py-3 h-auto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Select defaultValue="Personal">
        <SelectTrigger className="border-0 border-y border-y-border focus:ring-0 rounded-none">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Personal">Personal</SelectItem>
          <SelectItem value="Work">Work</SelectItem>
          <SelectItem value="Ideas">Ideas</SelectItem>
          <SelectItem value="Tasks">Tasks</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/40">
        <TooltipProvider delayDuration={300}>
          <div className="flex items-center mr-2">
            <Select defaultValue="Normal" onValueChange={setFontStyle}>
              <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-24">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Heading1">Heading 1</SelectItem>
                <SelectItem value="Heading2">Heading 2</SelectItem>
                <SelectItem value="Heading3">Heading 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center mr-2">
            <Select defaultValue="Sans Serif" onValueChange={setFontFamily}>
              <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-28">
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sans Serif">Sans Serif</SelectItem>
                <SelectItem value="Serif">Serif</SelectItem>
                <SelectItem value="Monospace">Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center mr-2">
            <Select defaultValue="Normal" onValueChange={setFontSize}>
              <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-24">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
                <SelectItem value="Huge">Huge</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                <Bold className="h-4 w-4" />
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Italic className="h-4 w-4" />
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Underline className="h-4 w-4" />
                <span className="sr-only">Underline</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Strikethrough className="h-4 w-4" />
                <span className="sr-only">Strikethrough</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Quote className="h-4 w-4" />
                <span className="sr-only">Quote</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0" >
                <List className="h-4 w-4" />
                <span className="sr-only">Bullet List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Numbered List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Indent className="h-4 w-4" />
                <span className="sr-only">Indent</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Indent</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Outdent className="h-4 w-4" />
                <span className="sr-only">Outdent</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Outdent</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Link className="h-4 w-4" />
                <span className="sr-only">Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <span className="font-bold text-xs">A</span>
                <span className="sr-only">Text Color</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Text Color</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <span className="font-bold text-xs bg-yellow-200 px-1">A</span>
                <span className="sr-only">Highlight</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Highlight</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <AlignLeft className="h-4 w-4" />
                <span className="sr-only">Align</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear Formatting</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear Formatting</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div> */}

      <Tiptap />
    </div>
    </EditorProvider>
  )
}