// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    router.push("/");
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth:400, margin:"40px auto", display:"flex",flexDirection:"column",gap:8 }}>
      <h2>Login</h2>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
      <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
