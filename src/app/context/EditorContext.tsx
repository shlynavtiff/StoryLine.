// @/context/EditorContext.tsx
import { createContext, useContext } from 'react'
import { Editor } from '@tiptap/core'

const EditorContext = createContext<Editor | null>(null)

export const useEditorContext = () => useContext(EditorContext)

export const EditorProvider = EditorContext.Provider