import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    BadgeCheck,
    BookOpen,
    Brain,
    CalendarDays,
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
    Trophy,
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

const workshopWeeks = [
    {
        week: 'Week 1',
        title: 'Think Before You Build',
        description: 'Understanding healthcare problems before designing solutions.',
    },
    {
        week: 'Week 2',
        title: 'AI in Digital Health',
        description: 'From hype to practical use.',
    },
    {
        week: 'Week 3',
        title: 'Designing Better Healthcare Experiences',
        description: 'Understanding users, journeys and pain points.',
    },
    {
        week: 'Week 4',
        title: 'UX in Action',
        description: 'Applying UX principles to a real digital health product.',
    },
];

const whyJoin = [
    {
        icon: BookOpen,
        title: 'Learn',
        description: 'Understand the foundations of UX and digital health innovation.',
    },
    {
        icon: Hammer,
        title: 'Practice',
        description: 'Work on real healthcare problems and digital health products.',
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
        features: ['Problem framing', 'Validation sprints', 'Product definition'],
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
        description: 'Tailored support for your specific digital health challenge.',
        price: 'Request a quote',
        featured: false,
        features: ['Scoped to your needs', 'Flexible engagement', 'Ongoing support'],
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

const team = [
    {
        name: 'Joseph Christ Nloga',
        role: 'Solution Architect & UX Designer',
        bio: 'Joseph leads the architecture and user experience of EXER’s digital health solutions — translating complex healthcare problems into clear, intuitive and well-structured products.',
        image:
            '/Gemini_Generated_Image_yxa8dpyxa8dpyxa8.png',
        alt: 'Joseph Christ Nloga — Solution Architect & UX Designer',
    },
    {
        name: 'Emeline Ghislaine Mamekong',
        role: 'Digital Health Product Strategist, Biomedical Scientist',
        bio: 'Emeline combines biomedical science with product strategy, grounding every EXER decision in evidence and a deep understanding of the patients, providers and systems we design for.',
        image:
            '/file_0000000048a4820e9ccdf2939ae63c05.png',
        alt: 'Emeline Ghislaine Mamekong — Digital Health Product Strategist, Biomedical Scientist',
    },
];

/* ------------------------------------------------------------------ */
/*  Reusable pieces                                                    */
/* ------------------------------------------------------------------ */

const SectionBadge = ({ children }: { children: ReactNode }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase shadow-[0_0_15px_-3px_rgba(0,166,244,0.4)]">
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
            align === 'center' ? 'items-center text-center' : 'items-start text-left'
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
            className="absolute -top-6 -left-2 z-20 animate-[float_6s_ease-in-out_infinite] lg:-left-8"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HeartPulse className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">User-Centered</p>
                    <p className="text-[11px] text-muted-foreground">Built around real needs</p>
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="absolute top-1/3 -right-2 z-20 animate-[float_7s_ease-in-out_infinite] lg:-right-10"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Brain className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">AI-Powered</p>
                    <p className="text-[11px] text-muted-foreground">Evidence & insight</p>
                </div>
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="absolute -bottom-6 left-6 z-20 animate-[float_8s_ease-in-out_infinite]"
        >
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Stethoscope className="size-5" />
                </span>
                <div>
                    <p className="text-sm font-bold text-foreground">Clinical UX</p>
                    <p className="text-[11px] text-muted-foreground">For providers & patients</p>
                </div>
            </div>
        </motion.div>

        {/* Main mockup card */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-2xl backdrop-blur-xl dark:shadow-black/40"
        >
            <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-secondary/10 blur-[80px]" />

            {/* Window chrome */}
            <div className="relative z-10 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-amber-400" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    EXER · Digital Health UX
                </span>
                <Activity className="size-4 text-primary" />
            </div>

            {/* ECG waveform */}
            <div className="relative z-10 rounded-2xl border border-border/60 bg-background/60 p-5">
                <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Live health experience
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500">
                        <span className="relative flex size-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Validated
                    </span>
                </div>

                <svg
                    viewBox="0 0 400 120"
                    className="h-28 w-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="ecg-gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#00A6F4" />
                            <stop offset="100%" stopColor="#0d3976" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0 60 L50 60 L70 60 L82 30 L94 96 L106 60 L140 60 L160 60 L172 24 L184 102 L196 60 L230 60 L250 60 L262 40 L274 80 L286 60 L320 60 L340 60 L352 20 L364 112 L376 60 L400 60"
                        fill="none"
                        stroke="url(#ecg-gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: 'easeInOut' }}
                    />
                </svg>

                <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                        { label: 'Discover', value: '01' },
                        { label: 'Validate', value: '02' },
                        { label: 'Deploy', value: '05' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-center"
                        >
                            <p className="text-sm font-extrabold text-primary">
                                {item.value}
                            </p>
                            <p className="text-[10px] font-medium text-muted-foreground">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
);

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
                    <div className="relative overflow-hidden border border-border bg-card/60 backdrop-blur-xl dark:shadow-2xl">
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
                                        href="#workshop"
                                        className="group relative flex h-13 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <GraduationCap className="relative z-10 size-5" />
                                        <span className="relative z-10">
                                            Register for the Free Workshop
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
                            <div className="lg:col-span-6">
                                <HeroVisual />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============ WHO IS EXER ============ */}
                <section
                    id="who"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
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

                        <RevealElement delay={100}>
                            <div className="mt-12 rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl lg:p-10">
                                <p className="mb-8 text-center text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                                    Our approach
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                                    {['Discover', 'Validate', 'Define', 'Design', 'Deploy'].map(
                                        (step, i) => (
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
                                        ),
                                    )}
                                </div>
                                <p className="mt-8 text-center text-base text-muted-foreground lg:text-lg">
                                    We believe better digital health solutions begin by
                                    understanding the people, problems and healthcare
                                    environments they are designed for.
                                </p>
                            </div>
                        </RevealElement>
                    </div>
                </section>

                {/* ============ MEET THE TEAM ============ */}
                <section
                    id="team"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Meet the Team"
                                title={
                                    <>
                                        The people behind{' '}
                                        <span className="text-primary">EXER</span>
                                    </>
                                }
                                subtitle="A complementary team combining biomedical science, product strategy, software architecture and UX design to improve digital health experiences."
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {team.map((member, i) => (
                                <RevealElement key={member.name} delay={i * 100}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/70 shadow-lg shadow-foreground/5 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_rgba(0,166,244,0.4)] dark:shadow-black/30">
                                        {/* Photo */}
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.alt}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-transparent" />

                                            {/* Role badge */}
                                            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
                                                <Users className="size-3" />
                                                Team
                                            </div>

                                            {/* Name over image */}
                                            <div className="absolute inset-x-0 bottom-0 p-6">
                                                <h3 className="text-2xl font-bold text-white">
                                                    {member.name}
                                                </h3>
                                                <p className="mt-1.5 text-sm leading-snug font-semibold text-white/90">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div className="flex flex-1 flex-col p-6">
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {member.bio}
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
                                <RevealElement key={service.title} delay={i * 80}>
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
                                subtitle="What differentiates EXER is how we work — evidence first, then design."
                            />
                        </RevealElement>

                        <div className="relative mt-16">
                            {/* Connector line (desktop) */}
                            <div className="pointer-events-none absolute top-8 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent lg:block" />

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                                {approach.map((step, i) => (
                                    <RevealElement key={step.title} delay={i * 90}>
                                        <div className="group relative flex h-full flex-col items-center rounded-3xl border border-border bg-card/60 p-6 text-center backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-primary/30 lg:items-start lg:text-left">
                                            <div className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_20px_-5px_rgba(0,166,244,0.4)] transition-transform group-hover:scale-110">
                                                <step.icon className="size-6" />
                                            </div>
                                            <span className="mb-2 text-xs font-extrabold tracking-widest text-primary">
                                                {step.step}
                                            </span>
                                            <h3 className="mb-2 text-lg font-bold text-foreground">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {step.description}
                                            </p>
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
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card/60 backdrop-blur-xl dark:shadow-2xl">
                            <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/10 blur-[100px]" />
                            <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-secondary/10 blur-[100px]" />

                            <div className="relative z-10 grid grid-cols-1 items-center gap-10 p-8 lg:grid-cols-2 lg:gap-14 lg:p-14">
                                {/* Story */}
                                <div className="flex flex-col gap-6">
                                    <RevealElement>
                                        <SectionBadge>Featured Project</SectionBadge>
                                    </RevealElement>
                                    <RevealElement delay={60}>
                                        <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                                            Building Better Healthcare Experiences with{' '}
                                            <span className="text-primary">
                                                AI
                                            </span>
                                        </h2>
                                    </RevealElement>
                                    <RevealElement delay={120}>
                                        <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
                                            EXER is currently contributing to the
                                            development and user experience of{' '}
                                            <span className="font-semibold text-foreground">
                                                OHSA
                                            </span>
                                            , an AI-powered medical imaging solution
                                            developed by{' '}
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
                                            <RevealElement key={item.label} delay={80}>
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
                                            href="#workshop"
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
                                                { label: 'Interpretation', value: 'AI-supported' },
                                                { label: 'Access', value: 'Improved' },
                                                { label: 'Usability', value: 'User-centered' },
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

                {/* ============ WORKSHOP ============ */}
                <section
                    id="workshop"
                    className="scroll-mt-28 bg-card/30 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <RevealElement>
                            <SectionIntro
                                badge="Free Workshop Series"
                                title="UX Foundations for Digital Health Innovators"
                                subtitle="A practical introductory workshop series designed for students, young professionals, healthcare professionals and aspiring innovators who want to understand how user experience can improve digital health solutions."
                            />
                        </RevealElement>

                        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {workshopWeeks.map((week, i) => (
                                <RevealElement key={week.week} delay={i * 80}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-xl transition-all hover:-translate-y-1.5 hover:border-secondary/30">
                                        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-extrabold tracking-widest text-secondary uppercase">
                                            <CalendarDays className="size-3.5" />
                                            {week.week}
                                        </span>
                                        <h3 className="mb-2 text-lg font-bold text-foreground">
                                            {week.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {week.description}
                                        </p>
                                    </div>
                                </RevealElement>
                            ))}
                        </div>

                        {/* Final showcase banner */}
                        <RevealElement delay={120}>
                            <div className="relative mt-6 overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-card to-secondary/10 p-8 backdrop-blur-xl">
                                <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-center gap-2 lg:justify-start">
                                            <Trophy className="size-5 text-primary" />
                                            <h3 className="text-xl font-bold text-foreground">
                                                Final Showcase & Graduation
                                            </h3>
                                        </div>
                                        <p className="max-w-xl text-sm text-muted-foreground">
                                            Present your work, connect with innovators
                                            and receive your certificate.
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-extrabold text-emerald-500">
                                            <BadgeCheck className="size-4" />
                                            100% Free
                                        </span>
                                        <Link
                                            href={`/${locale}/workshops/digital-health-ux-foundations/apply`}
                                            className="group flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03]"
                                        >
                                            Register for the Workshop
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </RevealElement>
                    </div>
                </section>

                {/* ============ WHY JOIN ============ */}
                <section
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
                </section>

                {/* ============ CONSULTANCY & PRICING ============ */}
                <section
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
                                    className={i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}
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

                        {/* Not sure banner */}
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
                                            Tell us about your product or healthcare
                                            challenge and we'll recommend the right
                                            service.
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
                </section>

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
                <section
                    id="why-exer"
                    className="scroll-mt-28 px-4 py-20 lg:py-28"
                >
                    <div className="mx-auto max-w-6xl">
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card/60 p-8 backdrop-blur-xl lg:p-14 dark:shadow-2xl">
                            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]" />

                            <div className="relative z-10 mx-auto max-w-3xl text-center">
                                <RevealElement>
                                    <SectionIntro
                                        badge="Why EXER?"
                                        title={
                                            <>
                                                Healthcare × Technology × UX ×{' '}
                                                <span className="text-primary">
                                                    Innovation
                                                </span>
                                            </>
                                        }
                                    />
                                </RevealElement>

                                <RevealElement delay={100}>
                                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                        {intersection.map((item, i) => (
                                            <div
                                                key={item.label}
                                                className="flex items-center gap-3"
                                            >
                                                <span className="flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-5 py-2.5 text-sm font-bold text-foreground shadow-lg">
                                                    <item.icon className="size-4.5 text-primary" />
                                                    {item.label}
                                                </span>
                                                {i < intersection.length - 1 && (
                                                    <span className="text-lg font-black text-primary">
                                                        ×
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </RevealElement>

                                <RevealElement delay={160}>
                                    <p className="mt-8 text-base leading-relaxed text-muted-foreground lg:text-lg">
                                        We don't approach healthcare products as
                                        technology projects alone. We consider the
                                        healthcare problem, the people using the
                                        solution, the environment in which it will be
                                        used, and the realities of implementation.
                                    </p>
                                </RevealElement>
                            </div>
                        </div>
                    </div>
                </section>

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
                                        Organizations participating in the workshop
                                        series
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Mentors, institutions and community
                                        organizations that support the learning
                                        experience and help participants grow.
                                    </p>
                                </div>
                            </RevealElement>
                            <RevealElement delay={120}>
                                <div className="flex h-full flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-xl">
                                    <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-secondary uppercase">
                                        <HeartHandshake className="size-4" />
                                        Project Partners / Clients
                                    </span>
                                    <h3 className="mb-3 text-xl font-bold text-foreground">
                                        Organizations we build digital health products
                                        with
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Healthcare organizations, startups and NGOs we
                                        support in designing and validating real
                                        digital health solutions.
                                    </p>
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
                                            Have a healthcare problem worth solving?
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Partner with EXER to design and validate a
                                            digital solution around real healthcare
                                            needs.
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
                                            Want to learn how digital health products
                                            are designed?
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Join our free workshop series and build
                                            practical UX skills for digital health
                                            innovation.
                                        </p>
                                    </div>
                                    <Link
                                        href={`/${locale}/workshops/digital-health-ux-foundations/apply`}
                                        className="relative z-10 mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 px-8 text-sm font-bold text-secondary transition-all hover:bg-secondary hover:text-white"
                                    >
                                        Join the Free Workshop
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
