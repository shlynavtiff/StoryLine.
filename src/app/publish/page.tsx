"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

export default function CreatePost() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Title and content are required!");
            return;
        }

        setLoading(true);
        const supabase = createClient();
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
            alert("You must be logged in to create a post!");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("posts").insert([
            { title, content, user_id: userData.user.id }
        ]);

        if (error) {
            alert("Failed to create post");
            console.error(error);
        } else {
            router.push("/"); // Redirect to homepage after posting
        }

        setLoading(false);
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Write your post here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border rounded h-40"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Publishing..." : "Publish"}
                </button>
            </form>
        </div>
    );
}
