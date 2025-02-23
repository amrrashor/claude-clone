import {motion} from 'motion/react';
import { useDispatch } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";
import { ChatActons } from '../../store/Chat/Chat.slice';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useParams } from 'react-router';
import SyntaxHighlighter from '../SyntaxHighlighter/SyntaxHighlighter';
import { useEffect, useRef, useState } from 'react';
import { FaRegClipboard } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";
import { IoMdCheckmark } from 'react-icons/io';
import { fullCode } from '../../helpers/helpers';
const CodeWindow = () => {
    const intervalRef = useRef(null);
    const dispatch = useDispatch();
    const location  = useLocation();
    const [displayedCode, setDisplayedCode] = useState("");
    const [copied, setCopied] = useState(false);
    const chatTitle = location.pathname.split("/")[2];
    const closeMenu = () => {
        dispatch(ChatActons.setShowCodeWindow(false));
    };

    const handleShowChatControl = () => {
        dispatch(ChatActons.setShowCodeWindow(false));
        dispatch(ChatActons.setShowChatControl(true));
    };

    const codeContainerRef = useRef(null);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        let index = 0;
        setDisplayedCode(""); 
        
        intervalRef.current = setInterval(() => {
            if (index < fullCode.length) {
                setDisplayedCode((prev) => {
                    const updatedText = prev + fullCode[index];
                    if (codeContainerRef.current) {
                        codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
                    }
                    return updatedText;
                });
                index++;
            } else {
                clearInterval(intervalRef.current);
            }
        }, 50);

            return () => clearInterval(intervalRef.current);
    }, []);


    const handleCopied = async () => {
        try {
            await navigator.clipboard.writeText(fullCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const handleDownload = () => {
        const blob = new Blob([fullCode], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "script.js";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    return (
        <motion.div
            initial={{opacity:0, translateX:10}}
            animate={{opacity:1, translateX:0}}
            exit={{opacity:0, translateX:0}}
            transition={{duration:0.5, type:'tween'}}
            className=' scroll-smooth mt-10 rounded-lg bg-[#3d3d3a] w-4/12 border border-solid border-[rgba(255,255,255,0.1)] shadow-2xl'
        >
            <div className='flex justify-between items-center py-1 px-3'>
                <div className='flex items-center'>
                    <div onClick={handleShowChatControl} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <FaArrowLeftLong />
                    </div>
                    <h4 className='ml-2'>{chatTitle.substring(0,30)}</h4>
                </div>
                <div onClick={closeMenu} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                    <IoCloseSharp  />
                </div>
            </div>

            <div className='bg-[#282c34] p-2 h-[550px] overflow-y-scroll' ref={codeContainerRef}>
                <SyntaxHighlighter>
                    {displayedCode}
                </SyntaxHighlighter>
            </div>

            <div className='py-2 px-3 flex justify-between items-center'>
                <div className='text-xs text-[rgba(255,255,255,0.4)]'>Last Editied 2 days ago</div>

                <div className='flex items-center'>
                    <div onClick={handleCopied} className='text-sm cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        {copied ? <IoMdCheckmark  /> : <FaRegClipboard />}
                    </div>
                    <div onClick={handleDownload} className='text-sm cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <BsDownload />
                    </div>                    
                </div>
            </div>
        </motion.div>
    )
}

export default CodeWindow