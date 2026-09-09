import type { DragEndEvent } from '@dnd-kit/core';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    Code2,
    Heading,
    ImagePlus,
    Trash2,
    Type,
    Copy,
    Plus,
    Images,
} from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Block, BlockType } from '@/types';

import { GalleryBlockEditor } from './GalleryBlockEditor';
import { ImageBlockEditor } from './ImageBlockEditor';
import { SortableBlockWrapper } from './SortableBlockWrapper';

interface CaseStudyEditorProps {
    blocks: Block[];
    onAddBlock: (type: BlockType, index?: number) => void;
    onUpdateBlock: (id: string, data: Record<string, unknown>) => void;
    onRemoveBlock: (id: string) => void;
    onMoveBlock: (fromIndex: number, toIndex: number) => void;
    onDuplicateBlock: (id: string) => void;
    onTransformBlock: (id: string, newType: BlockType) => void;
}

const blockTypeOptions: {
    type: BlockType;
    label: string;
    icon: React.ElementType;
}[] = [
    { type: 'text', label: 'Text', icon: Type },
    { type: 'heading', label: 'Heading', icon: Heading },
    { type: 'image', label: 'Image', icon: ImagePlus },
    { type: 'code_snippet', label: 'Code', icon: Code2 },
    { type: 'gallery', label: 'Gallery', icon: Images },
];

export const CaseStudyEditor = ({
    blocks,
    onAddBlock,
    onUpdateBlock,
    onRemoveBlock,
    onMoveBlock,
    onDuplicateBlock,
    onTransformBlock,
}: CaseStudyEditorProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = blocks.findIndex(
                (block) => block.id === active.id,
            );
            const newIndex = blocks.findIndex((block) => block.id === over.id);
            onMoveBlock(oldIndex, newIndex);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Content Blocks
                </Label>
                <span className="text-xs text-muted-foreground">
                    {blocks.length} {blocks.length === 1 ? 'block' : 'blocks'}
                </span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={blocks.map((b) => b.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {blocks.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 py-12 text-center">
                            <Type className="mb-3 h-8 w-8 text-muted-foreground/30" />
                            <p className="text-sm font-medium text-muted-foreground">
                                No content blocks yet
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground/70">
                                Add blocks to build your case study content
                            </p>
                        </div>
                    )}

                    {blocks.map((block, index) => (
                        <SortableBlockWrapper key={block.id} id={block.id}>
                            <div className="space-y-2 relative group/block">
                                <div className="flex items-center justify-between bg-muted/30 p-2 rounded-t-md -mx-1 -mt-1 mb-2">
                                    <div className="flex items-center gap-2">
                                        <select
                                            className="h-7 cursor-pointer appearance-none rounded-md border-0 bg-muted px-2 py-0 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase outline-none hover:bg-muted-foreground/20 focus:ring-1 focus:ring-ring"
                                            value={block.type}
                                            onChange={(e) =>
                                                onTransformBlock(block.id, e.target.value as BlockType)
                                            }
                                        >
                                            <option value="text">TEXT</option>
                                            <option value="heading">HEADING</option>
                                            <option value="image">IMAGE</option>
                                            <option value="code_snippet">CODE</option>
                                            <option value="gallery">GALLERY</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            className="h-7 w-7 text-muted-foreground hover:bg-blue-500/10 hover:text-blue-500"
                                            onClick={() => onDuplicateBlock(block.id)}
                                            title="Duplicate Block"
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            type="button"
                                            className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                            onClick={() => onRemoveBlock(block.id)}
                                            title="Remove Block"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                {block.type === 'heading' && (
                                    <div className="space-y-2">
                                        <select
                                            className="flex h-9 w-24 rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-xs outline-none"
                                            value={block.data.level}
                                            onChange={(e) =>
                                                onUpdateBlock(block.id, {
                                                    level: parseInt(
                                                        e.target.value,
                                                    ),
                                                })
                                            }
                                        >
                                            <option value={1}>H1</option>
                                            <option value={2}>H2</option>
                                            <option value={3}>H3</option>
                                        </select>
                                        <Textarea
                                            placeholder="Heading text…"
                                            rows={1}
                                            value={block.data.text}
                                            onChange={(e) =>
                                                onUpdateBlock(block.id, {
                                                    text: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {block.type === 'text' && (
                                    <Textarea
                                        placeholder="Write your content…"
                                        rows={4}
                                        value={block.data.content}
                                        onChange={(e) =>
                                            onUpdateBlock(block.id, {
                                                content: e.target.value,
                                            })
                                        }
                                    />
                                )}

                                {block.type === 'image' && (
                                    <ImageBlockEditor
                                        block={block}
                                        updateBlock={onUpdateBlock}
                                    />
                                )}

                                {block.type === 'code_snippet' && (
                                    <div className="space-y-2">
                                        <input
                                            className="flex h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
                                            placeholder="Language (e.g. tsx)"
                                            value={block.data.language}
                                            onChange={(e) =>
                                                onUpdateBlock(block.id, {
                                                    language: e.target.value,
                                                })
                                            }
                                        />
                                        <Textarea
                                            placeholder="Paste your code…"
                                            rows={6}
                                            className="font-mono text-xs"
                                            value={block.data.code}
                                            onChange={(e) =>
                                                onUpdateBlock(block.id, {
                                                    code: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                )}

                                {block.type === 'gallery' && (
                                    <GalleryBlockEditor
                                        block={block}
                                        updateBlock={onUpdateBlock}
                                    />
                                )}

                                {/* Insert Below dropzone (visible on hover) */}
                                <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center opacity-0 group-hover/block:opacity-100 transition-opacity z-50">
                                    <div className="absolute inset-x-0 h-px bg-primary/20 pointer-events-none" />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        type="button"
                                        className="h-6 gap-1 rounded-full px-3 text-[10px] font-medium shadow-sm bg-background border-primary/20 text-primary hover:bg-primary/10 hover:text-primary z-10"
                                        onClick={() => onAddBlock('text', index + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                        Insert Block
                                    </Button>
                                </div>
                            </div>
                        </SortableBlockWrapper>
                    ))}
                </SortableContext>
            </DndContext>

            {/* Add Block Buttons */}
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-dashed border-muted-foreground/25 p-3">
                <span className="mr-1 text-xs font-medium text-muted-foreground">
                    Add:
                </span>
                {blockTypeOptions.map(({ type, label, icon: Icon }) => (
                    <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => onAddBlock(type)}
                        className="h-8"
                    >
                        <Icon className="mr-1.5 h-3.5 w-3.5" />
                        {label}
                    </Button>
                ))}
            </div>
        </div>
    );
};
