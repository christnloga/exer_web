import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Loader2, Save, X, ImagePlus, Upload } from 'lucide-react';
import { useState, useRef } from 'react';

import {
    store as storeCaseStudy,
    update as updateCaseStudy,
} from '@/actions/App/Http/Controllers/Api/CaseStudyController';
import { CaseStudyEditor } from '@/components/editor/CaseStudyEditor';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCaseStudyBuilder } from '@/hooks/useCaseStudyBuilder';
import AppLayout from '@/layouts/app-layout';
import { caseStudies as dashboardCaseStudies } from '@/routes/dashboard/index';
import type { BreadcrumbItem, CaseStudy } from '@/types';

interface EditorPageProps {
    caseStudy?: CaseStudy;
}

export default function CaseStudyEditorPage({ caseStudy }: EditorPageProps) {
    const isEditing = !!caseStudy;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Case Studies', href: dashboardCaseStudies() },
        { title: isEditing ? 'Edit' : 'New Case Study', href: '#' },
    ];

    // Metadata form state
    const [title, setTitle] = useState(caseStudy?.title ?? '');
    const [slug, setSlug] = useState(caseStudy?.slug ?? '');
    const [clientName, setClientName] = useState(caseStudy?.client_name ?? '');
    const [shortDescription, setShortDescription] = useState(
        caseStudy?.short_description ?? '',
    );
    const [coverImageUrl, setCoverImageUrl] = useState(
        caseStudy?.cover_image_url ?? '',
    );
    const [rolesInput, setRolesInput] = useState(
        caseStudy?.roles?.join(', ') ?? '',
    );
    const [techStackInput, setTechStackInput] = useState(
        caseStudy?.tech_stack?.join(', ') ?? '',
    );
    const [startDate, setStartDate] = useState(
        caseStudy?.start_date?.slice(0, 10) ?? '',
    );
    const [endDate, setEndDate] = useState(
        caseStudy?.end_date?.slice(0, 10) ?? '',
    );

    // Content blocks state (managed by the hook)
    const {
        blocks,
        addBlock,
        updateBlock,
        removeBlock,
        moveBlock,
        duplicateBlock,
        transformBlock,
    } = useCaseStudyBuilder(caseStudy?.content_blocks ?? []);

    const [isSaving, setIsSaving] = useState(false);
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [isDraggingCover, setIsDraggingCover] = useState(false);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleCoverDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingCover(true);
    };

    const handleCoverDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingCover(false);
    };

    const handleCoverDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingCover(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setCoverImageFile(file);
            setCoverImageUrl(URL.createObjectURL(file));
        }
    };

    const handleCoverImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setCoverImageFile(file);
        setCoverImageUrl(URL.createObjectURL(file));
    };

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (value: string) => {
        setTitle(value);
        setSlug(generateSlug(value));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setErrors({});

        let finalCoverUrl = coverImageUrl;

        if (coverImageFile) {
            try {
                const formData = new FormData();
                formData.append('image', coverImageFile);
                formData.append('folder', 'case-study-media');

                const response = await fetch('/api/admin/upload-image', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) throw new Error('Cover upload failed');
                const { data } = await response.json();
                finalCoverUrl = data.public_url;
            } catch {
                setErrors((prev) => ({
                    ...prev,
                    cover_image_url: [
                        'Failed to upload cover image. Please try again.',
                    ],
                }));
                setIsSaving(false);
                return;
            }
        }

        const payload = {
            title,
            slug,
            client_name: clientName,
            short_description: shortDescription,
            cover_image_url: finalCoverUrl || null,
            roles: rolesInput
                .split(',')
                .map((r) => r.trim())
                .filter(Boolean),
            tech_stack: techStackInput
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            content_blocks: blocks.map(({ id, type, data }) => ({
                id,
                type,
                data,
            })),
            start_date: startDate || null,
            end_date: endDate || null,
            is_published: caseStudy?.is_published ?? false,
        };

        try {
            const route = isEditing
                ? updateCaseStudy({ case_study: caseStudy.slug })
                : storeCaseStudy();

            const response = await fetch(route.url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN':
                        (
                            document.querySelector(
                                'meta[name="csrf-token"]',
                            ) as HTMLMetaElement
                        )?.content || '',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
                return;
            }

            router.visit(dashboardCaseStudies().url);
        } catch {
            setErrors({ general: ['An unexpected error occurred.'] });
        } finally {
            setIsSaving(false);
        }
    };

    const fieldError = (field: string) => {
        return errors[field]?.[0];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={
                    isEditing ? `Edit: ${caseStudy.title}` : 'New Case Study'
                }
            />

            <div className="pb-12">
                {/* Sticky Header */}
                <div className="sticky top-12 z-40 mb-6 flex items-center justify-between border-b bg-background/95 px-6 py-4 shadow-sm backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={dashboardCaseStudies().url}>
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="h-5 w-px bg-border" />
                        <h1 className="text-lg font-semibold">
                            {isEditing ? 'Edit Case Study' : 'New Case Study'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={dashboardCaseStudies().url}>
                                <X className="h-4 w-4" />
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            {isSaving ? 'Saving…' : 'Save'}
                        </Button>
                    </div>
                </div>

                {/* Error summary */}
                {errors.general && (
                    <div className="mx-6 mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {errors.general[0]}
                    </div>
                )}

                {/* Main content */}
                <div className="px-6">
                    <div className="mx-auto max-w-4xl space-y-6">
                        {/* Metadata Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                                <CardDescription>
                                    Basic information about the case study.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="title">
                                            Title{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="title"
                                            placeholder="My Awesome Project"
                                            value={title}
                                            onChange={(e) =>
                                                handleTitleChange(
                                                    e.target.value,
                                                )
                                            }
                                            aria-invalid={!!fieldError('title')}
                                        />
                                        {fieldError('title') && (
                                            <p className="text-xs text-destructive">
                                                {fieldError('title')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="slug">
                                            Slug{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="slug"
                                            placeholder="my-awesome-project"
                                            value={slug}
                                            onChange={(e) =>
                                                setSlug(e.target.value)
                                            }
                                            disabled
                                            className="cursor-not-allowed bg-muted/50"
                                            aria-invalid={!!fieldError('slug')}
                                        />
                                        {fieldError('slug') && (
                                            <p className="text-xs text-destructive">
                                                {fieldError('slug')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="short_description">
                                        Short Description{' '}
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </Label>
                                    <Textarea
                                        id="short_description"
                                        placeholder="A brief summary of this case study…"
                                        rows={3}
                                        value={shortDescription}
                                        onChange={(e) =>
                                            setShortDescription(e.target.value)
                                        }
                                        aria-invalid={
                                            !!fieldError('short_description')
                                        }
                                    />
                                    {fieldError('short_description') && (
                                        <p className="text-xs text-destructive">
                                            {fieldError('short_description')}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="client_name">
                                            Client Name
                                        </Label>
                                        <Input
                                            id="client_name"
                                            placeholder="Client or Company"
                                            value={clientName}
                                            onChange={(e) =>
                                                setClientName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label>Cover Image</Label>
                                    <input
                                        ref={coverInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCoverImageUpload}
                                        className="hidden"
                                    />
                                    <div
                                        onDragOver={handleCoverDragOver}
                                        onDragLeave={handleCoverDragLeave}
                                        onDrop={handleCoverDrop}
                                        className="relative"
                                    >
                                        {!coverImageUrl ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    coverInputRef.current?.click()
                                                }
                                                className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-10 transition-colors ${
                                                    isDraggingCover
                                                        ? 'border-primary bg-primary/5 text-primary'
                                                        : 'border-muted-foreground/25 bg-muted/30 text-muted-foreground hover:border-muted-foreground/40 hover:bg-muted/50'
                                                }`}
                                            >
                                                <ImagePlus className="h-8 w-8" />
                                                <span className="text-sm font-medium text-inherit">
                                                    Upload or Drop Cover
                                                </span>
                                                <span className="text-xs text-muted-foreground/70">
                                                    PNG, JPG, or WebP
                                                </span>
                                            </button>
                                        ) : (
                                            <div
                                                className={`group relative h-48 overflow-hidden rounded-lg border transition-all sm:h-64 ${
                                                    isDraggingCover
                                                        ? 'ring-2 ring-primary ring-offset-2'
                                                        : ''
                                                }`}
                                            >
                                                <img
                                                    src={coverImageUrl}
                                                    alt="Cover preview"
                                                    className={`h-full w-full object-cover opacity-100 transition-opacity ${
                                                        isDraggingCover
                                                            ? 'opacity-50'
                                                            : ''
                                                    }`}
                                                    onError={(e) =>
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).classList.add(
                                                            'hidden',
                                                        )
                                                    }
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        type="button"
                                                        onClick={() =>
                                                            coverInputRef.current?.click()
                                                        }
                                                    >
                                                        <Upload className="mr-2 h-3 w-3" />{' '}
                                                        Replace
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {fieldError('cover_image_url') && (
                                        <p className="mt-1 text-xs text-destructive">
                                            {fieldError('cover_image_url')}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="roles">
                                            Roles{' '}
                                            <span className="text-xs text-muted-foreground">
                                                (comma-separated)
                                            </span>
                                        </Label>
                                        <Input
                                            id="roles"
                                            placeholder="Design, Development"
                                            value={rolesInput}
                                            onChange={(e) =>
                                                setRolesInput(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="tech_stack">
                                            Tech Stack{' '}
                                            <span className="text-xs text-muted-foreground">
                                                (comma-separated)
                                            </span>
                                        </Label>
                                        <Input
                                            id="tech_stack"
                                            placeholder="React, Laravel, PostgreSQL"
                                            value={techStackInput}
                                            onChange={(e) =>
                                                setTechStackInput(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="start_date">
                                            Start Date
                                        </Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={startDate}
                                            onChange={(e) =>
                                                setStartDate(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="end_date">
                                            End Date
                                        </Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={endDate}
                                            onChange={(e) =>
                                                setEndDate(e.target.value)
                                            }
                                            aria-invalid={
                                                !!fieldError('end_date')
                                            }
                                        />
                                        {fieldError('end_date') && (
                                            <p className="text-xs text-destructive">
                                                {fieldError('end_date')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Blocks Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                                <CardDescription>
                                    Build the case study content with
                                    drag-and-drop blocks.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {fieldError('content_blocks') && (
                                    <p className="mb-4 text-xs text-destructive">
                                        {fieldError('content_blocks')}
                                    </p>
                                )}
                                <CaseStudyEditor
                                    blocks={blocks}
                                    onAddBlock={addBlock}
                                    onUpdateBlock={updateBlock}
                                    onRemoveBlock={removeBlock}
                                    onMoveBlock={moveBlock}
                                    onDuplicateBlock={duplicateBlock}
                                    onTransformBlock={transformBlock}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
