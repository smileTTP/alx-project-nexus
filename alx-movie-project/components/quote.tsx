import { motion, useInView } from 'framer-motion';
import React from 'react';

export const TypingEffect = ({ text }: { text: string }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
    <h2 ref={ref} className="text-[#591427] text-3xl md:text-[45px] text-center font-bold tracking-tighter md:leading-16">
        {text.split('').map((letter, index) => (
        <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.2, delay: index * 0.1 }}
        >
        {letter}
        </motion.span>
        ))}
    </h2>
    );
}