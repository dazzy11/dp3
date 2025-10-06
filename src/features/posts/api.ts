import { supabase } from "@/lib/supabase";

// Upload image to Supabase Storage
export async function uploadImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}




// Fetch all posts
export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Create a new post (text + optional image)
export async function createPost(content: string, imageUrl?: string) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ content, image_url: imageUrl || null }])
    .select();

  if (error) throw error;
  return data;
}

