import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    BellRing,
    CalendarDays,
    CalendarRange,
    Clock,
    GraduationCap,
    History,
    Lock,
    Mail,
    Sparkles,
    Users,
} from 'lucide-react';
import React from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import type { Workshop } from '@/types';
import {
    apply as workshopApply,
    show as workshopShow,
} from '@/routes/workshop';

const formatDate = (value: string | null) => {
    if (!value) {
        return null;
    }

    return new Date(value).toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatRange = (start: string | null, end: string | null) => {
    const from = formatDate(start);
    const to = formatDate(end);

    if (from && to && from !== to) {
        return `${from} — ${to}`;
    }

    return from ?? to;
};

const MetaChip = ({
    icon: Icon,
    children,
}: {
    icon: React.ElementType;
    children: React.ReactNode;
}) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {children}
    </span>
);

const WorkshopCard = ({
    workshop,
    locale,
}: {
    workshop: Workshop;
    locale: string;
}) => {
    const isOpen = workshop.registration_open === true;
    const dates = formatRange(workshop.start_date, workshop.end_date);
    const deadline = formatDate(workshop.application_deadline);
    const sessions = workshop.applicants_count ?? 0;

    return (
        <RevealElement>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-linear-to-b from-foreground/10 to-foreground/5 p-px shadow-xl transition-transform duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col rounded-3xl bg-card p-7 sm:p-9">
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        {isOpen ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-emerald-500 uppercase">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                Applications Open
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase">
                                <Lock className="h-3.5 w-3.5" />
                                Applications Closed
                            </span>
                        )}
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-primary uppercase">
                            Free
                        </span>
                    </div>

                    <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground">
                        {workshop.title}
                    </h2>

                    {workshop.short_description && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {workshop.short_description}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                        {workshop.number_of_sessions > 0 && (
                            <MetaChip icon={CalendarDays}>
                                {workshop.number_of_sessions} sessions
                            </MetaChip>
                        )}
                        {dates && <MetaChip icon={Clock}>{dates}</MetaChip>}
                        {workshop.max_applicants && (
                            <MetaChip icon={Users}>
                                {isOpen && workshop.remaining_places !== null
                                    ? `${workshop.remaining_places} place${workshop.remaining_places === 1 ? '' : 's'} remaining`
                                    : `Limited to ${workshop.max_applicants} participants`}
                            </MetaChip>
                        )}
                    </div>

                    <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col">
                            {isOpen && deadline ? (
                                <p className="text-xs font-semibold text-foreground">
                                    Apply by{' '}
                                    <span className="text-primary">
                                        {deadline}
                                    </span>
                                </p>
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    {sessions > 0
                                        ? `${sessions} application${sessions === 1 ? '' : 's'} received`
                                        : 'Registration is currently closed'}
                                </p>
                            )}
                            <Link
                                href={workshopShow.url({
                                    locale,
                                    workshop: workshop.slug,
                                })}
                                className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-bold text-muted-foreground transition-colors hover:text-primary"
                            >
                                View workshop details
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        {isOpen ? (
                            <Link
                                href={workshopApply.url({
                                    locale,
                                    workshop: workshop.slug,
                                })}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,166,244,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                            >
                                Apply Now
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : (
                            <span className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-6 py-3 text-sm font-bold text-muted-foreground">
                                <Lock className="h-4 w-4" />
                                Not available
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </RevealElement>
    );
};

const Index = () => {
    const { props } = usePage<{
        locale: string;
        ongoingWorkshops: Workshop[];
        pastWorkshops: Workshop[];
    }>();

    const locale = props.locale || 'en';
    const ongoingWorkshops = props.ongoingWorkshops ?? [];
    const pastWorkshops = props.pastWorkshops ?? [];

    return (
        <div className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 font-sans sm:px-6 lg:px-8">
            <Head title="Workshops" />

            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

            <div className="relative z-10 mx-auto max-w-6xl pt-24 lg:pt-32">
                {/* ============ HERO ============ */}
                <RevealElement>
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/30 bg-[#00A6F4]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(0,166,244,0.15)]">
                            <Sparkles className="h-4 w-4 text-[#00A6F4]" />
                            <span className="text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                Free Workshops
                            </span>
                        </div>
                        <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-foreground md:text-6xl">
                            Learn UX for Digital Health
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            EXER occasionally launches free, practical workshops
                            for students, health professionals and innovators.
                            We publish every edition here — applications can
                            only be submitted while a workshop is open.
                        </p>
                    </div>
                </RevealElement>

                {/* ============ ONGOING / UPCOMING ============ */}
                <section className="mt-20 lg:mt-24">
                    <RevealElement>
                        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-primary uppercase">
                                    <CalendarRange className="h-4 w-4" />
                                    Upcoming & Ongoing
                                </span>
                                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                    Editions you can still join
                                </h2>
                            </div>
                            <p className="max-w-sm text-sm text-muted-foreground">
                                Seats are limited and registration does not
                                guarantee selection.
                            </p>
                        </div>
                    </RevealElement>

                    {ongoingWorkshops.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {ongoingWorkshops.map((workshop) => (
                                <WorkshopCard
                                    key={workshop.id}
                                    workshop={workshop}
                                    locale={locale}
                                />
                            ))}
                        </div>
                    ) : (
                        <RevealElement delay={80}>
                            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center backdrop-blur-xl">
                                <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                                    <BellRing className="h-5 w-5" />
                                </span>
                                <h3 className="mb-2 text-lg font-bold text-foreground">
                                    No workshop is open right now
                                </h3>
                                <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
                                    New free editions are announced from time to
                                    time. Get in touch and we will let you know
                                    as soon as applications open again.
                                </p>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                                >
                                    <Mail className="h-4 w-4" />
                                    Notify me about the next edition
                                </Link>
                            </div>
                        </RevealElement>
                    )}
                </section>

                {/* ============ PAST EDITIONS ============ */}
                <section className="mt-20 lg:mt-24">
                    <RevealElement>
                        <div className="mb-8">
                            <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-secondary uppercase">
                                <History className="h-4 w-4" />
                                Past Editions
                            </span>
                            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                Workshops we have already delivered
                            </h2>
                        </div>
                    </RevealElement>

                    {pastWorkshops.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {pastWorkshops.map((workshop, i) => {
                                const dates = formatRange(
                                    workshop.start_date,
                                    workshop.end_date,
                                );

                                return (
                                    <RevealElement
                                        key={workshop.id}
                                        delay={i * 60}
                                    >
                                        <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card/60 p-7 backdrop-blur-xl transition-all hover:border-secondary/30 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-start gap-4">
                                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
                                                    <GraduationCap className="h-5 w-5" />
                                                </span>
                                                <div>
                                                    <div className="mb-1 flex flex-wrap items-center gap-2">
                                                        <h3 className="text-base font-bold text-foreground">
                                                            {workshop.title}
                                                        </h3>
                                                        <span className="rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase">
                                                            Completed
                                                        </span>
                                                    </div>
                                                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                                                        {workshop.short_description ??
                                                            'A past edition of our free workshop series.'}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {dates && (
                                                            <MetaChip
                                                                icon={Clock}
                                                            >
                                                                {dates}
                                                            </MetaChip>
                                                        )}
                                                        {workshop.number_of_sessions >
                                                            0 && (
                                                            <MetaChip
                                                                icon={
                                                                    CalendarDays
                                                                }
                                                            >
                                                                {
                                                                    workshop.number_of_sessions
                                                                }{' '}
                                                                sessions
                                                            </MetaChip>
                                                        )}
                                                        {workshop.applicants_count ? (
                                                            <MetaChip
                                                                icon={Users}
                                                            >
                                                                {
                                                                    workshop.applicants_count
                                                                }{' '}
                                                                applications
                                                            </MetaChip>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <Link
                                                href={workshopShow.url({
                                                    locale,
                                                    workshop: workshop.slug,
                                                })}
                                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-bold text-foreground transition-all hover:border-secondary/40 hover:text-secondary"
                                            >
                                                View recap
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </RevealElement>
                                );
                            })}
                        </div>
                    ) : (
                        <RevealElement delay={80}>
                            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-8 text-center backdrop-blur-xl">
                                <p className="text-sm text-muted-foreground">
                                    Our past editions will be listed here once
                                    the first series is completed.
                                </p>
                            </div>
                        </RevealElement>
                    )}
                </section>

                {/* ============ CTA ============ */}
                <RevealElement delay={100}>
                    <div className="relative mt-20 overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-secondary/10 p-9 backdrop-blur-xl lg:mt-24">
                        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-foreground">
                                    Applications only open for a limited time
                                </h3>
                                <p className="max-w-xl text-sm text-muted-foreground">
                                    Each free edition accepts a small number of
                                    participants. Keep an eye on this page, or
                                    reach out so we can keep you informed.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-3 sm:flex-row">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03]"
                                >
                                    Contact EXER
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={`/${locale}`}
                                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-background/60 px-7 text-sm font-bold text-foreground transition-all hover:border-primary/30 hover:text-primary"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </RevealElement>
            </div>
        </div>
    );
};

Index.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Index;
