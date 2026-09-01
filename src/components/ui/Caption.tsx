import type { ReactNode } from "react";

type CaptionProps = {
  children: ReactNode;
  className?: string;
  /** Draw a short rule before the text, the way a field note is tagged. */
  rule?: boolean;
};

/**
 * A field-journal annotation: lowercase, mono, quiet. Used for section labels
 * in place of the old uppercase-tracked eyebrows.
 *
 * `lowercase` is a no-op for Japanese, which is exactly what we want — the ja
 * locale keeps its own casing rules and simply inherits the mono treatment.
 */
export function Caption({ children, className, rule = true }: CaptionProps) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[0.8125rem] font-light lowercase tracking-[0.02em] text-accent ${
        className ?? ""
      }`}
    >
      {rule && (
        <span aria-hidden className="h-px w-8 shrink-0 bg-accent/45" />
      )}
      {children}
    </p>
  );
}
