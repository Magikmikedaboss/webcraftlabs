import Image from "next/image";

type MdxImageProps = {
  src?: string;
  alt?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
};

function toNumber(value?: number | `${number}`) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export default function MdxImage({ src, alt = "", width, height, className }: MdxImageProps) {
  if (!src) return null;

  const resolvedWidth = toNumber(width) ?? 1200;
  const resolvedHeight = toNumber(height) ?? 675;
  const isRemote = /^https?:\/\//i.test(src);
  const isSvg = src.toLowerCase().endsWith(".svg");
  const imageClassName = className ? `h-auto w-full rounded-2xl ${className}` : "h-auto w-full rounded-2xl";

  const commonProps = {
    src,
    alt,
    width: resolvedWidth,
    height: resolvedHeight,
    className: imageClassName,
  };

  if (isRemote) {
    return (
      <Image
        {...commonProps}
        loading="lazy"
        decoding="async"
        unoptimized
      />
    );
  }

  return (
    <Image
      {...commonProps}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
      unoptimized={isSvg}
    />
  );
}
