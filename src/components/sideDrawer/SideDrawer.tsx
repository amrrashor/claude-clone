import { PiArrowLineRight } from "react-icons/pi";
import { PiChatTeardropText } from "react-icons/pi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";

const SideDrawer = ({togglePinDrawer, isPinned}: {togglePinDrawer:() => void, isPinned:boolean}) => {
    return (
        <div className="z-50 h-5/12">
            <div className='flex justify-between items-center w-full'>
                <h5 className='text-white text-lg'>Claude</h5>
                <div onClick={togglePinDrawer} className="hover:bg-[#1a1918] w-[35px] h-[35px] rounded-md duration-150 flex justify-center items-center cursor-pointer">
                    <PiArrowLineRight  className={`${isPinned && "rotate-180"} duration-200 `} />
                </div>
            </div>

            <button className='cursor-pointer flex items-center text-[#da7756] text-lg px-3 py-1 bg-[#1a1918] w-full mt-5 rounded-lg'><PiChatTeardropText className='mr-3' /> Start New Chat</button>

            <div className='mt-5'>
                <h4 className='mb-2 font-bold'>Starred</h4>
                <div className='flex justify-center items-center text-sm text-[rgba(255,255,255,0.5)] border border-dotted border-[rgba(255,255,255,0.1)] w-full h-[100px] rounded-lg'>
                    Star chats you use often
                </div>
            </div>

            <div className="mt-5">
                <h4 className="font-bold mb-3">Recents</h4>
                <div className="flex items-center mb-3"><IoChatbubblesOutline className="mr-2" />How to make a function call...</div>
                <div className="flex items-center mb-3"><IoChatbubblesOutline className="mr-2" />How to make a function call...</div>
                <div className="flex items-center mb-3"><IoChatbubblesOutline className="mr-2" />How to make a function call...</div>
                <div className="text-sm font-bold flex items-center">View All <FaArrowRightLong className="ml-2 text-xs" /></div>
            </div>

            <div className=" text-center w-full flex justify-end flex-col h-full">
                <div className="bg-[#282727] w-10/12 text-xs p-[2px] mx-auto rounded-tl-lg rounded-tr-lg border border-solid border-[rgba(255,255,255,0.1)]">Free Plan</div>
                <div className="bg-[#1a1918] rounded-lg p-2 border border-solid border-[rgba(255,255,255,0.1)]">amrbahy1996@gmail.com</div>
            </div>

            <div className="flex justify-between items-end mt-1 text-xs">
                <div className="text-white font-bold tracking-tighter">AA</div>
                <div className="font-bold flex justify-center items-center">
                    <FaRegQuestionCircle className="mr-1" />
                    Help & Support
                </div>
            </div>
        </div>
    )
}

export default SideDrawer