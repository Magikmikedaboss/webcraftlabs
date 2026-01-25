"use client";
import Link from "next/link";
import { useState } from "react";

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
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	// Get all unique tags
	const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

	// Filter posts by selected tag
	const filteredPosts = selectedTag 
		? posts.filter(p => p.tags.includes(selectedTag))
		: posts;

	const kindLabel = kind === "blog" ? "Blog" : "News";
	const kindColor = kind === "blog" ? "blue" : "cyan";

	if (posts.length === 0) {
		return (
			<div className="text-center py-16">
				<div className="text-6xl mb-4">📝</div>
				<h2 className="text-2xl font-bold text-[var(--text)] mb-2">No {kindLabel} Posts Yet</h2>
				<p className="text-[var(--muted)]">Check back soon for updates!</p>
			</div>
		);
	}

	return (
		<div>
			{/* Tag Filter */}
			{allTags.length > 0 && (
				<div className="mb-8">
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setSelectedTag(null)}
							className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
								selectedTag === null
									? `bg-${kindColor}-600 text-white shadow-md`
									: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--hoverSurface)]'
							}`}
						>
							All Posts ({posts.length})
						</button>
						{allTags.map(tag => {
							const count = posts.filter(p => p.tags.includes(tag)).length;
							return (
								<button
									key={tag}
									onClick={() => setSelectedTag(tag)}
									className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
										selectedTag === tag
											? `bg-${kindColor}-600 text-white shadow-md`
											: 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--hoverSurface)]'
									}`}
								>
									{tag} ({count})
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Posts Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredPosts.map((post) => (
					<Link
						key={post.slug}
						href={`/${kind}/${post.slug}`}
						className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
					>
						{/* Tags */}
						{post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-3">
								{post.tags.map(tag => (
									<span
										key={tag}
										className={`inline-flex items-center rounded-full bg-${kindColor}-100 px-2.5 py-0.5 text-xs font-semibold text-${kindColor}-700`}
									>
										{tag}
									</span>
								))}
							</div>
						)}

						{/* Title */}
						<h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors mb-2">
							{post.title}
						</h3>

						{/* Description */}
						<p className="text-sm text-[var(--muted)] line-clamp-3 mb-4">
							{post.description}
						</p>

						{/* Date */}
						<div className="flex items-center gap-2 text-xs text-[var(--muted)]">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
						</div>

						{/* Read More Arrow */}
						<div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[var(--primary)] group-hover:gap-3 transition-all">
							Read more
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</Link>
				))}
			</div>

			{/* No results message */}
			{filteredPosts.length === 0 && selectedTag && (
				<div className="text-center py-16">
					<div className="text-4xl mb-4">🔍</div>
					<h3 className="text-xl font-bold text-[var(--text)] mb-2">No posts found with tag "{selectedTag}"</h3>
					<button
						onClick={() => setSelectedTag(null)}
						className="mt-4 text-[var(--primary)] hover:underline font-semibold"
					>
						Clear filter
					</button>
				</div>
			)}
		</div>
	);
}
