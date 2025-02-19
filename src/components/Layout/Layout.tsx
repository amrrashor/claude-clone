import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer"
import { BsLayoutSidebar } from "react-icons/bs";

const Layout = ({children} : {children:any}) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const [isPinned, setIsPinned] = useState(false);  // Track if pinned

    const togglePinDrawer = () => {
        setIsPinned((prev) => !prev);
        setShowSideDrawer(true); // Always show when pinned
    };
    return (
        <div>
            <div
                className="fixed h-screen top-0 left-0 w-1/5 z-50"
                onMouseEnter={() =>!isPinned && setShowSideDrawer(true)}
            />

            {!showSideDrawer && <div className="fixed top-5 left-5 text-white text-lg">Claude</div>}
            <div
                onMouseLeave={() => !isPinned && setShowSideDrawer(false)}
                className={`pointer-events-auto z-50 bg-[#1a1918b3] fixed  left-0 h-full w-1/5 text-white p-5 shadow-2xl  transition-transform duration-300 ${
                    showSideDrawer ? "translate-x-0" : "-translate-x-full"
                } ${isPinned ? "top-0 bottom-0" : "top-1 bottom-10 rounded-br-2xl rounded-tr-2xl"}`}
            >
                <SideDrawer togglePinDrawer={togglePinDrawer} isPinned={isPinned} />
            </div>
            <>
                {children}
            </>
            {!showSideDrawer && (
                <div className="fixed bottom-7 left-5">
                    <div className="bg-white text-[#282727] font-bold mb-2 w-[30px] h-[30px] text-center rounded-full text-sm pt-1">AA</div>
                    <BsLayoutSidebar className="ml-[7px]"  />
                </div>
            )}
        </div>
    )
}

export default Layout