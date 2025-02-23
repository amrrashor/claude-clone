
import {AnimatePresence, motion} from  "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { ChatActons } from '../../store/Chat/Chat.slice';
import CodeSnippet from '../CodeSnippet/CodeSnippet';
import { RiFontSize } from "react-icons/ri";
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
const ChatControl = () => {
    const dispatch = useDispatch();
    const [showFont, setShowFont] = useState(false);
    const [defaultFont, setDefaultFont] = useState("Default");
    const closeMenu = () => {
        dispatch(ChatActons.setShowChatControl(false));
    };
    return ( 
        <AnimatePresence>
            <motion.div
                initial={{opacity:0, translateX:10}}
                animate={{opacity:1, translateX:0}}
                exit={{opacity:0, translateX:10}}
                transition={{duration:0.5, type:'spring', ease:'easeInOut'}}
                className='hidden md:block mt-10 p-4 rounded-lg bg-[#3d3d3a] w-4/12 border border-solid border-[rgba(255,255,255,0.1)] shadow-2xl'
            >
                <div className='flex justify-between items-center'>
                    <h4 className='font-bold text-xl text-white'>Chat control</h4>
                    <div onClick={closeMenu} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <IoCloseSharp  />
                    </div>
                </div>

                <div className='mt-5 font-bold text-[rgba(255,255,255,0.5)]'>
                    <p className='text-lg mb-2'>Claude Sonnet 3.5</p>
                    <p className='text-sm'>Most intelligent model</p>
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-2'>Artifacts</h4>
                    <CodeSnippet />
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-2'>Content</h4>
                    <div className='border border-solid border-[rgba(255,255,255,0.1)] rounded-lg p-2 font-bold text-center'>
                        <p className='text-lg mb-2'>No content added yet</p>
                        <p className='text-xs'>Add images, PDFs, docs, spreadsheets, and more to summarize, analyze, and query content with Claude.</p>
                    </div>
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-3'>Chat styles</h4>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center'>
                            <div className='mr-1 w-[35px] h-[35px] bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                                <RiFontSize />
                            </div>
                            <h5 className='font-bold '>Font</h5>
                        </div>

                        <div className='w-[150px]'>
                            <div onClick={() => setShowFont(!showFont)} className=' cursor-pointer mb-1 flex justify-between items-center bg-[#323131]  p-2 w-full rounded-lg border border-solid border-[rgba(255,255,255,0.1)]'>
                                <h6>{defaultFont}</h6>
                                <FaChevronDown className={`duration-200  ${showFont ? "rotate-180" : ''} `} />
                            </div>
                            {showFont && (
                                <motion.ul 
                                    initial={{opacity:0, translateY:-10}}
                                    animate={{opacity:1, translateY:0}}
                                    exit={{opacity:0, translateY:0}}
                                    className='p-2 bg-[#323131] rounded-lg shadow-lg absolute w-[150px]'
                                >
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Default"); ;setShowFont(false)}}>Default</li>
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Match System");setShowFont(false)}}>Match System</li>
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Dyslexic friendly"); ;setShowFont(false)}}>Dyslexic friendly</li>
                                </motion.ul>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className='h-[100px]'></div>
            </motion.div>

            <motion.div
                initial={{opacity:0, translateY:10}}
                animate={{opacity:1, translateY:0}}
                exit={{opacity:0, translateY:10}}
                transition={{duration:0.5, type:'spring', ease:'easeInOut'}}
                className='fixed bottom-1 h-10/12 z-20 block md:hidden mt-10 p-4 rounded-lg bg-[#3d3d3a] w-10/12 border border-solid border-[rgba(255,255,255,0.1)] shadow-2xl'
            >
                <div className='flex justify-between items-center'>
                    <h4 className='font-bold text-xl text-white'>Chat control</h4>
                    <div onClick={closeMenu} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <IoCloseSharp  />
                    </div>
                </div>

                <div className='mt-5 font-bold text-[rgba(255,255,255,0.5)]'>
                    <p className='text-lg mb-2'>Claude Sonnet 3.5</p>
                    <p className='text-sm'>Most intelligent model</p>
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-2'>Artifacts</h4>
                    <CodeSnippet />
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-2'>Content</h4>
                    <div className='border border-solid border-[rgba(255,255,255,0.1)] rounded-lg p-2 font-bold text-center'>
                        <p className='text-lg mb-2'>No content added yet</p>
                        <p className='text-xs'>Add images, PDFs, docs, spreadsheets, and more to summarize, analyze, and query content with Claude.</p>
                    </div>
                </div>

                <div className='mt-5'>
                    <h4 className='text-sm font-bold text-[rgba(255,255,255,0.5)] mb-3'>Chat styles</h4>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center'>
                            <div className='mr-1 w-[35px] h-[35px] bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                                <RiFontSize />
                            </div>
                            <h5 className='font-bold '>Font</h5>
                        </div>

                        <div className='w-[150px]'>
                            <div onClick={() => setShowFont(!showFont)} className=' cursor-pointer mb-1 flex justify-between items-center bg-[#323131]  p-2 w-full rounded-lg border border-solid border-[rgba(255,255,255,0.1)]'>
                                <h6>{defaultFont}</h6>
                                <FaChevronDown className={`duration-200  ${showFont ? "rotate-180" : ''} `} />
                            </div>
                            {showFont && (
                                <motion.ul 
                                    initial={{opacity:0, translateY:-10}}
                                    animate={{opacity:1, translateY:0}}
                                    exit={{opacity:0, translateY:0}}
                                    className='p-2 bg-[#323131] rounded-lg shadow-lg absolute w-[150px]'
                                >
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Default"); ;setShowFont(false)}}>Default</li>
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Match System");setShowFont(false)}}>Match System</li>
                                    <li className='mb-2 cursor-pointer' onClick={() => {setDefaultFont("Dyslexic friendly"); ;setShowFont(false)}}>Dyslexic friendly</li>
                                </motion.ul>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className='h-[100px]'></div>
            </motion.div>
        </AnimatePresence>
    )
}

export default ChatControl