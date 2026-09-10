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

export function RoomServiceIcon({
  id,
  className = "h-6 w-6",
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case "catering":
      return (
        <Svg className={className}>
          <path d="M4 21h7V11H4z" />
          <path d="M8 11V4" />
          <path d="M6 6h4" />
          <path d="M16 21V8c3 0 4 2.5 4 5v8" />
          <path d="M16 8V3" />
        </Svg>
      );
    case "parking":
      return (
        <Svg className={className}>
          <path d="M4 4h16v16H4z" />
          <path d="M9 17V7h4.5a3 3 0 0 1 0 6H9" />
        </Svg>
      );
    case "pmr":
      return (
        <Svg className={className}>
          <circle cx="8" cy="5" r="2" />
          <path d="M10 9h5l2 8" />
          <path d="M8 9v4l4 2" />
          <circle cx="8.5" cy="17.5" r="3.5" />
        </Svg>
      );
    case "equipment":
      return (
        <Svg className={className}>
          <path d="M3 6h18v10H3z" />
          <path d="M8 20h8" />
          <path d="M12 16v4" />
        </Svg>
      );
    case "wifi":
      return (
        <Svg className={className}>
          <path d="M5 12.5a9 9 0 0 1 14 0" />
          <path d="M8 15.5a5 5 0 0 1 8 0" />
          <circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "park":
      return (
        <Svg className={className}>
          <path d="M12 22v-8" />
          <path d="M12 14c-5 0-7-5-7-9 6 0 7 5 7 7" />
          <path d="M12 14c5 0 7-5 7-9-6 0-7 5-7 7" />
        </Svg>
      );
    case "staff":
      return (
        <Svg className={className}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M16 20c0-2 1.5-3.5 4-4" />
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
