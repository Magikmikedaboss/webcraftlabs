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
  alt,
  width,
  height,
  className,
  decorative = false,
  ...rest
}: {
  src?: string;
  alt?: string | undefined;
  width?: number | string;
  height?: number | string;
  className?: string;
  decorative?: boolean;
  [key: string]: unknown;
}) {
  if (!src) throw new Error("SafeMdxImage requires a valid 'src' property in MDX content");

  // Surface missing alt text for authored images. If the image is intentionally
  // decorative, pass `decorative={true}` in the MDX tag; otherwise alt must be
  // a non-empty string so assistive tech can describe the image.
  if (!decorative) {
    if (typeof alt !== 'string' || alt.trim() === '') {
      throw new Error(
        `MDX image with src "${src}" is missing required alt text. Provide an explicit alt string or set decorative={true} for decorative images.`,
      );
    }
  }

  const w = typeof width === "string" ? Number(width) : width;
  const h = typeof height === "string" ? Number(height) : height;
  const safeWidth = typeof w === "number" && Number.isFinite(w) && w > 0 ? w : undefined;
  const safeHeight = typeof h === "number" && Number.isFinite(h) && h > 0 ? h : undefined;

  // Compute a string alt value for rendering. If decorative, use an empty
  // alt; otherwise, the earlier validation guarantees `alt` is a non-empty
  // string so we preserve the caller-provided value rather than defaulting.
  const imageAlt: string = decorative ? '' : (alt as string);

  if (!safeWidth || !safeHeight) {
    // Turbopack/next-mdx-remote can drop numeric JSX prop values (e.g. width={1200}) in both
    // dev and production builds. Fall back to a plain <img> so the build doesn't fail and
    // the image still renders. The MDX source remains the source of truth for dimensions.
    // eslint-disable-next-line @next/next/no-img-element
    return <img loading="lazy" decoding="async" {...(rest as Record<string, unknown> & object)} src={src} alt={imageAlt} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={imageAlt}
      width={safeWidth}
      height={safeHeight}
      className={className}
      // Forward any other known next/image props passed from MDX content
      {...(rest as Record<string, unknown> & object)}
    />  );
}
