"use client"
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { useEditor, EditorContent } from '@tiptap/react'
import { Image } from '@tiptap/extension-image'
import { useState, useCallback } from "react"
import { Bold, Underline as UnderlineIcon, Italic as ItalicIcon, Strikethrough, Quote, List, ListOrdered, Indent as IndentIcon, Outdent, Link as LinkIcon, Trash2, Undo, Redo, CornerDownRight, Code, MessageSquareQuote, Image as ImageIcon, SquareSplitVertical} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import Highlight from '@tiptap/extension-highlight'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import CustomImage from "./CustomImage"
import OrderedList from '@tiptap/extension-ordered-list'
import HardBreak from '@tiptap/extension-hard-break'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Indent } from "./Indentation"; // Import your custom Indent extension

const Tiptap = () => {
    const [title, setTitle] = useState("")
    const [fontStyle, setFontStyle] = useState("Normal")
    const [fontFamily, setFontFamily] = useState("Sans Serif")
    const [fontSize, setFontSize] = useState("Normal")
    const lowlight = createLowlight(all)

    const [openModal, setOpenModal] = useState(false);
    const [maxWidth, setMaxWidth] = useState(800);
    const [maxHeight, setMaxHeight] = useState(600);



    const editor = useEditor({
        extensions: [
            StarterKit,
            BulletList,
            ListItem,
            Image,
            CodeBlockLowlight.configure({ lowlight, }),
            Highlight,
            Italic,
            Strike,
            Underline,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CustomImage,
            OrderedList,
            HardBreak,
            Indent.configure({
                types: ["listItem", "paragraph", "heading"], // Define applicable elements
                maxLevel: 4,
            }),
            Blockquote,
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },

            }),
            Typography,
            FontFamily,
            TextStyle,

        ],
        content: '<p>Tell your story. . . </p>',
    })

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url })
                .run()
        } catch (e) {
            if (e instanceof Error) {  // ✅ Ensure 'e' is of type Error
                alert(e.message);
            } else {
                alert('An unknown error occurred');
            }
        }
    }, [editor])


    const setHeading = (level: 1 | 2 | 3 ) => {
        if (!editor) return;
        editor?.chain().focus().toggleHeading({ level }).run();
    };

    const addImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const img = new window.Image();
                img.src = reader.result as string;

                img.onload = () => {
                    let { width, height } = img;

                    // Resize logic with user-selected values
                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;
                        if (width > height) {
                            width = maxWidth;
                            height = maxWidth / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = maxHeight * aspectRatio;
                        }
                    }

                    // Create a canvas for resizing
                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");

                    if (ctx) {
                        ctx.drawImage(img, 0, 0, width, height);
                        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.9);
                        editor?.chain().focus().setImage({ src: resizedBase64 }).run();
                    }
                };
            };
        };

        input.click();
    };


    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="flex flex-col w-full max-w-3xl mx-auto bg-background rounded-md shadow-sm border">
                <Input
                    type="text"
                    placeholder="Title"
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
                            <Select defaultValue="Normal" onValueChange={(value) => {
                                if (!editor) return;

                                if (value === "Normal") {
                                    editor.chain().focus().setParagraph().run();
                                } else if (value === "Heading1") {
                                    setHeading(1);
                                } else if (value === "Heading2") {
                                    setHeading(2);
                                } else if (value === "Heading3") {
                                    setHeading(3);
                                }
                            }}>
                                <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-24">
                                    <SelectValue placeholder="Style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Normal">Normal</SelectItem>
                                    <SelectItem value="Heading1" className={editor?.isActive('heading', { level: 1 }) ? 'bg-muted text-primary' : ''}>
                                        Heading 1
                                    </SelectItem>
                                    <SelectItem value="Heading2" className={editor?.isActive('heading', { level: 2 }) ? 'bg-muted text-primary' : ''}>
                                        Heading 2
                                    </SelectItem>
                                    <SelectItem value="Heading3" className={editor?.isActive('heading', { level: 3 }) ? 'bg-muted text-primary' : ''}>
                                        Heading 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                        </div>

                        <div className="flex items-center mr-2">
                            <Select
                                defaultValue="Outfit"
                                onValueChange={(value) => {
                                    if (!editor) return;

                                    // Apply the selected font
                                    if (value === "Outfit") {
                                        editor.chain().focus().unsetFontFamily().run();
                                    } else if (value === "Inter") {
                                        editor.chain().focus().setFontFamily("Inter").run();
                                    } else if (value === "serif") {
                                        editor.chain().focus().setFontFamily("serif").run();
                                    } else if (value === "monospace") {
                                        editor.chain().focus().setFontFamily("monospace").run();
                                    }
                                }}
                            >
                                <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-24">
                                    <SelectValue placeholder="Font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value="Outfit"
                                        className={editor?.isActive("textStyle", { fontFamily: "Outfit" }) ? "bg-muted text-primary" : ""}
                                    >
                                        Outfit
                                    </SelectItem>
                                    <SelectItem
                                        value="Inter"
                                        className={editor?.isActive("textStyle", { fontFamily: "Inter" }) ? "bg-muted text-primary" : ""}
                                    >
                                        Inter
                                    </SelectItem>
                                    <SelectItem
                                        value="serif"
                                        className={editor?.isActive("textStyle", { fontFamily: "serif" }) ? "bg-muted text-primary" : ""}
                                    >
                                        Serif
                                    </SelectItem>
                                    <SelectItem
                                        value="monospace"
                                        className={editor?.isActive("textStyle", { fontFamily: "monospace" }) ? "bg-muted text-primary" : ""}
                                    >
                                        Monospace
                                    </SelectItem>
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
                            <Select
                                value={editor.isActive({ textAlign: 'left' }) ? 'Left' :
                                    editor.isActive({ textAlign: 'center' }) ? 'Center' :
                                        editor.isActive({ textAlign: 'right' }) ? 'Right' :
                                            editor.isActive({ textAlign: 'justify' }) ? 'Justify' : 'Left'}
                                onValueChange={(value) => {
                                    editor.chain().focus().setTextAlign(value.toLowerCase()).run();
                                }}
                            >
                                <SelectTrigger className="h-8 gap-1 border-0 hover:bg-muted focus:ring-0 w-28">
                                    <SelectValue placeholder="Alignment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Left">Left</SelectItem>
                                    <SelectItem value="Center">Center</SelectItem>
                                    <SelectItem value="Right">Right</SelectItem>
                                    <SelectItem value="Justify">Justify</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBold().run()}
                                    className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'is-active' : ''}`}>
                                    <Bold className="h-4 w-4" />
                                    <span className="sr-only">Bold</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Bold</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleItalic().run()}
                                    className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'is-active' : ''}`}>
                                    <ItalicIcon className="h-4 w-4" />
                                    <span className="sr-only">Italic</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Italic</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                                    className={`h-8 w-8 p-0 ${editor.isActive('underline') ? 'is-active' : ''}`}>
                                    <UnderlineIcon className="h-4 w-4" />
                                    <span className="sr-only">Underline</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Underline</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleStrike().run()}
                                    className={`h-8 w-8 p-0 ${editor.isActive('strike') ? 'is-active' : ''}`}>
                                    <Strikethrough className="h-4 w-4" />
                                    <span className="sr-only">Strikethrough</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Strikethrough</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                    className={` h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'is-active' : ''}`}>
                                    <Quote className="h-4 w-4" />
                                    <span className="sr-only">Quote</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Quote</TooltipContent>
                        </Tooltip>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                                    className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'is-active' : ''} `}>
                                    <List className="h-4 w-4" />
                                    <span className="sr-only">Bullet List</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Bullet List</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                    className={` h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'is-active' : ''}`}>
                                    <ListOrdered className="h-4 w-4" />
                                    <span className="sr-only">Numbered List</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Numbered List</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => editor.chain().focus().setHardBreak().run()}>
                                    <   CornerDownRight className="h-4 w-4" />
                                    <span className="sr-only">Hard Break</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Hard Break</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                    className={` h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'is-active' : ''}`}>
                                    <MessageSquareQuote className="h-4 w-4" />
                                    <span className="sr-only">Qoute</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Quote</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                                    disabled={!editor.can().liftListItem('listItem')}>
                                    <Outdent className="h-4 w-4" />
                                    <span className="sr-only">Bullet List</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Lift List Item</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                    onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                                    disabled={!editor.can().sinkListItem('listItem')}>
                                    <IndentIcon className="h-4 w-4" />
                                    <span className="sr-only">Bullet List</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Sink List Item</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                     onClick={() => editor.chain().focus().splitListItem('listItem').run()}
                                     disabled={!editor.can().splitListItem('listItem')}>
                                   <SquareSplitVertical className="h-4 w-4"/>
                                    <span className="sr-only">Split List item</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Split List Item</TooltipContent>
                        </Tooltip>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                onClick={addImage}
                                    >
                                    <ImageIcon className="h-4 w-4"  />
                                    <span className="sr-only">Code Block</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Code Block</TooltipContent>
                        </Tooltip>


                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon"
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`h-8 w-8 p-0 ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
                                    >
                                    <Code />
                                    <span className="sr-only">Code Block</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Code Block</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" 
                                onClick={setLink} className={` h-8 w-8 p-0" ${editor.isActive('link') ? 'is-active' : ''}`}>
                                    <LinkIcon className="h-4 w-4" />
                                    <span className="sr-only">Link</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Link</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 p-0 ${editor.isActive('highlight') ? 'bg-yellow-300' : ''}`}
                                    onClick={() => editor.chain().focus().toggleHighlight().run()}>
                                    <span>A</span>
                                    <span className="sr-only">Highlight</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Highlight</TooltipContent>
                        </Tooltip>

                        <Separator orientation="vertical" className="h-6 mx-1" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 p-0" onClick={() => editor?.commands.clearContent()}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Clear Formatting</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Clear Formatting</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().undo().run()} disabled={!editor?.can().undo()}
                                    className={`h-8 w-8 p-0 `}>
                                    <Undo className="h-4 w-4" />
                                    <span className="sr-only">Undo</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Undo</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().redo().run()} disabled={!editor?.can().redo()}
                                    className={`h-8 w-8 p-0`}>
                                    <Redo className="h-4 w-4" />
                                    <span className="sr-only">Redo</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Redo</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <EditorContent editor={editor} className='tiptap' placeholder='Tell your story. . . ' />
        </>
    )
}

export default Tiptap