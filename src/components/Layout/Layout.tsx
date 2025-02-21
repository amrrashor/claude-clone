import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer"
import { BsLayoutSidebar } from "react-icons/bs";
import NameAvatar from "../NameAvatar/NameAvatar";
import { useLocation } from "react-router";
import {motion} from 'motion/react';
import { FaRegStar } from "react-icons/fa";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { PiChatTeardropText } from "react-icons/pi";
const Layout = ({children} : {children:any}) => {
    const location  = useLocation()
    const chatPageIndicator = location.pathname.split("/")[1]
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [isPinned, setIsPinned] = useState(false); 

    const togglePinDrawer = () => {
        setIsPinned((prev) => !prev);
        setShowSideDrawer(true);
    };
    return (
        <div>
            <div
                className="fixed h-screen top-0 left-0 w-1/5 z-50"
                onMouseEnter={() =>!isPinned && setShowSideDrawer(true)}
            />

            <div className="flex justify-between">
                <div className=" text-white text-lg">Claude</div>
                {chatPageIndicator && (
                    <motion.div
                        className="flex items-center text-xl"
                        initial={{opacity:0, scale:0.9}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity:0, scale:0.9}}
                        transition={{duration:0.5, delay:0.1, type:'spring'}}
                    >
                        <div className="ml-5 cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md">
                            <FaRegStar  />
                        </div>
                        <div className="cursor-pointer ml-5 w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md">
                            <HiOutlineAdjustmentsVertical />
                        </div>
                        <div className="bg-[#da7756] cursor-pointer rounded-full w-[35px] h-[35px] flex justify-center items-center ml-5">
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
            <div>
                {children}
            </div>
            {!showSideDrawer && (
                <div className="fixed bottom-7 left-5">
                    <NameAvatar />
                    <BsLayoutSidebar className="ml-[7px]"  />
                </div>
            )}
        </div>
    )
}

export default Layout