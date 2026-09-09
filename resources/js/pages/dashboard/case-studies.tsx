import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Plus,
    Trash2,
    Eye,
    Edit,
    Globe,
    Loader2,
    Calendar,
    Users,
} from 'lucide-react';
import { useState } from 'react';

import {
    create as createCaseStudyAction,
    edit as editCaseStudyAction,
} from '@/actions/App/Http/Controllers/Dashboard/CaseStudyController';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    useCaseStudies,
    useDeleteCaseStudy,
    useUpdateCaseStatus,
} from '@/hooks/use-case-studies';
import AppLayout from '@/layouts/app-layout';
import { show as showCaseStudy } from '@/routes/case-study/index';
import { caseStudies as dashboardCaseStudies } from '@/routes/dashboard/index';
import type { BreadcrumbItem, CaseStudy } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Case Studies',
        href: dashboardCaseStudies(),
    },
];

export default function CaseStudies() {
    const { data: caseStudies = [], isLoading } = useCaseStudies();
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Case Studies" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Case Studies
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your portfolio case studies.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={createCaseStudyAction().url}>
                            <Plus /> Add Case Study
                        </Link>
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {caseStudies.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed p-20 text-center">
                                <BookOpen className="mb-4 h-12 w-12 text-muted-foreground/50" />
                                <h3 className="text-lg font-medium">
                                    No case studies yet
                                </h3>
                                <p className="text-muted-foreground">
                                    Get started by creating your first case
                                    study.
                                </p>
                            </div>
                        ) : (
                            caseStudies.map((study) => (
                                <div
                                    key={study.id}
                                    className="group relative overflow-hidden rounded-xl border bg-card p-4 transition-all hover:shadow-md"
                                >
                                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                                        {study.cover_image_url ? (
                                            <img
                                                src={study.cover_image_url}
                                                alt={study.title}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-muted-foreground/20">
                                                <BookOpen className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold">
                                                {study.title}
                                            </h3>
                                            <Badge
                                                variant={
                                                    study.is_published
                                                        ? 'success'
                                                        : 'warning'
                                                }
                                            >
                                                {study.is_published
                                                    ? 'Published'
                                                    : 'Draft'}
                                            </Badge>
                                        </div>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {study.short_description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 pt-2">
                                            {study.tech_stack
                                                ?.slice(0, 3)
                                                .map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium tracking-wider uppercase"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            {study.tech_stack?.length > 3 && (
                                                <span className="text-[10px] text-muted-foreground">
                                                    +
                                                    {study.tech_stack.length -
                                                        3}{' '}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-end space-x-2 pt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setSelectedStudy(study)
                                                }
                                            >
                                                <Eye className="mr-0 h-4 w-4" />{' '}
                                                View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <CaseStudyDetailSheet
                study={selectedStudy}
                onOpenChange={(open) => !open && setSelectedStudy(null)}
            />
        </AppLayout>
    );
}

function CaseStudyDetailSheet({
    study,
    onOpenChange,
}: {
    study: CaseStudy | null;
    onOpenChange: (open: boolean) => void;
}) {
    const { props } = usePage();
    const locale = (props as any).locale || 'en';
    const deleteCaseStudy = useDeleteCaseStudy();
    const toggleStatus = useUpdateCaseStatus();

    if (!study) return null;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this case study?')) {
            deleteCaseStudy.mutate(study.slug, {
                onSuccess: () => onOpenChange(false),
            });
        }
    };

    const handleToggleStatus = () => {
        toggleStatus.mutate(study.slug);
    };

    return (
        <Sheet open={!!study} onOpenChange={onOpenChange}>
            <SheetContent className="flex h-full flex-col p-0 sm:max-w-2xl">
                <SheetHeader className="border-b p-6 pb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <Badge
                            variant={study.is_published ? 'success' : 'warning'}
                        >
                            {study.is_published ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                    <SheetTitle className="text-2xl font-bold">
                        {study.title}
                    </SheetTitle>
                    <SheetDescription className="line-clamp-3">
                        {study.short_description}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-8">
                        {/* Preview Section */}
                        {study.cover_image_url && (
                            <div className="overflow-hidden rounded-lg border text-center">
                                <img
                                    src={study.cover_image_url}
                                    alt="Cover"
                                    className="mx-auto h-auto w-full object-cover"
                                />
                            </div>
                        )}

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {study.tech_stack.map((tech) => (
                                    <Badge key={tech} variant="secondary">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-t pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="tracking-wider uppercase">
                                        Client & Roles
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                        {study.client_name}
                                    </p>
                                    {/* <div className="flex flex-wrap gap-1">
                                        {study.roles.map((role) => (
                                            <span
                                                key={role}
                                                className="text-xs text-muted-foreground"
                                            >
                                                • {role}
                                            </span>
                                        ))}
                                    </div> */}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="tracking-wider uppercase">
                                        Duration
                                    </span>
                                </div>
                                <p className="text-sm font-medium">
                                    {study.start_date
                                        ? new Date(
                                              study.start_date,
                                          ).toLocaleDateString('en-US', {
                                              month: 'short',
                                              year: 'numeric',
                                          })
                                        : 'N/A'}
                                    {' — '}
                                    {study.end_date
                                        ? new Date(
                                              study.end_date,
                                          ).toLocaleDateString('en-US', {
                                              month: 'short',
                                              year: 'numeric',
                                          })
                                        : 'Present'}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span className="tracking-wider uppercase">
                                        Roles
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex flex-wrap gap-1">
                                        {study.roles.map((role) => (
                                            <span
                                                key={role}
                                                className="text-sm font-medium"
                                            >
                                                • {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 border-t pt-6">
                            <h4 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                Content Preview
                            </h4>
                            <div className="rounded-lg border bg-muted/30 p-4">
                                <BlockRenderer blocks={study.content_blocks} />
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="mt-auto flex-col gap-2 border-t p-6 sm:flex-row sm:justify-start">
                    <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={handleDelete}
                        disabled={deleteCaseStudy.isPending}
                    >
                        <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={handleToggleStatus}
                        disabled={toggleStatus.isPending}
                    >
                        {study.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                    >
                        <Link
                            href={
                                editCaseStudyAction({
                                    caseStudy: study.slug,
                                }).url
                            }
                        >
                            <Edit className="h-4 w-4" /> Edit
                        </Link>
                    </Button>
                    {study.is_published && (
                        <Button
                            variant="default"
                            size="sm"
                            className="flex-1"
                            asChild
                        >
                            <a
                                href={showCaseStudy.url({
                                    locale,
                                    caseStudy: study.slug,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Globe className="h-4 w-4" /> View Public
                            </a>
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
