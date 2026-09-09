import { Head, usePage } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    CheckSquare,
    ChevronRight,
    Clock,
    ExternalLink,
    GraduationCap,
    Globe,
    HeartPulse,
    Inbox,
    Linkedin,
    ListFilter,
    Mail,
    MessageCircle,
    Phone,
    SlidersHorizontal,
    Sparkles,
    Star,
    Target,
    Trash2,
    Users,
    X,
    XCircle,
} from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    useDeleteWorkshopApplicant,
    useUpdateWorkshopApplicantStatus,
    useWorkshopApplicants,
} from '@/hooks/use-workshop-applicants';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { workshops as dashboardWorkshops } from '@/routes/dashboard/index';
import type { BreadcrumbItem, Workshop, WorkshopApplicant } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Workshops',
        href: dashboardWorkshops(),
    },
];

const getStatusColor = (status: WorkshopApplicant['status']) => {
    switch (status) {
        case 'pending':
            return 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-zinc-400 dark:border-white/10';
        case 'shortlisted':
            return 'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20';
        case 'accepted':
            return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
        case 'rejected':
            return 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
        default:
            return 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-zinc-400 dark:border-white/10';
    }
};

const BACKGROUND_LABELS: Record<string, string> = {
    healthcare_professional: 'Healthcare professional',
    student: 'Student',
    recent_graduate: 'Recent graduate',
    technology_it_professional: 'Technology / IT professional',
    ux_ui_professional: 'UX / UI professional',
    product_project_professional: 'Product / Project professional',
    entrepreneur_founder: 'Entrepreneur / Founder',
    researcher: 'Researcher',
    public_health_professional: 'Public health professional',
    ngo_development_professional: 'NGO / Development professional',
    other: 'Other',
};

const EXPERIENCE_LABELS: Record<string, string> = {
    completely_new: 'Completely new to digital health',
    basic_knowledge: 'Basic knowledge',
    studied_or_worked: 'Studied / worked on digital health projects',
    currently_work: 'Currently works in digital health',
    significant_experience: 'Significant experience in digital health',
};

const INTEREST_LABELS: Record<string, string> = {
    digital_health: 'Digital Health',
    ux_user_research: 'UX / User Research',
    product_management: 'Product Management',
    ai_in_healthcare: 'Artificial Intelligence in Healthcare',
    healthcare_innovation: 'Healthcare Innovation',
    healthtech_entrepreneurship: 'HealthTech Entrepreneurship',
    healthcare_accessibility: 'Healthcare Accessibility',
    patient_experience: 'Patient Experience',
    digital_health_research: 'Digital Health Research',
    other: 'Other',
};

const COMMITMENT_LABELS: Record<string, string> = {
    yes_commit: 'Can commit to all four sessions',
    most_sessions: 'Can attend most sessions (may have conflicts)',
    not_sure: 'Not sure yet',
};

const REFERRAL_LABELS: Record<string, string> = {
    linkedin: 'LinkedIn',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    friend_colleague: 'Friend / colleague',
    university_school: 'University / school',
    professional_network: 'Professional network',
    other: 'Other',
};

const GENDER_LABELS: Record<string, string> = {
    male: 'Male',
    female: 'Female',
    non_binary: 'Non-binary',
    prefer_not_to_say: 'Prefer not to say',
};

const LANGUAGE_LABELS: Record<string, string> = {
    english: 'English',
    french: 'French',
    bilingual: 'Bilingual (English & French)',
    other: 'Other',
};

const EXPERIENCE_OPTIONS = Object.entries(EXPERIENCE_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const INTEREST_OPTIONS = Object.entries(INTEREST_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const COMMITMENT_OPTIONS = Object.entries(COMMITMENT_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const REFERRAL_OPTIONS = Object.entries(REFERRAL_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const GENDER_OPTIONS = Object.entries(GENDER_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const LANGUAGE_OPTIONS = Object.entries(LANGUAGE_LABELS).map(
    ([value, label]) => ({ value, label }),
);

const PROJECT_OPTIONS = [
    { value: 'yes', label: 'Has previous project' },
    { value: 'no', label: 'No previous project' },
];

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

function StatCard({
    icon,
    label,
    value,
    active = false,
    onClick,
}: {
    icon: ReactNode;
    label: string;
    value: number;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/50',
                active && 'border-primary ring-1 ring-primary/30',
            )}
        >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-2xl leading-none font-bold tabular-nums">
                    {value}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                    {label}
                </p>
            </div>
        </button>
    );
}

function FilterSelect({
    icon,
    value,
    onValueChange,
    placeholder,
    allLabel,
    options,
    className,
}: {
    icon: ReactNode;
    value: string;
    onValueChange: (value: string) => void;
    placeholder: string;
    allLabel: string;
    options: { value: string; label: string }[];
    className?: string;
}) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger size="sm" className={cn('w-[190px]', className)}>
                {icon}
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">{allLabel}</SelectItem>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

type BreakdownOption = {
    value: string;
    label: string;
    count: number;
};

type BreakdownGroup = {
    id: string;
    label: string;
    value: string;
    onSelect: (value: string) => void;
    total: number;
    options: BreakdownOption[];
};

function FilterBreakdown({ groups }: { groups: BreakdownGroup[] }) {
    return (
        <aside className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                    Filter breakdown
                </h2>
            </div>

            {groups.map((group) => (
                <div
                    key={group.id}
                    className="overflow-hidden rounded-xl border bg-card"
                >
                    <div className="flex items-center justify-between border-b px-4 py-3">
                        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                            {group.label}
                        </span>
                        {group.value !== 'all' && (
                            <button
                                type="button"
                                onClick={() => group.onSelect('all')}
                                className="text-xs font-medium text-primary hover:underline"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <ul className="p-1.5">
                        <li>
                            <button
                                type="button"
                                onClick={() => group.onSelect('all')}
                                className={cn(
                                    'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                                    group.value === 'all' &&
                                        'bg-primary/10 font-medium text-primary',
                                )}
                            >
                                <span>All</span>
                                <span
                                    className={cn(
                                        'inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums',
                                        group.value === 'all'
                                            ? 'bg-primary/15 text-primary'
                                            : 'bg-muted text-muted-foreground',
                                    )}
                                >
                                    {group.total}
                                </span>
                            </button>
                        </li>
                        {group.options.map((option) => {
                            const active = group.value === option.value;
                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            group.onSelect(
                                                active ? 'all' : option.value,
                                            )
                                        }
                                        className={cn(
                                            'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                                            active &&
                                                'bg-primary/10 font-medium text-primary',
                                        )}
                                    >
                                        <span className="min-w-0 truncate text-left">
                                            {option.label}
                                        </span>
                                        <span
                                            className={cn(
                                                'inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums',
                                                active
                                                    ? 'bg-primary/15 text-primary'
                                                    : 'bg-muted text-muted-foreground',
                                            )}
                                        >
                                            {option.count}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </aside>
    );
}

function DetailSection({
    icon,
    title,
    children,
}: {
    icon: ReactNode;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="space-y-5">
            <div className="flex items-center gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
                    {title}
                </h3>
            </div>
            {children}
        </section>
    );
}

function DetailField({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {label}
            </p>
            <div className="text-sm text-foreground">{children}</div>
        </div>
    );
}

function DetailText({ children }: { children: ReactNode }) {
    return (
        <p className="rounded-xl border bg-muted/40 p-4 text-sm leading-relaxed text-foreground/80">
            {children}
        </p>
    );
}

export default function WorkshopApplicants() {
    const { workshops = [] } = usePage<{
        workshops: Workshop[];
    }>().props;
    const { data: applicants = [], isLoading } = useWorkshopApplicants();
    const [selectedApplicant, setSelectedApplicant] =
        useState<WorkshopApplicant | null>(null);
    const [statusFilter, setStatusFilter] = useState<
        'all' | WorkshopApplicant['status']
    >('all');
    const [workshopFilter, setWorkshopFilter] = useState<string>('all');
    const [fieldOfStudyFilter, setFieldOfStudyFilter] = useState<string>('all');
    const [experienceFilter, setExperienceFilter] = useState<string>('all');
    const [interestFilter, setInterestFilter] = useState<string>('all');
    const [commitmentFilter, setCommitmentFilter] = useState<string>('all');
    const [projectFilter, setProjectFilter] = useState<
        'all' | 'yes' | 'no'
    >('all');
    const [referralFilter, setReferralFilter] = useState<string>('all');
    const [genderFilter, setGenderFilter] = useState<string>('all');
    const [languageFilter, setLanguageFilter] = useState<string>('all');

    const fieldOfStudyOptions = useMemo(() => {
        const values = new Set<string>();
        for (const applicant of applicants) {
            const value = applicant.field_of_study?.trim();
            if (value) values.add(value);
        }
        return Array.from(values).sort((a, b) => a.localeCompare(b));
    }, [applicants]);

    const scopedApplicants = useMemo(
        () =>
            applicants.filter((applicant) => {
                const matchesWorkshop =
                    workshopFilter === 'all' ||
                    applicant.workshop_id === workshopFilter;
                const matchesFieldOfStudy =
                    fieldOfStudyFilter === 'all' ||
                    applicant.field_of_study === fieldOfStudyFilter;
                const matchesExperience =
                    experienceFilter === 'all' ||
                    applicant.digital_health_experience === experienceFilter;
                const matchesInterest =
                    interestFilter === 'all' ||
                    (applicant.interests ?? []).includes(interestFilter);
                const matchesCommitment =
                    commitmentFilter === 'all' ||
                    applicant.commitment === commitmentFilter;
                const matchesProject =
                    projectFilter === 'all' ||
                    (projectFilter === 'yes'
                        ? applicant.previous_project_experience
                        : !applicant.previous_project_experience);
                const matchesReferral =
                    referralFilter === 'all' ||
                    applicant.referral_source === referralFilter;
                const matchesGender =
                    genderFilter === 'all' ||
                    applicant.gender === genderFilter;
                const matchesLanguage =
                    languageFilter === 'all' ||
                    applicant.language === languageFilter;

                return (
                    matchesWorkshop &&
                    matchesFieldOfStudy &&
                    matchesExperience &&
                    matchesInterest &&
                    matchesCommitment &&
                    matchesProject &&
                    matchesReferral &&
                    matchesGender &&
                    matchesLanguage
                );
            }),
        [
            applicants,
            workshopFilter,
            fieldOfStudyFilter,
            experienceFilter,
            interestFilter,
            commitmentFilter,
            projectFilter,
            referralFilter,
            genderFilter,
            languageFilter,
        ],
    );

    const filteredApplicants = useMemo(
        () =>
            scopedApplicants.filter(
                (applicant) =>
                    statusFilter === 'all' ||
                    applicant.status === statusFilter,
            ),
        [scopedApplicants, statusFilter],
    );

    const stats = useMemo(() => {
        const count = (status: WorkshopApplicant['status']) =>
            scopedApplicants.filter((applicant) => applicant.status === status)
                .length;

        return {
            total: scopedApplicants.length,
            pending: count('pending'),
            shortlisted: count('shortlisted'),
            accepted: count('accepted'),
            rejected: count('rejected'),
        };
    }, [scopedApplicants]);

    const breakdownGroups = useMemo<BreakdownGroup[]>(() => {
        const countWhere = (predicate: (a: WorkshopApplicant) => boolean) =>
            applicants.filter(predicate).length;

        const statusOptions = (
            ['pending', 'shortlisted', 'accepted', 'rejected'] as const
        ).map((status) => ({
            value: status,
            label: status[0].toUpperCase() + status.slice(1),
            count: countWhere((a) => a.status === status),
        }));

        const workshopOptions = workshops.map((workshop) => ({
            value: workshop.id,
            label: workshop.title,
            count: countWhere((a) => a.workshop_id === workshop.id),
        }));

        const fieldOptions = fieldOfStudyOptions.map((value) => ({
            value,
            label: value,
            count: countWhere((a) => a.field_of_study === value),
        }));

        const experienceOptions = EXPERIENCE_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere(
                (a) => a.digital_health_experience === option.value,
            ),
        }));

        const interestOptions = INTEREST_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) =>
                (a.interests ?? []).includes(option.value),
            ),
        }));

        const commitmentOptions = COMMITMENT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) => a.commitment === option.value),
        }));

        const projectOptions = PROJECT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) =>
                option.value === 'yes'
                    ? a.previous_project_experience
                    : !a.previous_project_experience,
            ),
        }));

        const referralOptions = REFERRAL_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) => a.referral_source === option.value),
        }));

        const genderOptions = GENDER_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) => a.gender === option.value),
        }));

        const languageOptions = LANGUAGE_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
            count: countWhere((a) => a.language === option.value),
        }));

        return [
            // {
            //     id: 'status',
            //     label: 'Status',
            //     value: statusFilter,
            //     onSelect: (value) =>
            //         setStatusFilter(
            //             value as 'all' | WorkshopApplicant['status'],
            //         ),
            //     total: applicants.length,
            //     options: statusOptions,
            // },
            {
                id: 'workshop',
                label: 'Workshop',
                value: workshopFilter,
                onSelect: setWorkshopFilter,
                total: applicants.length,
                options: workshopOptions,
            },
            {
                id: 'field_of_study',
                label: 'Field of study',
                value: fieldOfStudyFilter,
                onSelect: setFieldOfStudyFilter,
                total: applicants.length,
                options: fieldOptions,
            },
            {
                id: 'experience',
                label: 'Experience',
                value: experienceFilter,
                onSelect: setExperienceFilter,
                total: applicants.length,
                options: experienceOptions,
            },
            {
                id: 'interests',
                label: 'Interests',
                value: interestFilter,
                onSelect: setInterestFilter,
                total: applicants.length,
                options: interestOptions,
            },
            {
                id: 'commitment',
                label: 'Commitment',
                value: commitmentFilter,
                onSelect: setCommitmentFilter,
                total: applicants.length,
                options: commitmentOptions,
            },
            {
                id: 'project',
                label: 'Previous project',
                value: projectFilter,
                onSelect: (value) =>
                    setProjectFilter(value as 'all' | 'yes' | 'no'),
                total: applicants.length,
                options: projectOptions,
            },
            {
                id: 'referral',
                label: 'Referral source',
                value: referralFilter,
                onSelect: setReferralFilter,
                total: applicants.length,
                options: referralOptions,
            },
            {
                id: 'gender',
                label: 'Gender',
                value: genderFilter,
                onSelect: setGenderFilter,
                total: applicants.length,
                options: genderOptions,
            },
            {
                id: 'language',
                label: 'Language',
                value: languageFilter,
                onSelect: setLanguageFilter,
                total: applicants.length,
                options: languageOptions,
            },
        ];
    }, [
        applicants,
        workshops,
        fieldOfStudyOptions,
        statusFilter,
        workshopFilter,
        fieldOfStudyFilter,
        experienceFilter,
        interestFilter,
        commitmentFilter,
        projectFilter,
        referralFilter,
        genderFilter,
        languageFilter,
    ]);

    const hasActiveFilters =
        workshopFilter !== 'all' ||
        fieldOfStudyFilter !== 'all' ||
        experienceFilter !== 'all' ||
        interestFilter !== 'all' ||
        commitmentFilter !== 'all' ||
        projectFilter !== 'all' ||
        referralFilter !== 'all' ||
        genderFilter !== 'all' ||
        languageFilter !== 'all';

    const resetFilters = () => {
        setWorkshopFilter('all');
        setFieldOfStudyFilter('all');
        setExperienceFilter('all');
        setInterestFilter('all');
        setCommitmentFilter('all');
        setProjectFilter('all');
        setReferralFilter('all');
        setGenderFilter('all');
        setLanguageFilter('all');
    };

    const handleStatusCardClick = (status: WorkshopApplicant['status']) => {
        setStatusFilter((prev) => (prev === status ? 'all' : status));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workshop Applications" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Workshop Applications
                        </h1>
                        <p className="text-muted-foreground">
                            Review and manage applicants across your workshops.
                        </p>
                    </div>
                </div>

                {/* <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                    <StatCard
                        icon={<Users className="size-4" />}
                        label="Total applications"
                        value={stats.total}
                        active={statusFilter === 'all'}
                        onClick={() => setStatusFilter('all')}
                    />
                    <StatCard
                        icon={<Clock className="size-4" />}
                        label="Pending"
                        value={stats.pending}
                        active={statusFilter === 'pending'}
                        onClick={() => handleStatusCardClick('pending')}
                    />
                    <StatCard
                        icon={<Star className="size-4" />}
                        label="Shortlisted"
                        value={stats.shortlisted}
                        active={statusFilter === 'shortlisted'}
                        onClick={() => handleStatusCardClick('shortlisted')}
                    />
                    <StatCard
                        icon={<CheckCircle2 className="size-4" />}
                        label="Accepted"
                        value={stats.accepted}
                        active={statusFilter === 'accepted'}
                        onClick={() => handleStatusCardClick('accepted')}
                    />
                    <StatCard
                        icon={<XCircle className="size-4" />}
                        label="Rejected"
                        value={stats.rejected}
                        active={statusFilter === 'rejected'}
                        onClick={() => handleStatusCardClick('rejected')}
                    />
                </div> */}

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="min-w-0 space-y-4">
                        {/* <div className="flex flex-col gap-3 border-b pb-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-3">
                                    <ToggleGroup
                                        type="single"
                                        value={statusFilter}
                                        onValueChange={(v) =>
                                            v &&
                                            setStatusFilter(
                                                v as
                                                    | 'all'
                                                    | WorkshopApplicant['status'],
                                            )
                                        }
                                        variant="outline"
                                        size="sm"
                                    >
                                        <ToggleGroupItem value="all">
                                            All
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="pending">
                                            Pending
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="shortlisted">
                                            Shortlisted
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="accepted">
                                            Accepted
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="rejected">
                                            Rejected
                                        </ToggleGroupItem>
                                    </ToggleGroup>

                                    <div className="h-4 w-px bg-border" />

                                    <Select
                                        value={workshopFilter}
                                        onValueChange={setWorkshopFilter}
                                    >
                                        <SelectTrigger
                                            size="sm"
                                            className="w-[200px]"
                                        >
                                            <Users className="mr-2 size-3.5" />
                                            <SelectValue placeholder="All workshops" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All workshops
                                            </SelectItem>
                                            {workshops.map((workshop) => (
                                                <SelectItem
                                                    key={workshop.id}
                                                    value={workshop.id}
                                                >
                                                    {`${workshop.title} (${workshop.applicants_count ?? 0})`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-3">
                                    {hasActiveFilters && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={resetFilters}
                                        >
                                            <X className="size-3.5" />
                                            Reset
                                        </Button>
                                    )}
                                    <div className="text-xs text-muted-foreground">
                                        Showing {filteredApplicants.length} of{' '}
                                        {applicants.length} applicants
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <ListFilter className="size-3.5 shrink-0 text-muted-foreground" />

                                <FilterSelect
                                    icon={
                                        <GraduationCap className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={fieldOfStudyFilter}
                                    onValueChange={setFieldOfStudyFilter}
                                    placeholder="Field of study"
                                    allLabel="All fields"
                                    options={fieldOfStudyOptions.map(
                                        (value) => ({
                                            value,
                                            label: value,
                                        }),
                                    )}
                                    className="w-[210px]"
                                />

                                <FilterSelect
                                    icon={
                                        <HeartPulse className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={experienceFilter}
                                    onValueChange={setExperienceFilter}
                                    placeholder="Digital health experience"
                                    allLabel="All experience"
                                    options={EXPERIENCE_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <Sparkles className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={interestFilter}
                                    onValueChange={setInterestFilter}
                                    placeholder="Interests"
                                    allLabel="All interests"
                                    options={INTEREST_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <Target className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={commitmentFilter}
                                    onValueChange={setCommitmentFilter}
                                    placeholder="Commitment"
                                    allLabel="All commitment"
                                    options={COMMITMENT_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <CheckSquare className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={projectFilter}
                                    onValueChange={(value) =>
                                        setProjectFilter(
                                            value as 'all' | 'yes' | 'no',
                                        )
                                    }
                                    placeholder="Previous project"
                                    allLabel="All project experience"
                                    options={PROJECT_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <MessageCircle className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={referralFilter}
                                    onValueChange={setReferralFilter}
                                    placeholder="Referral source"
                                    allLabel="All sources"
                                    options={REFERRAL_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <Users className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={genderFilter}
                                    onValueChange={setGenderFilter}
                                    placeholder="Gender"
                                    allLabel="All genders"
                                    options={GENDER_OPTIONS}
                                />

                                <FilterSelect
                                    icon={
                                        <Globe className="mr-2 size-3.5 shrink-0" />
                                    }
                                    value={languageFilter}
                                    onValueChange={setLanguageFilter}
                                    placeholder="Language"
                                    allLabel="All languages"
                                    options={LANGUAGE_OPTIONS}
                                />
                            </div>
                        </div> */}

                        {isLoading ? (
                            <div className="overflow-hidden rounded-xl border bg-card">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 border-b px-4 py-3 last:border-0"
                                    >
                                        <Skeleton className="size-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-40" />
                                            <Skeleton className="h-3 w-56" />
                                        </div>
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredApplicants.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-20 text-center">
                                <Inbox className="mb-4 h-12 w-12 text-muted-foreground/50" />
                                <h3 className="text-lg font-medium">
                                    No matching applicants
                                </h3>
                                <p className="text-muted-foreground">
                                    Try adjusting your filters to find what
                                    you're looking for.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-xl border bg-card">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[640px] text-sm">
                                        <thead>
                                            <tr className="border-b bg-muted/40 text-left">
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                    Applicant
                                                </th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                    Workshop
                                                </th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                    Experience
                                                </th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                    Applied
                                                </th>
                                                <th className="w-10 px-2 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {filteredApplicants.map(
                                                (applicant) => (
                                                    <tr
                                                        key={applicant.id}
                                                        onClick={() =>
                                                            setSelectedApplicant(
                                                                applicant,
                                                            )
                                                        }
                                                        className="cursor-pointer transition-colors hover:bg-muted/40"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary uppercase ring-1 ring-primary/20">
                                                                    {applicant.full_name
                                                                        .split(
                                                                            ' ',
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            2,
                                                                        )
                                                                        .map(
                                                                            (
                                                                                w,
                                                                            ) =>
                                                                                w[0],
                                                                        )
                                                                        .join(
                                                                            '',
                                                                        )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="truncate font-medium text-foreground">
                                                                        {
                                                                            applicant.full_name
                                                                        }
                                                                    </p>
                                                                    <p className="truncate text-xs text-muted-foreground">
                                                                        {
                                                                            applicant.email
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="max-w-[180px] px-4 py-3">
                                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                                <GraduationCap className="size-3.5 shrink-0" />
                                                                <span className="truncate">
                                                                    {applicant
                                                                        .workshop
                                                                        ?.title ??
                                                                        '—'}
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {EXPERIENCE_LABELS[
                                                                applicant
                                                                    .digital_health_experience
                                                            ] ??
                                                                applicant.digital_health_experience}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    'text-[10px] tracking-wider uppercase',
                                                                    getStatusColor(
                                                                        applicant.status,
                                                                    ),
                                                                )}
                                                            >
                                                                {
                                                                    applicant.status
                                                                }
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
                                                                <Calendar className="size-3.5" />
                                                                {timeAgo(
                                                                    applicant.created_at,
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 py-3 text-right">
                                                            <ChevronRight className="size-4 text-muted-foreground/50" />
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    <FilterBreakdown groups={breakdownGroups} />
                </div>
            </div>

            <ApplicantDetailSheet
                applicant={selectedApplicant}
                onOpenChange={(open) =>
                    !open && setSelectedApplicant(null)
                }
            />
        </AppLayout>
    );
}

function ApplicantDetailSheet({
    applicant,
    onOpenChange,
}: {
    applicant: WorkshopApplicant | null;
    onOpenChange: (open: boolean) => void;
}) {
    const updateStatus = useUpdateWorkshopApplicantStatus();
    const deleteApplicant = useDeleteWorkshopApplicant();

    if (!applicant) return null;

    const handleStatusChange = (status: WorkshopApplicant['status']) => {
        updateStatus.mutate(
            { id: applicant.id, status },
            {
                onSuccess: () => onOpenChange(false),
            },
        );
    };

    const handleDelete = () => {
        if (!confirm('Delete this application permanently?')) return;
        deleteApplicant.mutate(
            { id: applicant.id },
            {
                onSuccess: () => onOpenChange(false),
            },
        );
    };

    const initials = applicant.full_name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('');

    return (
        <Sheet open={!!applicant} onOpenChange={onOpenChange}>
            <SheetContent className="w-full gap-0 overflow-hidden bg-background p-0 sm:max-w-xl">
                <SheetHeader className="border-b bg-muted/30 px-6 py-5">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-sm font-bold text-primary uppercase ring-1 ring-primary/20">
                            {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                            <SheetTitle className="text-xl font-bold">
                                {applicant.full_name}
                            </SheetTitle>
                            <SheetDescription className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                                <span className="flex items-center gap-1.5">
                                    <Mail className="size-3.5" />
                                    {applicant.email}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Phone className="size-3.5" />
                                    {applicant.phone}
                                </span>
                            </SheetDescription>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'text-[10px] tracking-widest uppercase',
                                        getStatusColor(applicant.status),
                                    )}
                                >
                                    {applicant.status}
                                </Badge>
                                {applicant.workshop && (
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] tracking-widest uppercase"
                                    >
                                        {applicant.workshop.title}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                    <div className="space-y-8 px-6 py-6">
                        <DetailSection
                            icon={<Users className="size-4" />}
                            title="Contact"
                        >
                            <div className="grid grid-cols-2 gap-5">
                                <DetailField label="Email">
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="size-3.5 text-muted-foreground" />
                                        {applicant.email}
                                    </span>
                                </DetailField>
                                <DetailField label="WhatsApp / Phone">
                                    <span className="flex items-center gap-1.5">
                                        <Phone className="size-3.5 text-muted-foreground" />
                                        {applicant.phone}
                                    </span>
                                </DetailField>
                                {applicant.linkedin_url && (
                                    <DetailField label="LinkedIn">
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="h-auto p-0"
                                            asChild
                                        >
                                            <a
                                                href={applicant.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Linkedin className="mr-1 size-3.5" />
                                                Profile
                                                <ExternalLink className="ml-1 size-3 opacity-50" />
                                            </a>
                                        </Button>
                                    </DetailField>
                                )}
                                <DetailField label="Gender">
                                    {GENDER_LABELS[applicant.gender ?? ''] ??
                                        applicant.gender ??
                                        '—'}
                                </DetailField>
                                <DetailField label="Language">
                                    {LANGUAGE_LABELS[applicant.language ?? ''] ??
                                        applicant.language ??
                                        '—'}
                                </DetailField>
                            </div>
                        </DetailSection>

                        <DetailSection
                            icon={<GraduationCap className="size-4" />}
                            title="Background"
                        >
                            <div className="grid grid-cols-2 gap-5">
                                <DetailField label="Best describes">
                                    {BACKGROUND_LABELS[applicant.background] ??
                                        applicant.background}
                                </DetailField>
                                <DetailField label="Field / Profession">
                                    {applicant.field_of_study}
                                </DetailField>
                                <DetailField label="Digital health experience">
                                    {EXPERIENCE_LABELS[
                                        applicant.digital_health_experience
                                    ] ?? applicant.digital_health_experience}
                                </DetailField>
                            </div>
                        </DetailSection>

                        <DetailSection
                            icon={<Sparkles className="size-4" />}
                            title="Interest"
                        >
                            <div className="space-y-5">
                                <DetailField label="Motivation">
                                    <DetailText>
                                        {applicant.motivation}
                                    </DetailText>
                                </DetailField>
                                <DetailField label="Areas of interest">
                                    <div className="flex flex-wrap gap-2">
                                        {(applicant.interests ?? []).map(
                                            (interest) => (
                                                <Badge
                                                    key={interest}
                                                    variant="secondary"
                                                >
                                                    {INTEREST_LABELS[interest] ??
                                                        interest}
                                                </Badge>
                                            ),
                                        )}
                                    </div>
                                </DetailField>
                                <DetailField label="Previous project">
                                    <p className="font-medium">
                                        {applicant.previous_project_experience
                                            ? 'Yes'
                                            : 'No'}
                                    </p>
                                    {applicant.previous_project_description && (
                                        <DetailText>
                                            {
                                                applicant.previous_project_description
                                            }
                                        </DetailText>
                                    )}
                                </DetailField>
                            </div>
                        </DetailSection>

                        <DetailSection
                            icon={<Target className="size-4" />}
                            title="Commitment"
                        >
                            <div className="space-y-5">
                                <DetailField label="Session commitment">
                                    {COMMITMENT_LABELS[applicant.commitment] ??
                                        applicant.commitment}
                                </DetailField>
                                <DetailField label="Goals">
                                    <DetailText>{applicant.goals}</DetailText>
                                </DetailField>
                            </div>
                        </DetailSection>

                        <DetailSection
                            icon={<MessageCircle className="size-4" />}
                            title="Application details"
                        >
                            <div className="grid grid-cols-2 gap-5">
                                <DetailField label="Referral source">
                                    {REFERRAL_LABELS[
                                        applicant.referral_source
                                    ] ?? applicant.referral_source}
                                </DetailField>
                                <DetailField label="Consent">
                                    <span className="flex items-center gap-1.5">
                                        <CheckSquare
                                            className={cn(
                                                'size-4',
                                                applicant.consent
                                                    ? 'text-emerald-500'
                                                    : 'text-muted-foreground',
                                            )}
                                        />
                                        {applicant.consent
                                            ? 'Confirmed'
                                            : 'Not provided'}
                                    </span>
                                </DetailField>
                                <DetailField label="Applied on">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5 text-muted-foreground" />
                                        {new Date(
                                            applicant.created_at,
                                        ).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </DetailField>
                            </div>
                        </DetailSection>
                    </div>
                </div>

                <SheetFooter className="border-t bg-muted/30 px-6 py-4 sm:justify-start">
                    <div className="flex w-full flex-wrap items-center gap-2">
                        {applicant.status !== 'rejected' && (
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() => handleStatusChange('rejected')}
                                disabled={updateStatus.isPending}
                            >
                                Reject
                            </Button>
                        )}
                        {applicant.status !== 'shortlisted' && (
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={() => handleStatusChange('shortlisted')}
                                disabled={updateStatus.isPending}
                            >
                                Shortlist
                            </Button>
                        )}
                        {applicant.status !== 'accepted' && (
                            <Button
                                variant="default"
                                className="flex-1"
                                onClick={() => handleStatusChange('accepted')}
                                disabled={updateStatus.isPending}
                            >
                                Accept
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            disabled={deleteApplicant.isPending}
                            className="text-destructive hover:text-destructive"
                            aria-label="Delete application"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
