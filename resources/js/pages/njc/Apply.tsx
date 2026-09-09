import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, ChevronLeft, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import { store as applyStore } from '@/routes/apply';
import { landing } from '@/routes/page/njc';

// 1. Define the shape of our form data
interface ApplicationForm {
    name: string;
    email: string;
    phone: string;
    city: string;
    university: string;
    graduation_year: string;
    portfolio_url: string;
    github_url: string;
    discipline: string;
    stack: string;
    mindset_answer_1: string;
    mindset_answer_2: string;
    mindset_answer_3: string;
}

const Apply = () => {
    const { props } = usePage();
    const locale = (props as any).locale || 'fr';

    const [step, setStep] = useState<number>(1);
    const totalSteps: number = 3;

    // 2. Pass the interface to Inertia's generic useForm hook
    const { data, setData, post, processing, errors } =
        useForm<ApplicationForm>({
            name: '',
            email: '',
            phone: '',
            city: '',
            university: '',
            graduation_year: '',
            portfolio_url: '',
            github_url: '',
            discipline: '',
            stack: '',
            mindset_answer_1: '',
            mindset_answer_2: '',
            mindset_answer_3: '',
        });

    const nextStep = (): void =>
        setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = (): void => setStep((prev) => Math.max(prev - 1, 1));

    // 3. Type the form submission event
    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(applyStore.url({ locale }));
    };

    const inputClass =
        'mt-2 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card/60 focus:outline-none focus:ring-1 focus:ring-primary/50';
    const labelClass =
        'block text-xs font-semibold uppercase tracking-wider text-muted-foreground';

    return (
        <div className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 font-sans sm:px-6 lg:px-8">
            <Head title="Apply for NJC 2026" />

            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

            <div className="relative z-10 mx-auto max-w-7xl pt-24 lg:pt-32">
                {/* Back Link */}
                <RevealElement>
                    <Link
                        href={landing.url()}
                        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to NJC Setup
                    </Link>
                </RevealElement>

                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Left Column - Context & Motivation */}
                    <div className="lg:col-span-5 lg:pr-8">
                        <RevealElement delay={100}>
                            <div className="sticky top-32">
                                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/30 bg-[#00A6F4]/10 px-4 py-1.5 shadow-[0_0_15px_rgba(0,166,244,0.15)]">
                                    <Sparkles className="h-4 w-4 text-[#00A6F4]" />
                                    <span className="text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                        NJC 2026 Cohort
                                    </span>
                                </div>
                                <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-foreground lg:text-5xl">
                                    Join the next generation of{' '}
                                    <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                        Builders
                                    </span>
                                    .
                                </h1>
                                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
                                    We're looking for individuals who are
                                    obsessed with solving problems, designing
                                    beautiful interfaces, and engineering robust
                                    solutions.
                                </p>

                                {/* Steps Indicator Sidebar (Desktop) */}
                                <div className="relative hidden flex-col gap-6 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-border lg:flex">
                                    <div
                                        className={`relative flex items-center gap-6 transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}
                                    >
                                        <div
                                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${step > 1 ? 'border-primary bg-primary' : step === 1 ? 'border-primary bg-background' : 'border-border bg-background'} shadow-[0_0_10px_rgba(0,166,244,0.2)]`}
                                        >
                                            {step > 1 ? (
                                                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                            ) : (
                                                <div
                                                    className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-transparent'}`}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                                                The Foundation
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Basic information & background
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`relative flex items-center gap-6 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}
                                    >
                                        <div
                                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${step > 2 ? 'border-primary bg-primary' : step === 2 ? 'border-primary bg-background' : 'border-border bg-background'} shadow-[0_0_10px_rgba(0,166,244,0.2)]`}
                                        >
                                            {step > 2 ? (
                                                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                            ) : (
                                                <div
                                                    className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-transparent'}`}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                                                The Craft
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Your skills & digital footprint
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className={`relative flex items-center gap-6 transition-opacity duration-300 ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}
                                    >
                                        <div
                                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${step === 3 ? 'border-primary bg-background' : 'border-border bg-background'} shadow-[0_0_10px_rgba(0,166,244,0.2)]`}
                                        >
                                            <div
                                                className={`h-2 w-2 rounded-full ${step === 3 ? 'bg-primary' : 'bg-transparent'}`}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                                                The Mindset
                                            </h4>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                How you approach problems
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealElement>
                    </div>

                    {/* Right Column - Form */}
                    <div className="lg:col-span-7">
                        <RevealElement delay={200}>
                            <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-linear-to-b from-foreground/10 to-foreground/5 p-px shadow-2xl">
                                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/10 via-transparent to-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                <div className="relative rounded-3xl bg-card p-6 sm:p-10">
                                    {/* Mobile Progress Bar (Visible only on mobile) */}
                                    <div className="mb-8 lg:hidden">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                                Step {step} of 3
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {step === 1
                                                    ? 'The Foundation'
                                                    : step === 2
                                                      ? 'The Craft'
                                                      : 'The Mindset'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3].map((s) => (
                                                <div
                                                    key={s}
                                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= s ? 'bg-primary' : 'bg-border'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <form onSubmit={submit}>
                                        {/* STEP 1: The Foundation */}
                                        {step === 1 && (
                                            <div className="animate-fade-in-up space-y-6">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div>
                                                        <label className={labelClass}>
                                                            Full Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="John Doe"
                                                            value={data.name}
                                                            onChange={(e) =>
                                                                setData('name', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                        {errors.name && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            value={data.email}
                                                            onChange={(e) =>
                                                                setData('email', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                        {errors.email && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.email}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            WhatsApp Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            placeholder="+237 6..."
                                                            value={data.phone}
                                                            onChange={(e) =>
                                                                setData('phone', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Current City
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Douala, Cameroon"
                                                            value={data.city}
                                                            onChange={(e) =>
                                                                setData('city', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        University
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="University of Buea"
                                                        value={data.university}
                                                        onChange={(e) =>
                                                            setData('university', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div>
                                                        <label className={labelClass}>
                                                            Degree
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="BSc. Software Engineering"
                                                            value={data.university}
                                                            onChange={(e) =>
                                                                setData('university', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Graduation Year
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="2020"
                                                            max="2026"
                                                            placeholder="2024"
                                                            value={data.graduation_year}
                                                            onChange={(e) =>
                                                                setData('graduation_year', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: The Craft */}
                                        {step === 2 && (
                                            <div className="animate-fade-in-up space-y-6">
                                                <div>
                                                    <label className={labelClass}>
                                                        Primary Discipline
                                                    </label>
                                                    <select
                                                        value={data.discipline}
                                                        onChange={(e) =>
                                                            setData('discipline', e.target.value)
                                                        }
                                                        required
                                                        className={`${inputClass} appearance-none [&>option]:bg-card [&>option]:text-foreground`}
                                                    >
                                                        <option value="" disabled>
                                                            Select your focus...
                                                        </option>
                                                        <option value="ux_ui">UX/UI Design</option>
                                                        <option value="frontend">Frontend Development</option>
                                                        <option value="backend">Backend Development</option>
                                                        <option value="fullstack">Full-Stack Development</option>
                                                    </select>
                                                    {errors.discipline && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.discipline}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div>
                                                        <label className={labelClass}>
                                                            Portfolio URL (Optional)
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://"
                                                            value={data.portfolio_url}
                                                            onChange={(e) =>
                                                                setData('portfolio_url', e.target.value)
                                                            }
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            GitHub URL (Optional)
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://"
                                                            value={data.github_url}
                                                            onChange={(e) =>
                                                                setData('github_url', e.target.value)
                                                            }
                                                            className={inputClass}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        The Stack
                                                    </label>
                                                    <p className="mb-2 mt-1 text-xs text-muted-foreground">
                                                        List the tools, frameworks, and languages you are comfortable with.
                                                    </p>
                                                    <textarea
                                                        rows={3}
                                                        value={data.stack}
                                                        onChange={(e) =>
                                                            setData('stack', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="e.g., React, Node.js, Figma, Laravel..."
                                                    ></textarea>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: The Mindset */}
                                        {step === 3 && (
                                            <div className="animate-fade-in-up space-y-6">
                                                <div>
                                                    <label className={labelClass}>
                                                        1. Why do you want to be one of the 25?
                                                    </label>
                                                    <p className="mb-2 mt-1 text-xs text-muted-foreground">
                                                        What makes your approach to problem-solving unique?
                                                    </p>
                                                    <textarea
                                                        rows={4}
                                                        value={data.mindset_answer_2}
                                                        onChange={(e) =>
                                                            setData('mindset_answer_2', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="Tell us your story..."
                                                    ></textarea>
                                                    {errors.mindset_answer_2 && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.mindset_answer_2}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        2. Identify one "broken" digital experience.
                                                    </label>
                                                    <p className="mb-2 mt-1 text-xs text-muted-foreground">
                                                        Think of a major firm or service in Cameroon. How would you architect a solution to fix it? Think like a Solution Architect. Max 300 words.
                                                    </p>
                                                    <textarea
                                                        rows={4}
                                                        value={data.mindset_answer_1}
                                                        onChange={(e) =>
                                                            setData('mindset_answer_1', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="I would fix..."
                                                    ></textarea>
                                                    {errors.mindset_answer_1 && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.mindset_answer_1}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        3. Tell us about something you built.
                                                    </label>
                                                    <p className="mb-2 mt-1 text-xs text-muted-foreground">
                                                        Or something you tried to build. What did you learn?
                                                    </p>
                                                    <textarea
                                                        rows={4}
                                                        value={data.mindset_answer_3}
                                                        onChange={(e) =>
                                                            setData('mindset_answer_3', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="I built..."
                                                    ></textarea>
                                                    {errors.mindset_answer_3 && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.mindset_answer_3}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Navigation Footer */}
                                        <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                disabled={step === 1 || processing}
                                                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${step === 1 ? 'cursor-not-allowed text-muted-foreground/30' : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'}`}
                                            >
                                                Back
                                            </button>

                                            {step < totalSteps ? (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-bold text-background shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                                                >
                                                    Continue
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-8 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,166,244,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:hover:translate-y-0"
                                                >
                                                    {processing && (
                                                        <svg
                                                            className="h-4 w-4 animate-spin text-white"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                    )}
                                                    Submit Application
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </RevealElement>
                    </div>
                </div>
            </div>
        </div>
    );
};

Apply.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Apply;
