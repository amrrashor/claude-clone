import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer"
import { BsLayoutSidebar } from "react-icons/bs";
import NameAvatar from "../NameAvatar/NameAvatar";
import { useLocation } from "react-router";
import {motion} from 'motion/react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { PiChatTeardropText } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ChatActons } from "../../store/Chat/Chat.slice";
import ChatControl from "../ChatControl/ChatControl";
import { useNavigate } from "react-router";
import CodeWindow from "../CodeWindow/CodeWindow";
import NewChatModal from "../NewChatModal/NewChatModal";

const Layout = ({children} : {children:any}) => {
    const location  = useLocation()
    const chatPageIndicator = location.pathname.split("/")[1];
    const currentChat = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {chatControl, codeWindow} = useSelector((state:any) => state.chat)
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [isPinned, setIsPinned] = useState(false); 
    const [starred, setStarred] = useState(false);
    const [showModal, setShowModal] = useState(false);

    
    const togglePinDrawer = () => {
        setIsPinned((prev) => !prev);
        setShowSideDrawer(true);
    };

    const handleOpenControl = () => {
        dispatch(ChatActons.setShowCodeWindow(false));
        dispatch(ChatActons.setShowChatControl(!chatControl))
    };

    const handleFavorites = () => {
        if (starred) {
            setStarred(false);
            dispatch(ChatActons.setFavouriteChat(""));
        } else {
            setStarred(true);
            dispatch(ChatActons.setFavouriteChat(currentChat));
        }
    };

    return (
        <div className="h-full">
            <NewChatModal showModal={showModal} setShowModal={setShowModal} />
            <div
                className="fixed h-screen top-0 left-0 w-1/5 z-50"
                onMouseEnter={() =>!isPinned && setShowSideDrawer(true)}
            />

            <div className="flex justify-between pt-2">
                <div className=" text-white text-lg">Claude</div>
                {chatPageIndicator && (
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
                )}
            </div>

            <div
                onMouseLeave={() => !isPinned && setShowSideDrawer(false)}
                className={` rounded-br-2xl rounded-tr-2xl top-1 bottom-10 ease-in-out pointer-events-auto z-50 bg-[#1a1918] fixed  left-0 h-full w-1/5 text-white p-5 shadow-2xl  transition-transform duration-500 ${
                    showSideDrawer ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SideDrawer togglePinDrawer={togglePinDrawer} isPinned={isPinned} />
            </div>
            <div className="flex justify-center items-start ">
                {children}
                {chatControl && <ChatControl />}
                {codeWindow && <CodeWindow />}
            </div>
            {!showSideDrawer && (
                <div className="fixed bottom-7 left-5">
                    <NameAvatar className="mb-3" />
                    <BsLayoutSidebar className="ml-[7px]"  />
                </div>
            )}
        </div>
    )
}

export default Layout