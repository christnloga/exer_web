<motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card/80 p-6 shadow-2xl backdrop-blur-xl dark:shadow-black/40"
        >
            <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-64 rounded-full bg-secondary/10 blur-[80px]" />

            {/* Window chrome */}
            <div className="relative z-10 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-amber-400" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    EXER · Digital Health UX
                </span>
                <Activity className="size-4 text-primary" />
            </div>

            {/* ECG waveform */}
            <div className="relative z-10 rounded-2xl border border-border/60 bg-background/60 p-5">
                <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Live health experience
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500">
                        <span className="relative flex size-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Validated
                    </span>
                </div>

                <svg
                    viewBox="0 0 400 120"
                    className="h-28 w-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient
                            id="ecg-gradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                        >
                            <stop offset="0%" stopColor="#00A6F4" />
                            <stop offset="100%" stopColor="#0d3976" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d="M0 60 L50 60 L70 60 L82 30 L94 96 L106 60 L140 60 L160 60 L172 24 L184 102 L196 60 L230 60 L250 60 L262 40 L274 80 L286 60 L320 60 L340 60 L352 20 L364 112 L376 60 L400 60"
                        fill="none"
                        stroke="url(#ecg-gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2.2, ease: 'easeInOut' }}
                    />
                </svg>

                <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                        { label: 'Discover', value: '01' },
                        { label: 'Validate', value: '02' },
                        { label: 'Deploy', value: '05' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-center"
                        >
                            <p className="text-sm font-extrabold text-primary">
                                {item.value}
                            </p>
                            <p className="text-[10px] font-medium text-muted-foreground">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
