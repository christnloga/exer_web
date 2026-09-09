import { Loader2, Plus, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    block: { id: string; data: { images: { url: string; caption?: string }[] } };
    updateBlock: (id: string, data: Record<string, unknown>) => void;
}

export const GalleryBlockEditor = ({ block, updateBlock }: Props) => {
    const [uploadingIndices, setUploadingIndices] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Keep a ref that always points to the latest images array,
    // so async upload callbacks never read a stale closure value.
    const imagesRef = useRef(block.data.images || []);
    useEffect(() => {
        imagesRef.current = block.data.images || [];
    }, [block.data.images]);

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

        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
            uploadFiles(files);
        }
    };

    const uploadFiles = async (files: File[]) => {
        const currentImages = [...imagesRef.current];
        const startIndex = currentImages.length;

        // Add local-preview placeholders immediately
        const newIndices: number[] = [];
        files.forEach((file, i) => {
            const previewUrl = URL.createObjectURL(file);
            currentImages.push({ url: previewUrl, caption: '' });
            newIndices.push(startIndex + i);
        });

        // Commit previews to state
        imagesRef.current = currentImages;
        updateBlock(block.id, { images: currentImages });
        setUploadingIndices(prev => [...prev, ...newIndices]);

        // Upload each file in parallel
        await Promise.all(files.map(async (file, i) => {
            const targetIndex = startIndex + i;
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

                // Read the LATEST images from the ref, swap the URL, commit
                const latest = [...imagesRef.current];
                if (latest[targetIndex]) {
                    latest[targetIndex] = { ...latest[targetIndex], url: data.public_url };
                    imagesRef.current = latest;
                    updateBlock(block.id, { images: latest });
                }
            } catch (error) {
                console.error('Gallery upload failed for file', i, error);
            } finally {
                setUploadingIndices(prev => prev.filter(idx => idx !== targetIndex));
            }
        }));
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        if (files.length > 0) {
            uploadFiles(files);
        }
        // Reset so re-selecting the same file still triggers onChange
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (index: number) => {
        const latest = [...imagesRef.current];
        latest.splice(index, 1);
        imagesRef.current = latest;
        updateBlock(block.id, { images: latest });
        setUploadingIndices(prev =>
            prev.filter(idx => idx !== index).map(idx => (idx > index ? idx - 1 : idx)),
        );
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-dashed rounded-lg transition-colors ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-input bg-background/50'
                }`}
            >
                {block.data.images?.map((img, i) => (
                    <div key={i} className="relative aspect-square bg-muted rounded-md group overflow-hidden">
                        <img
                            src={img.url}
                            className={`w-full h-full object-cover transition-opacity ${uploadingIndices.includes(i) ? 'opacity-40' : 'opacity-100'}`}
                        />

                        {uploadingIndices.includes(i) ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => removeImage(i)}
                                className="absolute top-1 right-1 bg-destructive/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/20 text-muted-foreground transition-all hover:border-muted-foreground/40 hover:bg-muted/30 active:scale-95"
                >
                    <Plus className="h-6 w-6" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Add Image</span>
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
            />

            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 px-1">
                <Upload className="w-3 h-3" />
                Drag & drop multiple images or click to browse files
            </p>
        </div>
    );
};
