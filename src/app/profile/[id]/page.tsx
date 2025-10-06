// src/app/profile/[id]/page.tsx
import { supabase } from "@/lib/supabase";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data: profile } = await supabase.from("users").select("id, username, avatar_url, bio").eq("id", id).single();
  const { data: posts } = await supabase.from("posts").select("*").eq("user_id", id).order("created_at", { ascending: false });

  return (
    <main style={{ maxWidth:720, margin:"24px auto", padding:"0 12px" }}>
      <h1>{profile?.username ?? "User"}</h1>
      <p>{profile?.bio}</p>

      <hr />
      <h3>Posts</h3>
      {posts?.length ? posts.map((p:any) => (
        <div key={p.id} style={{border:"1px solid #eee", margin:"8px 0", padding:12}}>
          <p>{p.content}</p>
          {p.image_url && <img src={p.image_url} style={{maxWidth:"100%"}} />}
        </div>
      )) : <p>No posts</p>}
    </main>
  );
}
