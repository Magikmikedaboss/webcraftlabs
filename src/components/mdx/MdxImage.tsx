import Image from "next/image";

type MdxImageProps = {
  src?: string;
  alt?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
};

function toNumber(value?: number | `${number}`) {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : undefined;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
  }
  return undefined;
}

export default function MdxImage({ src, alt, width, height, className }: MdxImageProps) {
  if (!src || src.trim() === "") {
    throw new Error("MdxImage: src must be a non-empty string. Provide a valid image path.");
  }
  if (!alt || alt.trim() === "") {
    throw new Error("All images must have a meaningful alt text. Please provide a descriptive alt prop.");
  }
  const safeSrc = src.trim();
  const safeAlt = alt.trim();

  const w = toNumber(width);
  const h = toNumber(height);
  const isRemote = /^https?:\/\//i.test(safeSrc);
  const isSvg = safeSrc.toLowerCase().endsWith(".svg");
  const imageClassName = className ? `h-auto w-full rounded-2xl ${className}` : "h-auto w-full rounded-2xl";

  // When no explicit dimensions are provided, avoid assuming a fixed aspect ratio
  if (w === undefined || h === undefined) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={safeSrc} alt={safeAlt} className={imageClassName} loading="lazy" decoding="async" />;
  }

  if (isRemote) {
    return (
      <Image
        src={safeSrc}
        alt={safeAlt}
        width={w}
        height={h}
        className={imageClassName}
        loading="lazy"
        decoding="async"
        unoptimized
      />
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={safeAlt}
      width={w}
      height={h}
      className={imageClassName}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
      unoptimized={isSvg}
    />
  );
}
