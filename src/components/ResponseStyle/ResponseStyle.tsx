import { useState } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

import {motion} from "motion/react";

const styles = [
    {
        id:1,
        title:"Normal",
    },
    {
        id:2,
        title:"Concise",
    },
    {
        id:3,
        title:"Explanatory"
    },
    {
        id:4,
        title:"Formal"
    }
];

const ResponseStyle = ({position}: {position:string}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [defaultValue, setDefaultValue] = useState("Choose Style")
    return (
        <div>
            <div onClick={() => setShowMenu(!showMenu)} className="ml-2 text-[rgba(255,255,255,0.6)] flex items-center cursor-pointer duration-150 hover:bg-[#1a1918] rounded-md px-2">
                <FaFeatherAlt />
                <p className="mx-1">{defaultValue}</p>
                <FaChevronDown className={`duration-150 ${showMenu ? "rotate-180" : ""}`} />
            </div>
            {showMenu && (
                <motion.div
                    initial={{translateY:10}}
                    animate={{translateY:0}}
                    className={`${position == "bottom" ? "bottom-[-180px]" : "top-[-100px]" }  absolute bg-[#282727] p-5 rounded-md`}
                >
                    <h4 className="text-[16px] font-semibold">How should Claude write responses?</h4>
                    <div className="flex items-center">
                        <div className="rounded-md list-none text-left duration-150 mt-2 w-full">
                            {styles?.map((style) => (
                                <li    
                                    onClick={() => {setDefaultValue(style.title); setShowMenu(false)}}
                                    key={style.id} 
                                    className="cursor-pointer pl-1 rounded-sm py-1 mb-1 text-xs font-semibold text-white hover:bg-blue-500"
                                >
                                    {style.title}
                                </li>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default ResponseStyle