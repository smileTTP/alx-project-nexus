import { Black_Han_Sans } from "next/font/google";
import { motion } from "motion/react"

const blackhansans = Black_Han_Sans({
        weight: ['400']
    });

export const HeroPage: React.FC = () => {
    return (
        <section className="bg-[#96D9C0] text-[#4C3A51] flex flex-col items-center justify-center gap-4 w-full h-screen">
            <FlipHero>PICTURA</FlipHero>
            <FlipHero>MOVENS</FlipHero>
        </section>
    );
}

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipHero = ({ children }: { children: string }) => {
    return(
        <motion.div initial="initial" whileHover="hovered" className={`${blackhansans.className} relative block overflow-hidden whitespace-nowrap uppercase text-7xl sm:text-8xl md:text-9xl lg:text-[150px]`}>
        <div>
            {children.split("").map((l, i) => {
                return <motion.span key={i} className="inline-block" variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }} transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i, }}>{l}</motion.span>
            })}
        </div>
        <div className="absolute inset-0" >
            {children.split("").map((l, i) => {
                return <motion.span key={i} className="inline-block" variants={{ initial: { y: "100%" }, hovered: { y: 0 } }} transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i, }}>{l}</motion.span>
            })}
        </div>
        </motion.div>
    );
}
