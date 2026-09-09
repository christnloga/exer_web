export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type BlockType =
    | 'heading'
    | 'text'
    | 'image'
    | 'code_snippet'
    | 'gallery';

interface BaseBlock {
    id: string;
    type: BlockType;
}

export type Block =
    | (BaseBlock & {
          type: 'heading';
          data: { text: string; level: 1 | 2 | 3 };
      })
    | (BaseBlock & { type: 'text'; data: { content: string } })
    | (BaseBlock & { type: 'image'; data: { url: string; caption: string } })
    | (BaseBlock & {
          type: 'code_snippet';
          data: { language: string; code: string };
      })
    | (BaseBlock & { type: 'gallery'; data: { images: { url: string; caption?: string }[] } });

export type CaseStudy = {
    id: string;
    title: string;
    category: string;
    slug: string;
    client_name: string;
    short_description: string;
    cover_image_url: string;
    roles: string[];
    tech_stack: string[];
    content_blocks: Block[];
    start_date: string;
    end_date: string;
    is_published: boolean;
};

export type Applicant = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    city: string;
    university?: string;
    graduation_year: number;
    discipline: 'ux_ui' | 'frontend' | 'backend' | 'fullstack';
    portfolio_url?: string;
    github_url?: string;
    stack?: string;
    mindset_answer_1?: string;
    mindset_answer_2?: string;
    mindset_answer_3?: string;
    status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
    created_at: string;
    updated_at: string;
};

export type Workshop = {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    cover_image_url: string | null;
    start_date: string | null;
    end_date: string | null;
    number_of_sessions: number;
    max_applicants: number | null;
    application_deadline: string | null;
    status: 'draft' | 'published' | 'completed' | 'cancelled';
    applicants_count?: number;
    created_at: string;
    updated_at: string;
};

export type WorkshopApplicant = {
    id: string;
    workshop_id: string;
    workshop?: Workshop;
    full_name: string;
    email: string;
    phone: string;
    linkedin_url: string | null;
    gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say' | null;
    language: 'english' | 'french' | 'bilingual' | 'other' | null;
    background:
        | 'healthcare_professional'
        | 'student'
        | 'recent_graduate'
        | 'technology_it_professional'
        | 'ux_ui_professional'
        | 'product_project_professional'
        | 'entrepreneur_founder'
        | 'researcher'
        | 'public_health_professional'
        | 'ngo_development_professional'
        | 'other';
    field_of_study: string;
    digital_health_experience:
        | 'completely_new'
        | 'basic_knowledge'
        | 'studied_or_worked'
        | 'currently_work'
        | 'significant_experience';
    motivation: string;
    interests: string[];
    previous_project_experience: boolean;
    previous_project_description: string | null;
    commitment: 'yes_commit' | 'most_sessions' | 'not_sure';
    goals: string;
    referral_source:
        | 'linkedin'
        | 'whatsapp'
        | 'instagram'
        | 'facebook'
        | 'friend_colleague'
        | 'university_school'
        | 'professional_network'
        | 'other';
    consent: boolean;
    status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
    created_at: string;
    updated_at: string;
};
