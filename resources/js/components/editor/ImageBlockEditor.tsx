import { ImagePlus, Loader2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    block: { id: string; data: { url: string; caption: string } };
    updateBlock: (id: string, data: Record<string, unknown>) => void;
}

export const ImageBlockEditor = ({ block, updateBlock }: Props) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            processUpload(file);
        }
    };

    const processUpload = async (file: File) => {
        const localPreviewUrl = URL.createObjectURL(file);
        updateBlock(block.id, { url: localPreviewUrl });
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folder', 'case-study-media');

            const response = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');
            const { data } = await response.json();
            updateBlock(block.id, { url: data.public_url });
        } catch {
            updateBlock(block.id, { url: '' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;
        processUpload(file);
    };

    return (
        <div className="space-y-3">
            {!block.data.url && (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-10 transition-colors ${
                        isDragging
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-muted-foreground/25 bg-muted/30 text-muted-foreground hover:border-muted-foreground/40 hover:bg-muted/50'
                    }`}
                >
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm font-medium">
                        {isDragging ? 'Drop Image Here' : 'Click or Drop Image'}
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                        PNG, JPG, or WebP
                    </span>
                </button>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            {block.data.url && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`group relative overflow-hidden rounded-lg border transition-all ${
                        isDragging ? 'ring-2 ring-primary ring-offset-2' : ''
                    }`}
                >
                    <img
                        src={block.data.url}
                        alt="Preview"
                        className={`w-full object-cover transition-all ${isUploading ? 'opacity-40' : 'opacity-100'} ${isDragging ? 'opacity-50 blur-[2px]' : ''}`}
                    />
                    {isUploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            <span className="text-sm font-medium text-foreground">
                                Uploading…
                            </span>
                        </div>
                    )}
                    {!isUploading && !isDragging && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                                variant="secondary"
                                size="sm"
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="mr-2 h-3 w-3" /> Replace
                            </Button>
                        </div>
                    )}
                    {isDragging && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                            <span className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
                                Drop to Replace
                            </span>
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-1.5">
                <Label htmlFor={`caption-${block.id}`}>Caption</Label>
                <Input
                    id={`caption-${block.id}`}
                    placeholder="Add an image caption…"
                    value={block.data.caption}
                    onChange={(e) =>
                        updateBlock(block.id, { caption: e.target.value })
                    }
                />
            </div>
        </div>
    );
};
