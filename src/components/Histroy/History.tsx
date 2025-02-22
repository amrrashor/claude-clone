
import { useState } from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaArrowRightLong, FaChevronUp } from "react-icons/fa6";
import { motion } from "motion/react"
import { spring } from "motion";
import { useNavigate, useParams } from "react-router";

const History = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showHistory, setShowHistory] = useState(true);
    const navigateToChat = () => {
        navigate(`/chat/${id}`);
    }
    return (
        <div className="mt-10 w-7/12 mx-auto">
            <div className="flex justify-between">
                <h4 className="flex items-center">
                    <IoChatbubblesOutline className=" text-blue-500 mr-4" />
                    Your recent chats 
                    <div 
                        className={` duration-300 cursor-pointer flex items-center ml-3  pl-0 pr-1 py-1 ${!showHistory && "hover:bg-[#282727] hover:rounded-[5px]"}`}
                        onClick={() => setShowHistory(!showHistory)}
                    >
                        <FaChevronUp className={` transition-all duration-150 ml-2 text-xs  ${!showHistory ? " rotate-180" : ""}`} />
                        {!showHistory && <span className="text-xs font-semibold ml-2">Show</span>}
                    </div>
                </h4>
                <button className="flex items-center duration-200 hover:text-white text-xs hover:underline cursor-pointer">View all <FaArrowRightLong className="ml-2 text-xs" /></button>
            </div>

            {showHistory && (
                <motion.div
                    className="cursor-pointer mt-6 text-left pt-5 px-4 bg-[#323131] border border-solid border-[rgba(255,255,255,0.1)] w-[250px] h-[150px] rounded-2xl"
                    initial={{opacity:0, scale:0}}
                    animate={{opacity:1, scale:1}}
                    exit={{opacity:0, scale:0}}
                    transition={spring}
                    onClick={navigateToChat}
                >
                    <IoChatbubblesOutline className="mr-3 mb-2" />
                    <div className="mb-1 text-[16px]">Lorem ipsum, dolor sit ipsum, dolor sit ipsum, dolor sit ...</div>
                    <div className="text-[rgba(255,255,255,0.5)] text-xs">13 hours ago</div>
                </motion.div>
            )}
        </div>
    )
}

export default History