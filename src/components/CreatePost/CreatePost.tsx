// src/components/CreatePost/CreatePost.tsx
"use client";
import { useState } from "react";
import { uploadImage, createPost } from "@/features/posts/api";
import styles from "./CreatePost.module.css";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl;
      if (file) {
        imageUrl = await uploadImage(file);
      }
      await createPost(content, imageUrl);
      setContent("");
      setFile(null);
      // optionally reload feed by parent state; here we'll just do a window reload for simplicity:
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
    </form>
  );
}
