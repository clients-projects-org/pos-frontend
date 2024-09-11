'use client';
import { motion } from 'framer-motion';

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
};

export function Motion({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="enter"
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
}
