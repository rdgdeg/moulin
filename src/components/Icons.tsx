import type { ReactNode } from "react";

function Icon({
  className = "h-5 w-5",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function PinIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </Icon>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M7.5 3.5h3l1 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1v3c0 1.2-1 2.2-2.2 2.2C10.2 19.2 4.8 13.8 4.3 5.7 4.2 4.5 5.3 3.5 6.5 3.5Z" />
    </Icon>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </Icon>
  );
}

export function ClockIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </Icon>
  );
}

export function RestaurantIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3" />
      <path d="M7 11v10" />
      <path d="M16 3v18" />
      <path d="M16 8h3a2 2 0 0 0 0-4h-3" />
    </Icon>
  );
}

export function ContactIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 8 8 6 8-6" />
    </Icon>
  );
}

export function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="m15 5-7 7 7 7" />
    </Icon>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="m9 5 7 7-7 7" />
    </Icon>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function DeliveryIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="17" cy="17" r="1.5" />
    </Icon>
  );
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}
