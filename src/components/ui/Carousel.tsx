"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

type CarouselProps = {
  children: ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  prevLabel?: string;
  nextLabel?: string;
};

export function Carousel({
  children,
  autoplay = false,
  autoplayDelay = 4000,
  prevLabel = "Previous",
  nextLabel = "Next",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Start with the SSR default (3) so server and client initial renders match.
  // useEffect updates it to the real viewport value after hydration.
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDelta = useRef(0);

  // Sync visibleCount with viewport — runs only on the client after hydration
  useEffect(() => {
    function update() {
      setVisibleCount(window.innerWidth <= 768 ? 1 : 3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, children.length - visibleCount);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex],
  );

  // Clamp currentIndex when visibleCount changes (e.g. resize)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // Apply transform
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const slide = track.children[0] as HTMLElement;
    const gap = 20;
    const slideWidth = slide.offsetWidth + gap;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }, [currentIndex]);

  // Autoplay
  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoplayDelay);
  }, [autoplay, autoplayDelay, maxIndex, stopAutoplay]);

  useEffect(() => {
    if (!autoplay) return;
    startAutoplay();
    return stopAutoplay;
  }, [autoplay, startAutoplay, stopAutoplay]);

  // Drag handlers
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      dragDelta.current = 0;
      trackRef.current?.classList.add("!transition-none", "cursor-grabbing");
      stopAutoplay();
    },
    [stopAutoplay],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragDelta.current = e.clientX - startX.current;
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current?.classList.remove("!transition-none", "cursor-grabbing");
    if (dragDelta.current < -60) goTo(currentIndex + 1);
    else if (dragDelta.current > 60) goTo(currentIndex - 1);
    dragDelta.current = 0;
    startAutoplay();
  }, [currentIndex, goTo, startAutoplay]);

  const dotCount = maxIndex + 1;

  return (
    <div>
      <div
        className="overflow-hidden py-2"
        onMouseEnter={autoplay ? stopAutoplay : undefined}
        onMouseLeave={autoplay ? startAutoplay : undefined}
      >
        <div
          ref={trackRef}
          className="flex cursor-grab gap-5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="min-w-0 flex-shrink-0 basis-full md:basis-[calc(33.333%-14px)]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => { goTo(currentIndex - 1); stopAutoplay(); startAutoplay(); }}
          disabled={currentIndex === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-muted transition-colors hover:bg-card-border hover:text-foreground disabled:cursor-default disabled:opacity-25"
          aria-label={prevLabel}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: dotCount }, (_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); stopAutoplay(); startAutoplay(); }}
              className={`h-2 rounded-full border-none transition-all ${
                i === currentIndex ? "w-6 bg-accent" : "w-2 bg-card-border"
              }`}
              aria-label={`Go to slide ${i + 1} of ${dotCount}`}
            />
          ))}
        </div>

        <button
          onClick={() => { goTo(currentIndex + 1); stopAutoplay(); startAutoplay(); }}
          disabled={currentIndex >= maxIndex}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-alt text-muted transition-colors hover:bg-card-border hover:text-foreground disabled:cursor-default disabled:opacity-25"
          aria-label={nextLabel}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="9,6 15,12 9,18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
