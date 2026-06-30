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
  if (!src) throw new Error("SafeMdxImage requires a valid 'src' property in MDX content");

  const w = typeof width === "string" ? Number(width) : width;
  const h = typeof height === "string" ? Number(height) : height;
  const safeWidth = typeof w === "number" && Number.isFinite(w) && w > 0 ? w : undefined;
  const safeHeight = typeof h === "number" && Number.isFinite(h) && h > 0 ? h : undefined;

  if (!safeWidth || !safeHeight) {
    // Turbopack/next-mdx-remote can drop numeric JSX prop values (e.g. width={1200}) in both
    // dev and production builds. Fall back to a plain <img> so the build doesn't fail and
    // the image still renders. The MDX source remains the source of truth for dimensions.
    // eslint-disable-next-line @next/next/no-img-element
    return <img loading="lazy" decoding="async" {...(rest as Record<string, unknown> & object)} src={src} alt={alt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={safeWidth}
      height={safeHeight}
      className={className}
      // Forward any other known next/image props passed from MDX content
      {...(rest as Record<string, unknown> & object)}
    />  );
}
