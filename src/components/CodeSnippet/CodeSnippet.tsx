
import { IoCodeSlash } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { ChatActons } from '../../store/Chat/Chat.slice';
import {motion} from 'motion/react'
const CodeSnippet = () => {
    const dispatch = useDispatch();

    const handleShowChatControl = () => {
        dispatch(ChatActons.setShowChatControl(false));
        dispatch(ChatActons.setShowCodeWindow(true));
    };
    
    return (
        <motion.div
            initial={{translateY:10, opacity:0}}
            animate={{translateY:0, opacity:1}}
            transition={{duration:0.5, delay:0.5}}
            onClick={handleShowChatControl} 
            className='flex items-center h-16 mb-3 cursor-pointer'
        >
            <div className='bg-[#323131] h-16 flex justify-center items-center p-4 rounded-tl-xl rounded-bl-xl border border-solid border-[rgba(255,255,255,0.2)]'>
                <IoCodeSlash className='text-xl' />
            </div>
            <div className='bg-[#282727] h-16 flex flex-col justify-center p-4 rounded-br-xl rounded-tr-xl  border border-solid border-[rgba(255,255,255,0.2)]'>
                <p className='font-bold text-xs md:text-sm text-white'>Data Validation Utility function</p>
                <p className='text-[rgba(255,255,255,0.7)] text-xs md:text-sm'>Click to open code</p>
            </div>
        </motion.div>
    )
}

export default CodeSnippet