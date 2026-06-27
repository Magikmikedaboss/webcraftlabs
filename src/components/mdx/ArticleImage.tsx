import Image from "next/image";

export default function ArticleImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <figcaption
          className="mt-3 text-center text-sm italic"
          style={{ color: "var(--muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
