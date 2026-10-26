import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Facebook,
    Linkedin,
    Loader2,
    Mail,
    MapPin,
    Phone,
    Send,
    Sparkles,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import RevealElement from '@/components/RevealElement';
import MainLayout from '@/layouts/MainLayout';
import { store as storeContactMessage } from '@/routes/contact';

const labelClass =
    'block text-xs font-semibold uppercase tracking-wider text-muted-foreground';

const inputClass =
    'mt-2 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground transition-all duration-300 placeholder:text-muted-foreground focus:border-primary/50 focus:bg-card/60 focus:outline-none focus:ring-1 focus:ring-primary/50';

const contactDetails = [
    {
        icon: MapPin,
        label: 'Visit us',
        value: 'Ngousso, Yaounde — Cameroon',
        href: null,
    },
    {
        icon: Phone,
        label: 'Call us',
        value: '+237 6 89 90 31 29',
        href: 'tel:+237689903129',
    },
    {
        icon: Mail,
        label: 'Email us',
        value: 'exer.htc@gmail.com',
        href: 'mailto:exer.htc@gmail.com',
    },
];

const socials = [
    {
        icon: Linkedin,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nloga-joseph-christ-7b1651194',
    },
    {
        icon: Facebook,
        label: 'Facebook',
        href: 'https://web.facebook.com/christ.nloga',
    },
];

const ContactIllustration = () => (
    <div className="relative hidden items-center justify-center py-2 lg:flex">
        <div className="pointer-events-none absolute size-40 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative w-full max-w-xs -rotate-3 rounded-2xl border border-border bg-background/70 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Mail className="size-3.5" />
                </span>
                <span className="h-2 w-20 rounded-full bg-foreground/15" />
            </div>
            <div className="mt-3 flex flex-col gap-2">
                <span className="h-2 w-full rounded-full bg-foreground/10" />
                <span className="h-2 w-4/5 rounded-full bg-foreground/10" />
                <span className="h-2 w-2/3 rounded-full bg-foreground/10" />
            </div>
        </div>
        <span className="absolute -top-1 right-4 flex size-11 rotate-6 items-center justify-center rounded-2xl bg-linear-to-br from-[#00A6F4] to-[#7C3AED] text-white shadow-lg">
            <Send className="size-5" />
        </span>
    </div>
);

const Contact = () => {
    const { props } = usePage<{
        locale: string;
        flash?: { success?: string | null };
    }>();

    const locale = props.locale || 'en';
    const flashSuccess = props.flash?.success ?? null;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({ name: '', email: '', message: '' });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(storeContactMessage.url({ locale }), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const successMessage =
        flashSuccess ??
        (recentlySuccessful
            ? 'Your message has been sent successfully!'
            : null);

    return (
        <div className="relative min-h-screen overflow-hidden bg-background px-4 pb-24 font-sans sm:px-6 lg:px-8">
            <Head title="Contact — EXER" />

            <div className="pointer-events-none absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full bg-primary/5 blur-[150px]" />
            <div className="pointer-events-none absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px]" />

            <div className="relative z-10 mx-auto max-w-6xl pt-24 lg:pt-32">
                <RevealElement>
                    <section className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#00A6F4] via-[#4C7BF0] to-[#7C3AED] px-6 pt-14 pb-36 text-center sm:px-10 sm:pt-16 lg:pb-44">
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
                                We are here for you! How can we help? Tell us
                                about your project or the healthcare problem you
                                are trying to solve.
                            </p>
                        </div>
                    </section>
                </RevealElement>

                <RevealElement delay={80}>
                    <div className="relative mx-auto -mt-24 max-w-5xl rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 lg:-mt-28">
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                            {/* ---------- Form ---------- */}
                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                                    Send us a message
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    Fill in the form and we will get back to
                                    you, usually within one business day.
                                </p>

                                {successMessage && (
                                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
                                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                                        <p>{successMessage}</p>
                                    </div>
                                )}

                                <form
                                    onSubmit={submit}
                                    noValidate
                                    className="mt-6 flex flex-col gap-5"
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className={labelClass}
                                        >
                                            Your name *
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Jane Doe"
                                            value={data.name}
                                            onChange={(event) =>
                                                setData(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-xs text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={labelClass}
                                        >
                                            Email address *
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="jane@example.com"
                                            value={data.email}
                                            onChange={(event) =>
                                                setData(
                                                    'email',
                                                    event.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-xs text-destructive">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className={labelClass}
                                        >
                                            Your message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Go ahead, we are listening…"
                                            value={data.message}
                                            onChange={(event) =>
                                                setData(
                                                    'message',
                                                    event.target.value,
                                                )
                                            }
                                            className={`${inputClass} resize-y`}
                                        />
                                        {errors.message && (
                                            <p className="mt-2 text-xs text-destructive">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-1 inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(0,169,157,0.8)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                                    >
                                        {processing ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <Send className="size-4" />
                                        )}
                                        {processing ? 'Sending…' : 'Submit'}
                                    </button>
                                </form>
                            </div>

                            {/* ---------- Contact information ---------- */}
                            <div className="flex flex-col justify-center gap-8 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-14">
                                <ContactIllustration />

                                <ul className="flex flex-col gap-5">
                                    {contactDetails.map((item) => (
                                        <li
                                            key={item.label}
                                            className="flex items-start gap-4"
                                        >
                                            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
                                                <item.icon className="size-4" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                                    {item.label}
                                                </p>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-sm font-semibold break-words text-foreground transition-colors hover:text-primary"
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col gap-2">
                                    <span className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                                        <Clock className="size-3.5 text-primary" />
                                        Response time
                                    </span>
                                    <p className="text-sm text-muted-foreground">
                                        Monday to Friday, within one business
                                        day.
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"
                                        >
                                            <social.icon className="size-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealElement>

                <RevealElement delay={140}>
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card/40 px-6 py-5 text-center sm:flex-row sm:text-left">
                        <p className="text-sm text-muted-foreground">
                            Prefer to look around first? Explore how EXER
                            approaches digital health.
                        </p>
                        <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <Link
                                href={`/${locale}`}
                                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/60 px-5 text-sm font-bold text-foreground transition-all hover:border-primary/30 hover:text-primary"
                            >
                                <ArrowLeft className="size-4" />
                                Back to Home
                            </Link>
                            <Link
                                href={`/${locale}/workshops`}
                                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.03]"
                            >
                                See Workshops
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </RevealElement>
            </div>
        </div>
    );
};

Contact.layout = (page: ReactNode) => <MainLayout children={page} />;

export default Contact;
