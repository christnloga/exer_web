import { motion } from "motion/react";

import type { ReactNode } from "react";

interface RevealElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const RevealElement = ({ children, className = "", delay = 0 }: RevealElementProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ ease: "easeInOut", duration: 0.8, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default RevealElement;
