import {useEffect, useState} from 'react'
import { FaArrowUp } from "react-icons/fa6";
import { motion } from "motion/react"
import { spring } from 'motion';
import { useDispatch, useSelector } from 'react-redux';
import ChatSlice from '../../store/Chat/Chat.slice';
import { useNavigate } from 'react-router';
import ResponseStyle from '../ResponseStyle/ResponseStyle';
const CustomTextArea = () => {
    const {title} = useSelector((state:any) => state.chat);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLabels, setShowLabels] = useState(false);
    useEffect(() => {
        dispatch(ChatSlice.actions.reset());
    })
    const handleChatting = (e:any) => {
        dispatch(ChatSlice.actions.setQuestionTitle(e.target.value));
        if (e.target.value.length > 0) {
            setShowLabels(true);
        } else {
            setShowLabels(false)
        }
    };

    const handleSubmit = () => {
        if (title.trim()) {
            navigate(`/chat/${title}`);
        }
    };

    return (
    <div className=' relative bg-[#323131] rounded-2xl p-3 pl-5 outline-0 w-3/5 h-[150px] mx-auto shadow-2xl border border-solid border-[rgba(255,255,255,0.1)]'>
        {showLabels && (
                <motion.button 
                    initial={{opacity:0, scale:0}}
                    animate={{opacity:1, scale:1}}
                    transition={spring}
                    onClick={handleSubmit}
                    className='cursor-pointer rounded-xl p-1 w-[32px] h-[32px] absolute top-2 right-2 bg-[#da7756] flex justify-center items-center'
                >
                    <FaArrowUp className='text-white text-center' />
                </motion.button>
        )}
        <textarea
            placeholder='How Can Claude Help You Today?'
            className='outline-none border-none w-full h-3/4'
            onChange={(e) => handleChatting(e)}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit()
                }
            }}
        />
        <div className='flex justify-between items-center'>
            <div className='text-left text-[rgba(255,255,255,0.5)] flex  items-start'>
                <p>Claude 3.5 Sonnet</p>
                <ResponseStyle />
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
)}

export default CustomTextArea