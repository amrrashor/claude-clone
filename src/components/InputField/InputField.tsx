import {useState} from 'react'
import { FaArrowUp } from "react-icons/fa6";
import { motion } from "motion/react"
import { spring } from 'motion';
import ResponseDropDown from '../responseDropDown/ResponseDropDown';
import { CiCamera } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";

const InputField = () => {
    const [showLabels, setShowLabels] = useState(false);
    return (
        <>
            <div className=' relative bg-[#323131] rounded-2xl p-3 pl-5 outline-0 w-3/5 h-[150px] mx-auto shadow-2xl border border-solid border-[rgba(255,255,255,0.1)]'>
                {showLabels && (
                    <motion.button 
                        initial={{opacity:0, scale:0}}
                        animate={{opacity:1, scale:1}}
                        transition={spring}
                        className='cursor-pointer rounded-xl p-1 w-[32px] h-[32px] absolute top-2 right-2 bg-[#da7756] flex justify-center items-center'
                    >
                        <FaArrowUp className=' text-white text-center' />
                    </motion.button>
                )}

                <textarea
                    placeholder='How Can Claude Help You Today?'
                    className='outline-none border-none w-full h-3/4'
                    onChange={(e) => e.target.value.length > 0 ? setShowLabels(true) : setShowLabels(false)}
                />
                <div className='flex justify-between items-center'>
                    <div className='text-left text-[rgba(255,255,255,0.5)] flex  items-start'>
                        <p>Claude 3.5 Sonnet</p>
                        {/* <ResponseDropDown /> */}
                    </div>
                    {showLabels && (
                        <motion.p
                            initial={{opacity:0, scale:0}}
                            animate={{opacity:1, scale:1}}
                            transition={spring}
                            className='text-xs text-left text-[rgba(255,255,255,0.5)] font-bold'
                        >
                            Use <span className='px-1 py-[2px] bg-[#282727] rounded-[6px]'>shift + return</span> for new line
                        </motion.p>
                    )}
                </div>
            </div>
            <div className='px-3 py-6 bg-[#282727] w-7/12 mx-auto h-[40px] rounded-b-2xl flex justify-between items-center'>
                <div className='text-xs font-semibold'>Collaborate with Claude using documents, images, and more</div>
                <div className='text-[19px] flex items-center'>
                    <CiCamera className='mr-4 cursor-pointer' />
                    <TiAttachment className='cursor-pointer'/>
                </div>
            </div>
        </>
    )
}

export default InputField