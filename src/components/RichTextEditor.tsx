"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

// Import styles for Tiptap
import "tiptap/core/style.css";

const RichTextEditor = ({ content, setContent }: { content: string, setContent: (value: string) => void }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML()); // Save content as HTML
        },
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content); // Update editor content when prop changes
        }
    }, [content, editor]);

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div className="border rounded p-3 bg-white">
            {/* Formatting Toolbar */}
            <div className="mb-2 flex space-x-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">Bold</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">Italic</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded">H2</button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} className="p-2 border rounded min-h-[200px]" />
        </div>
    );
};

export default RichTextEditor;
