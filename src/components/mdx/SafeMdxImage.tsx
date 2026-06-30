import Image from "next/image";

/**
 * Transparent next/image wrapper for <Image> JSX tags in MDX content.
 *
 * next-mdx-remote + Turbopack can occasionally drop numeric JSX prop values
 * (e.g. width={1200}) during development compilation. This wrapper falls back
 * to a plain <img> tag instead of throwing the "missing required 'width'"
 * runtime error, keeping development usable while the content itself remains
 * the source of truth for dimensions.
 */
export default function SafeMdxImage({
  src,
  alt = "",
  width,
  height,
  className,
  ...rest
}: {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  [key: string]: unknown;
}) {
  if (!src) return null;

  const w = typeof width === "string" ? Number(width) : width;
  const h = typeof height === "string" ? Number(height) : height;

  if (!w || !h) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `SafeMdxImage: missing width or height for src="${src}". Fix the MDX frontmatter or image props.`,
      );
    }
    // Dev-only fallback: dimensions were lost due to Turbopack/next-mdx-remote compilation quirk.
    // eslint-disable-next-line @next/next/no-img-element
    return <img loading="lazy" decoding="async" {...(rest as Record<string, unknown> & object)} src={src} alt={alt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={className}
      // Forward any other known next/image props passed from MDX content
      {...(rest as Record<string, unknown> & object)}
    />
  );
}
