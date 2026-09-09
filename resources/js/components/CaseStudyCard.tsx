interface CaseStudyCardProps {
    title: string;
    image: string;
    category: string;
    description: string;
    slug: string;
    selected: boolean;
    onClick: () => void;
}

const CaseStudyCard = ({
    title,
    image,
    category,
    description,
    selected,
    onClick,
}: CaseStudyCardProps) => {
    return (
        <div
            onClick={onClick}
            className={
                'group relative flex h-[260px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-4xl border border-border bg-card p-2 transition-all duration-700 ease-in-out lg:h-[420px] ' +
                (selected
                    ? 'w-[260px] scale-100 opacity-100 shadow-2xl shadow-primary/20 sm:w-[300px] lg:w-[620px]'
                    : 'w-[260px] scale-90 opacity-40 grayscale hover:opacity-80 sm:w-[300px] lg:w-[620px]')
            }
        >
            <div className="relative h-full w-full overflow-hidden rounded-3xl bg-card">
                <img
                    src={image}
                    alt={title}
                    className={
                        'h-full w-full object-cover transition-transform duration-700 ' +
                        (selected ? 'scale-105' : 'group-hover:scale-110')
                    }
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                {/* Content Overlay */}
                <div
                    className={
                        'absolute inset-x-0 bottom-0 z-20 flex flex-col gap-4 p-6 transition-all duration-500 ' +
                        (selected
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100')
                    }
                >
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase backdrop-blur-md">
                            {category}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white lg:text-3xl">
                            {title}
                        </h3>
                        {/* {selected && (
                            <p className="line-clamp-2 max-w-lg text-sm text-zinc-300 transition-all duration-500">
                                {description}
                            </p>
                        )} */}
                    </div>

                    <div
                        className={
                            'flex items-center gap-2 text-xs font-bold tracking-widest text-primary uppercase transition-all duration-500 ' +
                            (selected
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-4 opacity-0')
                        }
                    >
                        View Case Study
                        <div className="h-px w-8 bg-primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudyCard;
