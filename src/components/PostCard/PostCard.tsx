// src/components/PostCard/PostCard.tsx
import React from "react";
import styles from "./PostCard.module.css";

export default function PostCard({ post }: { post: any }) {
  const user = (post as any).users ?? null; // depends on SQL relationship
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <strong>{user?.username ?? "Unknown"}</strong>
        </div>
        <small>{new Date(post.created_at).toLocaleString()}</small>
      </div>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="post image" className={styles.image} />}
    </div>
  );
}
