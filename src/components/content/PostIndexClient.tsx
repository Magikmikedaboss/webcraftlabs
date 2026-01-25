// Client component for rendering post/news index
// Accepts posts and kind props for blog/news index rendering
type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	kind: string;
};

interface PostIndexClientProps {
	posts: Post[];
	kind: string;
}

export default function PostIndexClient({ posts, kind }: PostIndexClientProps) {
	// TODO: Implement post/news index UI
	// Placeholder usage to avoid unused vars lint warning
	void posts;
	void kind;
	return null;
}
