import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer"
import { BsLayoutSidebar } from "react-icons/bs";
import NameAvatar from "../NameAvatar/NameAvatar";
import { useLocation, useNavigate } from "react-router";
import {motion} from 'motion/react';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { PiChatTeardropText } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ChatActons } from "../../store/Chat/Chat.slice";
import ChatControl from "../ChatControl/ChatControl";
import CodeWindow from "../CodeWindow/CodeWindow";
import NewChatModal from "../NewChatModal/NewChatModal";
import { TbMenu4 } from "react-icons/tb";
import ChatHeader from "../ChatHeader/ChatHeader";
import MobileDrawer from "../MobileDrawer/MobileDrawer";
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
    const [mobileDrawer, setMobileDrawer] = useState(false);

    
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
    const navigateToHome = () => {
        const newPath = `/`;
        if (location.pathname !== newPath) {
            navigate(newPath);
            setMobileDrawer(false);
        }
    };
    return (
        <div className="h-full">
            <NewChatModal showModal={showModal} setShowModal={setShowModal} />
            <div
                className="fixed h-screen top-0 left-0 w-[10px] z-50"
                onMouseEnter={() =>!isPinned && setShowSideDrawer(true)}
            />

            <div className="flex justify-between pt-2">
                <div className=" text-white text-lg flex items-center">
                    <div onClick={() => setMobileDrawer(true)} className="mr-2 xl:hidden hover:bg-[#1a1918] w-[35px] h-[35px] rounded-md duration-150 flex justify-center items-center cursor-pointer">
                        <TbMenu4 className="text-xl" />
                    </div>
                    <div className="cursor-pointer" onClick={navigateToHome}>Claude</div>
                </div>
                {chatPageIndicator && (
                    <ChatHeader
                        chatControl={chatControl}
                        setShowModal={setShowModal}
                        starred={starred}
                        handleFavorites={handleFavorites}
                        handleOpenControl={handleOpenControl}
                    />
                )}
            </div>
            
            <div
                onMouseLeave={() => !isPinned && setShowSideDrawer(false)}
                className={`hidden lg:hidden xl:block rounded-br-2xl rounded-tr-2xl top-1 bottom-10 ease-in-out pointer-events-auto z-50 bg-[#1a1918] fixed  left-0 h-full w-1/5 text-white p-5 shadow-2xl  transition-transform duration-500 ${showSideDrawer ? "translate-x-0" : "-translate-x-full"}`}
            >
                <SideDrawer navigateToHome={navigateToHome} setShowModal={setShowModal} togglePinDrawer={togglePinDrawer} isPinned={isPinned} />
            </div>

            {mobileDrawer && (
                <MobileDrawer navigateToHome={navigateToHome} setShowModal={setShowModal} setMobileDrawer={setMobileDrawer}/>
            )}

            <div className="flex justify-center items-start">
                {children}
                {chatControl && <ChatControl />}
                {codeWindow && <CodeWindow />}
            </div>

            {!showSideDrawer && (
                <div className="hidden lg:hidden xl:block fixed bottom-7 left-5">
                    <NameAvatar className="mb-3" />
                    <BsLayoutSidebar className="ml-[7px]"  />
                </div>
            )}
        </div>
    )
}

export default Layout