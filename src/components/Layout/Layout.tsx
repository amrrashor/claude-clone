import { useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer"
import { BsLayoutSidebar } from "react-icons/bs";
import NameAvatar from "../NameAvatar/NameAvatar";

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
                className={` rounded-br-2xl rounded-tr-2xl top-1 bottom-10 ease-in-out pointer-events-auto z-50 bg-[#1a1918b3] fixed  left-0 h-full w-1/5 text-white p-5 shadow-2xl  transition-transform duration-500 ${
                    showSideDrawer ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SideDrawer togglePinDrawer={togglePinDrawer} isPinned={isPinned} />
            </div>
            <div className={`duration-200 ${isPinned ? "translate-x-5" : ""}`}>
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