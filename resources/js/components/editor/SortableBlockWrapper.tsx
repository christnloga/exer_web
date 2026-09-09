import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type React from 'react';

export const SortableBlockWrapper = ({
    id,
    children,
}: {
    id: string;
    children: React.ReactNode;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative mb-3 flex items-start gap-3 rounded-xl border bg-card p-4 transition-shadow ${
                isDragging
                    ? 'border-primary/30 shadow-lg opacity-80'
                    : 'border-sidebar-border/70 hover:shadow-sm dark:border-sidebar-border'
            }`}
        >
            <div
                {...attributes}
                {...listeners}
                className="mt-1 cursor-grab rounded-md p-1 text-muted-foreground/50 transition-colors hover:bg-muted hover:text-muted-foreground active:cursor-grabbing"
            >
                <GripVertical className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
};
