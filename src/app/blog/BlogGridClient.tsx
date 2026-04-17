"use client";
import PostIndexClient from "@/components/content/PostIndexClient";

export default function BlogGridClient({ posts, kind }: { posts: any[]; kind: string }) {
  return <PostIndexClient posts={posts} kind={kind} />;
}
