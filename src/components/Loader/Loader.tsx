import {motion} from 'motion/react'
import { LuLoaderCircle } from "react-icons/lu";
const Loader = () => {
    return (
        <div className='flex justify-center items-center bg-linear-to-b from-[#282727] to-[#323131] absolute top-0 left-0 right-0 bottom-0 z-50'>
            <motion.div
                className='text-8xl'
                animate={{
                    
                    rotate: [0, 360]
                }}
                transition={{
                    duration:1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <LuLoaderCircle  className='text-[rgba(255,255,255,0.1)]'/>
            </motion.div>
        </div>
    )
}

export default Loader