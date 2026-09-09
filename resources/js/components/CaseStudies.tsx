import { router } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { HiArrowSmallLeft, HiArrowSmallRight } from 'react-icons/hi2';

import { index as getCaseStudies } from '@/actions/App/Http/Controllers/Api/CaseStudyController';
import { show as showCaseStudy } from '@/actions/App/Http/Controllers/CaseStudyController';
import type { CaseStudy as DbCaseStudy } from '@/types';
import CaseStudyCard from './CaseStudyCard';

interface LocalCaseStudy {
    is_published: boolean;
    id: string | number;
    title: string;
    category: string;
    image: string;
    background: string;
    description: string;
    color: string;
}

const CaseStudies = () => {
    const {
        data: caseStudies = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['case-studies'],
        queryFn: async () => {
            const route = getCaseStudies();
            const response = await fetch(route.url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Map DB data to component expected format if necessary
            return data.map((study: DbCaseStudy) => ({
                id: study.slug, // using slug as unique key
                title: study.title,
                category: study.category || 'Design & Dev',
                image: study.cover_image_url || '/placeholder.png',
                background: study.cover_image_url || '/placeholder.png',
                description: study.short_description,
                color: 'from-sky-500/20', // Default color for now
            })) as LocalCaseStudy[];
        },
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
        align: 'start',
        containScroll: false,
        dragFree: true,
        loop: false,
    });

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi]);

    useEffect(() => {
        if (!emblaMainApi) return;

        // Avoid calling setState synchronously during render by using setTimeout
        // or relying purely on Embla events.
        emblaMainApi.on('select', onSelect).on('reInit', onSelect);

        // Initial call after component mounts
        setTimeout(() => {
            onSelect();
        }, 0);
    }, [emblaMainApi, onSelect]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaMainApi) emblaMainApi.scrollTo(index);
        },
        [emblaMainApi],
    );

    const scrollPrev = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollPrev();
    }, [emblaMainApi]);

    const scrollNext = useCallback(() => {
        if (emblaMainApi) emblaMainApi.scrollNext();
    }, [emblaMainApi]);

    if (isLoading) {
        return (
            <div className="relative flex h-full w-full items-center justify-center py-28 lg:flex">
                <div className="animate-pulse text-sky-500">
                    Loading Case Studies...
                </div>
            </div>
        );
    }

    if (isError || !caseStudies.length) {
        return null; // Or show a fallback
    }

    return (
         <section
                    id="work"
                    className="relative z-10 flex flex-col items-center bg-card/30 lg:h-[calc(100vh-60px)]"
                >
        <div className="relative flex h-full w-full flex-col items-center overflow-hidden py-24 lg:py-32">
            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute right-1/4 -bottom-24 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

            {/* Dynamic Background Image Crossfade */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <img
                            src={
                                caseStudies[selectedIndex % caseStudies.length]
                                    .background
                            }
                            alt=""
                            className="h-full w-full object-cover blur-2xl saturate-150"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="my-auto w-full max-w-6xl">
                <div className="flex w-full flex-col gap-6 px-4 lg:flex-row lg:items-end lg:justify-between lg:px-0 lg:mb-12">
                    <div className="space-y-4">
                        <div className="flex">
                            <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase shadow-[0_0_15px_-3px_rgba(0,166,244,0.3)]">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                Case Studies
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold text-foreground lg:text-6xl/tight">
                            Featured{' '}
                            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                        <p className="max-w-md text-sm text-muted-foreground lg:text-base">
                            A curated selection of my most impactful digital
                            products and technical solutions.
                        </p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-primary ring-0 outline-0 transition-colors duration-200 hover:border-primary hover:bg-primary/10 active:opacity-80 lg:size-12"
                            aria-label="Previous"
                        >
                            <HiArrowSmallLeft size={20} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-primary ring-0 outline-0 transition-colors duration-200 hover:border-primary hover:bg-primary/10 active:opacity-80 lg:size-12"
                            aria-label="Next"
                        >
                            <HiArrowSmallRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="relative mt-6 w-full pl-4 lg:mt-8 lg:pl-0">
                    <div className="overflow-visible" ref={emblaMainRef}>
                        <div className="flex cursor-grab touch-pan-x gap-0 py-4 select-none">
                            {caseStudies
                                .map((study: LocalCaseStudy, index: number) => (
                                    <div
                                        key={`${study.id}-${index}`}
                                        className="flex flex-[0_0_280px] justify-center sm:flex-[0_0_320px] lg:flex-[0_0_640px]"
                                    >
                                        <CaseStudyCard
                                            title={study.title}
                                            image={study.image}
                                            category={study.category}
                                            description={study.description}
                                            slug={study.id.toString()}
                                            selected={index === selectedIndex}
                                            onClick={() => {
                                                if (index === selectedIndex) {
                                                    router.get(
                                                        showCaseStudy({
                                                            caseStudy:
                                                                study.id.toString(),
                                                        }).url,
                                                    );
                                                } else {
                                                    scrollTo(index);
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons mobile */}
                {/* <div className="mt-6 flex gap-2 px-6 lg:hidden">
                    <button
                        onClick={scrollPrev}
                        className="cursor-pointer rounded-full border border-white/10 bg-[#00A6F4]/5 p-3 text-white ring-0 outline-0 transition-colors duration-200 hover:border-[#00A6F4] hover:bg-[#00A6F4]/10"
                        aria-label="Previous"
                    >
                        <HiArrowSmallLeft size={24} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="cursor-pointer rounded-full border border-white/10 bg-[#00A6F4]/5 p-3 text-white ring-0 outline-0 transition-colors duration-200 hover:border-[#00A6F4] hover:bg-[#00A6F4]/10"
                        aria-label="Next"
                    >
                        <HiArrowSmallRight size={24} />
                    </button>
                </div> */}
            </div>
        </div>
        </section>
    );
};

export default CaseStudies;
