import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle2,
    Home,
    Mail,
    Sparkles,
} from 'lucide-react';
import React from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import { home } from '@/routes';
import { show as workshopShow } from '@/routes/workshop';
import type { Workshop } from '@/types';

const ApplySuccess = () => {
    const { props } = usePage();
    const locale = (props as any).locale || 'en';
    const workshop = (props as any).workshop as Workshop;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 font-sans sm:px-6 lg:px-8">
            <Head title="Application Received" />

            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

            <div className="relative z-10 mx-auto max-w-2xl py-20 text-center">
                <RevealElement>
                    <div className="mb-8 flex justify-center">
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-primary/20 shadow-[0_0_40px_rgba(0,166,244,0.3)]">
                            <div
                                className="absolute inset-0 animate-[spin_4s_linear_infinite] rounded-full border border-border"
                                style={{ borderStyle: 'dashed' }}
                            ></div>
                            <CheckCircle2 className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                </RevealElement>

                <RevealElement delay={100}>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 shadow-[0_0_15px_rgba(0,166,244,0.15)]">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-xs font-bold tracking-widest text-primary uppercase">
                            Application Received
                        </span>
                    </div>
                </RevealElement>

                <RevealElement delay={200}>
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                        Thank you for{' '}
                        <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                            applying
                        </span>
                    </h1>
                </RevealElement>

                <RevealElement delay={300}>
                    <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
                        {workshop
                            ? `Your application for ${workshop.title} has been securely received. `
                            : 'Your application has been securely received. '}
                        Places are limited and registration does not
                        automatically guarantee selection. Selected
                        participants will receive confirmation and further
                        information by email/WhatsApp.
                    </p>
                </RevealElement>

                <RevealElement delay={400}>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href={home.url()}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,166,244,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                        >
                            <Home className="h-4 w-4" />
                            Return Home
                        </Link>
                        {workshop && (
                            <Link
                                href={workshopShow.url({
                                    locale,
                                    workshop: workshop.slug,
                                })}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 py-3 text-sm font-bold text-foreground transition-all hover:border-border/60 hover:bg-card/80"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Workshop
                            </Link>
                        )}
                    </div>
                </RevealElement>

                <RevealElement delay={500}>
                    <div className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        Keep an eye on your inbox for confirmation.
                    </div>
                </RevealElement>
            </div>
        </div>
    );
};

ApplySuccess.layout = (page: React.ReactNode) => (
    <MainLayout children={page} />
);
export default ApplySuccess;
