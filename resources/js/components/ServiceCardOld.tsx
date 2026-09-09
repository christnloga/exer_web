import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { GoDotFill } from 'react-icons/go';
import useMeasure from 'react-use-measure';

interface ServiceCardProps {
    service: {
        id: number;
        title: string;
        description: string;
        subTitle: string;
        icon: any;
        features: any;
    };
    activeService: number;
    setActiveService: Dispatch<SetStateAction<number>>;
}

const ServiceCardOld = ({
    service,
    activeService,
    setActiveService,
}: ServiceCardProps) => {
    const [ref, { height }] = useMeasure();

    return (
        <motion.div
            className={`group relative z-10 flex flex-col overflow-hidden duration-150 hover:scale-101`}
            animate={{ height }}
            transition={{ duration: 0.1 }}
            onClick={() => setActiveService(service.id)}
        >
            <div
                ref={ref}
                className={`rounded-2xl transition-all duration-150 ${activeService == service.id && 'bg-[#00A6F4] bg-linear-to-r to-[#7C3AED] p-px'}`}
            >
                <div className="flex flex-col items-start rounded-2xl bg-[#0C1821] p-2">
                    {/* Card Header */}
                    <div className="relative z-10 flex w-full items-center justify-between px-2 py-2">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <div className="flex size-12 shrink-0 overflow-hidden rounded-xl border border-sky-400/20 bg-sky-500/10 text-[#00A6F4]">
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white">
                                {service.title}
                            </h3>
                        </div>
                        {activeService == service.id ? (
                            <Minus className="text-[#00A6F4]" />
                        ) : (
                            <Plus className="text-[#00A6F4]" />
                        )}
                    </div>
                    {/* Sub-card */}
                    <div
                        className={`h-0 w-full overflow-hidden ${activeService == service.id && 'h-auto'}`}
                    >
                        <div className="px-4">
                            <p className="mt-4 text-slate-300">
                                {service.description}{' '}
                            </p>
                        </div>
                        <div className="relative z-10 mt-4 w-full rounded-xl p-4 dark:bg-white/5">
                            <h3 className="text-lg font-bold text-white">
                                {service.subTitle}
                            </h3>
                            <ul className="mt-4 text-slate-300">
                                {service.features.map(
                                    (feature: any, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <GoDotFill className="mt-0.5 shrink-0 text-sky-500" />
                                            <p>{feature}</p>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCardOld;
