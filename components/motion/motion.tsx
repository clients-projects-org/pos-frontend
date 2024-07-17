'use client';
import { motion } from 'framer-motion';

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
};

export function Motion({ children }: { children: React.ReactNode }) {
	return (
		<motion.main
			variants={variants}
			initial="hidden"
			animate="enter"
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.main>
	);
}
