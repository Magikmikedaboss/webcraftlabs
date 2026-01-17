import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

interface PoweredByProps {
  variant?: "light" | "dark" | "simple";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PoweredBy({ 
  variant = "light", 
  size = "md",
  className = "" 
}: PoweredByProps) {
  const sizeClasses = {
    sm: "text-xs gap-1.5",
    md: "text-sm gap-2",
    lg: "text-base gap-2.5"
  };

  // Use only the largest expected size for width/height for optimization
  const logoSize = { width: 24, height: 24 };
  const logoClassNames = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const variantClasses = {
    light: "text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md",
    dark: "text-gray-300 hover:text-white bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-sm hover:shadow-md",
    simple: "text-gray-500 hover:text-gray-900"
  };

  const logoClass = logoClassNames[size];

  return (
    <Link
      href={SITE.url}
      target="_blank"
      rel="noopener noreferrer"
      // Responsive vertical padding: min 2.5 (10px) on mobile, 3 (12px) on md+
      className={`inline-flex items-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg px-3 py-2.5 md:py-3 transition-all duration-200 ${className}`}
      title="Built by WebCraft Labz"
    >
      <Image
        src="/images/branding/flaming-phoenix-logo-design-website-marketing-developer.svg"
        alt="WebCraft Labz"
        width={logoSize.width}
        height={logoSize.height}
        className={logoClass}
      />
      <span className="font-medium">
        Powered by <span className="font-bold">WebCraft Labz</span>
      </span>
    </Link>
  );
}
