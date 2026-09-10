import type { ReactNode } from "react";

type IconProps = { className?: string };

function Svg({ children, className }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function SkillIcon({ id, className = "h-7 w-7" }: { id: string; className?: string }) {
  switch (id) {
    case "garnissage":
      return (
        <Svg className={className}>
          <path d="M5 13V9a7 7 0 0 1 14 0v4" />
          <path d="M4 13h16v4H4z" />
          <path d="M6 17v3M18 17v3" />
        </Svg>
      );
    case "confection":
      return (
        <Svg className={className}>
          <path d="M4 20 14 4" />
          <circle cx="16.5" cy="3.5" r="1.5" />
          <path d="M14 4c4 3 2 8-2 9" />
        </Svg>
      );
    case "blanchisserie":
      return (
        <Svg className={className}>
          <path d="M3 16h15a3 3 0 0 0 3-3h-9L3 16z" />
          <path d="M8 13V8h11v5" />
          <path d="M11 8V6" />
        </Svg>
      );
    case "menuiserie":
      return (
        <Svg className={className}>
          <path d="M3 20 15 4l4 3L7 21z" />
          <path d="M9 14h5" />
        </Svg>
      );
    case "peinture":
      return (
        <Svg className={className}>
          <path d="M14 3h6v6l-9 9-6-6z" />
          <path d="M5 16c-2 2-1 5 2 5 2 0 3-2 3-3" />
        </Svg>
      );
    case "conditionnement":
      return (
        <Svg className={className}>
          <path d="M3 8h18v13H3z" />
          <path d="M3 8 12 3l9 5" />
          <path d="M12 3v18" />
        </Svg>
      );
    case "jardins":
      return (
        <Svg className={className}>
          <path d="M12 22v-8" />
          <path d="M12 14c-5 0-7-5-7-9 6 0 7 5 7 7" />
          <path d="M12 14c5 0 7-5 7-9-6 0-7 5-7 7" />
        </Svg>
      );
    case "abattoir":
      return (
        <Svg className={className}>
          <path d="M3 21V11l9-7 9 7v10" />
          <path d="M9 21v-6h6v6" />
        </Svg>
      );
    default:
      return (
        <Svg className={className}>
          <circle cx="12" cy="12" r="8" />
        </Svg>
      );
  }
}
