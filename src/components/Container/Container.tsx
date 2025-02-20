import { motion } from "motion/react"


interface containerProps {
    children: any;
    extraClasses?:string;
    initial?:{};
    animate?: {};
    exit?: {};
    transition?: {};
}
const Container = ({children, extraClasses, initial, animate, exit, transition}: containerProps) => {
    return (
        <motion.div
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            className={`${extraClasses} mx-auto w-3/4 h-full text-center`}
        >
            {children}
        </motion.div>
    )
}

export default Container