import React from 'react'
import {motion} from 'motion/react';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { HiOutlineAdjustmentsVertical } from 'react-icons/hi2';
import { PiChatTeardropText } from 'react-icons/pi';
interface chatHeaderProps {
    handleFavorites:any,
    starred:boolean,
    chatControl:any,
    handleOpenControl:any,
    setShowModal:any
}
const ChatHeader = ({handleFavorites, starred, chatControl, handleOpenControl, setShowModal}: chatHeaderProps) => {
    return (
        <motion.div
            className="flex items-center text-xl"
            initial={{opacity:0, scale:0.9}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0.9}}
            transition={{duration:0.5, delay:0.1, type:'spring'}}
        >
            <div onClick={handleFavorites} className="ml-5 cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md">
                {starred ? <FaStar fill="#da7756" /> : <FaRegStar />}
            </div>
            <div onClick={handleOpenControl} className={`${chatControl ? "bg-[#1a1918]" : ""} cursor-pointer ml-5 w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md`}>
                <HiOutlineAdjustmentsVertical />
            </div>
            <div onClick={() => setShowModal(true)} className="bg-[#da7756] cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center ml-5">
                <PiChatTeardropText /> 
            </div>
        </motion.div>
    )
}

export default ChatHeader