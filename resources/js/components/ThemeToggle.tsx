import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppearance } from '@/hooks/use-appearance';

const ThemeToggle = () => {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    return (
        <button
            onClick={() => updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark')}
            className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-foreground/5 transition-all hover:bg-foreground/10 active:scale-95"
            aria-label="Toggle theme"
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
            
            <AnimatePresence mode="wait" initial={false}>
                {resolvedAppearance === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: 45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Moon className="h-5 w-5 text-blue-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Sun className="h-5 w-5 text-amber-500" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
