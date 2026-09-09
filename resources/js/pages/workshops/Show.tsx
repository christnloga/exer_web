import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    GraduationCap,
    HeartPulse,
    Lock,
    Sparkles,
    Users,
} from 'lucide-react';
import React from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import { home } from '@/routes';
import { apply as workshopApply, show as workshopShow } from '@/routes/workshop';
import type { Workshop } from '@/types';

const Show = () => {
    const { props } = usePage();
    const locale = (props as any).locale || 'en';
    const workshop = (props as any).workshop as Workshop;
    const registrationOpen = (props as any).registrationOpen as boolean;
    const remainingPlaces = (props as any).remainingPlaces as number | null;

    const features = [
        {
            icon: HeartPulse,
            title: 'User Experience',
            desc: 'Understand users and design intuitive digital health products.',
        },
        {
            icon: Sparkles,
            title: 'Research & Innovation',
            desc: 'Hands-on UX research, product thinking, and healthcare innovation.',
        },
        {
            icon: GraduationCap,
            title: 'Four Interactive Sessions',
            desc: 'A structured journey from fundamentals to practical application.',
        },
        {
            icon: Users,
            title: 'Limited Seats',
            desc: 'Places are limited — registration does not guarantee selection.',
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 font-sans sm:px-6 lg:px-8">
            <Head title={workshop?.title ?? 'Workshop'} />

            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

            <div className="relative z-10 mx-auto max-w-4xl pt-24 lg:pt-32">
                <RevealElement>
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/30 bg-[#00A6F4]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(0,166,244,0.15)]">
                            <Sparkles className="h-4 w-4 text-[#00A6F4]" />
                            <span className="text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                Workshop
                            </span>
                        </div>
                        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-foreground md:text-6xl">
                            {workshop?.title ?? 'Workshop'}
                        </h1>
                        {workshop?.short_description && (
                            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                {workshop.short_description}
                            </p>
                        )}
                    </div>
                </RevealElement>

                {workshop && (
                    <RevealElement delay={100}>
                        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
                            {workshop.number_of_sessions > 0 && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                                    {workshop.number_of_sessions} sessions
                                </div>
                            )}
                            {workshop.start_date && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5 text-primary" />
                                    Starts{' '}
                                    {new Date(
                                        workshop.start_date,
                                    ).toLocaleDateString()}
                                </div>
                            )}
                            {workshop.max_applicants && (
                                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                    <Users className="h-3.5 w-3.5 text-primary" />
                                    {remainingPlaces !== null
                                        ? `${remainingPlaces} place${remainingPlaces === 1 ? '' : 's'} remaining`
                                        : `Limited to ${workshop.max_applicants} places`}
                                </div>
                            )}
                        </div>
                    </RevealElement>
                )}

                <RevealElement delay={200}>
                    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-linear-to-b from-foreground/10 to-foreground/5 p-px shadow-2xl">
                        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative rounded-3xl bg-card p-6 sm:p-12">
                            <div className="grid gap-8 sm:grid-cols-2">
                                {features.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-base font-bold text-foreground">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {workshop?.description && (
                                <div className="mt-10 border-t border-border pt-8">
                                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                                        {workshop.description}
                                    </p>
                                </div>
                            )}

                            <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-center">
                                {registrationOpen ? (
                                    <Link
                                        href={workshopApply.url({
                                            locale,
                                            workshop: workshop.slug,
                                        })}
                                        className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,166,244,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                                    >
                                        Apply Now
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                ) : (
                                    <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-3.5 text-sm font-bold text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                        Registration Closed
                                    </div>
                                )}
                                {workshop.application_deadline && (
                                    <p className="text-xs text-muted-foreground">
                                        Apply by{' '}
                                        {new Date(
                                            workshop.application_deadline,
                                        ).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </RevealElement>

                <RevealElement delay={300}>
                    <div className="mt-10 flex justify-center">
                        <Link
                            href={home.url()}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Return Home
                        </Link>
                    </div>
                </RevealElement>
            </div>
        </div>
    );
};

Show.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Show;
