"use client"
import { useEditor } from '@tiptap/react'
import { EditorProvider } from '../context/EditorContext'
import Tiptap from "@/components/TipTap"
import StarterKit from '@tiptap/starter-kit'
export default function TextEditor() {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello sdasdWorld!</p>',
  })

  return (
    <EditorProvider value={editor}>
      <div className="flex flex-col w-full max-w-3xl mx-auto bg-background rounded-md shadow-sm border">
        <Tiptap />
      </div>
    </EditorProvider>
  )
}