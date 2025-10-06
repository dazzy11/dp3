// src/components/Navbar/Navbar.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/features/auth/useAuth";
import { supabase } from "@/lib/supabase";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user } = useAuth();

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/">KRCT Social</Link>
      <div>
        {user ? (
          <>
            <Link href={`/profile/${user.id}`}>Profile</Link>
            <button onClick={signOut}>Sign out</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
