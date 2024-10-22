'use client';
import { motion } from 'framer-motion';

const variants = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
};

export function Motion({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="enter"
			transition={{ duration: 0.5 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
