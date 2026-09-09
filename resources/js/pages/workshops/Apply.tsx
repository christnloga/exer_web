import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    Clock,
    GraduationCap,
    Sparkles,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import { show as workshopShow } from '@/routes/workshop';
import { store as storeApplication } from '@/routes/workshop/apply';
import type { Workshop } from '@/types';

interface WorkshopApplicationForm {
    full_name: string;
    email: string;
    phone: string;
    linkedin_url: string;
    gender: string;
    language: string;
    background: string;
    field_of_study: string;
    digital_health_experience: string;
    motivation: string;
    interests: string[];
    previous_project_experience: string;
    previous_project_description: string;
    commitment: string;
    goals: string;
    referral_source: string;
    consent: boolean;
}

const BACKGROUND_OPTIONS = [
    { value: 'healthcare_professional', label: 'Healthcare professional' },
    { value: 'student', label: 'Student' },
    { value: 'recent_graduate', label: 'Recent graduate' },
    { value: 'technology_it_professional', label: 'Technology / IT professional' },
    { value: 'ux_ui_professional', label: 'UX / UI professional' },
    { value: 'product_project_professional', label: 'Product / Project professional' },
    { value: 'entrepreneur_founder', label: 'Entrepreneur / Founder' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'public_health_professional', label: 'Public health professional' },
    { value: 'ngo_development_professional', label: 'NGO / Development professional' },
    { value: 'other', label: 'Other' },
];

const EXPERIENCE_OPTIONS = [
    { value: 'completely_new', label: 'I am completely new to digital health' },
    { value: 'basic_knowledge', label: 'I have basic knowledge' },
    { value: 'studied_or_worked', label: 'I have studied or worked on digital health projects' },
    { value: 'currently_work', label: 'I currently work in digital health' },
    // { value: 'significant_experience', label: 'I have significant experience in digital health' },
];

const INTEREST_OPTIONS = [
    // { value: 'digital_health', label: 'Digital Health' },
    { value: 'ux_user_research', label: 'UX / User Research' },
    { value: 'product_management', label: 'Product Management' },
    { value: 'ai_in_healthcare', label: 'Artificial Intelligence in Healthcare' },
    { value: 'healthcare_innovation', label: 'Healthcare Innovation' },
    { value: 'healthtech_entrepreneurship', label: 'HealthTech Entrepreneurship' },
    { value: 'healthcare_accessibility', label: 'Healthcare Accessibility' },
    // { value: 'patient_experience', label: 'Patient Experience' },
    { value: 'digital_health_research', label: 'Digital Health Research' },
    { value: 'other', label: 'Other' },
];

const COMMITMENT_OPTIONS = [
    { value: 'yes_commit', label: 'Yes, I can commit to all four sessions.' },
    { value: 'most_sessions', label: 'I can attend most sessions but may have a scheduling conflict.' },
    { value: 'not_sure', label: 'I am not sure yet.' },
];

const REFERRAL_OPTIONS = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'friend_colleague', label: 'Friend / colleague' },
    { value: 'university_school', label: 'University / school' },
    { value: 'professional_network', label: 'Professional network' },
    { value: 'other', label: 'Other' },
];

const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non_binary', label: 'Non-binary' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const LANGUAGE_OPTIONS = [
    { value: 'english', label: 'English' },
    { value: 'french', label: 'French' },
    { value: 'bilingual', label: 'Bilingual (English & French)' },
    { value: 'other', label: 'Other' },
];

const Apply = () => {
    const { props } = usePage();
    const locale = (props as any).locale || 'en';
    const workshop = (props as any).workshop as Workshop;
    const registrationOpen = (props as any).registrationOpen as boolean;

    const [step, setStep] = useState<number>(1);
    const totalSteps: number = 5;

    const { data, setData, post, processing, errors } =
        useForm<WorkshopApplicationForm>({
            full_name: '',
            email: '',
            phone: '',
            linkedin_url: '',
            gender: '',
            language: '',
            background: '',
            field_of_study: '',
            digital_health_experience: '',
            motivation: '',
            interests: [],
            previous_project_experience: '',
            previous_project_description: '',
            commitment: '',
            goals: '',
            referral_source: '',
            consent: false,
        });

    const nextStep = (): void =>
        setStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = (): void => setStep((prev) => Math.max(prev - 1, 1));

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post(storeApplication.url({ locale, workshop: workshop.slug }));
    };

    const toggleInterest = (value: string): void => {
        const current = data.interests;
        if (current.includes(value)) {
            setData(
                'interests',
                current.filter((item) => item !== value),
            );
        } else if (current.length < 3) {
            setData('interests', [...current, value]);
        }
    };

    const inputClass =
        'mt-2 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card/60 focus:outline-none focus:ring-1 focus:ring-primary/50';
    const labelClass =
        'block text-xs font-semibold uppercase tracking-wider text-muted-foreground';
    const helperClass = 'mt-1.5 text-xs text-muted-foreground';

    const stepTitles = [
        { title: 'About You', desc: 'Basic contact information' },
        { title: 'Your Background', desc: 'Who you are & experience' },
        { title: 'Your Interest', desc: 'Motivation & areas of interest' },
        { title: 'Commitment', desc: 'Availability & goals' },
        { title: 'Final Step', desc: 'Referral & consent' },
    ];

    const renderRadioGroup = (
        field: keyof Pick<
            WorkshopApplicationForm,
            | 'background'
            | 'digital_health_experience'
            | 'commitment'
            | 'referral_source'
        >,
        options: { value: string; label: string }[],
    ) => (
        <div className="mt-2 grid gap-2.5">
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all duration-200 ${
                        data[field] === option.value
                            ? 'border-primary/60 bg-primary/5 shadow-[0_0_15px_rgba(0,166,244,0.1)]'
                            : 'border-border bg-card hover:border-primary/30'
                    }`}
                >
                    <input
                        type="radio"
                        name={field}
                        value={option.value}
                        checked={data[field] === option.value}
                        onChange={(e) =>
                            setData(field, e.target.value as never)
                        }
                        className="mt-0.5 h-4 w-4 accent-primary"
                    />
                    <span className="leading-relaxed text-foreground">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );

    if (!registrationOpen) {
        return (
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 font-sans sm:px-6 lg:px-8">
                <Head title={`Applications Closed - ${workshop?.title ?? 'Workshop'}`} />
                <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
                <div className="relative z-10 mx-auto max-w-xl py-20 text-center">
                    <RevealElement>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                Applications Closed
                            </span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                            Registration for this workshop is currently closed
                        </h1>
                        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            {workshop?.title
                                ? `Thank you for your interest in ${workshop.title}.`
                                : 'Thank you for your interest.'}{' '}
                            Applications are limited and we are no longer
                            accepting new submissions. Please check back soon
                            for future workshops.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(0,166,244,0.3)] transition-all hover:-translate-y-0.5"
                        >
                            Return Home
                        </Link>
                    </RevealElement>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 font-sans sm:px-6 lg:px-8">
            <Head title={`Apply - ${workshop?.title ?? 'Workshop'}`} />

            {/* Background Glows */}
            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

            <div className="relative z-10 mx-auto max-w-7xl pt-24 lg:pt-32">
                {/* Back Link */}
                <RevealElement>
                    <Link
                        href={workshopShow.url({ locale, workshop: workshop.slug })}
                        className="mb-12 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to Workshop
                    </Link>
                </RevealElement>

                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Left Column - Context & Motivation */}
                    <div className="lg:col-span-5 lg:pr-8">
                        <RevealElement delay={100}>
                            <div className="sticky top-32">
                                {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                                        {workshop?.title ?? 'Workshop Application'}
                                    </span>
                                </div> */}
                                <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-foreground lg:text-5xl">
                                    Design better{' '}
                                    <span className="bg-primary bg-clip-text text-transparent">
                                        digital health
                                    </span>{' '}
                                    experiences.
                                </h1>
                                <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
                                    Apply to join a hands-on workshop focused on
                                    user experience, research, and innovation in
                                    healthcare. Places are limited and
                                    registration does not automatically
                                    guarantee selection.
                                </p>

                                {workshop && (
                                    <div className="mb-10 flex flex-wrap gap-3">
                                        {workshop.number_of_sessions > 0 && (
                                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                                <GraduationCap className="h-3.5 w-3.5 text-primary" />
                                                {workshop.number_of_sessions} sessions
                                            </div>
                                        )}
                                        {workshop.max_applicants && (
                                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                                <Users className="h-3.5 w-3.5 text-primary" />
                                                Limited to {workshop.max_applicants} places
                                            </div>
                                        )}
                                        {workshop.application_deadline && (
                                            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
                                                <Clock className="h-3.5 w-3.5 text-primary" />
                                                Apply by{' '}
                                                {new Date(
                                                    workshop.application_deadline,
                                                ).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Steps Indicator Sidebar (Desktop) */}
                                <div className="relative hidden flex-col gap-6 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-border lg:flex">
                                    {stepTitles.map((stepItem, index) => {
                                        const stepNumber = index + 1;
                                        return (
                                            <div
                                                key={stepItem.title}
                                                className={`relative flex items-center gap-6 transition-opacity duration-300 ${
                                                    step >= stepNumber
                                                        ? 'opacity-100'
                                                        : 'opacity-40'
                                                }`}
                                            >
                                                <div
                                                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                                                        step > stepNumber
                                                            ? 'border-primary bg-primary'
                                                            : step === stepNumber
                                                              ? 'border-primary bg-background'
                                                              : 'border-border bg-background'
                                                    } shadow-[0_0_10px_rgba(0,166,244,0.2)]`}
                                                >
                                                    {step > stepNumber ? (
                                                        <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                                                    ) : (
                                                        <div
                                                            className={`h-2 w-2 rounded-full ${
                                                                step === stepNumber
                                                                    ? 'bg-primary'
                                                                    : 'bg-transparent'
                                                            }`}
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                                                        {stepItem.title}
                                                    </h4>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {stepItem.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                                    {/* Mobile Progress Bar */}
                                    <div className="mb-8 lg:hidden">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-bold tracking-wider text-primary uppercase">
                                                Step {step} of {totalSteps}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {stepTitles[step - 1].title}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {stepTitles.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                                                        step >= index + 1
                                                            ? 'bg-primary'
                                                            : 'bg-border'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <form onSubmit={submit}>
                                        {/* STEP 1: About You */}
                                        {step === 1 && (
                                            <div className="animate-fade-in-up space-y-6">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <div>
                                                        <label className={labelClass}>
                                                            Full Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Jane Doe"
                                                            value={data.full_name}
                                                            onChange={(e) =>
                                                                setData('full_name', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        />
                                                        <p className={helperClass}>
                                                            As you would like it to appear on your certificate.
                                                        </p>
                                                        {errors.full_name && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.full_name}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Email Address *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="jane@example.com"
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
                                                            WhatsApp / Phone Number *
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
                                                        <p className={helperClass}>
                                                            Used for workshop communication and updates.
                                                        </p>
                                                        {errors.phone && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            LinkedIn Profile (Optional)
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://linkedin.com/in/..."
                                                            value={data.linkedin_url}
                                                            onChange={(e) =>
                                                                setData('linkedin_url', e.target.value)
                                                            }
                                                            className={inputClass}
                                                        />
                                                        {errors.linkedin_url && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.linkedin_url}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Gender *
                                                        </label>
                                                        <select
                                                            value={data.gender}
                                                            onChange={(e) =>
                                                                setData('gender', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        >
                                                            <option value="" disabled>
                                                                Select gender
                                                            </option>
                                                            {GENDER_OPTIONS.map((option) => (
                                                                <option
                                                                    key={option.value}
                                                                    value={option.value}
                                                                >
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.gender && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.gender}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={labelClass}>
                                                            Preferred Language *
                                                        </label>
                                                        <select
                                                            value={data.language}
                                                            onChange={(e) =>
                                                                setData('language', e.target.value)
                                                            }
                                                            required
                                                            className={inputClass}
                                                        >
                                                            <option value="" disabled>
                                                                Select language
                                                            </option>
                                                            {LANGUAGE_OPTIONS.map((option) => (
                                                                <option
                                                                    key={option.value}
                                                                    value={option.value}
                                                                >
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors.language && (
                                                            <div className="mt-2 text-xs text-red-400">
                                                                {errors.language}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: Your Background */}
                                        {step === 2 && (
                                            <div className="animate-fade-in-up space-y-8">
                                                <div>
                                                    <label className={labelClass}>
                                                        What best describes you? *
                                                    </label>
                                                    {renderRadioGroup('background', BACKGROUND_OPTIONS)}
                                                    {errors.background && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.background}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        Current field, profession or area of study *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., Public health researcher"
                                                        value={data.field_of_study}
                                                        onChange={(e) =>
                                                            setData('field_of_study', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                    />
                                                    {errors.field_of_study && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.field_of_study}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        Current experience with digital health *
                                                    </label>
                                                    {renderRadioGroup('digital_health_experience', EXPERIENCE_OPTIONS)}
                                                    {errors.digital_health_experience && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.digital_health_experience}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: Your Interest */}
                                        {step === 3 && (
                                            <div className="animate-fade-in-up space-y-8">
                                                <div>
                                                    <label className={labelClass}>
                                                        Why do you want to participate? *
                                                    </label>
                                                    <p className={helperClass}>
                                                        Tell us briefly what motivated you to apply and what you hope to gain from the workshop.
                                                    </p>
                                                    <textarea
                                                        rows={4}
                                                        value={data.motivation}
                                                        onChange={(e) =>
                                                            setData('motivation', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="Tell us your story..."
                                                    ></textarea>
                                                    {errors.motivation && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.motivation}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center justify-between">
                                                        <label className={labelClass}>
                                                            Which area interests you the most? *
                                                        </label>
                                                        <span className="text-xs font-semibold text-muted-foreground">
                                                            {data.interests.length}/3 selected
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                                                        {INTEREST_OPTIONS.map((option) => {
                                                            const isSelected =
                                                                data.interests.includes(option.value);
                                                            return (
                                                                <label
                                                                    key={option.value}
                                                                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-all duration-200 ${
                                                                        isSelected
                                                                            ? 'border-primary/60 bg-primary/5 shadow-[0_0_15px_rgba(0,166,244,0.1)]'
                                                                            : 'border-border bg-card hover:border-primary/30'
                                                                    }`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() =>
                                                                            toggleInterest(option.value)
                                                                        }
                                                                        className="h-4 w-4 accent-primary"
                                                                    />
                                                                    <span className="leading-relaxed text-foreground">
                                                                        {option.label}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                    <p className={helperClass}>
                                                        Select up to 3.
                                                    </p>
                                                    {errors.interests && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.interests}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        Have you previously worked on a healthcare, technology or digital health project? *
                                                    </label>
                                                    <div className="mt-2 flex gap-3">
                                                        {[
                                                            { value: '1', label: 'Yes' },
                                                            { value: '0', label: 'No' },
                                                        ].map((option) => (
                                                            <label
                                                                key={option.value}
                                                                className={`flex-1 cursor-pointer rounded-xl border p-3.5 text-center text-sm transition-all duration-200 ${
                                                                    data.previous_project_experience ===
                                                                    option.value
                                                                        ? 'border-primary/60 bg-primary/5'
                                                                        : 'border-border bg-card hover:border-primary/30'
                                                                }`}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="previous_project_experience"
                                                                    value={option.value}
                                                                    checked={
                                                                        data.previous_project_experience ===
                                                                        option.value
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            'previous_project_experience',
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="sr-only"
                                                                />
                                                                {option.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                    {data.previous_project_experience === '1' && (
                                                        <div className="mt-4">
                                                            <label className={labelClass}>
                                                                Briefly describe the project and your role. (Optional)
                                                            </label>
                                                            <textarea
                                                                rows={3}
                                                                value={data.previous_project_description}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        'previous_project_description',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className={inputClass}
                                                                placeholder="I worked on..."
                                                            ></textarea>
                                                            {errors.previous_project_description && (
                                                                <div className="mt-2 text-xs text-red-400">
                                                                    {errors.previous_project_description}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                    {errors.previous_project_experience && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.previous_project_experience}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 4: Commitment */}
                                        {step === 4 && (
                                            <div className="animate-fade-in-up space-y-8">
                                                <div>
                                                    <label className={labelClass}>
                                                        Can you commit to participating in all four workshop sessions? *
                                                    </label>
                                                    {renderRadioGroup('commitment', COMMITMENT_OPTIONS)}
                                                    {errors.commitment && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.commitment}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className={labelClass}>
                                                        What would you like to be able to do differently after this workshop? *
                                                    </label>
                                                    <p className={helperClass}>
                                                        For example: understand users better, improve a digital health product, explore a career in HealthTech, develop a project idea, conduct UX research, use AI more effectively, etc.
                                                    </p>
                                                    <textarea
                                                        rows={4}
                                                        value={data.goals}
                                                        onChange={(e) =>
                                                            setData('goals', e.target.value)
                                                        }
                                                        required
                                                        className={inputClass}
                                                        placeholder="After this workshop, I want to..."
                                                    ></textarea>
                                                    {errors.goals && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.goals}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 5: Final */}
                                        {step === 5 && (
                                            <div className="animate-fade-in-up space-y-8">
                                                <div>
                                                    <label className={labelClass}>
                                                        How did you hear about the workshop? *
                                                    </label>
                                                    {renderRadioGroup('referral_source', REFERRAL_OPTIONS)}
                                                    {errors.referral_source && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.referral_source}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm transition-colors hover:border-primary/30">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.consent}
                                                            onChange={(e) =>
                                                                setData('consent', e.target.checked)
                                                            }
                                                            className="mt-0.5 h-4 w-4 accent-primary"
                                                        />
                                                        <span className="leading-relaxed text-foreground">
                                                            I confirm that the information provided is
                                                            accurate and that I am interested in
                                                            participating in the Digital Health UX
                                                            Foundations Workshop. I understand that
                                                            places are limited and that registration
                                                            does not automatically guarantee selection.
                                                        </span>
                                                    </label>
                                                    {errors.consent && (
                                                        <div className="mt-2 text-xs text-red-400">
                                                            {errors.consent}
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
                                                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
                                                    step === 1
                                                        ? 'cursor-not-allowed text-muted-foreground/30'
                                                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground'
                                                }`}
                                            >
                                                Back
                                            </button>

                                            {step < totalSteps ? (
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-all hover:-translate-y-0.5 hover:bg-foreground/90"
                                                >
                                                    Continue
                                                    <ArrowRight className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary px-8 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:hover:translate-y-0"
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
