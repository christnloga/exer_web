import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AppLogoIcon from './app-logo-icon';

const Footer = () => {
    const { t } = useTranslation();
    const { props } = usePage();
    const locale = (props as any).locale || 'fr';
    const currentYear = new Date().getFullYear();

    const navLinks = [
        {
            href: `/${locale}`,
            title: t('Accueil'),
            isAnchor: false,
        },
        {
            href: `/${locale}/about`,
            title: t('About EXER'),
            isAnchor: false,
        },
        {
            href: '#services',
            title: t('Services'),
            isAnchor: true,
        },
        {
            href: '#ohsa',
            title: t('OHSA Project'),
            isAnchor: true,
        },
        {
            href: '#workshop',
            title: t('Workshop'),
            isAnchor: true,
        },
        {
            href: `/${locale}/contact`,
            title: t('Contact'),
            isAnchor: false,
        },
    ];

    return (
        <footer className="relative z-10 border-t border-border bg-card/50 py-12 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
                <div className="flex flex-col gap-10">
                    {/* Top Row: Logo, Tagline & Navigation */}
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        {/* Logo */}
                        <Link
                            href={`/${locale}`}
                            className="flex flex-col items-center gap-3 md:items-start"
                        >
                            <AppLogoIcon className="h-9 w-auto" />
                            <span className="text-xs font-medium text-muted-foreground">
                                User experience for better digital health.
                            </span>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                            {navLinks.map((link) =>
                                link.isAnchor ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.title}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.title}
                                    </Link>
                                ),
                            )}
                        </nav>
                    </div>

                    {/* Bottom Row: Copyright */}
                    <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
                        <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
                            <p className="text-sm font-medium text-muted-foreground">
                                © {currentYear}{' '}
                                <span className="text-foreground">
                                    EXER Healthtech Consulting
                                </span>
                                .
                                <span className="ml-1 hidden sm:inline">
                                    {t('All rights reserved.')}
                                </span>
                            </p>
                            <p className="text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                                {t('Designed & Engineered with')}{' '}
                                <span className="text-primary">❤</span>{' '}
                                {t('in Cameroon')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
