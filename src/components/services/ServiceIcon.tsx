import type { ServiceItem } from "./servicesData";

type ServiceIconProps = {
  type: ServiceItem["icon"];
  className?: string;
};

export function ServiceIcon({ type, className = "h-10 w-10" }: ServiceIconProps) {
  const props = {
    viewBox: "0 0 24 24",
    fill: "none",
    className,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "scissors":
      return (
        <svg {...props}>
          <path
            d="M6 6l4 4M6 18l4-4M14 6l4 4M14 18l4-4M10 10l4 4M10 14l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "beard":
      return (
        <svg {...props}>
          <path
            d="M12 3c-3 2-5 5-5 9 0 4 2 7 5 9 3-2 5-5 5-9 0-4-2-7-5-9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9 14c1 2 2 3 3 3s2-1 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "towel":
      return (
        <svg {...props}>
          <rect x="5" y="8" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "color":
      return (
        <svg {...props}>
          <path
            d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 15.5 8 18.2l1-5.5-4-3.9 5.5-.8L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "style":
      return (
        <svg {...props}>
          <path
            d="M4 18h16M7 14l3-8 3 5 4-9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
