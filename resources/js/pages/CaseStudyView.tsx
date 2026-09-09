import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { PiCalendarDotFill } from 'react-icons/pi';
import RevealElement from '@/components/RevealElement';
import { useGlobal } from '@/contexts/GlobalContext';
import { BlockRenderer } from '../components/blocks/BlockRenderer';
import { TableOfContents } from '../components/TableOfContents';
import MainLayout from '../layouts/MainLayout';
import type { CaseStudy } from '../types';

interface CaseStudyViewProps {
    caseStudy: CaseStudy;
}

export const CaseStudyView = ({ caseStudy }: CaseStudyViewProps) => {
    const { setNavbarLight } = useGlobal();
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        setNavbarLight(true);

        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                setReadingProgress(
                    Math.min(
                        100,
                        Math.max(0, (window.scrollY / totalHeight) * 100),
                    ),
                );
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setNavbarLight]);

    if (!caseStudy) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Case study not found.
            </div>
        );
    }

    return (
        <article className="relative bg-background px-1 pt-1 pb-16">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 z-50 h-1.5 w-full bg-transparent">
                <div
                    className="h-full rounded-r-full bg-primary shadow-[0_0_10px_rgba(0,166,244,0.7)] transition-all duration-150 ease-out"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Header Section */}
            <header className="overflow-hidden rounded-b-md px-1 pt-[100px]">
                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-linear-to-b from-card to-background px-4 pt-20 sm:px-8 lg:px-16">
                    {/* Background decorations */}
                    <div className="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2 overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-primary/10 mix-blend-multiply blur-3xl"></div>
                        <div className="absolute top-[20%] right-[-5%] h-80 w-80 rounded-full bg-purple-500/10 mix-blend-multiply blur-3xl"></div>
                    </div>

                    <div className="relative z-20 mx-auto mb-16 w-full max-w-5xl space-y-8 text-center">
                        <RevealElement>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 shadow-sm backdrop-blur-md">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    Case Study
                                </span>
                            </div>
                            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
                                {caseStudy.title}
                            </h1>
                            <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed font-light text-muted-foreground sm:text-2xl">
                                {caseStudy.short_description}
                            </p>
                        </RevealElement>

                        <RevealElement>
                            <div className="mt-12 grid grid-cols-1 items-center justify-center gap-8 border-t border-border pt-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Client
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {caseStudy.client_name}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Duration
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <PiCalendarDotFill
                                            size={16}
                                            className="text-primary"
                                        />
                                        <span className="text-sm font-semibold text-foreground">
                                            {dayjs(caseStudy.start_date).format(
                                                'MMM YYYY',
                                            )}{' '}
                                            —{' '}
                                            {caseStudy.end_date
                                                ? dayjs(
                                                      caseStudy.end_date,
                                                  ).format('MMM YYYY')
                                                : 'Present'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Roles
                                    </span>
                                    <div className="flex max-w-[250px] flex-wrap justify-center gap-2">
                                        {caseStudy.roles.map((role, i) => (
                                            <span
                                                key={i}
                                                className="text-sm font-semibold text-foreground"
                                            >
                                                {role}
                                                {i < caseStudy.roles.length - 1
                                                    ? ','
                                                    : ''}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                        Tech
                                    </span>
                                    <div className="flex max-w-[250px] flex-wrap justify-center gap-1.5">
                                        {caseStudy.tech_stack
                                            .slice(0, 3)
                                            .map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        {caseStudy.tech_stack.length > 3 && (
                                            <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium text-muted-foreground/60">
                                                +
                                                {caseStudy.tech_stack.length -
                                                    3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </RevealElement>
                    </div>

                    {/* Cover Image Parallax Container */}
                    {caseStudy.cover_image_url && (
                        <RevealElement className="flex w-full justify-center">
                            <div className="group relative z-30 mx-auto mt-16 w-full max-w-6xl overflow-hidden rounded-t-3xl border-t border-r border-l border-border shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1)]">
                                <div className="absolute inset-0 z-10 bg-foreground/10 transition-colors duration-700 group-hover:bg-transparent"></div>
                                <img
                                    className="w-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                                    style={{ maxHeight: '600px' }}
                                    src={caseStudy.cover_image_url}
                                    alt={`${caseStudy.title} Cover`}
                                />
                            </div>
                        </RevealElement>
                    )}
                </div>
            </header>

            {/* Dynamic Content Blocks */}
            <section className="content-blocks-container mx-auto px-4 pt-16 lg:max-w-6xl">
                {/* Main Layout Grid */}
                <div className="relative flex flex-col gap-12 lg:flex-row lg:items-stretch">
                    {/* Left Side: The Case Study Content */}
                    <div className="case-study-content w-full lg:w-3/5 lg:pr-8">
                        <BlockRenderer blocks={caseStudy.content_blocks} />
                    </div>

                    {/* Right Side: The Table of Contents Sidebar */}
                    <aside className="relative ml-auto w-full lg:w-1/5">
                        {/* We pass 'caseStudy' so the hook runs after data is loaded */}
                        <TableOfContents contentDependency={caseStudy} />
                    </aside>
                </div>
            </section>
        </article>
    );
};

CaseStudyView.layout = (page: React.ReactNode) => (
    <MainLayout children={page} />
);
export default CaseStudyView;
