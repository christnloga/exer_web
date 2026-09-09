import { Brain, Code2, Palette, Rocket, Search, Settings } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { AiOutlinePhone } from 'react-icons/ai';
import { BsGithub, BsTwitterX } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import RevealElement from '../RevealElement';

const Header = () => {
    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [0, 500], [1, 1.25]);

    const { t } = useTranslation();

    return (
        <header className="relative px-1 pt-1 lg:pt-1.5">
            {/* Global Animations */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `,
                }}
            />

            <div className="relative mb-5 overflow-hidden rounded-3xl border border-border bg-card/80 pt-[88px] backdrop-blur-xl lg:mb-10 dark:shadow-2xl">
                {/* Ambient Glows */}
                <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
                <div className="pointer-events-none absolute top-40 right-10 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

                {/* Subtle Grid Pattern */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative z-10 flex w-full justify-center">
                    <div className="flex lg:w-6xl">
                        <div className="grid-cols-12 px-4 lg:grid">
                            {/* Content Column */}
                            <div className="col-span-6 flex flex-col gap-6 py-10 text-center lg:py-28 lg:text-left">
                                <div className="relative mx-auto size-[280px] overflow-hidden rounded-3xl border border-border bg-primary/10 lg:hidden">
                                    <motion.img
                                        style={{ scale }}
                                        className="absolute top-8 scale-115 saturate-0"
                                        src="/my-photo-v2.png"
                                        alt=""
                                    />
                                    <div className="absolute bottom-0 h-1/2 w-full bg-linear-to-t from-card to-transparent"></div>
                                </div>

                                <div className="flex w-full justify-center lg:justify-start">
                                    <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase shadow-[0_0_15px_-3px_rgba(0,166,244,0.3)]">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                                        </span>
                                        {t('Welcome to my domain')}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <RevealElement>
                                        <h1 className="text-5xl font-bold text-foreground lg:text-7xl/tight">
                                            {t("I'm")}{' '}
                                            <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                                                nloga
                                            </span>
                                        </h1>
                                        <h2 className="text-5xl font-bold text-foreground capitalize lg:text-7xl/tight">
                                            Joseph Christ
                                        </h2>
                                    </RevealElement>
                                    <RevealElement>
                                        <div className="mt-2">
                                            <h4 className="inline-block text-2xl font-semibold text-muted-foreground lg:text-[28px]/snug">
                                                {t(
                                                    'Solution Architect & UX Engineer',
                                                )}
                                            </h4>
                                        </div>
                                    </RevealElement>
                                </div>
                                <RevealElement>
                                    <h4 className="max-w-lg text-lg text-muted-foreground/80">
                                        {t(
                                            'I partner with startups, growing businesses, and international teams to transform ideas into reliable, market-ready digital products.',
                                        )}
                                    </h4>
                                </RevealElement>
                                <div className="mt-4 flex w-full justify-center gap-4 lg:justify-start">
                                    <a
                                        href={
                                            'https://planner.adna.cards/appointments/bookable/user_1732892830_6N0Y1iShrk'
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex h-14 items-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-primary to-purple-500 px-8 font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(0,166,244,0.8)]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <AiOutlinePhone
                                            className="relative z-10 rotate-90"
                                            size={22}
                                        />
                                        <span className="relative z-10">
                                            {t("Let's talk")}
                                        </span>
                                    </a>
                                    <a
                                        href={'#work'}
                                        className="group flex h-14 items-center gap-2 rounded-xl border border-border bg-foreground/5 px-8 font-semibold text-foreground backdrop-blur-md transition-all hover:border-primary/20 hover:bg-foreground/10 hover:text-primary"
                                    >
                                        {t('See My Work')}
                                    </a>
                                </div>
                            </div>

                            {/* Photo Column */}
                            <div className="group relative col-span-6 hidden lg:block">
                                {/* Horizon Sphere Effect */}
                                <div className="absolute left-1/2 h-full -translate-x-1/2 overflow-y-clip lg:-bottom-28">
                                    <div className="relative -bottom-[950px] flex items-center justify-center">
                                        <div className="absolute size-[calc(100%+500px*2.5)] rounded-full bg-primary/5 blur-[80px]"></div>
                                        <div className="absolute size-[calc(100%+440px*2.5)] rounded-full bg-card shadow-[inset_0_0_100px_rgba(0,166,244,0.1)]"></div>
                                    </div>
                                </div>

                                {/* Revolving SDLC Icons Container */}
                                <div className="absolute bottom-0 left-1/2 z-0 size-[600px] -translate-x-1/2 lg:translate-y-1/4">
                                    <div className="relative h-full w-full animate-[spin_50s_linear_infinite]">
                                        {[
                                            {
                                                Icon: Brain,
                                                label: 'Planning',
                                                color: 'text-blue-400',
                                                angle: 0,
                                            },
                                            {
                                                Icon: Palette,
                                                label: 'Design',
                                                color: 'text-purple-400',
                                                angle: 60,
                                            },
                                            {
                                                Icon: Code2,
                                                label: 'Code',
                                                color: 'text-emerald-400',
                                                angle: 120,
                                            },
                                            {
                                                Icon: Search,
                                                label: 'Test',
                                                color: 'text-amber-400',
                                                angle: 180,
                                            },
                                            {
                                                Icon: Rocket,
                                                label: 'Deploy',
                                                color: 'text-rose-400',
                                                angle: 240,
                                            },
                                            {
                                                Icon: Settings,
                                                label: 'Maintain',
                                                color: 'text-cyan-400',
                                                angle: 300,
                                            },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                                style={{
                                                    transform: `rotate(${item.angle}deg) translateY(-280px) rotate(-${item.angle}deg)`,
                                                }}
                                            >
                                                <div className="relative flex flex-col items-center gap-2">
                                                    <div
                                                        className={`flex size-12 items-center justify-center rounded-xl border border-border bg-card shadow-[0_0_15px_rgba(0,0,0,0.05)] backdrop-blur-md transition-all hover:scale-110 hover:border-primary/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] ${item.color}`}
                                                    >
                                                        <item.Icon className="size-6" />
                                                    </div>
                                                    <div className="absolute -bottom-6 whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                                                        <span
                                                            className={`text-[10px] font-bold tracking-widest uppercase ${item.color}`}
                                                        >
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech HUD Decorations */}
                                <div className="pointer-events-none absolute inset-0 z-20">
                                    <div className="absolute top-20 right-10 flex animate-bounce items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 backdrop-blur-md">
                                        <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-bold tracking-tighter text-emerald-500 uppercase">
                                            System: Online
                                        </span>
                                    </div>
                                    <div className="absolute bottom-40 left-0 flex animate-pulse items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 backdrop-blur-md">
                                        <div className="size-1.5 rounded-full bg-blue-500" />
                                        <span className="text-[10px] font-bold tracking-tighter text-blue-500 uppercase">
                                            DevOps Ready
                                        </span>
                                    </div>
                                </div>

                                {/* Main Photo Container */}
                                <div className="relative z-10 mt-10 flex flex-col lg:absolute lg:bottom-0 lg:mt-0">
                                    <motion.div
                                        style={{ scale }}
                                        className="relative w-full overflow-hidden rounded-3xl"
                                    >
                                        <div className="absolute inset-0 z-10 bg-linear-to-t from-card via-transparent to-transparent opacity-60" />
                                        <img
                                            className="object-cover object-bottom saturate-0 transition-all duration-700 hover:saturate-100"
                                            src="/my-photo-v2.png"
                                            alt="Joseph Christ"
                                        />
                                        {/* HUD Corner Accents */}
                                        <div className="absolute top-4 left-4 z-20 size-8 border-t-2 border-l-2 border-primary/30" />
                                        <div className="absolute top-4 right-4 z-20 size-8 border-t-2 border-r-2 border-purple-500/30" />
                                        <div className="absolute bottom-4 left-4 z-20 size-8 border-b-2 border-l-2 border-purple-500/30" />
                                        <div className="absolute right-4 bottom-4 z-20 size-8 border-r-2 border-b-2 border-primary/30" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links Footer Section */}
            <div className="flex w-full justify-center">
                <div className="flex lg:w-6xl">
                    <RevealElement>
                        <div className="flex items-center gap-4">
                            <a
                                target="_blank"
                                href="https://github.com/christnloga"
                                className="mb-11 flex size-10 shrink-0 overflow-hidden rounded-md transition-all duration-150 hover:bg-primary/5 hover:brightness-110 active:brightness-125"
                            >
                                <BsGithub
                                    className="m-auto text-primary"
                                    size={20}
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://web.facebook.com/christ.nloga/?_rdc=1&_rdr#"
                                className="mb-11 flex size-10 shrink-0 overflow-hidden rounded-md transition-all duration-150 hover:bg-primary/5 hover:brightness-110 active:brightness-125"
                            >
                                <FaFacebookF
                                    className="m-auto text-primary"
                                    size={20}
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://www.linkedin.com/in/nloga-joseph-christ-7b1651194"
                                className="mb-11 flex size-10 shrink-0 overflow-hidden rounded-md transition-all duration-150 hover:bg-primary/5 hover:brightness-110 active:brightness-125"
                            >
                                <FaLinkedinIn
                                    className="m-auto text-primary"
                                    size={20}
                                />
                            </a>
                            <a
                                target="_blank"
                                href="https://x.com/_nloga"
                                className="mb-11 flex size-10 shrink-0 overflow-hidden rounded-md transition-all duration-150 hover:bg-primary/5 hover:brightness-110 active:brightness-125"
                            >
                                <BsTwitterX
                                    className="m-auto text-primary"
                                    size={20}
                                />
                            </a>
                        </div>
                    </RevealElement>
                </div>
            </div>
        </header>
    );
};

export default Header;
