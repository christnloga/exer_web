import { Link, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowDown,
    ArrowRight,
    Building2,
    ChevronDown,
    HelpCircle,
    MinusCircle,
    PlusCircle,
    Presentation,
    Rocket,
    Target,
    Trophy,
    UserPlus,
    Users2,
    Zap,
    Shield,
    Cpu,
    Code2,
    Fingerprint,
    Terminal,
    BrainIcon,
    Stethoscope,
    Wallet,
    Truck,
    ShoppingCart,
    Command,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { BsCheckCircle, BsEnvelopeArrowDown, BsStarFill } from 'react-icons/bs';
import { GiFallingStar } from 'react-icons/gi';
import { GoDotFill, GoRocket } from 'react-icons/go';
import { HiOutlineLightBulb } from 'react-icons/hi2';
import { LuBlocks } from 'react-icons/lu';
import { MdOutlineDesignServices } from 'react-icons/md';
import { RiApps2AiLine } from 'react-icons/ri';
import NJCLogo from '@/components/njc-logo';
import RevealElement from '@/components/RevealElement';
import SquadPulseIllustration from '@/components/SquadPulseIllustration';
import { useGlobal } from '@/contexts/GlobalContext';
import MainLayout from '@/layouts/MainLayout';
import { apply } from '@/routes/page/njc';

const Landing = () => {
    const { props } = usePage();
    const locale = (props as any).locale || 'fr';

    const { setNavbarLight } = useGlobal();
    const [logoLoading, setLogoLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqData = [
        {
            question: 'Is this program free or paid?',
            answer: 'The NJC Fellowship is entirely scholarship-based. For the selected 25 fellows, the 6-month program is completely free.',
        },
        {
            question: 'Do I need prior experience?',
            answer: "We expect you to have a solid technical or design foundation. While you don't need a formal job history, you must show us what you've built.",
        },
        {
            question: 'Is it remote or physical?',
            answer: "It's a hybrid experience. While some work can be done remotely, physical presence at our hub in Cameroon is mandatory for key sprints and collaborative building.",
        },
        {
            question: 'What happens after the program?',
            answer: "Our goal is placement or creation. You'll either be matched with high-growth partners or supported in launching the product you built as a standalone venture.",
        },
    ];

    useEffect(() => {
        setNavbarLight(true);
    }, [setNavbarLight]);

    useEffect(() => {
        if (localStorage.getItem('NJC_loaded_one') === 'false') {
            const timer = setTimeout(() => {
                setLogoLoading(false);
            }, 3000);
            localStorage.setItem('NJC_loaded_one', 'true');
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {logoLoading ? (
                <div className="absolute z-50 flex h-screen w-full items-center justify-center bg-background text-foreground">
                    <NJCLogo className="animate-pulse" />
                </div>
            ) : (
                <>
                    <header className="relative flex min-h-[90vh] items-center overflow-hidden bg-background px-4 pt-28 lg:pt-48">
                        {/* Futuristic Background Elements */}
                        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                            {/* Grid pattern with overlay */}
                            <div className="absolute inset-0 bg-[url('/hero-grid.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-radial from-transparent to-background opacity-80" />

                            {/* Ambient Glows */}
                            <div
                                className="absolute top-1/4 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-[#00A6F4]/15 mix-blend-screen blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]"
                                style={{ animationDuration: '4s' }}
                            ></div>
                            <div
                                className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-[#7C3AED]/15 mix-blend-screen blur-[100px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]"
                                style={{
                                    animationDuration: '5s',
                                    animationDelay: '1s',
                                }}
                            ></div>

                            {/* Core central light */}
                            <div className="absolute top-1/2 left-1/2 h-[300px] w-[80vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-gradient-to-r from-[#00A6F4]/10 via-[#7C3AED]/10 to-[#00A6F4]/10 blur-[80px]"></div>
                        </div>

                        <div className="relative z-20 mx-auto w-full max-w-7xl">
                            <div className="flex flex-col items-center space-y-10 text-center">
                                {/* Futuristic Badge */}
                                <RevealElement>
                                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-[0_0_30px_rgba(0,166,244,0.15)] backdrop-blur-md">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00A6F4] opacity-75"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00A6F4]"></span>
                                        </span>
                                        <span className="text-xs font-bold tracking-[0.2em] text-[#00A6F4] uppercase">
                                            Applications Open • 25 Seats Only
                                        </span>
                                    </div>
                                </RevealElement>

                                {/* Hero Typography */}
                                <RevealElement>
                                    <h1 className="text-5xl leading-[1.05] font-extrabold tracking-tight text-foreground md:text-7xl lg:text-[6rem]">
                                        Build Real Tech Products{' '}
                                        <br className="hidden md:block" />
                                        Become Top{' '}
                                        <span className="relative mt-2 inline-block md:mt-0">
                                            <span className="absolute -inset-2 bg-gradient-to-r from-[#00A6F4] to-[#7C3AED] opacity-50 blur-xl"></span>
                                            <span className="relative bg-gradient-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent dark:drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                                                1%
                                            </span>
                                        </span>{' '}
                                        in 6 Months
                                    </h1>
                                </RevealElement>

                                <RevealElement>
                                    <p className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-muted-foreground md:text-xl">
                                        NJC (Now Just Create) is a selective
                                        6-month fellowship for ambitious
                                        graduates ready to master UX,
                                        engineering thinking, and real-world
                                        product development.
                                    </p>
                                </RevealElement>

                                {/* Action Area */}
                                <RevealElement>
                                    <div className="mt-6 flex flex-col items-center gap-8">
                                        <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                                            <Link
                                                href={apply.url()}
                                                className="group relative flex h-14 w-full min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground px-8 text-sm font-bold text-background shadow-lg transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#00A6F4]/10 to-[#7C3AED]/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                                <UserPlus
                                                    size={20}
                                                    className="relative z-10"
                                                />
                                                <span className="relative z-10">
                                                    Apply Now
                                                </span>
                                                <ArrowRight
                                                    size={16}
                                                    className="relative z-10 ml-1 transition-transform group-hover:translate-x-1"
                                                />
                                            </Link>

                                            <a
                                                href="#program"
                                                className="flex h-14 w-full min-w-[200px] items-center justify-center gap-2 rounded-xl border border-border bg-foreground/5 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-foreground/10 active:scale-95 sm:w-auto"
                                            >
                                                See Program Structure
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-4 text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                                            <span>6 Months</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                                            <span>Real Projects</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                                            <span>Demo Day</span>
                                        </div>
                                    </div>
                                </RevealElement>
                            </div>
                        </div>

                        {/* Seamless transition to next section */}
                        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-background to-transparent"></div>
                    </header>
                    {/* WHAT IS NJC */}
                    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
                        {/* Subtle background glow */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A6F4]/5 blur-[120px]"></div>

                        <div className="relative z-10 flex w-full justify-center">
                            <div className="flex w-full max-w-7xl flex-col gap-16 px-4">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <RevealElement>
                                            <h2 className="text-2xl font-semibold text-slate-500 line-through decoration-slate-600 lg:text-4xl">
                                                Not a Bootcamp
                                            </h2>
                                        </RevealElement>
                                        <RevealElement delay={100}>
                                            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl">
                                                A{' '}
                                                <span className="bg-gradient-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                    Product Fellowship
                                                </span>
                                            </h2>
                                        </RevealElement>
                                    </div>
                                    <RevealElement delay={200}>
                                        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
                                            Bridging the gap between academic
                                            theory and high-impact product
                                            engineering.
                                        </p>
                                    </RevealElement>
                                </div>

                                {/* Grid */}
                                <div className="grid gap-6 md:grid-cols-3">
                                    {/* Card 1 */}
                                    <RevealElement delay={100}>
                                        <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-xl shadow-foreground/5 transition-transform duration-300 hover:-translate-y-2 dark:shadow-2xl dark:shadow-black/50">
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A6F4]/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                            <div className="relative flex h-full flex-col items-start overflow-hidden rounded-3xl bg-card p-8">
                                                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#00A6F4]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#00A6F4]/30"></div>
                                                <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_15px_rgba(0,166,244,0.1)] transition-all group-hover:shadow-[0_0_25px_rgba(0,166,244,0.3)]">
                                                    <HiOutlineLightBulb
                                                        className="text-[#00A6F4]"
                                                        size={32}
                                                    />
                                                </div>
                                                <h4 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                                                    Think Different
                                                </h4>
                                                <p className="text-sm leading-relaxed text-slate-400 lg:text-base">
                                                    "Think Beyond the Ticket."
                                                    Learn to architect solutions
                                                    that solve business
                                                    problems, moving from
                                                    'coder' to 'product
                                                    engineer.'
                                                </p>
                                            </div>
                                        </div>
                                    </RevealElement>

                                    {/* Card 2 */}
                                    <RevealElement delay={200}>
                                        <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-xl shadow-foreground/5 transition-transform duration-300 hover:-translate-y-2 dark:shadow-2xl dark:shadow-black/50">
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                            <div className="relative flex h-full flex-col items-start overflow-hidden rounded-3xl bg-card p-8">
                                                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#7C3AED]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#7C3AED]/30"></div>
                                                <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all group-hover:shadow-[0_0_25px_rgba(124,58,237,0.3)]">
                                                    <RiApps2AiLine
                                                        className="text-[#7C3AED]"
                                                        size={32}
                                                    />
                                                </div>
                                                <h4 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                                                    Build Real Solutions
                                                </h4>
                                                <p className="text-sm leading-relaxed text-slate-400 lg:text-base">
                                                    "Local Problems, Global
                                                    Standards." Join a team
                                                    building production-ready
                                                    systems that tackle
                                                    real-world challenges.
                                                </p>
                                            </div>
                                        </div>
                                    </RevealElement>

                                    {/* Card 3 */}
                                    <RevealElement delay={300}>
                                        <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-xl shadow-foreground/5 transition-transform duration-300 hover:-translate-y-2 dark:shadow-2xl dark:shadow-black/50">
                                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A6F4]/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                            <div className="relative flex h-full flex-col items-start overflow-hidden rounded-3xl bg-card p-8">
                                                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#00A6F4]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#00A6F4]/30"></div>
                                                <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_15px_rgba(0,166,244,0.1)] transition-all group-hover:shadow-[0_0_25px_rgba(0,166,244,0.3)]">
                                                    <GiFallingStar
                                                        className="-rotate-90 text-[#00A6F4]"
                                                        size={32}
                                                    />
                                                </div>
                                                <h4 className="mb-4 text-2xl font-bold tracking-tight text-foreground">
                                                    Become Elite
                                                </h4>
                                                <p className="text-sm leading-relaxed text-slate-400 lg:text-base">
                                                    "Join the Top 1%." Master
                                                    the intersection of system
                                                    logic and visual polish to
                                                    stand out as a premier
                                                    talent.
                                                </p>
                                            </div>
                                        </div>
                                    </RevealElement>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* THE PROBLEM / THE GAP */}
                    <section className="relative overflow-hidden bg-background py-20 lg:py-40">
                        <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-[#7C3AED]/5 blur-[120px]" />
                        <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 rounded-full bg-[#00A6F4]/5 blur-[120px]" />

                        <div className="container mx-auto max-w-6xl px-4">
                            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
                                {/* Left: Content */}
                                <div className="space-y-10">
                                    <RevealElement>
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-xs font-bold tracking-widest text-red-400 uppercase">
                                                <AlertTriangle className="size-3.5" />
                                                Reality Check
                                            </div>
                                            <h2 className="text-5xl font-bold text-foreground lg:text-7xl/tight">
                                                The Gap <br />
                                                <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                    Is Real.
                                                </span>
                                            </h2>
                                        </div>
                                    </RevealElement>

                                    <div className="space-y-6">
                                        <RevealElement delay={200}>
                                            <p className="text-xl leading-relaxed text-muted-foreground">
                                                Tech is moving at light speed,
                                                but the distance between
                                                <span className="text-muted-foreground italic dark:text-white">
                                                    {' '}
                                                    "knowing syntax"{' '}
                                                </span>
                                                and
                                                <span className="font-semibold text-muted-foreground italic dark:text-white">
                                                    {' '}
                                                    "shipping world-class
                                                    products"{' '}
                                                </span>
                                                is growing every day.
                                            </p>
                                        </RevealElement>

                                        <RevealElement delay={400}>
                                            <div className="flex gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                                                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#00A6F4]/10 text-[#00A6F4]">
                                                    <Target size={24} />
                                                </div>
                                                <p className="text-base text-muted-foreground">
                                                    NJC exists to bridge that
                                                    gap. We don't just teach
                                                    code; we groom the
                                                    specialists who will put our
                                                    region on the map alongside
                                                    the tech giants of Nigeria
                                                    and Kenya.
                                                </p>
                                            </div>
                                        </RevealElement>
                                    </div>
                                </div>

                                {/* Right: Visual Graphic */}
                                <RevealElement delay={600} className="relative">
                                    <div className="relative grid gap-6">
                                        {/* Background decoration */}
                                        <div className="absolute inset-0 -z-10 rounded-full bg-linear-to-br from-[#00A6F4]/20 to-[#7C3AED]/20 opacity-30 blur-3xl" />

                                        {/* Card 1: The Old Way */}
                                        <div className="group relative -rotate-1 rounded-[2.5rem] border border-border bg-card/60 p-8 shadow-xl backdrop-blur-xl transition-all hover:-translate-y-2">
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-500 uppercase">
                                                    The Common Path
                                                </span>
                                                <MinusCircle
                                                    className="text-slate-600"
                                                    size={20}
                                                />
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-foreground line-through decoration-red-500/50">
                                                Tutorial Hell & Local Logic
                                            </h3>
                                            <p className="text-sm text-slate-400">
                                                Learning syntax without context.
                                                Building for local browsers
                                                instead of global users.
                                            </p>
                                        </div>

                                        {/* Bridge Icon */}
                                        <div className="relative z-10 -my-3 flex justify-center">
                                            <div className="flex size-12 items-center justify-center rounded-full border border-primary/50 bg-background shadow-[0_0_20px_rgba(0,166,244,0.3)]">
                                                <ArrowDown className="animate-bounce text-[#00A6F4]" />
                                            </div>
                                        </div>

                                        {/* Card 2: The NJC Way */}
                                        <div className="group relative rotate-1 rounded-[2.5rem] border border-primary/30 bg-primary/5 p-10 shadow-2xl shadow-primary/10 backdrop-blur-xl transition-all hover:-translate-y-2">
                                            <div className="absolute -top-2 -right-2">
                                                <div className="flex size-10 items-center justify-center rounded-full bg-[#00A6F4] text-black shadow-lg">
                                                    <Zap size={20} />
                                                </div>
                                            </div>
                                            <div className="mb-4 flex items-center justify-between">
                                                <span className="text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                                    The NJC Standard
                                                </span>
                                                <PlusCircle
                                                    className="text-[#00A6F4]"
                                                    size={20}
                                                />
                                            </div>
                                            <h3 className="mb-3 text-2xl font-bold text-foreground">
                                                Engineering Excellence
                                            </h3>
                                            <p className="text-slate-400">
                                                Mastering architectural design,
                                                performance optimization, and
                                                global-scale product thinking.
                                            </p>

                                            <div className="mt-6 flex items-center gap-4">
                                                <div className="h-1 flex-1 rounded-full bg-white/5">
                                                    <div className="h-full w-[90%] rounded-full bg-linear-to-r from-primary to-purple-500" />
                                                </div>
                                                <span className="text-xs font-bold text-white">
                                                    Top 1%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </RevealElement>
                            </div>
                        </div>
                    </section>
                    {/* WHAT YOU WILL LEARN */}
                    <section className="relative z-10 flex flex-col items-center overflow-hidden bg-background py-24 lg:py-32">
                        {/* Subtle background glow */}
                        <div className="pointer-events-none absolute top-1/3 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-[#7C3AED]/5 blur-[150px]"></div>

                        <div className="relative z-10 flex w-full justify-center">
                            <div className="flex w-full max-w-7xl">
                                <div className="w-full gap-16 px-4 lg:grid lg:grid-cols-12 lg:items-start">
                                    <div className="col-span-5 mb-12 flex flex-col gap-6 lg:sticky lg:top-32 lg:mb-0">
                                        <RevealElement>
                                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-md">
                                                <span className="h-2 w-2 animate-pulse rounded-full bg-[#7C3AED]"></span>
                                                <span className="text-xs font-bold tracking-widest text-[#7C3AED] uppercase">
                                                    Curriculum
                                                </span>
                                            </div>
                                        </RevealElement>

                                        <RevealElement delay={100}>
                                            <h2 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl/tight">
                                                What You Will{' '}
                                                <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                    Learn
                                                </span>
                                            </h2>
                                        </RevealElement>

                                        <RevealElement delay={200}>
                                            <p className="text-lg leading-relaxed text-muted-foreground">
                                                A holistic curriculum designed
                                                to turn developers into product
                                                engineers who can lead projects
                                                from concept to deployment.
                                            </p>
                                        </RevealElement>
                                    </div>

                                    {/* Grid */}
                                    <div className="col-span-7 grid gap-6 sm:grid-cols-2">
                                        {/* Card 1 */}
                                        <RevealElement delay={100}>
                                            <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-lg shadow-foreground/5 transition-all duration-300 hover:-translate-y-2 dark:shadow-xl dark:shadow-black/50">
                                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A6F4]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-8">
                                                    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#00A6F4]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#00A6F4]/20"></div>
                                                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_15px_rgba(0,166,244,0.1)] transition-all group-hover:shadow-[0_0_20px_rgba(0,166,244,0.2)]">
                                                        <BrainIcon
                                                            className="text-[#00A6F4]"
                                                            size={28}
                                                        />
                                                    </div>
                                                    <h4 className="mb-3 text-xl font-bold text-foreground">
                                                        Product Thinking
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        Bridge the gap between
                                                        business goals and user
                                                        needs to build what
                                                        actually matters.
                                                    </p>
                                                </div>
                                            </div>
                                        </RevealElement>

                                        {/* Card 2 */}
                                        <RevealElement delay={200}>
                                            <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-lg shadow-foreground/5 transition-all duration-300 hover:-translate-y-2 sm:mt-12 dark:shadow-xl dark:shadow-black/50">
                                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7C3AED]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-8">
                                                    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#7C3AED]/20"></div>
                                                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all group-hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                                                        <MdOutlineDesignServices
                                                            className="text-[#7C3AED]"
                                                            size={28}
                                                        />
                                                    </div>
                                                    <h4 className="mb-3 text-xl font-bold text-foreground">
                                                        UX/UI Mastery
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        Design interfaces that
                                                        are intuitive,
                                                        accessible, and
                                                        high-converting with
                                                        pixel-perfect precision.
                                                    </p>
                                                </div>
                                            </div>
                                        </RevealElement>

                                        {/* Card 3 */}
                                        <RevealElement delay={300}>
                                            <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-lg shadow-foreground/5 transition-all duration-300 hover:-translate-y-2 dark:shadow-xl dark:shadow-black/50">
                                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00A6F4]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-8">
                                                    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#00A6F4]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#00A6F4]/20"></div>
                                                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_15px_rgba(0,166,244,0.1)] transition-all group-hover:shadow-[0_0_20px_rgba(0,166,244,0.2)]">
                                                        <LuBlocks
                                                            className="-rotate-90 text-[#00A6F4]"
                                                            size={28}
                                                        />
                                                    </div>
                                                    <h4 className="mb-3 text-xl font-bold text-foreground">
                                                        System Architecture
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        Think scalable from day
                                                        one. Build robust
                                                        foundations that can
                                                        handle real-world
                                                        traffic.
                                                    </p>
                                                </div>
                                            </div>
                                        </RevealElement>

                                        {/* Card 4 */}
                                        <RevealElement delay={400}>
                                            <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 p-px shadow-lg shadow-foreground/5 transition-all duration-300 hover:-translate-y-2 sm:mt-12 dark:shadow-xl dark:shadow-black/50">
                                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#7C3AED]/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                                                <div className="relative h-full overflow-hidden rounded-3xl bg-card p-8">
                                                    <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-[#7C3AED]/20"></div>
                                                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all group-hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                                                        <GoRocket
                                                            className="text-[#7C3AED]"
                                                            size={28}
                                                        />
                                                    </div>
                                                    <h4 className="mb-3 text-xl font-bold text-foreground">
                                                        Execution
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        Master the workflow of
                                                        shipping
                                                        production-ready code
                                                        with confidence and
                                                        speed.
                                                    </p>
                                                </div>
                                            </div>
                                        </RevealElement>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* PROGRAM STRUCTURE */}
                    <section
                        id="program"
                        className="relative overflow-hidden bg-background py-24 lg:py-32"
                    >
                        {/* Subtle background glow */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A6F4]/5 blur-[150px]"></div>

                        <div className="relative z-10 flex w-full justify-center">
                            <div className="flex w-full max-w-7xl flex-col px-4">
                                <div className="flex flex-col items-center gap-6">
                                    <RevealElement>
                                        <h2 className="text-center text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl/tight">
                                            6 Months Structured for{' '}
                                            <span className="bg-gradient-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                Excellence
                                            </span>
                                        </h2>
                                    </RevealElement>

                                    <RevealElement delay={100}>
                                        <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
                                            A phased roadmap designed to take
                                            you from foundational theory to a
                                            production-ready launch.
                                        </p>
                                    </RevealElement>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Timeline */}
                        <div className="relative z-10 mt-20 hidden lg:block">
                            <div className="flex w-full justify-center">
                                <div className="flex lg:w-6xl">
                                    <div className="mb-8 grid w-full gap-8 lg:grid-cols-3">
                                        <RevealElement delay={100}>
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <h4 className="text-xl font-bold text-foreground">
                                                    Phase 1 : Foundation
                                                </h4>
                                                <p className="font-medium tracking-wide text-[#00A6F4]">
                                                    Month 1-2
                                                </p>
                                            </div>
                                        </RevealElement>
                                        <RevealElement delay={200}>
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <h4 className="text-xl font-bold text-foreground">
                                                    Phase 2 : Build
                                                </h4>
                                                <p className="font-medium tracking-wide text-[#00A6F4]">
                                                    Month 3-4
                                                </p>
                                            </div>
                                        </RevealElement>
                                        <RevealElement delay={300}>
                                            <div className="flex flex-col items-center gap-2 text-center">
                                                <h4 className="text-xl font-bold text-foreground">
                                                    Phase 3 : Launch
                                                </h4>
                                                <p className="font-medium tracking-wide text-[#7C3AED]">
                                                    Month 5-6
                                                </p>
                                            </div>
                                        </RevealElement>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Fade edges */}
                                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background via-transparent to-background" />
                                <div className="relative z-10 flex w-full justify-center">
                                    <div className="flex lg:w-6xl">
                                        <div className="grid w-full justify-items-center gap-8 lg:grid-cols-3">
                                            {/* Dot 1 */}
                                            <RevealElement delay={150}>
                                                <div className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(0,166,244,0.3)]">
                                                    <GoDotFill
                                                        size={20}
                                                        className="text-[#00A6F4]"
                                                    />
                                                </div>
                                            </RevealElement>
                                            {/* Dot 2 */}
                                            <RevealElement delay={250}>
                                                <div className="flex size-10 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(0,166,244,0.3)]">
                                                    <GoDotFill
                                                        size={20}
                                                        className="text-[#00A6F4]"
                                                    />
                                                </div>
                                            </RevealElement>
                                            {/* Dot 3 */}
                                            <RevealElement delay={350}>
                                                <div className="flex size-10 items-center justify-center rounded-full border border-purple-500/50 bg-background shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                                    <BsStarFill
                                                        size={18}
                                                        className="text-[#7C3AED]"
                                                    />
                                                </div>
                                            </RevealElement>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 h-px w-full border-t border-dashed border-white/20"></div>
                            </div>

                            <div className="mt-10 flex w-full justify-center">
                                <div className="flex lg:w-6xl">
                                    <div className="grid w-full justify-items-center gap-8 lg:grid-cols-3">
                                        <RevealElement delay={100}>
                                            <ul className="w-full max-w-[250px] space-y-4 text-muted-foreground">
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        UX & Design Strategy
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Product Problem Solving
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Product Fundamentals
                                                    </p>
                                                </li>
                                            </ul>
                                        </RevealElement>
                                        <RevealElement delay={200}>
                                            <ul className="w-full max-w-[250px] space-y-4 text-muted-foreground">
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Team Collaboration
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Full-Stack
                                                        Implementation
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#00A6F4]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Agile Sprints &
                                                        Critiques
                                                    </p>
                                                </li>
                                            </ul>
                                        </RevealElement>
                                        <RevealElement delay={300}>
                                            <ul className="w-full max-w-[250px] space-y-4 text-muted-foreground">
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#7C3AED]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        MVP Polish & Stress
                                                        Testing
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <GoDotFill
                                                        size={14}
                                                        className="mt-1 shrink-0 text-[#7C3AED]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        Strategic Pitch
                                                        Preparation
                                                    </p>
                                                </li>
                                                <li className="flex gap-3">
                                                    <BsStarFill
                                                        size={14}
                                                        className="mt-1.5 shrink-0 text-[#7C3AED]"
                                                    />
                                                    <p className="leading-relaxed">
                                                        The Demo Day
                                                    </p>
                                                </li>
                                            </ul>
                                        </RevealElement>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Timeline */}
                        <div className="relative z-10 mx-auto mt-16 block max-w-lg px-4 lg:hidden">
                            <div className="relative ml-4 space-y-12 border-l border-dashed border-white/20 pl-8">
                                <RevealElement delay={100}>
                                    <div className="relative">
                                        <div className="absolute top-0 -left-[49px] flex size-8 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(0,166,244,0.3)]">
                                            <GoDotFill
                                                size={16}
                                                className="text-[#00A6F4]"
                                            />
                                        </div>
                                        <h4 className="mb-1 text-xl font-bold text-foreground">
                                            Phase 1 : Foundation
                                        </h4>
                                        <p className="mb-6 font-medium tracking-wide text-[#00A6F4]">
                                            Month 1-2
                                        </p>
                                        <ul className="space-y-4 text-muted-foreground">
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    UX & Design Strategy
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Product Problem Solving
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Product Fundamentals
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </RevealElement>
                                <RevealElement delay={200}>
                                    <div className="relative">
                                        <div className="absolute top-0 -left-[49px] flex size-8 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_15px_rgba(0,166,244,0.3)]">
                                            <GoDotFill
                                                size={16}
                                                className="text-[#00A6F4]"
                                            />
                                        </div>
                                        <h4 className="mb-1 text-xl font-bold text-foreground">
                                            Phase 2 : Build
                                        </h4>
                                        <p className="mb-6 font-medium tracking-wide text-[#00A6F4]">
                                            Month 3-4
                                        </p>
                                        <ul className="space-y-4 text-muted-foreground">
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Team Collaboration
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Full-Stack Implementation
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Agile Sprints & Critiques
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </RevealElement>
                                <RevealElement delay={300}>
                                    <div className="relative">
                                        <div className="absolute top-0 -left-[49px] flex size-8 items-center justify-center rounded-full border border-purple-500/50 bg-background shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                            <BsStarFill
                                                size={14}
                                                className="text-[#7C3AED]"
                                            />
                                        </div>
                                        <h4 className="mb-1 text-xl font-bold text-foreground">
                                            Phase 3 : Launch
                                        </h4>
                                        <p className="mb-6 font-medium tracking-wide text-[#7C3AED]">
                                            Month 5-6
                                        </p>
                                        <ul className="space-y-4 text-muted-foreground">
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    MVP Polish & Stress Testing
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <GoDotFill
                                                    size={14}
                                                    className="mt-1 shrink-0 text-slate-500"
                                                />
                                                <p className="leading-relaxed">
                                                    Strategic Pitch Preparation
                                                </p>
                                            </li>
                                            <li className="flex gap-3">
                                                <BsStarFill
                                                    size={14}
                                                    className="mt-1.5 shrink-0 text-[#7C3AED]"
                                                />
                                                <p className="leading-relaxed">
                                                    The Demo Day: Pitching your
                                                    product to industry leaders.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </RevealElement>
                            </div>
                        </div>
                    </section>

                    {/* TEAM EXPERIENCE */}
                    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
                        {/* Ambient Background Elements */}
                        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#00A6F4]/5 blur-[120px]" />
                        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7C3AED]/5 blur-[120px]" />

                        <div className="container mx-auto max-w-6xl px-4">
                            <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-20">
                                {/* Left Side: Content & Roles */}
                                <div className="flex-1 space-y-8">
                                    <RevealElement>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1.5 text-xs font-bold tracking-widest text-[#7C3AED] uppercase">
                                            <Users2 className="size-3.5" />
                                            The Team Experience
                                        </div>
                                    </RevealElement>

                                    <div className="space-y-6">
                                        <RevealElement delay={100}>
                                            <h2 className="text-4xl font-bold text-foreground lg:text-6xl/tight">
                                                Synergy in{' '}
                                                <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                    Motion
                                                </span>
                                            </h2>
                                        </RevealElement>
                                        <RevealElement delay={200}>
                                            <p className="text-lg leading-relaxed text-muted-foreground">
                                                In the NJC Fellowship, you don't
                                                work in isolation. You're part
                                                of a high-performance,
                                                cross-functional squad of 3-5
                                                builders, simulating the intense
                                                velocity of a world-class
                                                startup.
                                            </p>
                                        </RevealElement>
                                    </div>

                                    {/* Active Roles Visualization */}
                                    <RevealElement
                                        delay={300}
                                        className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
                                    >
                                        {[
                                            {
                                                label: 'Product Lead',
                                                color: 'bg-blue-500',
                                            },
                                            {
                                                label: 'UI/UX Designer',
                                                color: 'bg-purple-500',
                                            },
                                            {
                                                label: 'Frontend Dev',
                                                color: 'bg-emerald-500',
                                            },
                                            {
                                                label: 'Backend Dev',
                                                color: 'bg-amber-500',
                                            },
                                        ].map((role, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 rounded-2xl border border-border bg-foreground/5 p-3 transition-colors hover:bg-foreground/10"
                                            >
                                                <div
                                                    className={`size-2 animate-pulse rounded-full ${role.color} shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
                                                />
                                                <span className="text-[10px] font-bold text-foreground uppercase">
                                                    {role.label}
                                                </span>
                                            </div>
                                        ))}
                                    </RevealElement>
                                </div>

                                {/* Right Side: Illustration & HUD */}
                                <div className="relative flex-1">
                                    <RevealElement
                                        delay={400}
                                        className="relative"
                                    >
                                        {/* HUD Decorative Corners */}
                                        <div className="absolute -top-4 -left-4 size-8 border-t-2 border-l-2 border-[#00A6F4]/30" />
                                        <div className="absolute -top-4 -right-4 size-8 border-t-2 border-r-2 border-[#7C3AED]/30" />
                                        <div className="absolute -bottom-4 -left-4 size-8 border-b-2 border-l-2 border-[#7C3AED]/30" />
                                        <div className="absolute -right-4 -bottom-4 size-8 border-r-2 border-b-2 border-[#00A6F4]/30" />

                                        {/* Status Indicators */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-1.5 backdrop-blur-md">
                                            <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                                            <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
                                                Active Team: 2026 Batch
                                            </span>
                                        </div>

                                        <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-1.5 backdrop-blur-md">
                                            <Command className="size-3 text-slate-400" />
                                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                                                Sprint Cycle: Week 08
                                            </span>
                                        </div>

                                        {/* SQUAD PULSE ILLUSTRATION */}
                                        <div className="relative z-10 flex aspect-square w-full items-center justify-center lg:aspect-video">
                                            <SquadPulseIllustration className="w-full max-w-lg" />
                                        </div>
                                    </RevealElement>
                                </div>
                            </div>

                            {/* What You'll Build: Mission Selection */}
                            <div className="mt-24 lg:mt-32">
                                <RevealElement className="mb-12 flex flex-col items-center text-center">
                                    <h3 className="mb-4 text-2xl font-bold text-foreground lg:text-3xl">
                                        Mission Selection: What You'll Build
                                    </h3>
                                    <p className="max-w-xl text-muted-foreground">
                                        Each team is assigned a high-impact
                                        mission based on real-world market gaps
                                        and technological challenges.
                                    </p>
                                </RevealElement>

                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                    {[
                                        {
                                            title: 'Logistics platform',
                                            desc: 'Optimizing supply chains and last-mile delivery systems.',
                                            icon: (
                                                <Truck className="size-6 text-blue-400" />
                                            ),
                                            focus: 'Operations',
                                            color: 'hover:border-blue-400/30',
                                        },
                                        {
                                            title: 'Fintech solution',
                                            desc: 'Building secure, scalable financial infrastructure for the future.',
                                            icon: (
                                                <Wallet className="size-6 text-purple-400" />
                                            ),
                                            focus: 'Security',
                                            color: 'hover:border-purple-400/30',
                                        },
                                        {
                                            title: 'Health tech system',
                                            desc: 'Modernizing patient care and medical data management.',
                                            icon: (
                                                <Stethoscope className="size-6 text-emerald-400" />
                                            ),
                                            focus: 'Impact',
                                            color: 'hover:border-emerald-400/30',
                                        },
                                        {
                                            title: 'Marketplace',
                                            desc: 'Creating dynamic platforms for commerce and trade.',
                                            icon: (
                                                <ShoppingCart className="size-6 text-amber-400" />
                                            ),
                                            focus: 'Commerce',
                                            color: 'hover:border-amber-400/30',
                                        },
                                    ].map((mission, i) => (
                                        <RevealElement
                                            key={i}
                                            delay={500 + i * 100}
                                        >
                                            <div
                                                className={`group relative overflow-hidden rounded-3xl border border-border bg-card/80 p-8 transition-all duration-500 hover:-translate-y-2 ${mission.color}`}
                                            >
                                                {/* Card Background Glow */}
                                                <div className="absolute -top-8 -right-8 size-24 rounded-full bg-white/[0.02] blur-2xl transition-transform duration-700 group-hover:scale-150" />

                                                <div className="relative z-10">
                                                    <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-foreground/5 text-foreground transition-transform duration-500 group-hover:scale-110">
                                                        {mission.icon}
                                                    </div>
                                                    <h4 className="mb-2 text-lg font-bold text-foreground">
                                                        {mission.title}
                                                    </h4>
                                                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                                        {mission.desc}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                                                            Focus:
                                                        </span>
                                                        <span className="text-[10px] font-bold text-foreground uppercase">
                                                            {mission.focus}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </RevealElement>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* DEMO DAY SECTION */}
                    <section className="relative z-10 flex flex-col items-center bg-background py-20 lg:py-32">
                        <div className="absolute top-0 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00A6F4]/10 blur-[120px]" />

                        <div className="w-full max-w-6xl px-4">
                            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                                {/* Left Column: Content */}
                                <div className="space-y-8">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/20 bg-[#00A6F4]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                        <Trophy className="size-3.5" />
                                        The Grand Finale
                                    </div>

                                    <RevealElement>
                                        <h2 className="text-4xl font-bold text-foreground lg:text-6xl/tight">
                                            The{' '}
                                            <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                Demo Day
                                            </span>
                                        </h2>
                                    </RevealElement>

                                    <RevealElement>
                                        <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">
                                            This isn't just a presentation; it's
                                            a high-stakes pitch event where
                                            industry leaders, top-tier firms,
                                            and venture capitalists are invited
                                            to witness the pinnacle of talent
                                            and innovation in the country.
                                        </p>
                                    </RevealElement>

                                    <div className="grid gap-4 sm:grid-cols-3">
                                        {[
                                            {
                                                label: 'Companies',
                                                icon: (
                                                    <Building2 className="size-5" />
                                                ),
                                                color: 'text-blue-400',
                                            },
                                            {
                                                label: 'Recruiters',
                                                icon: (
                                                    <Users2 className="size-5" />
                                                ),
                                                color: 'text-purple-400',
                                            },
                                            {
                                                label: 'Founders',
                                                icon: (
                                                    <Rocket className="size-5" />
                                                ),
                                                color: 'text-orange-400',
                                            },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:bg-foreground/5"
                                            >
                                                <span className={item.color}>
                                                    {item.icon}
                                                </span>
                                                <span className="text-sm font-medium text-foreground">
                                                    {item.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <RevealElement>
                                        <p className="text-lg font-semibold text-[#00A6F4] italic">
                                            "This is where opportunities
                                            transform into careers."
                                        </p>
                                    </RevealElement>
                                </div>

                                {/* Right Column: Visual Card */}
                                <RevealElement className="relative">
                                    <div className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card/80 p-10 shadow-2xl backdrop-blur-xl transition-all hover:border-primary/30">
                                        {/* Background decoration */}
                                        <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/4 -translate-y-1/4 rounded-full bg-[#7C3AED]/10 blur-[60px] transition-transform duration-700 group-hover:scale-150" />

                                        <div className="relative z-10 space-y-8">
                                            <div className="flex items-center gap-4">
                                                <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#00A6F4] to-[#7C3AED] text-white shadow-lg shadow-[#00A6F4]/20">
                                                    <Presentation size={24} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-foreground">
                                                        The Pitch Experience
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        6 Months of work, 10
                                                        Minutes to shine.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {[
                                                    {
                                                        title: 'Direct Access',
                                                        desc: 'Face-to-face networking with decision makers and tech leads.',
                                                    },
                                                    {
                                                        title: 'Real Investment',
                                                        desc: 'Seed funding opportunities for standout products and ventures.',
                                                    },
                                                    {
                                                        title: 'Talent Showcase',
                                                        desc: 'Verified skills proven through live execution and building.',
                                                    },
                                                ].map((feature, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex gap-4"
                                                    >
                                                        <BsCheckCircle className="mt-1 size-5 shrink-0 text-[#00A6F4] shadow-[0_0_10px_rgba(0,166,244,0.3)]" />
                                                        <div>
                                                            <h4 className="font-semibold text-foreground">
                                                                {feature.title}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {feature.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-6 flex items-center border-t border-border pt-8">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3, 4].map((i) => (
                                                        <div
                                                            key={i}
                                                            className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-background bg-muted"
                                                        >
                                                            <img
                                                                src={`https://i.pravatar.cc/100?u=recruiter${i}`}
                                                                alt="Attendee"
                                                            />
                                                        </div>
                                                    ))}
                                                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[10px] font-bold text-primary">
                                                        +50
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex flex-col">
                                                    <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                                                        Attendees
                                                    </span>
                                                    <span className="text-sm font-bold text-foreground">
                                                        Industry Leaders
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Decorative Element */}
                                    <div className="absolute -bottom-6 -left-6 hidden size-24 items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-2xl backdrop-blur-xl transition-transform hover:scale-110 lg:flex">
                                        <Target className="size-10 text-[#7C3AED] drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
                                    </div>
                                </RevealElement>
                            </div>
                        </div>
                    </section>
                    <div className="relative bg-background py-4">
                        {/* Fade edges */}
                        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-background via-transparent to-background dark:from-background dark:to-background" />
                        <div className="absolute top-1/2 h-px w-full border border-slate-500/20"></div>
                    </div>
                    {/* WHO SHOULD APPLY */}
                    <section className="relative z-10 overflow-hidden bg-background py-24 lg:py-32">
                        {/* Background Text Decor */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase select-none">
                            Builders
                        </div>

                        <div className="container mx-auto max-w-6xl px-4">
                            <div className="mb-16 flex flex-col items-center text-center lg:mb-24">
                                <RevealElement>
                                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/20 bg-[#00A6F4]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                        <Fingerprint className="size-3.5" />
                                        Ideal Candidate
                                    </div>
                                </RevealElement>
                                <RevealElement delay={100}>
                                    <h2 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">
                                        Built for the{' '}
                                        <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                            Relentless
                                        </span>
                                    </h2>
                                </RevealElement>
                                <RevealElement delay={200}>
                                    <p className="max-w-2xl text-lg text-muted-foreground">
                                        The NJC Fellowship isn't just a program;
                                        it's a high-intensity environment for
                                        those who live to create. We look for
                                        individuals who embody these four
                                        archetypes.
                                    </p>
                                </RevealElement>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    {
                                        title: 'The Craftsman',
                                        role: 'Technical Excellence',
                                        desc: 'Developers and designers who obsess over the details, from clean architecture to pixel-perfect interfaces.',
                                        icon: (
                                            <Code2 className="size-6 text-[#00A6F4]" />
                                        ),
                                        traits: [
                                            'Clean Code',
                                            'UI/UX',
                                            'Scale',
                                        ],
                                        color: 'from-[#00A6F4]/20 to-transparent',
                                        border: 'hover:border-[#00A6F4]/50',
                                    },
                                    {
                                        title: 'The Architect',
                                        role: 'Systems Thinking',
                                        desc: 'Engineers who see the big picture, building robust systems that handle complexity with elegance.',
                                        icon: (
                                            <Cpu className="size-6 text-[#7C3AED]" />
                                        ),
                                        traits: [
                                            'Logic',
                                            'Performance',
                                            'Data',
                                        ],
                                        color: 'from-[#7C3AED]/20 to-transparent',
                                        border: 'hover:border-[#7C3AED]/50',
                                    },
                                    {
                                        title: 'The Innovator',
                                        role: 'Product Mindset',
                                        desc: 'Visionaries who understand that code is a tool for solving real-world problems and creating impact.',
                                        icon: (
                                            <HiOutlineLightBulb className="size-6 text-amber-400" />
                                        ),
                                        traits: [
                                            'Vision',
                                            'UX Strategy',
                                            'MVP',
                                        ],
                                        color: 'from-amber-400/20 to-transparent',
                                        border: 'hover:border-amber-400/50',
                                    },
                                    {
                                        title: 'The Dedicated',
                                        role: 'Extreme Grit',
                                        desc: 'Builders ready to commit 6 months of intense, full-time effort to master their craft and ship products.',
                                        icon: (
                                            <Shield className="size-6 text-emerald-400" />
                                        ),
                                        traits: [
                                            'Consistency',
                                            'Resilience',
                                            'Grit',
                                        ],
                                        color: 'from-emerald-400/20 to-transparent',
                                        border: 'hover:border-emerald-400/50',
                                    },
                                ].map((archetype, i) => (
                                    <RevealElement
                                        key={i}
                                        delay={300 + i * 100}
                                    >
                                        <div
                                            className={`group relative h-full overflow-hidden rounded-[2rem] border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 ${archetype.border} hover:-translate-y-2`}
                                        >
                                            {/* Glow effect */}
                                            <div
                                                className={`absolute inset-0 bg-linear-to-br ${archetype.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                                            />

                                            <div className="relative z-10">
                                                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-foreground/5 shadow-inner transition-transform duration-500 group-hover:scale-110">
                                                    {archetype.icon}
                                                </div>
                                                <h3 className="mb-1 text-xl font-bold text-foreground">
                                                    {archetype.title}
                                                </h3>
                                                <p className="mb-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
                                                    {archetype.role}
                                                </p>
                                                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                                    {archetype.desc}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {archetype.traits.map(
                                                        (trait, j) => (
                                                            <span
                                                                key={j}
                                                                className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-[10px] font-medium text-muted-foreground"
                                                            >
                                                                {trait}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </RevealElement>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SELECTION PROCESS */}
                    <section className="relative z-10 bg-background py-24 lg:py-32">
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 bg-radial from-[#7C3AED]/5 to-transparent" />

                        <div className="container mx-auto max-w-6xl px-4">
                            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                                {/* Left Side: Content */}
                                <div className="space-y-8">
                                    <RevealElement>
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#7C3AED] uppercase">
                                            <Zap className="size-3.5" />
                                            Admissions
                                        </div>
                                    </RevealElement>

                                    <RevealElement delay={100}>
                                        <h2 className="text-4xl font-bold text-foreground lg:text-6xl/tight">
                                            The{' '}
                                            <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                Forge
                                            </span>
                                            <br />
                                            Your Path to the 1%
                                        </h2>
                                    </RevealElement>

                                    <RevealElement delay={200}>
                                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                                            Our selection process is rigorous,
                                            designed to identify not just
                                            talent, but potential and character.
                                            This is where the journey begins.
                                        </p>
                                    </RevealElement>

                                    <div className="flex items-center gap-4 pt-4">
                                        <Link
                                            href={apply.url()}
                                            className="group flex items-center gap-3 rounded-2xl bg-[#00A6F4] px-8 py-4 text-sm font-bold text-black transition-all hover:bg-[#00A6F4]/90 hover:shadow-[0_0_20px_rgba(0,166,244,0.4)]"
                                        >
                                            Begin Your Application
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Right Side: Interactive Timeline */}
                                <div className="relative">
                                    <div className="absolute top-8 bottom-8 left-[31px] w-px border-l border-dashed border-border lg:left-[39px]"></div>

                                    <div className="space-y-12">
                                        {[
                                            {
                                                title: 'Initial Access',
                                                desc: 'Submit your digital portfolio and answer our core craft questions.',
                                                status: 'Phase 01',
                                                icon: <Terminal size={20} />,
                                                color: 'bg-[#00A6F4]',
                                            },
                                            {
                                                title: 'Technical Review',
                                                desc: 'Our lead engineers evaluate your technical foundation and problem-solving.',
                                                status: 'Phase 02',
                                                icon: <Cpu size={20} />,
                                                color: 'bg-[#7C3AED]',
                                            },
                                            {
                                                title: 'The Crucible',
                                                desc: 'A deep-dive technical interview focusing on real-world execution.',
                                                status: 'Phase 03',
                                                icon: <Target size={20} />,
                                                color: 'bg-amber-400',
                                            },
                                            {
                                                title: 'Ascension',
                                                desc: 'Final selection and induction into the 2026 Batch.',
                                                status: 'The Selection',
                                                icon: <Trophy size={20} />,
                                                color: 'bg-emerald-400',
                                            },
                                        ].map((step, i) => (
                                            <RevealElement
                                                key={i}
                                                delay={300 + i * 100}
                                                className="group relative flex gap-8 lg:gap-10"
                                            >
                                                {/* Timeline Node */}
                                                <div
                                                    className={`relative z-10 flex size-16 shrink-0 items-center justify-center rounded-3xl border border-border bg-card transition-all duration-500 group-hover:border-primary/30 lg:size-20`}
                                                >
                                                    <div
                                                        className={`flex size-10 items-center justify-center rounded-2xl ${step.color} text-black shadow-lg lg:size-12`}
                                                    >
                                                        {step.icon}
                                                    </div>
                                                    {/* Glowing pulse */}
                                                    <div
                                                        className={`absolute inset-0 -z-10 animate-pulse rounded-3xl ${step.color} opacity-0 blur-xl transition-opacity group-hover:opacity-20`}
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <div className="mb-1 flex items-center gap-3">
                                                        <span className="text-[10px] font-bold tracking-widest text-[#00A6F4] uppercase">
                                                            {step.status}
                                                        </span>
                                                        <div className="h-px w-8 bg-white/10" />
                                                    </div>
                                                    <h4 className="mb-2 text-xl font-bold text-foreground">
                                                        {step.title}
                                                    </h4>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </RevealElement>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* FAQ */}
                    {/* FAQ SECTION */}
                    <section
                        id="faq"
                        className="relative z-10 flex flex-col items-center bg-background py-20 lg:py-32"
                    >
                        <div className="w-full max-w-6xl px-4">
                            <div className="grid gap-16 lg:grid-cols-12">
                                {/* Left side: Header */}
                                <div className="lg:col-span-5">
                                    <div className="sticky top-32 space-y-6">
                                        <div className="inline-flex items-center gap-2 rounded-full border border-[#00A6F4]/20 bg-[#00A6F4]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#00A6F4] uppercase">
                                            <HelpCircle className="size-3.5" />
                                            Common Questions
                                        </div>
                                        <RevealElement>
                                            <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
                                                Everything you{' '}
                                                <span className="text-[#00A6F4]">
                                                    need to know
                                                </span>
                                            </h2>
                                        </RevealElement>
                                        <RevealElement>
                                            <p className="text-lg leading-relaxed text-muted-foreground">
                                                Have questions about the
                                                fellowship, the selection
                                                process, or the curriculum?
                                                We've compiled answers to the
                                                most frequent inquiries.
                                            </p>
                                        </RevealElement>
                                        <div className="flex items-center gap-6 rounded-3xl border border-border bg-foreground/5 p-6 transition-all hover:border-primary/20">
                                            <BsEnvelopeArrowDown className="size-10 text-purple-400" />
                                            <div>
                                                <p className="mb-1 text-sm font-medium text-foreground">
                                                    Still have questions?
                                                </p>
                                                <Link
                                                    href={`/${locale}/contact`}
                                                    className="text-sm font-bold text-[#00A6F4] hover:underline"
                                                >
                                                    Get in touch with me →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side: Accordions */}
                                <div className="space-y-4 lg:col-span-7">
                                    {faqData.map((faq, index) => (
                                        <RevealElement
                                            key={index}
                                            delay={index * 100}
                                        >
                                            <div
                                                className={`group overflow-hidden rounded-3xl border transition-all duration-500 ${
                                                    openFaq === index
                                                        ? 'border-primary/30 bg-card shadow-[0_0_30px_-10px_rgba(0,166,244,0.2)]'
                                                        : 'border-border bg-card/40 hover:border-border/60 hover:bg-card/60'
                                                }`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        setOpenFaq(
                                                            openFaq === index
                                                                ? null
                                                                : index,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between p-7 text-left"
                                                >
                                                    <span
                                                        className={`text-lg font-semibold transition-colors duration-300 ${
                                                            openFaq === index
                                                                ? 'text-primary'
                                                                : 'text-foreground'
                                                        }`}
                                                    >
                                                        {faq.question}
                                                    </span>
                                                    <div
                                                        className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                                            openFaq === index
                                                                ? 'rotate-180 border-primary/50 bg-primary text-black shadow-[0_0_15px_rgba(0,166,244,0.4)]'
                                                                : 'border-border bg-card text-foreground'
                                                        }`}
                                                    >
                                                        <ChevronDown
                                                            size={18}
                                                        />
                                                    </div>
                                                </button>
                                                <div
                                                    className={`transition-all duration-500 ease-in-out ${
                                                        openFaq === index
                                                            ? 'max-h-96 opacity-100'
                                                            : 'max-h-0 opacity-0'
                                                    }`}
                                                >
                                                    <div className="px-7 pb-7 text-base leading-relaxed text-muted-foreground">
                                                        <div className="mb-6 h-px w-full bg-border" />
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        </RevealElement>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* FINAL CALL TO ACTION */}
                    <section className="relative overflow-hidden bg-background py-28 lg:py-40">
                        {/* Animated Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -z-10 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A6F4]/10 blur-[120px]" />
                        <div className="absolute top-1/2 left-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/5 blur-[100px]" />

                        <div className="container mx-auto max-w-6xl">
                            <RevealElement>
                                <div className="relative overflow-hidden rounded-[3rem] border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-3xl lg:p-20">
                                    {/* Internal Glow */}
                                    <div className="absolute -top-20 -right-20 size-64 rounded-full bg-[#00A6F4]/10 blur-3xl" />
                                    <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-[#7C3AED]/10 blur-3xl" />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="mb-8 flex items-center gap-3">
                                            <div className="h-px w-8 bg-linear-to-r from-transparent to-[#00A6F4]" />
                                            <span className="text-xs font-bold tracking-[0.3em] text-[#00A6F4] uppercase">
                                                Induction 2026
                                            </span>
                                            <div className="h-px w-8 bg-linear-to-l from-transparent to-[#00A6F4]" />
                                        </div>

                                        <h2 className="mb-8 text-4xl font-bold text-pretty text-foreground sm:text-5xl lg:text-7xl/tight">
                                            Ready to{' '}
                                            <span className="bg-linear-to-r from-[#00A6F4] to-[#7C3AED] bg-clip-text text-transparent">
                                                Build the Future?
                                            </span>
                                        </h2>

                                        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
                                            Join a selective cohort of visionary
                                            engineers and designers. Master the
                                            craft of shipping world-class
                                            products and launch your career into
                                            the top 1%.
                                        </p>

                                        <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
                                            <Link
                                                href={apply.url()}
                                                className="group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-[#00A6F4] to-[#7C3AED] px-10 text-lg font-bold text-white shadow-2xl shadow-[#00A6F4]/30 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] sm:w-auto"
                                            >
                                                <UserPlus size={22} />
                                                Start Your Application
                                                <div className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>

                                            <a
                                                href="#program"
                                                className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-foreground/5 px-10 text-lg font-semibold text-foreground backdrop-blur-md transition-all hover:border-border/20 hover:bg-foreground/10 active:scale-[0.98] sm:w-auto"
                                            >
                                                Explore Program
                                                <ArrowRight
                                                    size={22}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </a>
                                        </div>

                                        <div className="mt-16 flex flex-col items-center gap-4 border-t border-border pt-12">
                                            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                                                Limited Slots Available
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    Applications are currently
                                                    open for the next cohort
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealElement>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

Landing.layout = (page: React.ReactNode) => <MainLayout children={page} />;
export default Landing;
