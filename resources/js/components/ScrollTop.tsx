import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { LuArrowUp } from 'react-icons/lu';
import { cn } from '@/lib/utils';

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className={cn(
                        "fixed z-40 flex size-12 items-center justify-center rounded-full border border-white/10 bg-[#0C1821]/80 text-white shadow-2xl backdrop-blur-xl transition-all hover:border-[#00A6F4]/50 hover:bg-[#00A6F4]/10 hover:text-[#00A6F4]",
                        "right-6 bottom-6 md:right-8 md:bottom-8",
                        // On mobile, if CaseStudy TOC is present (right-6 bottom-6), we shift this up
                        // We use a CSS variable or a specific class to detect if we're in a case study view
                        "lg:bottom-8",
                        // Shift up on mobile if TOC button (Content) might be there
                        "bottom-24 lg:bottom-8" 
                    )}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to top"
                >
                    <LuArrowUp size={20} />
                    
                    {/* Radial Glow */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-[#00A6F4]/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollTop;
