"use client";

import { useEffect, useState } from "react";
import { fetchPosts, createPost, uploadImage } from "@/features/posts/api";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newContent, setNewContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data || []);
    } catch (err: any) {
      console.error("Error loading posts:", err);
      setError(err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async () => {
    if (!newContent.trim() && !imageFile) return;

    let imageUrl: string | undefined;

    if (imageFile) {
      try {
        setUploading(true);
        imageUrl = await uploadImage(imageFile);
      } catch (err: any) {
        console.error("Image upload failed:", err);
        setError(err.message || JSON.stringify(err));
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      await createPost(newContent, imageUrl);
      setNewContent("");
      setImageFile(null);
      loadPosts();
    } catch (err: any) {
      console.error("Error creating post:", err);
      setError(err.message || JSON.stringify(err));
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Post Feed</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Write a post..."
          style={{ width: "300px", marginRight: "1rem", padding: "0.5rem" }}
        />

        <input
  type="file"
  accept="image/*"
  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
/>


        <button
          onClick={handleAddPost}
          style={{ padding: "0.5rem 1rem" }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && posts.length === 0 && !error && <p>No posts yet.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
            }}
          >
            <p>{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                style={{
                  maxWidth: "300px",
                  borderRadius: "0.5rem",
                  marginTop: "0.5rem",
                }}
              />
            )}
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
