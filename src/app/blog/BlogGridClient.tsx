import PostIndexClient from "@/components/content/PostIndexClient";

type BlogGridPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  kind: "blog" | "news";
};

export default function BlogGridClient({ posts, kind }: { posts: BlogGridPost[]; kind: "blog" | "news" }) {
  return <PostIndexClient posts={posts} kind={kind} />;
}
