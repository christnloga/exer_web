import { Code2, Palette, Target, Zap } from 'lucide-react';
import React from 'react';

interface SquadPulseIllustrationProps {
    className?: string;
}

export default function SquadPulseIllustration({ className = '' }: SquadPulseIllustrationProps) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Central Core */}
            <div className="relative flex size-32 items-center justify-center lg:size-48">
                {/* Multi-layered Glows */}
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute inset-4 animate-pulse rounded-full bg-purple-500/20 blur-xl delay-75" />
                
                {/* The Core Orb */}
                <div className="relative z-10 flex size-full items-center justify-center rounded-full border border-border bg-linear-to-br from-foreground/10 to-transparent backdrop-blur-xl shadow-[inset_0_0_20px_rgba(var(--foreground),0.1)]">
                    <Zap className="size-10 text-foreground lg:size-16 animate-bounce" />
                </div>

                {/* Orbiting Paths (Ellipses) */}
                <svg className="absolute inset-[-100%] size-[300%] overflow-visible opacity-20" viewBox="0 0 400 400">
                    <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground animate-[spin_10s_linear_infinite]" />
                    <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground animate-[spin_15s_linear_infinite] [transform:rotate(60deg)]" />
                    <ellipse cx="200" cy="200" rx="150" ry="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground animate-[spin_20s_linear_infinite] [transform:rotate(-60deg)]" />
                </svg>
            </div>

            {/* Orbiting Role Nodes */}
            <div className="absolute inset-0">
                {/* Node 1: Design */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 animate-[float_6s_ease-in-out_infinite]">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(124,58,237,0.2)]">
                            <Palette className="size-6 text-purple-500 dark:text-purple-400" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-purple-500 dark:text-purple-400 uppercase">Design</span>
                    </div>
                </div>

                {/* Node 2: Engineering */}
                <div className="absolute bottom-[15%] left-[10%] animate-[float_8s_ease-in-out_infinite_1s]">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,166,244,0.2)]">
                            <Code2 className="size-6 text-primary" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-primary uppercase">Eng</span>
                    </div>
                </div>

                {/* Node 3: Product */}
                <div className="absolute bottom-[15%] right-[10%] animate-[float_7s_ease-in-out_infinite_0.5s]">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex size-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Target className="size-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Product</span>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes float {
                    0%, 100% { transform: translate(-50%, 0); }
                    50% { transform: translate(-50%, -20px); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
