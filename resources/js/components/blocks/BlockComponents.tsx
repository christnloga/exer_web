import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeSlug from 'rehype-slug'; // Automatically adds IDs to markdown headings
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';

// Helper to convert "Technical Challenges" into "technical-challenges"
const generateSlug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

export const HeadingBlock = ({
    data,
}: {
    data: { text: string; level: number };
}) => {
    const Tag = `h${data.level}` as React.ElementType;
    const slug = generateSlug(data.text);

    return (
        <Tag
            id={slug}
            className={`mt-12 mb-6 scroll-mt-28 font-bold text-slate-900 dark:text-slate-100 ${
                data.level === 2 ? 'text-3xl md:text-4xl tracking-tight' : ''
            } ${data.level === 3 ? 'text-2xl md:text-3xl tracking-tight' : ''} ${
                data.level === 4 ? 'text-xl md:text-2xl' : ''
            }`}
        >
            {data.text}
        </Tag>
    );
};

export const TextBlock = ({ data }: { data: { content: string } }) => {
    return (
        <div className="case-study-text-wrapper text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300">
            <style>{`
                .case-study-text-wrapper p {
                    margin-bottom: 1.75rem;
                }
                .case-study-text-wrapper ul,
                .case-study-text-wrapper ol {
                    margin-bottom: 1.75rem;
                    padding-left: 1.5rem;
                }
                .case-study-text-wrapper ul {
                    list-style-type: disc;
                }
                .case-study-text-wrapper ol {
                    list-style-type: decimal;
                }
                .case-study-text-wrapper li {
                    margin-bottom: 0.75rem;
                    padding-left: 0.5rem;
                }
                .case-study-text-wrapper a {
                    color: #00A6F4;
                    text-decoration: underline;
                    text-decoration-thickness: 2px;
                    text-underline-offset: 4px;
                    transition: all 0.2s ease;
                }
                .case-study-text-wrapper a:hover {
                    color: #0082c4;
                    text-decoration-color: #0082c4;
                }
                .case-study-text-wrapper blockquote {
                    border-left: 4px solid #00A6F4;
                    padding-left: 1.5rem;
                    margin-left: 0;
                    margin-right: 0;
                    font-style: italic;
                    color: #475569;
                    background: linear-gradient(to right, rgba(0, 166, 244, 0.05), transparent);
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                .dark .case-study-text-wrapper blockquote {
                    color: #94a3b8;
                }
                .case-study-text-wrapper strong {
                    font-weight: 700;
                    color: #0f172a;
                }
                .dark .case-study-text-wrapper strong {
                    color: #f1f5f9;
                }
            `}</style>

            <div className="max-w-none">
                <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                    {data.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export const ImageBlock = ({
    data,
}: {
    data: { url: string; caption?: string };
}) => {
    return (
        <figure className="my-12">
            <img
                src={data.url}
                alt={data.caption || 'Case study visual'}
                className="w-full rounded-2xl object-cover shadow-2xl shadow-black/10 border border-gray-100 dark:border-gray-800"
                loading="lazy"
            />
            {data.caption && (
                <figcaption className="mt-4 text-center text-sm md:text-base italic text-gray-500 dark:text-gray-400">
                    {data.caption}
                </figcaption>
            )}
        </figure>
    );
};

export const CodeBlock = ({ data }: { data: { code: string; language: string } }) => {
    return (
        <div className="my-10 overflow-hidden rounded-xl shadow-2xl shadow-black/20 border border-gray-800/50 bg-[#1e1e24] text-sm">
            <div className="flex items-center justify-between bg-gray-900/80 px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex items-center gap-4 text-xs tracking-widest text-gray-400 uppercase">
                    <span>{data.language || 'typescript'}</span>
                    <button 
                        onClick={() => navigator.clipboard.writeText(data.code)}
                        className="cursor-pointer hover:text-white transition-colors"
                    >
                        Copy
                    </button>
                </div>
            </div>
            <SyntaxHighlighter 
                language={data.language || 'typescript'} 
                style={dracula}
                customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
            >
                {data.code}
            </SyntaxHighlighter>
        </div>
    );
};

export const GalleryBlock = ({ data }: { data: { images: { url: string; caption?: string }[] } }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true,
        align: 'start',
        containScroll: 'trimSnaps'
    });

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        
        // Avoid calling setState synchronously during render
        setTimeout(() => {
            onSelect();
            setScrollSnaps(emblaApi.scrollSnapList());
        }, 0);
        
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);


    if (!data.images || data.images.length === 0) return null;

    return (
        <div className="my-12 relative group/gallery">
            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex -ml-4">
                    {data.images.map((img, idx) => (
                        <div key={idx} className="flex-[0_0_auto] min-w-0 pl-4 relative group">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="cursor-pointer relative h-64 md:h-72 w-auto overflow-hidden bg-muted rounded-lg border border-gray-200 dark:border-gray-800">
                                        <img 
                                            src={img.url} 
                                            alt={img.caption || "Project visual"} 
                                            className="w-auto h-full object-contain transition-transform duration-500 group-hover:scale-105" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Maximize2 className="text-white w-10 h-10 drop-shadow-md" />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[95vh] p-0 overflow-hidden border-none bg-transparent shadow-none">
                                    <DialogTitle className="sr-only">{img.caption || `Image ${idx + 1}`}</DialogTitle>
                                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                                        <img 
                                            src={img.url} 
                                            alt={img.caption || "Project visual fullscreen"} 
                                            className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl" 
                                        />
                                        {img.caption && (
                                            <p className="text-white text-sm mt-4 text-center bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
                                                {img.caption}
                                            </p>
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </div>
            
            {data.images.length > 1 && (
                <>
                    <button 
                        onClick={scrollPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors opacity-0 group-hover/gallery:opacity-100 focus:opacity-100"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/50 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-black transition-colors opacity-0 group-hover/gallery:opacity-100 focus:opacity-100"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {/* Position Dots */}
                    <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                        {scrollSnaps.map((_, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => scrollTo(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === selectedIndex 
                                        ? 'w-4 bg-primary' 
                                        : 'w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                                }`} 
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
