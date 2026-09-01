/**
 * Small drawn punctuation. These are the marks a person leaves in a margin —
 * they carry no meaning on their own, so they stay out of the accessibility
 * tree and never sit in a reading order.
 */

type MarkProps = {
  className?: string;
  size?: number;
};

/** The eight-point starburst the reference uses to mark a point of interest. */
export function Asterisk({ className, size = 14 }: MarkProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <g stroke="var(--vermilion)" strokeWidth={1} className="ink-stroke">
        <path d="M10 1.5 L10 18.5 M1.5 10 L18.5 10" />
        <path d="M4 4 L16 16 M16 4 L4 16" strokeOpacity={0.65} />
      </g>
    </svg>
  );
}

/** A hanko-style seal — the studio's stamp on the page. */
export function Hanko({ className, size = 46 }: MarkProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="4"
        stroke="var(--vermilion)"
        strokeWidth={2}
        strokeOpacity={0.8}
      />
      {/* 竹 — bamboo */}
      <g stroke="var(--vermilion)" strokeWidth={2.4} className="ink-stroke">
        <path d="M13 15 L13 34 M9 15 L20 13.5 M9 22 L19 21" />
        <path d="M31 15 L31 34 M27 15 L38 13.5 M27 22 L37 21" strokeOpacity={0.9} />
      </g>
    </svg>
  );
}

/** A drawn spiral — "the same spiral, wherever i look". */
export function Spiral({ className, size = 28 }: MarkProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
    >
      <path
        d="M20 20 C20 18.6 21.6 18.6 21.6 20 C21.6 22.6 18 22.6 18 20 C18 15.9 23.9 15.9 23.9 20 C23.9 25.6 15.7 25.6 15.7 20 C15.7 12.8 26.6 12.8 26.6 20 C26.6 28.9 13 28.9 13 20 C13 9.5 29.7 9.5 29.7 20 C29.7 32.1 10 32.1 10 20"
        className="ink-stroke"
        stroke="var(--thread)"
        strokeWidth={1}
        strokeOpacity={0.7}
      />
    </svg>
  );
}
