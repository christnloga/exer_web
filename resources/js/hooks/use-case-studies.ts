import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { index as getCaseStudies, destroy as deleteCaseStudy, togglePublish } from '@/actions/App/Http/Controllers/Api/CaseStudyController';
import type { CaseStudy } from '@/types';

export function useCaseStudies() {
    return useQuery<CaseStudy[]>({
        queryKey: ['case-studies'],
        queryFn: async () => {
            const route = getCaseStudies();
            const response = await fetch(`${route.url}?all=true`);
            if (!response.ok) {
                throw new Error('Failed to fetch case studies');
            }
            return response.json();
        },
    });
}

export function useDeleteCaseStudy() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (slug: string) => {
            const route = deleteCaseStudy({ case_study: slug });
            const response = await fetch(route.url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete case study');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['case-studies'] });
        },
    });
}

export function useUpdateCaseStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (slug: string) => {
            const route = togglePublish({ case_study: slug });
            const response = await fetch(route.url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update case study status');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['case-studies'] });
        },
    });
}
