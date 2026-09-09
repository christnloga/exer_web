import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type InfiniteCarouselProps = {
    items: React.ReactNode[];
    speed?: number; // desktop duration
};

export default function InfiniteCarousel({
    items,
    speed = 25,
}: InfiniteCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const [width, setWidth] = useState(0);

    // Measure content width dynamically
    useEffect(() => {
        if (!contentRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            setWidth(contentRef.current!.scrollWidth);
        });

        resizeObserver.observe(contentRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-[100vw] overflow-x-hidden"
        >
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-background via-transparent to-background" />

            <motion.div
                className="flex touch-pan-x will-change-transform"
                animate={shouldReduceMotion ? undefined : { x: [0, -width] }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: speed,
                }}
            >
                <div ref={contentRef} className="flex">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="shrink-0 px-3 whitespace-nowrap sm:px-4 md:px-6"
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Duplicate */}
                <div className="flex">
                    {items.map((item, i) => (
                        <div
                            key={`dup-${i}`}
                            className="shrink-0 px-3 whitespace-nowrap sm:px-4 md:px-6"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
