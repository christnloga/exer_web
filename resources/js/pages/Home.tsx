import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BookOpen,
    Brain,
    CalendarRange,
    ClipboardCheck,
    Compass,
    Cpu,
    FlaskConical,
    Gauge,
    GraduationCap,
    Hammer,
    HeartHandshake,
    HeartPulse,
    Layers,
    Lightbulb,
    MessagesSquare,
    MousePointerClick,
    PenTool,
    Rocket,
    ScanLine,
    Search,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Target,
    Users,
} from 'lucide-react';
import RevealElement from '@/components/RevealElement';
import { useGlobal } from '@/contexts/GlobalContext';
import MainLayout from '@/layouts/MainLayout';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
    {
        icon: Compass,
        title: 'Digital Health Product Strategy',
        description:
            'Transforming healthcare problems into viable digital product opportunities.',
        points: ['Opportunity mapping', 'Product roadmapping'],
        accent: 'from-primary to-cyan-400',
    },
    {
        icon: Search,
        title: 'UX Research & User-Centered Design',
        description:
            'Understanding users, workflows and pain points to design better healthcare experiences.',
        points: ['User research', 'Workflow analysis'],
        accent: 'from-secondary to-fuchsia-600',
    },
    {
        icon: Layers,
        title: 'Digital Health Product Development Support',
        description:
            'Supporting teams through ideation, validation, prototyping and implementation.',
        points: ['Prototyping', 'Implementation support'],
        accent: 'from-emerald-500 to-teal-400',
    },
    {
        icon: ClipboardCheck,
        title: 'UX & Product Consultancy',
        description:
            'Independent assessment and recommendations for existing digital health products.',
        points: ['Product audit', 'Strategic advice'],
        accent: 'from-amber-500 to-orange-400',
    },
];

const approach = [
    {
        icon: Search,
        step: '01',
        title: 'Discover',
        description: 'Understand the healthcare problem, users and context.',
    },
    {
        icon: FlaskConical,
        step: '02',
        title: 'Validate',
        description: 'Test assumptions with evidence and real users.',
    },
    {
        icon: Target,
        step: '03',
        title: 'Define',
        description: 'Translate insights into clear product requirements.',
    },
    {
        icon: PenTool,
        step: '04',
        title: 'Design',
        description: 'Create intuitive and user-centered experiences.',
    },
    {
        icon: Rocket,
        step: '05',
        title: 'Deploy',
        description: 'Support implementation, testing and improvement.',
    },
];

const whyJoin = [
    {
        icon: BookOpen,
        title: 'Learn',
        description:
            'Understand the foundations of UX and digital health innovation.',
    },
    {
        icon: Hammer,
        title: 'Practice',
        description:
            'Work on real healthcare problems and digital health products.',
    },
    {
        icon: Users,
        title: 'Connect',
        description:
            'Engage with digital health innovators and organizations in Cameroon.',
    },
    {
        icon: Layers,
        title: 'Build',
        description:
            'Develop practical experience for your portfolio and future projects.',
    },
    {
        icon: Compass,
        title: 'Discover',
        description:
            'Explore careers, volunteering, internships and collaboration in digital health.',
    },
];

const pricing = [
    {
        name: 'UX / Product Audit',
        description:
            'Independent assessment of an existing digital health product.',
        price: 'Request a quote',
        featured: false,
        features: [
            'Heuristic evaluation',
            'Usability review',
            'Prioritized recommendations',
        ],
    },
    {
        name: 'UX Research',
        description:
            'Evidence-based research to understand users and pain points.',
        price: 'Request a quote',
        featured: false,
        features: ['User interviews', 'Workflow mapping', 'Insight synthesis'],
    },
    {
        name: 'Digital Health Product Discovery',
        description:
            'Transform a healthcare problem into a validated product opportunity.',
        price: 'Request a quote',
        featured: true,
        features: [
            'Problem framing',
            'Validation sprints',
            'Product definition',
        ],
    },
    {
        name: 'Product Strategy Consultation',
        description: 'Focused, senior-level product and UX strategy guidance.',
        price: 'Per hour',
        featured: false,
        features: ['Strategy sessions', 'Decision support', 'Action plan'],
    },
    {
        name: 'Custom Consultancy',
        description:
            'Tailored support for your specific digital health challenge.',
        price: 'Request a quote',
        featured: false,
        features: [
            'Scoped to your needs',
            'Flexible engagement',
            'Ongoing support',
        ],
    },
];

const audiences = [
    {
        icon: Rocket,
        title: 'Healthcare Startups',
        description: 'Build products people can actually use.',
    },
    {
        icon: Stethoscope,
        title: 'Clinics & Healthcare Organizations',
        description: 'Improve patient and provider experiences.',
    },
    {
        icon: HeartHandshake,
        title: 'NGOs & Development Organizations',
        description: 'Design interventions around real community needs.',
    },
    {
        icon: Lightbulb,
        title: 'Digital Health Innovators',
        description: 'Turn healthcare problems into validated opportunities.',
    },
    {
        icon: Users,
        title: 'HealthTech Teams',
        description:
            'Strengthen existing products through UX research and strategy.',
    },
];

const intersection = [
    { icon: HeartPulse, label: 'Healthcare' },
    { icon: Cpu, label: 'Technology' },
    { icon: MousePointerClick, label: 'UX' },
    { icon: Lightbulb, label: 'Innovation' },
];

const lenses = [
    {
        id: 'healthcare',
        icon: HeartPulse,
        label: 'Healthcare',
        tagline: 'The clinical reality',
        question:
            'What does good care actually require — for the patient, the clinician, the health system?',
        description:
            'We start from how care is genuinely delivered: overstretched teams, referral gaps, records that never get digitised, patients without reliable power or literacy. Solutions that ignore this rarely survive a week in a real facility.',
        outcomes: [
            'Workflow mapping across patient, clinician and system',
            'Requirements grounded in clinical protocols, not assumptions',
            'A realistic view of what teams can absorb on day one',
        ],
        accent: {
            text: 'text-primary',
            chip: 'bg-primary/10',
            glow: 'bg-primary/25',
            dot: 'bg-primary',
        },
    },
    {
        id: 'technology',
        icon: Cpu,
        label: 'Technology',
        tagline: 'What the system can bear',
        question:
            'Which technology actually fits this setting — and who maintains it after launch?',
        description:
            'Not every problem needs AI. We weigh connectivity, devices, data quality and interoperability against the simplest option that still holds. Then we ask the question most teams skip: who keeps this running in year two?',
        outcomes: [
            'Feasibility reviews against real infrastructure',
            'Interoperability and data-quality checks',
            'Architecture sized to daily operations',
        ],
        accent: {
            text: 'text-secondary',
            chip: 'bg-secondary/10',
            glow: 'bg-secondary/25',
            dot: 'bg-secondary',
        },
    },
    {
        id: 'ux',
        icon: MousePointerClick,
        label: 'UX',
        tagline: 'What it feels like to use',
        question: 'Can a tired clinician at 2 a.m. use this without a manual?',
        description:
            'Design happens around the person at the end of the process — their language, literacy, cognitive load and interruptions. Usability is not polish; it is the difference between a tool that gets adopted and one that is quietly abandoned.',
        outcomes: [
            'Research with patients, providers and support staff',
            'Prototypes tested under realistic conditions',
            'Interfaces built for the device people actually hold',
        ],
        accent: {
            text: 'text-violet-500',
            chip: 'bg-violet-500/10',
            glow: 'bg-violet-500/25',
            dot: 'bg-violet-500',
        },
    },
    {
        id: 'innovation',
        icon: Lightbulb,
        label: 'Innovation',
        tagline: 'How it actually gets adopted',
        question: 'Who has to change what they do for this to work?',
        description:
            'Innovation is not the demo. It is the training session, the champion in the ward, the budget line, the policy that permits it. We plan for adoption from the first workshop so good ideas stop dying in pilots.',
        outcomes: [
            'Adoption and rollout planning from day one',
            'Alignment across clinical, technical and leadership teams',
            'Evaluation that shows whether it worked — and for whom',
        ],
        accent: {
            text: 'text-amber-500',
            chip: 'bg-amber-500/10',
            glow: 'bg-amber-500/25',
            dot: 'bg-amber-500',
        },
    },
];

const team = [
    {
        name: 'Emeline Ghislaine Mamekong',
        role: 'Digital Health Product Strategist, Biomedical Scientist',
        bio: 'Emeline combines biomedical science with product strategy, grounding every EXER decision in evidence and a deep understanding of the patients, providers and systems we design for.',
        image: '/file_0000000048a4820e9ccdf2939ae63c05.jpg',
        alt: 'Emeline Ghislaine Mamekong — Digital Health Product Strategist, Biomedical Scientist',
    },
    {
        name: 'Joseph Christ Nloga',
        role: 'Solution Architect & UX Designer',
        bio: 'Joseph leads the architecture and user experience of EXER’s digital health solutions — translating complex healthcare problems into clear, intuitive and well-structured products.',
        image: '/Professional Photo.jpg',
        alt: 'Joseph Christ Nloga — Solution Architect & UX Designer',
    },
];

/* ------------------------------------------------------------------ */
/*  Reusable pieces                                                    */
/* ------------------------------------------------------------------ */

const SectionBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
        {children}
    </span>
);

interface SectionIntroProps {
    badge: string;
    title: ReactNode;
    subtitle?: string;
    align?: 'left' | 'center';
}

const SectionIntro = ({
    badge,
    title,
    subtitle,
    align = 'center',
}: SectionIntroProps) => (
    <div
        className={`flex flex-col gap-4 ${
            align === 'center'
                ? 'items-center text-center'
                : 'items-start text-left'
        }`}
    >
        <SectionBadge>{badge}</SectionBadge>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {title}
        </h2>
        {subtitle && (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                {subtitle}
            </p>
        )}
    </div>
);

/* ------------------------------------------------------------------ */
/*  Hero visual (animated ECG mockup)                                  */
/* ------------------------------------------------------------------ */

const HeroVisual = () => (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        {/* Floating chips */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="absolute -top-6 -left-2 z-20 scale-90 animate-[float_6s_ease-in-out_infinite] lg:top-[40%] lg:-left-8 lg:scale-100"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HeartPulse className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">
                        User-Centered
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                        Built around real needs
                    </p>
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="absolute top-[45%] -right-2 z-20 scale-90 animate-[float_7s_ease-in-out_infinite] lg:top-1/3 lg:-right-10 lg:scale-100"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Brain className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">
                        AI-Powered
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                        Evidence & insight
                    </p>
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute -bottom-6 left-6 z-20 scale-90 animate-[float_8s_ease-in-out_infinite] lg:scale-100"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Stethoscope className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">
                        Clinical UX
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                        For providers & patients
                    </p>
                </div>
            </div>
        </motion.div>

        {/* Main mockup card */}
        <motion.img
            src="/hero-nurse.png"
            alt="Healthcare professional"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="z-20 drop-shadow-2xl"
        />
    </div>
);

/* ------------------------------------------------------------------ */
/*  Why EXER — four lenses                                             */
/* ------------------------------------------------------------------ */

const WhyExerLenses = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeLens = lenses[activeIndex];
    const activeNumber = String(activeIndex + 1).padStart(2, '0');

    const selectNextLens = () =>
        setActiveIndex((current) => (current + 1) % lenses.length);

    return (
        <section id="why-exer" className="scroll-mt-28 px-4 py-20 lg:py-28">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
                    <div className="pointer-events-none absolute -top-14 -left-10 hidden h-52 w-80 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [background-size:20px_20px] opacity-80 lg:block" />

                    <RevealElement className="relative lg:col-span-7">
                        <SectionBadge>Why EXER</SectionBadge>
                        <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
                            Health problems don’t arrive in one discipline.
                            <span className="mt-2 block bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                                Neither should your solution.
                            </span>
                        </h2>
                    </RevealElement>

                    <RevealElement delay={120} className="lg:col-span-5">
                        <p className="border-l-2 border-primary/30 pl-5 text-base leading-relaxed text-muted-foreground lg:text-[17px]">
                            A product can be clinically sound, technically
                            elegant and beautifully designed — and still be
                            abandoned. Before we design anything, we test it
                            against four lenses.
                        </p>
                    </RevealElement>
                </div>

                {/* Lens switcher + detail */}
                <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
                    {/* Mobile chooser */}
                    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
                        {lenses.map((lens, i) => {
                            const isActive = i === activeIndex;

                            return (
                                <button
                                    key={lens.id}
                                    type="button"
                                    onClick={() => setActiveIndex(i)}
                                    aria-pressed={isActive}
                                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                                        isActive
                                            ? `border-transparent ${lens.accent.chip} ${lens.accent.text}`
                                            : 'border-border bg-card/60 text-muted-foreground'
                                    }`}
                                >
                                    <lens.icon className="size-4" />
                                    {lens.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop lens list */}
                    <div className="hidden lg:block">
                        <div className="flex flex-col gap-2">
                            {lenses.map((lens, i) => {
                                const isActive = i === activeIndex;

                                return (
                                    <button
                                        key={lens.id}
                                        type="button"
                                        onClick={() => setActiveIndex(i)}
                                        aria-pressed={isActive}
                                        className={`group relative flex items-start gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                                            isActive
                                                ? 'border-border bg-card shadow-lg shadow-foreground/5 dark:shadow-black/30'
                                                : 'border-transparent hover:border-border/70 hover:bg-card/40'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="why-exer-lens-bar"
                                                className={`absolute top-5 bottom-5 -left-[2px] w-[3px] rounded-full ${lens.accent.dot}`}
                                            />
                                        )}
                                        <span
                                            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${lens.accent.chip} ${lens.accent.text} ${isActive ? '' : 'opacity-60'}`}
                                        >
                                            <lens.icon className="size-5" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-baseline justify-between gap-3">
                                                <span className="text-base font-bold text-foreground">
                                                    {lens.label}
                                                </span>
                                                <span className="text-[11px] font-bold tracking-widest text-muted-foreground/50 tabular-nums">
                                                    {String(i + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </span>
                                            </span>
                                            <span className="mt-0.5 block text-sm text-muted-foreground">
                                                {lens.tagline}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail panel */}
                    <RevealElement delay={60}>
                        <div className="relative h-full overflow-hidden rounded-[2rem] border border-border bg-card/70 p-7 backdrop-blur-xl lg:p-9 dark:shadow-2xl">
                            <div
                                className={`pointer-events-none absolute -top-28 -right-20 size-64 rounded-full blur-[90px] transition-colors duration-500 ${activeLens.accent.glow}`}
                            />
                            <span
                                aria-hidden
                                className="pointer-events-none absolute top-5 right-7 text-6xl font-black text-foreground/[0.045] tabular-nums"
                            >
                                {activeNumber}
                            </span>

                            <motion.div
                                key={activeLens.id}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeOut',
                                }}
                                aria-live="polite"
                                className="relative z-10 flex h-full flex-col"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex size-11 items-center justify-center rounded-2xl ${activeLens.accent.chip} ${activeLens.accent.text}`}
                                    >
                                        <activeLens.icon className="size-5" />
                                    </span>
                                    <div>
                                        <p className="text-[11px] font-extrabold tracking-[0.18em] text-muted-foreground uppercase">
                                            Lens {activeNumber} / 04
                                        </p>
                                        <p className="text-lg font-bold text-foreground">
                                            {activeLens.label}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-7 text-[11px] font-extrabold tracking-[0.18em] text-muted-foreground uppercase">
                                    The question we ask
                                </p>
                                <p className="mt-3 text-xl leading-snug font-semibold text-balance text-foreground sm:text-2xl">
                                    “{activeLens.question}”
                                </p>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    {activeLens.description}
                                </p>

                                <div className="mt-7 border-t border-border pt-6">
                                    <p className="text-[11px] font-extrabold tracking-[0.18em] text-muted-foreground uppercase">
                                        What that gives you
                                    </p>
                                    <ul className="mt-4 space-y-2.5">
                                        {activeLens.outcomes.map((outcome) => (
                                            <li
                                                key={outcome}
                                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                            >
                                                <BadgeCheck
                                                    className={`mt-0.5 size-4 shrink-0 ${activeLens.accent.text}`}
                                                />
                                                {outcome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                                    <div
                                        aria-hidden
                                        className="flex items-center gap-1.5"
                                    >
                                        {lenses.map((lens, i) => (
                                            <span
                                                key={lens.id}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    i === activeIndex
                                                        ? `w-6 ${lens.accent.dot}`
                                                        : 'w-1.5 bg-border'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={selectNextLens}
                                        className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-primary"
                                    >
                                        Next lens
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </RevealElement>
                </div>

                {/* Closing strip */}
                <RevealElement delay={120}>
                    <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card/50 px-6 py-5 backdrop-blur-xl sm:flex-row sm:items-center">
                        <p className="text-sm text-muted-foreground">
                            Four lenses.{' '}
                            <span className="font-bold text-foreground">
                                One product people can actually use.
                            </span>
                        </p>
                        <a
                            href="#approach"
                            className="group inline-flex items-center gap-2 text-sm font-bold text-primary"
                        >
                            See how we combine them
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </RevealElement>
            </div>
        </section>
    );
};

/* ------------------------------------------------------------------ */
/*  Home page                                                          */
/* ------------------------------------------------------------------ */

const Home = () => {
    const { setNavbarLight } = useGlobal();
    const { props } = usePage();
    const locale = (props as { locale?: string }).locale || 'en';

    useEffect(() => {
        setNavbarLight(true);
        return () => setNavbarLight(false);
    }, [setNavbarLight]);

    return (
        <>
            <Head title="EXER — User Experience for Better Digital Health" />

            <div className="overflow-x-hidden bg-background">
                {/* Keyframes */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes float {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-12px); }
                            }
                        `,
                    }}
                />

                {/* ============ HERO ============ */}
                <section className="relative pt-[68px]">
                    <div className="relative overflow-hidden bg-card/0 backdrop-blur-xl">
                        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/15 blur-[110px]" />
                        <div className="pointer-events-none absolute top-40 -right-20 h-[480px] w-[480px] rounded-full bg-secondary/10 blur-[120px]" />
                        {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" /> */}

                        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-16 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-24">
                            {/* Copy */}
                            <div className="flex flex-col items-center gap-6 text-center lg:col-span-6 lg:items-start lg:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <SectionBadge>
                                        <Sparkles className="size-3.5" />
                                        Digital Health UX & Innovation
                                    </SectionBadge>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="text-4xl font-black tracking-tight text-foreground lg:text-6xl/tight"
                                >
                                    EXER —{' '}
                                    <span className="text-primary">
                                        User Experience
                                    </span>{' '}
                                    for Better Digital Health
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
                                >
                                    We help healthcare organizations, startups,
                                    NGOs and health professionals design digital
                                    solutions that are useful, intuitive and
                                    built around real healthcare needs.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                                >
                                    <a
                                        href={`/${locale}/workshops`}
                                        className="group relative flex h-13 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <GraduationCap className="relative z-10 size-5" />
                                        <span className="relative z-10">
                                            Explore our Free Workshops
                                        </span>
                                    </a>
                                    <a
                                        href="#services"
                                        className="group flex h-13 items-center justify-center gap-2 rounded-xl border border-border bg-foreground/5 px-7 text-sm font-bold text-foreground backdrop-blur-md transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                                    >
                                        Explore Our Services
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </a>
                                </motion.div>

                                {/* Trust strip */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.45 }}
                                    className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase lg:justify-start"
                                >
                                    {intersection.map((item) => (
                                        <span
                                            key={item.label}
                                            className="flex items-center gap-1.5"
                                        >
                                            <item.icon className="size-3.5 text-primary" />
                                            {item.label}
                                        </span>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Visual */}
                            <div className="order-first lg:order-last lg:col-span-6">
                                <HeroVisual />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ WHO IS EXER ============ */}
                <section
                    id="who"
                    className="scroll-mt-28 bg-card/60 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        {/* Experiment */}
                        {/* <div className="relative z-10 mx-auto max-w-6xl pt-24 lg:pt-32">
                            <RevealElement>
                                <div className="relative z-20 overflow-hidden rounded-[2.5rem] bg-card px-6 pt-14 pb-36 text-center sm:px-10 sm:pt-16 lg:pb-44">
                                    <img
                                        src="/file_00000000dca0820eb485809f5101cf1e.png"
                                        alt=""
                                        className="absolute inset-0 size-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-card/95" />
                                    <div className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/15 blur-3xl" />
                                    <div className="pointer-events-none absolute -bottom-32 -left-10 size-80 rounded-full bg-black/10 blur-3xl" />

                                    <div className="relative z-10">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                                            <Sparkles className="size-3.5" />
                                            Contact
                                        </span>
                                        <h1 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-5xl">
                                            Get In Touch
                                        </h1>
                                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                                            EXER is a digital health user
                                            experience and innovation
                                            consultancy helping healthcare
                                            organizations, startups, NGOs and
                                            health professionals design digital
                                            solutions that are useful, intuitive
                                            and built around real healthcare
                                            needs.
                                        </p>
                                    </div>
                                </div>
                            </RevealElement>

                            <RevealElement delay={80}>
                                <div className="relative z-30 mx-auto -mt-24 max-w-5xl rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 lg:-mt-28">
                                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

                                        <div>
                                            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                                                Send us a message
                                            </h2>
                                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                Fill in the form and we will get
                                                back to you, usually within one
                                                business day.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </RevealElement>
                        </div> */}
                        <RevealElement>
                            <SectionIntro
                                badge="Who is EXER?"
                                title={
                                    <>
                                        A digital health{' '}
                                        <span className="text-primary">
                                            user experience & innovation
                                        </span>{' '}
                                        consultancy
                                    </>
                                }
                                subtitle="EXER is a digital health user experience and innovation consultancy helping healthcare organizations, startups, NGOs and health professionals design digital solutions that are useful, intuitive and built around real healthcare needs."
                            />
                        </RevealElement>

                        {/* <RevealElement delay={100}>
                            <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl lg:p-10">
                                <p className="mb-8 text-center text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                    Our approach
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                                    {[
                                        'Discover',
                                        'Validate',
                                        'Define',
                                        'Design',
                                        'Deploy',
                                    ].map((step, i) => (
                                        <div
                                            key={step}
                                            className="flex items-center gap-3 lg:gap-4"
                                        >
                                            <span className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-bold text-foreground lg:px-5">
                                                {step}
                                            </span>
                                            {i < 4 && (
                                                <ArrowRight className="size-4 shrink-0 text-primary" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-center text-base text-muted-foreground lg:text-lg">
                                    We believe better digital health solutions
                                    begin by understanding the people, problems
                                    and healthcare environments they are
                                    designed for.
                                </p>
                            </div>
                        </RevealElement> */}
                    </div>
                </section>

                {/* ============ MEET THE TEAM ============ */}
                <section id="team" className="scroll-mt-28 px-4 py-20 lg:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                            <RevealElement>
                                <SectionIntro
                                    badge="Meet the Team"
                                    align="left"
                                    title={
                                        <>
                                            The people behind{' '}
                                            <span className="text-primary">
                                                EXER
                                            </span>
                                        </>
                                    }
                                    subtitle="A complementary team combining biomedical science, product strategy, software architecture and UX design to improve digital health experiences."
                                />
                            </RevealElement>
                            {team.map((member, i) => (
                                <RevealElement
                                    key={member.name}
                                    delay={i * 100}
                                >
                                    <div className="group flex h-full flex-col items-center justify-start gap-4 py-10 text-center transition-all">
                                        {/* Photo */}
                                        <div className="relative size-40 shrink-0 overflow-hidden rounded-full ring-2 ring-primary/20 ring-offset-4 ring-offset-card">
                                            <img
                                                src={member.image}
                                                alt={member.alt}
                                                loading="lazy"
                                                className="h-full w-full scale-125 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Name & role */}
                                        <div className="flex flex-col gap-1.5">
                                            <h3 className="text-md font-bold text-foreground">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs leading-snug font-medium text-muted-foreground">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                </RevealElement>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============ WHAT WE DO ============ */}
                <section
                    id="services"
                    className="scroll-mt-28 bg-card/30 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="What We Do"
                                title="Focused services, real healthcare impact"
                                subtitle="Four clear ways we help you move from a healthcare problem to a validated, user-centered digital product."
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {services.map((service, i) => (
                                <RevealElement
                                    key={service.title}
                                    delay={i * 80}
                                >
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 p-6 shadow-lg shadow-foreground/5 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(0,166,244,0.4)] dark:shadow-black/30">
                                        <div
                                            className={`absolute -top-12 -right-12 size-32 rounded-full bg-linear-to-br ${service.accent} opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-25`}
                                        />
                                        <div
                                            className={`relative z-10 mb-5 flex size-12 items-center justify-center rounded-2xl bg-linear-to-br ${service.accent} text-white shadow-lg`}
                                        >
                                            <service.icon className="size-6" />
                                        </div>
                                        <h3 className="relative z-10 mb-2 text-lg font-bold text-foreground">
                                            {service.title}
                                        </h3>
                                        <p className="relative z-10 mb-5 text-sm leading-relaxed text-muted-foreground">
                                            {service.description}
                                        </p>
                                        <ul className="relative z-10 mt-auto space-y-2">
                                            {service.points.map((point) => (
                                                <li
                                                    key={point}
                                                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                                                >
                                                    <BadgeCheck className="size-4 shrink-0 text-primary" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </RevealElement>
                            ))}
                        </div>

                        <RevealElement delay={150}>
                            <div className="mt-12 flex justify-center">
                                <Link
                                    href={`/${locale}/contact`}
                                    className="group inline-flex h-13 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                >
                                    Work with EXER
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </RevealElement>
                    </div>
                </section>

                {/* ============ OUR APPROACH ============ */}
                <section
                    id="approach"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Our Approach"
                                title="A process built around people, not just technology"
                                // subtitle="What differentiates EXER is how we work — evidence first, then design."
                            />
                        </RevealElement>

                        <div className="relative mt-16">
                            {/* Connector line (desktop) */}
                            <div className="pointer-events-none absolute top-1/2 right-0 left-0 hidden h-px translate-y-5 bg-linear-to-r from-transparent via-primary/40 to-transparent lg:block" />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                                {approach.map((step, i) => (
                                    <RevealElement
                                        key={step.title}
                                        delay={i * 90}
                                    >
                                        <div className="group relative flex h-full flex-col items-center p-6 text-center transition-all">
                                            <div className="relative z-10 mb-5 flex size-32 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                                <step.icon className="size-12" />
                                            </div>
                                            <span className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary text-xs font-extrabold tracking-widest text-white">
                                                {step.step}
                                            </span>
                                            <div className="">
                                                <h3 className="mb-2 text-lg font-bold text-foreground">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm leading-relaxed text-muted-foreground">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </RevealElement>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ FEATURED PROJECT — OHSA ============ */}
                <section
                    id="ohsa"
                    className="scroll-mt-28 bg-card/60 px-4 py-20 lg:py-28"
                >
                    <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/10 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-secondary/10 blur-[100px]" />
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden backdrop-blur-xl">
                            <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 lg:grid-cols-2 lg:gap-14 lg:p-14">
                                {/* Story */}
                                <div className="flex flex-col gap-6">
                                    <RevealElement>
                                        <SectionBadge>
                                            Featured Project
                                        </SectionBadge>
                                    </RevealElement>
                                    <RevealElement delay={60}>
                                        <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                                            Building Better Healthcare
                                            Experiences with{' '}
                                            <span className="text-primary">
                                                AI
                                            </span>
                                        </h2>
                                    </RevealElement>
                                    <RevealElement delay={120}>
                                        <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                                            EXER is currently contributing to
                                            the development and user experience
                                            of{' '}
                                            <span className="font-semibold text-foreground">
                                                OHSA
                                            </span>
                                            , an AI-powered medical imaging
                                            solution developed by{' '}
                                            <span className="font-semibold text-foreground">
                                                OMIRAI
                                            </span>
                                            .
                                        </p>
                                    </RevealElement>

                                    <div className="mt-2 space-y-4">
                                        {[
                                            {
                                                label: 'The challenge',
                                                text: 'Medical imaging can be difficult to access and interpret in settings where specialized resources are limited.',
                                                icon: Gauge,
                                            },
                                            {
                                                label: 'The opportunity',
                                                text: 'OHSA uses artificial intelligence to support medical imaging interpretation and improve access to technology-assisted healthcare.',
                                                icon: Sparkles,
                                            },
                                            {
                                                label: "EXER's role",
                                                text: 'EXER contributes a user-centered perspective, focusing on how healthcare professionals interact with the technology and how the solution can become more intuitive, useful and scalable.',
                                                icon: MousePointerClick,
                                            },
                                        ].map((item) => (
                                            <RevealElement
                                                key={item.label}
                                                delay={80}
                                            >
                                                <div className="flex gap-4 rounded-2xl border border-border bg-background/50 p-5">
                                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                        <item.icon className="size-5" />
                                                    </span>
                                                    <div>
                                                        <p className="mb-1 text-xs font-extrabold tracking-widest text-primary uppercase">
                                                            {item.label}
                                                        </p>
                                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </RevealElement>
                                        ))}
                                    </div>

                                    <RevealElement delay={120}>
                                        <a
                                            href="#ohsa"
                                            className="group mt-2 inline-flex h-13 w-fit items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-7 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
                                        >
                                            Explore the OHSA Project
                                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </a>
                                    </RevealElement>
                                </div>

                                {/* Visual */}
                                <RevealElement delay={100}>
                                    <div className="relative overflow-hidden rounded-3xl border border-border bg-background/60 p-8 shadow-2xl">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                                                <ScanLine className="size-5 text-primary" />
                                                OHSA · AI Medical Imaging
                                            </span>
                                            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-500">
                                                <ShieldCheck className="size-3.5" />
                                                Assisted
                                            </span>
                                        </div>

                                        {/* Scan placeholder */}
                                        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br from-primary/5 via-card to-secondary/5">
                                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />
                                            <div className="relative flex size-40 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                                                <div className="absolute inset-0 animate-ping rounded-full border border-primary/30 opacity-40" />
                                                <Brain className="size-16 text-primary" />
                                            </div>
                                            {/* Corner markers */}
                                            <span className="absolute top-4 left-4 size-6 border-t-2 border-l-2 border-primary/60" />
                                            <span className="absolute top-4 right-4 size-6 border-t-2 border-r-2 border-primary/60" />
                                            <span className="absolute bottom-4 left-4 size-6 border-b-2 border-l-2 border-primary/60" />
                                            <span className="absolute right-4 bottom-4 size-6 border-r-2 border-b-2 border-primary/60" />
                                        </div>

                                        <div className="mt-6 grid grid-cols-3 gap-3">
                                            {[
                                                {
                                                    label: 'Interpretation',
                                                    value: 'AI-supported',
                                                },
                                                {
                                                    label: 'Access',
                                                    value: 'Improved',
                                                },
                                                {
                                                    label: 'Usability',
                                                    value: 'User-centered',
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.label}
                                                    className="rounded-xl border border-border bg-card/60 p-3 text-center"
                                                >
                                                    <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-1 text-xs font-bold text-foreground">
                                                        {item.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </RevealElement>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ WORKSHOPS TEASER ============ */}
                <section className="scroll-mt-28 bg-card/30 px-4 py-20 lg:py-28">
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card/60 p-9 backdrop-blur-xl lg:p-12">
                                <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-secondary/10 blur-[80px]" />
                                <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-primary/10 blur-[80px]" />

                                <div className="relative z-10 items-center">
                                    <div className="flex flex-col items-center gap-5">
                                        <SectionBadge>
                                            <GraduationCap className="size-3.5" />
                                            Free Workshops
                                        </SectionBadge>
                                        <h2 className="text-center text-3xl font-bold text-foreground lg:text-4xl">
                                            Ready to shape the future of{' '}
                                            <span className="text-primary">
                                                digital health?
                                            </span>{' '}
                                        </h2>
                                        <p className="max-w-2xl text-center text-base leading-relaxed text-muted-foreground lg:text-lg">
                                            Join a free workshop to explore UX
                                            and digital health, learn alongside
                                            students and professionals, and turn
                                            your ideas into impact. Find an
                                            upcoming edition and apply while
                                            applications are open.
                                        </p>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            <Link
                                                href={`/${locale}/workshops`}
                                                className="group inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                            >
                                                Explore Workshops
                                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealElement>
                    </div>
                </section>

                {/* ============ WHY JOIN ============ */}
                {/* <section
                    id="why-join"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Why Join?"
                                title="What you'll gain as a participant"
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                            {whyJoin.map((item, i) => (
                                <RevealElement key={item.title} delay={i * 80}>
                                    <div className="group flex h-full flex-col items-center rounded-3xl border border-border bg-card/60 p-6 text-center backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-primary/30">
                                        <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                            <item.icon className="size-6" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </RevealElement>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* ============ CONSULTANCY & PRICING ============ */}
                {/* <section
                    id="pricing"
                    className="scroll-mt-28 bg-card/30 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Consultancy Services & Pricing"
                                title="Clear packages, transparent engagements"
                                subtitle="Transparent, custom pricing — no hidden costs. Tell us about your challenge and we'll recommend the right service."
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {pricing.map((tier, i) => (
                                <RevealElement
                                    key={tier.name}
                                    delay={i * 70}
                                    className={
                                        i === 4
                                            ? 'sm:col-span-2 lg:col-span-1'
                                            : ''
                                    }
                                >
                                    <div
                                        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 backdrop-blur-xl transition-all hover:-translate-y-1.5 ${
                                            tier.featured
                                                ? 'border-primary/40 bg-card shadow-[0_20px_60px_-20px_rgba(0,166,244,0.5)]'
                                                : 'border-border bg-card/70 hover:border-primary/30'
                                        }`}
                                    >
                                        {tier.featured && (
                                            <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold tracking-widest text-white uppercase">
                                                Popular
                                            </span>
                                        )}
                                        <h3 className="mb-1 text-lg font-bold text-foreground">
                                            {tier.name}
                                        </h3>
                                        <p className="mb-5 text-sm text-muted-foreground">
                                            {tier.description}
                                        </p>
                                        <p className="mb-6 text-2xl font-black tracking-tight text-foreground">
                                            <span className="text-primary">
                                                {tier.price}
                                            </span>
                                        </p>
                                        <ul className="mb-8 space-y-3">
                                            {tier.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                >
                                                    <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href={`/${locale}/contact`}
                                            className={`mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
                                                tier.featured
                                                    ? 'bg-primary text-white hover:scale-[1.02]'
                                                    : 'border border-border bg-foreground/5 text-foreground hover:border-primary/30 hover:text-primary'
                                            }`}
                                        >
                                            Talk to EXER
                                            <ArrowRight className="size-4" />
                                        </Link>
                                    </div>
                                </RevealElement>
                            ))}
                        </div>


                        <RevealElement delay={120}>
                            <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-border bg-card/60 p-8 text-center backdrop-blur-xl lg:flex-row lg:justify-between lg:text-left">
                                <div className="flex items-center gap-4">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <MessagesSquare className="size-6" />
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            Not sure what you need?
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Tell us about your product or
                                            healthcare challenge and we'll
                                            recommend the right service.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/${locale}/contact`}
                                    className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03]"
                                >
                                    Talk to EXER
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </RevealElement>
                    </div>
                </section> */}

                {/* ============ WHO WE WORK WITH ============ */}
                {/* <section
                    id="who-we-work-with"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Who We Work With"
                                title="Built for the people shaping digital health"
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {audiences.map((audience, i) => (
                                <RevealElement key={audience.title} delay={i * 70}>
                                    <div className="group flex h-full items-start gap-4 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/30">
                                        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                                            <audience.icon className="size-6" />
                                        </span>
                                        <div>
                                            <h3 className="mb-1.5 text-base font-bold text-foreground">
                                                {audience.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {audience.description}
                                            </p>
                                        </div>
                                    </div>
                                </RevealElement>
                            ))}

                            <RevealElement delay={audiences.length * 70}>
                                <div className="group relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-secondary/10 p-6 backdrop-blur-xl">
                                    <HeartPulse className="mb-3 size-8 text-primary" />
                                    <h3 className="mb-2 text-base font-bold text-foreground">
                                        Healthcare understanding + product thinking +
                                        UX
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        We sit at the intersection of Healthcare,
                                        Technology, UX and Innovation.
                                    </p>
                                </div>
                            </RevealElement>
                        </div>
                    </div>
                </section> */}

                {/* ============ WHY EXER ============ */}
                <WhyExerLenses />

                {/* ============ ECOSYSTEM ============ */}
                <section
                    id="ecosystem"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Partners / Ecosystem"
                                title="Building the digital health ecosystem together"
                                subtitle="We distinguish between the organizations that learn with us and the ones we partner with on real projects."
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <RevealElement delay={60}>
                                <div className="flex h-full flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl">
                                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary uppercase">
                                        <GraduationCap className="size-4" />
                                        Learning Partners
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold text-foreground">
                                        Organizations participating in the
                                        workshop series
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Mentors, institutions and community
                                        organizations that support the learning
                                        experience and help participants grow.
                                    </p>
                                    <div className="mt-4">
                                        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                                            <img
                                                src="/IMG-20261103-WA0019.jpg"
                                                // alt={member.alt}
                                                loading="lazy"
                                                className="h-full object-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </RevealElement>
                            <RevealElement delay={120}>
                                <div className="flex h-full flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl">
                                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-secondary uppercase">
                                        <HeartHandshake className="size-4" />
                                        Project Partners / Clients
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold text-foreground">
                                        Organizations we build digital health
                                        products with
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Healthcare organizations, startups and
                                        NGOs we support in designing and
                                        validating real digital health
                                        solutions.
                                    </p>
                                    <div className="mt-4">
                                        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                                            <img
                                                src="/Logo-OHSA.png"
                                                // alt={member.alt}
                                                loading="lazy"
                                                className="h-full w-full scale-125 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </RevealElement>
                        </div>
                    </div>
                </section>

                {/* ============ FINAL CTA ============ */}
                <section
                    id="contact-cta"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Let's build better digital health"
                                title="Two ways to get started with EXER"
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <RevealElement delay={60}>
                                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border bg-card/60 p-9 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-primary/40">
                                    <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-primary/10 blur-[70px] transition-transform duration-700 group-hover:scale-150" />
                                    <div className="relative z-10">
                                        <span className="mb-5 flex size-13 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                            <Stethoscope className="size-6" />
                                        </span>
                                        <h3 className="mb-2 text-2xl font-bold text-foreground">
                                            Have a healthcare problem worth
                                            solving?
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Partner with EXER to design and
                                            validate a digital solution around
                                            real healthcare needs.
                                        </p>
                                    </div>
                                    <Link
                                        href={`/${locale}/contact`}
                                        className="relative z-10 mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                    >
                                        Work with EXER
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </RevealElement>

                            <RevealElement delay={120}>
                                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border bg-card/60 p-9 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-secondary/40">
                                    <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-secondary/10 blur-[70px] transition-transform duration-700 group-hover:scale-150" />
                                    <div className="relative z-10">
                                        <span className="mb-5 flex size-13 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                            <GraduationCap className="size-6" />
                                        </span>
                                        <h3 className="mb-2 text-2xl font-bold text-foreground">
                                            Want to learn how digital health
                                            products are designed?
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            We occasionally open free workshops
                                            that build practical UX skills for
                                            digital health innovation. See what
                                            is available and apply while there
                                            is an open edition.
                                        </p>
                                    </div>
                                    <Link
                                        href={`/${locale}/workshops`}
                                        className="relative z-10 mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-8 text-sm font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                                    >
                                        See the Free Workshops
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </RevealElement>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

Home.layout = (page: ReactNode) => <MainLayout children={page} />;

export default Home;
