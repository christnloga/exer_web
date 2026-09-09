import { motion } from 'motion/react';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

interface ServiceCardProps {
    service: {
        id: number;
        title: string;
        description: string;
        subTitle: string;
        icon: any;
        features: any;
    };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
    return (
        <motion.div className="group relative h-full perspective-[1000px] lg:min-h-[360px]">
            <div className="relative grid h-full w-full rounded-4xl border border-border bg-card shadow-xl transition-all duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">
                {/* Front Face */}
                <div className="relative col-start-1 row-start-1 overflow-hidden rounded-4xl bg-linear-to-br from-card to-card/50 p-8 backface-hidden">
                    <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />

                    <div className="relative flex h-full flex-col items-start gap-6">
                        <span className="mb-4 flex shrink-0 overflow-hidden text-primary drop-shadow-[0_0_15px_rgba(0,166,244,0.5)]">
                            {service.icon}
                        </span>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold text-foreground">
                                {service.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div className="relative col-start-1 row-start-1 transform-[rotateY(180deg)] overflow-hidden rounded-4xl border border-primary/30 bg-linear-to-bl from-card to-card/50 p-8 shadow-[inset_0_0_30px_rgba(0,166,244,0.05)] backface-hidden">
                    <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl" />

                    <div className="relative flex h-full flex-col items-start gap-6">
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-foreground">
                                {service.subTitle}
                            </h4>
                            <ul className="mt-4 space-y-3 text-muted-foreground">
                                {service.features.map(
                                    (feature: any, index: number) => (
                                        <li key={index} className="flex gap-3">
                                            <GoDotFill
                                                size={16}
                                                className="mt-1 shrink-0 text-primary drop-shadow-[0_0_8px_rgba(0,166,244,0.8)]"
                                            />
                                            <p className="text-sm font-medium text-foreground/80">
                                                {feature}
                                            </p>
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

export default ServiceCard;
