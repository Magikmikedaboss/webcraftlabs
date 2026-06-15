"use client";
import PostIndexClient from "@/components/content/PostIndexClient";

type BlogGridPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  kind: string;
};

export default function BlogGridClient({ posts, kind }: { posts: BlogGridPost[]; kind: string }) {
  return <PostIndexClient posts={posts} kind={kind} />;
}
