import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { index as getApplicants, updateStatus as updateApplicantStatus } from '@/actions/App/Http/Controllers/Api/ApplicantController';
import type { Applicant } from '@/types';

export function useApplicants() {
    return useQuery<Applicant[]>({
        queryKey: ['applicants'],
        queryFn: async () => {
            const route = getApplicants();
            const response = await fetch(route.url);
            if (!response.ok) {
                throw new Error('Failed to fetch applicants');
            }
            return response.json();
        },
    });
}

export function useUpdateApplicantStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: Applicant['status'] }) => {
            const route = updateApplicantStatus({ applicant: id });
            const response = await fetch(route.url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update applicant status');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applicants'] });
        },
    });
}
