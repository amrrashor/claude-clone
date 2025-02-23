import { PiArrowLineRight } from "react-icons/pi";
import { PiChatTeardropText } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { IoCloseSharp } from "react-icons/io5";
import {motion} from 'motion/react'
const MobileDrawer = ({setShowModal, setMobileDrawer, navigateToHome}: {navigateToHome:any, setShowModal:any, setMobileDrawer:any}) => {
    const {favouriteChat, title} = useSelector((state: any) => state.chat);
    const navigate = useNavigate();
    const location = useLocation(); 

    const navigateToChat = () => {
        const newPath = `/chat/${title}`;
        if (location.pathname !== newPath) {
            navigate(newPath);
            setMobileDrawer(false)
        }
    };
    return (
        <motion.div
            initial={{opacity:0, translateX:-10}}
            animate={{opacity:1, translateX:0}}
            exit={{opacity:0, translateX:-10}}
            className="z-50 h-full fixed top-0 bottom-0 left-0 p-3 bg-[#1a1918] w-3/4"
        >
            <div className='flex justify-between items-center w-full'>
                <h5 onClick={navigateToHome} className='text-white text-lg'>Claude</h5>
                <div onClick={() => setMobileDrawer(false)} className="hover:bg-[#1a1918] w-[35px] h-[35px] rounded-md duration-150 flex justify-center items-center cursor-pointer">
                    <IoCloseSharp   />
                </div>
            </div>

            <button 
                onClick={() => {setShowModal(true); setMobileDrawer(false)}}
                className='cursor-pointer flex items-center text-[#da7756] text-lg px-3 py-1 bg-[#252423] w-full mt-5 rounded-lg'
            >
                <PiChatTeardropText className='mr-3' />
                Start New Chat
            </button>

            <div className='mt-5'>
                <h4 className='mb-2 font-bold'>Starred</h4>
                {favouriteChat ? (
                    <div onClick={navigateToChat}  className="hover:bg-[#252423] rounded-md p-2 duration-150 flex items-center mb-3 cursor-pointer"><IoChatbubblesOutline className="mr-2" />{favouriteChat?.substring(0,12)}</div>
                ) : (
                    <div className='flex justify-center items-center text-sm text-[rgba(255,255,255,0.5)] border border-dotted border-[rgba(255,255,255,0.1)] w-full h-[100px] rounded-lg'>
                        Star chats you use often
                    </div>
                )}
            </div>

            <div className="mt-5">
                <h4 className="font-bold mb-3">Recents</h4>
                {title && ( 
                    <div onClick={navigateToChat} className="hover:bg-[#252423] rounded-md p-2 duration-150 flex items-center mb-3 cursor-pointer ">
                        <IoChatbubblesOutline className="mr-2" />
                        {title?.substring(0,12)}
                    </div>
                )}
                {title && <div className="text-sm font-bold flex items-center cursor-pointer">View All <FaArrowRightLong className="ml-2 text-xs" /></div>}
            </div>
        </motion.div>
    )
}

export default MobileDrawer