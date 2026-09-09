import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    destroy as deleteApplicant,
    index as getWorkshopApplicants,
    updateStatus as updateApplicantStatus,
} from '@/actions/App/Http/Controllers/Api/WorkshopApplicantController';
import type { WorkshopApplicant } from '@/types';

export function useWorkshopApplicants() {
    return useQuery<WorkshopApplicant[]>({
        queryKey: ['workshop-applicants'],
        queryFn: async () => {
            const route = getWorkshopApplicants();
            const response = await fetch(route.url);
            if (!response.ok) {
                throw new Error('Failed to fetch workshop applicants');
            }
            return response.json();
        },
    });
}

export function useUpdateWorkshopApplicantStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string;
            status: WorkshopApplicant['status'];
        }) => {
            const route = updateApplicantStatus({ workshop_applicant: id });
            const response = await fetch(route.url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        (document.querySelector(
                            'meta[name="csrf-token"]',
                        ) as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update workshop applicant status');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workshop-applicants'],
            });
        },
    });
}

export function useDeleteWorkshopApplicant() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: string }) => {
            const route = deleteApplicant({ workshop_applicant: id });
            const response = await fetch(route.url, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN':
                        (document.querySelector(
                            'meta[name="csrf-token"]',
                        ) as HTMLMetaElement)?.content || '',
                },
            });

            if (!response.ok && response.status !== 204) {
                throw new Error('Failed to delete workshop applicant');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['workshop-applicants'],
            });
        },
    });
}
