import { Head, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
    Mail,
    MessageSquare,
    Trash2,
    User,
    Clock,
    Calendar,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    destroy as destroyMessage,
    toggleRead as toggleReadMessage,
} from '@/actions/App/Http/Controllers/Dashboard/ContactMessageController';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { messages as dashboardMessages } from '@/routes/dashboard/index';
import type { BreadcrumbItem } from '@/types';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Messages',
        href: dashboardMessages(),
    },
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

export default function Messages() {
    const { messages } = usePage<{ messages: ContactMessage[] }>().props;
    const [selectedMessage, setSelectedMessage] =
        useState<ContactMessage | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Delete this message?')) return;
        router.delete(destroyMessage({ contactMessage: id }).url, {
            preserveScroll: true,
            onSuccess: () => setSelectedMessage(null),
        });
    };

    const handleToggleRead = (msg: ContactMessage) => {
        router.patch(
            toggleReadMessage({ contactMessage: msg.id }).url,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const unreadCount = messages.filter((m) => !m.is_read).length;

    const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>(
        'all',
    );
    const [dateFilter, setDateFilter] = useState<
        'all' | 'today' | 'week' | 'month'
    >('all');

    const filteredMessages = useMemo(() => {
        return messages.filter((msg) => {
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'read' && msg.is_read) ||
                (statusFilter === 'unread' && !msg.is_read);

            let matchesDate = true;
            const msgDate = dayjs(msg.created_at);
            if (dateFilter === 'today') {
                matchesDate = msgDate.isSame(dayjs(), 'day');
            } else if (dateFilter === 'week') {
                matchesDate = msgDate.isAfter(dayjs().subtract(7, 'days'));
            } else if (dateFilter === 'month') {
                matchesDate = msgDate.isAfter(dayjs().subtract(30, 'days'));
            }

            return matchesStatus && matchesDate;
        });
    }, [messages, statusFilter, dateFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Messages
                        </h1>
                        <p className="text-muted-foreground">
                            {unreadCount > 0
                                ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
                                : 'All messages read'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-4">
                        <ToggleGroup
                            type="single"
                            value={statusFilter}
                            onValueChange={(v) =>
                                v &&
                                setStatusFilter(v as 'all' | 'read' | 'unread')
                            }
                            variant="outline"
                            size="sm"
                        >
                            <ToggleGroupItem value="all">All</ToggleGroupItem>
                            <ToggleGroupItem value="unread">
                                Unread
                            </ToggleGroupItem>
                            <ToggleGroupItem value="read">Read</ToggleGroupItem>
                        </ToggleGroup>

                        <div className="h-4 w-px bg-border" />

                        <Select
                            value={dateFilter}
                            onValueChange={(v) =>
                                setDateFilter(
                                    v as 'all' | 'today' | 'week' | 'month',
                                )
                            }
                        >
                            <SelectTrigger size="sm" className="w-[140px]">
                                <Calendar className="mr-2 size-3.5" />
                                <SelectValue placeholder="Filter by date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">
                                    Last 7 Days
                                </SelectItem>
                                <SelectItem value="month">
                                    Last 30 Days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Showing {filteredMessages.length} of {messages.length}{' '}
                        messages
                    </div>
                </div>

                {filteredMessages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-20 text-center">
                        <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
                        <h3 className="text-lg font-medium">
                            No matching messages
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters to find what you're
                            looking for.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y rounded-xl border bg-card">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex cursor-pointer items-start gap-4 p-4 transition-colors hover:bg-muted/50 ${!msg.is_read ? 'bg-primary/5' : ''}`}
                                onClick={() => {
                                    setSelectedMessage(msg);
                                    if (!msg.is_read) {
                                        handleToggleRead(msg);
                                    }
                                }}
                            >
                                <div
                                    className={cn(
                                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase',
                                        !msg.is_read
                                            ? 'bg-primary/15 text-primary ring-2 ring-primary/20'
                                            : 'bg-muted text-muted-foreground',
                                    )}
                                >
                                    {msg.name
                                        .split(' ')
                                        .slice(0, 2)
                                        .map((w) => w[0])
                                        .join('')}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                'truncate text-sm',
                                                !msg.is_read
                                                    ? 'font-semibold text-foreground'
                                                    : 'font-medium text-muted-foreground',
                                            )}
                                        >
                                            {msg.name}
                                        </span>
                                        {!msg.is_read && (
                                            <Badge
                                                variant="default"
                                                className="px-1.5 py-0 text-[10px]"
                                            >
                                                New
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {msg.email}
                                    </p>
                                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground/80">
                                        {msg.message}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {timeAgo(msg.created_at)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Detail Sheet */}
            <Sheet
                open={!!selectedMessage}
                onOpenChange={(open) => {
                    if (!open) setSelectedMessage(null);
                }}
            >
                <SheetContent side="right" className="w-[90vw] sm:max-w-lg">
                    {selectedMessage && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {selectedMessage.name}
                                </SheetTitle>
                                <SheetDescription>
                                    {selectedMessage.email}
                                </SheetDescription>
                            </SheetHeader>

                            <div className="mt-6 space-y-4 px-4">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="size-4" />
                                    {new Date(
                                        selectedMessage.created_at,
                                    ).toLocaleString()}
                                </div>

                                <div className="rounded-lg border bg-muted/50 p-4">
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            <SheetFooter className="mt-auto gap-2 border-t pt-6">
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`mailto:${selectedMessage.email}`}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Reply via Email
                                    </a>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                        handleDelete(selectedMessage.id)
                                    }
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>
                            </SheetFooter>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
