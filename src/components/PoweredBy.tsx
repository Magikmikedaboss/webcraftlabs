import Image from "next/image";
import Link from "next/link";

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

  const logoSizes = {
    sm: { width: 16, height: 16, className: "w-4 h-4" },
    md: { width: 20, height: 20, className: "w-5 h-5" },
    lg: { width: 24, height: 24, className: "w-6 h-6" }
  };

  const variantClasses = {
    light: "text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md",
    dark: "text-gray-300 hover:text-white bg-gray-900/80 backdrop-blur-sm border border-gray-700 shadow-sm hover:shadow-md",
    simple: "text-gray-500 hover:text-gray-900"
  };

  const logo = logoSizes[size];

  return (
    <Link
      href="https://webcraftlabz.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center ${sizeClasses[size]} ${variantClasses[variant]} rounded-lg px-3 py-1.5 transition-all duration-200 ${className}`}
      title="Built by WebCraft Labz"
    >
      <Image
        src="/images/branding/flaming-phoenix-logo-design-website-marketing-developer.svg"
        alt="WebCraft Labz"
        width={logo.width}
        height={logo.height}
        className={logo.className}
      />
      <span className="font-medium">
        Powered by <span className="font-bold">WebCraft Labz</span>
      </span>
    </Link>
  );
}
