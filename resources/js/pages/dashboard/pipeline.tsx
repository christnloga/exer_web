import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
    Calendar,
    ExternalLink,
    Github,
    Globe,
    GraduationCap,
    GraduationCapIcon,
    Mail,
    MapPin,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
    useApplicants,
    useUpdateApplicantStatus,
} from '@/hooks/use-applicants';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { pipeline as dashboardPipeline } from '@/routes/dashboard/index';
import type { Applicant, BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pipeline',
        href: dashboardPipeline(),
    },
];

const getStatusColor = (status: Applicant['status']) => {
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

const getDisciplineColor = (discipline: Applicant['discipline']) => {
    switch (discipline) {
        case 'ux_ui':
            return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20';
        case 'frontend':
            return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
        case 'backend':
            return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20';
        case 'fullstack':
            return 'bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20';
        default:
            return 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-white/5 dark:text-zinc-400 dark:border-white/10';
    }
};

export default function Pipeline() {
    const { data: applicants = [], isLoading } = useApplicants();
    const [selectedApplicant, setSelectedApplicant] =
        useState<Applicant | null>(null);

    const statuses: Applicant['status'][] = [
        'pending',
        'shortlisted',
        'accepted',
        'rejected',
    ];

    const getApplicantsByStatus = (status: Applicant['status']) => {
        return applicants.filter((a) => a.status === status);
    };

    if (isLoading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Pipeline" />
                <div className="flex h-full flex-1 gap-4 overflow-x-auto p-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="flex min-w-[340px] flex-col gap-4"
                        >
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    ))}
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pipeline" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Applicant Pipeline
                        </h1>
                        <p className="text-muted-foreground">
                            Manage and review candidates for the NJC 2026 Batch.
                        </p>
                    </div>
                </div>

                <div className="flex flex-1 gap-4 overflow-x-auto pb-4">
                    {statuses.map((status) => (
                        <div
                            key={status}
                            className="flex min-w-[340px] flex-col gap-4 rounded-lg bg-sidebar p-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground capitalize">
                                    {status}
                                </h3>
                                <Badge
                                    variant="outline"
                                    className={cn(
                                        'font-mono',
                                        getStatusColor(status),
                                    )}
                                >
                                    {getApplicantsByStatus(status).length}
                                </Badge>
                            </div>

                            <div className="flex flex-col gap-3">
                                {getApplicantsByStatus(status).map(
                                    (applicant) => (
                                        <ApplicantCard
                                            key={applicant.id}
                                            applicant={applicant}
                                            onClick={() =>
                                                setSelectedApplicant(applicant)
                                            }
                                        />
                                    ),
                                )}
                                {getApplicantsByStatus(status).length === 0 && (
                                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 opacity-50">
                                        <p className="text-xs text-muted-foreground italic">
                                            No applicants here
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ApplicantDetailSheet
                applicant={selectedApplicant}
                onOpenChange={(open) => !open && setSelectedApplicant(null)}
            />
        </AppLayout>
    );
}

function ApplicantCard({
    applicant,
    onClick,
}: {
    applicant: Applicant;
    onClick: () => void;
}) {
    return (
        <Card
            className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-sm"
            onClick={onClick}
        >
            <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-sm font-bold">
                        {applicant.name}
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className={cn(
                            'shrink-0 text-[10px] tracking-wider uppercase',
                            getDisciplineColor(applicant.discipline),
                        )}
                    >
                        {applicant.discipline.replace('_', '/')}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-1 flex items-center gap-1 text-xs">
                    <MapPin className="size-3" /> {applicant.city}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
                    {applicant.stack || 'No tech stack specified'}
                </p>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/60">
                    <span className="flex items-center gap-1 font-mono text-xs">
                        <Calendar className="size-3" />{' '}
                        {dayjs(applicant.created_at).format('MMM D')}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs">
                        <GraduationCapIcon className="size-4" />{' '}
                        {applicant.graduation_year}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function ApplicantDetailSheet({
    applicant,
    onOpenChange,
}: {
    applicant: Applicant | null;
    onOpenChange: (open: boolean) => void;
}) {
    const updateStatus = useUpdateApplicantStatus();

    if (!applicant) return null;

    const handleStatusChange = (status: Applicant['status']) => {
        updateStatus.mutate(
            { id: applicant.id, status },
            {
                onSuccess: () => onOpenChange(false),
            },
        );
    };

    return (
        <Sheet open={!!applicant} onOpenChange={onOpenChange}>
            <SheetContent className="flex h-full flex-col bg-background sm:max-w-xl">
                <SheetHeader className="border-b pb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className={cn(
                                'text-[10px] tracking-widest uppercase',
                                getDisciplineColor(applicant.discipline),
                            )}
                        >
                            {applicant.discipline.replace('_', ' / ')}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={cn(
                                'text-[10px] capitalize',
                                getStatusColor(applicant.status),
                            )}
                        >
                            {applicant.status}
                        </Badge>
                    </div>
                    <SheetTitle className="text-2xl font-bold">
                        {applicant.name}
                    </SheetTitle>
                    <SheetDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                            <Mail className="size-4" /> {applicant.email}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="size-4" /> {applicant.city}
                        </span>
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
                    <section className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Education & Tech
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">
                                    University
                                </p>
                                <p className="flex items-center gap-2 text-sm font-medium">
                                    <GraduationCap className="size-4 text-primary" />{' '}
                                    {applicant.university || 'Not provided'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">
                                    Graduation
                                </p>
                                <p className="text-sm font-medium">
                                    {applicant.graduation_year}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">
                                Tech Stack
                            </p>
                            <p className="rounded border bg-muted/50 p-2 text-sm font-medium">
                                {applicant.stack || 'None specified'}
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Links
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {applicant.portfolio_url && (
                                <Button variant="outline" size="sm" asChild>
                                    <a
                                        href={applicant.portfolio_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Globe className="mr-2 size-4" />{' '}
                                        Portfolio{' '}
                                        <ExternalLink className="ml-2 size-3 opacity-50" />
                                    </a>
                                </Button>
                            )}
                            {applicant.github_url && (
                                <Button variant="outline" size="sm" asChild>
                                    <a
                                        href={applicant.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="mr-2 size-4" />{' '}
                                        GitHub{' '}
                                        <ExternalLink className="ml-2 size-3 opacity-50" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            Mindset Answers
                        </h4>
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="space-y-2">
                                <p className="text-xs font-semibold text-primary">
                                    Question {num}
                                </p>
                                <p className="rounded-xl bg-muted/30 p-4 text-sm leading-relaxed text-foreground/80 italic">
                                    "
                                    {applicant[
                                        `mindset_answer_${num}` as keyof Applicant
                                    ] || 'Information not available.'}
                                    "
                                </p>
                            </div>
                        ))}
                    </section>
                </div>

                <SheetFooter className="mt-auto gap-2 border-t pt-6 sm:justify-start">
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
                            className="flex-1 bg-primary hover:bg-primary/80"
                            onClick={() => handleStatusChange('accepted')}
                            disabled={updateStatus.isPending}
                        >
                            Accept
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
