import Image from "next/image";

export function Logo({
  className = "",
  size = 72,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/brand/logo.png"
      alt="Le Moulin de la Hunelle"
      width={size}
      height={size}
      className={`object-cover ${className}`}
      priority={priority}
    />
  );
}
