import { useState, useEffect, useMemo } from 'react';
import type { Block } from '../types';

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

// Helper to generate IDs that match the rehype-slug output
const generateSlug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

export const useTableOfContents = (blocks: Block[]) => {
    const [activeId, setActiveId] = useState<string>('');

    const headings = useMemo(() => {
        if (!blocks || blocks.length === 0) return [];
        return blocks
            .filter((block) => block.type === 'heading')
            .map((block: any) => ({
                id: generateSlug(block.data.text),
                text: block.data.text,
                level: block.data.level,
            }));
    }, [blocks]);

    useEffect(() => {
        if (!headings || headings.length === 0) return;

        // We still need IntersectionObserver to highlight the active section on scroll
        const timeoutId = setTimeout(() => {
            const elements = headings
                .map((h) => document.getElementById(h.id))
                .filter(Boolean) as HTMLElement[];

            const callback = (entries: IntersectionObserverEntry[]) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            };

            const observer = new IntersectionObserver(callback, {
                rootMargin: '-100px 0px -60% 0px',
            });

            elements.forEach((elem) => observer.observe(elem));

            // Important: cleanup observer when headings or component unmounts
            return () => observer.disconnect();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [headings]);

    return { headings, activeId };
};
