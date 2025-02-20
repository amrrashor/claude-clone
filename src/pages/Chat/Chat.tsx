import { useEffect, useState } from "react"
import Container from "../../components/Container/Container"
import { useSelector } from "react-redux"
import { IoChatbubblesOutline } from "react-icons/io5";
import ChatComponent from "../../components/Chat/Chat";
import {motion} from "motion/react"
import { spring } from "motion";
import { FaArrowUp } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";
import { SiClaude } from "react-icons/si";

const Chat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {title} = useSelector((state:any) => state.chat);
    const [showLabels, setShowLabels] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    useEffect(() => {
        document.title = title;
        return () => {
            document.title = title
        }
    }, []);

    const handleSubmit = () => {
        if (userInput.trim()) {
            setMessages(prev => [...prev, userInput]);
            setUserInput("");
            setShowLabels(false);
        }
    }


    return (
        <Container
            extraClasses="mt-5 relative p-3 flex flex-col  justify-between h-3/4"
            initial={{opacity:0, translateY:-10}}
            animate={{opacity:1, translateY:0}}
            exit={{opacity:0, translateY:-10}}
            transition={{type:'spring', duration:0.5}}
        >
            <div>
                <div className="flex items-center justify-center text-sm text-white font-bold">
                    <IoChatbubblesOutline className="mr-3" />
                    <span>{title}</span>
                </div>

                <ChatComponent messages={messages} />
                {/* {isGenerating && ( */}
                <motion.div 
                    className=" "
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <SiClaude className='absolute bottom-0 left-0 text-[#da7756] text-3xl' />
                </motion.div>
            {/* )} */}
            </div>

            <div className="relative bottom-0 h-[125px] w-3/4 mx-auto bg-[#3d3d3abf] p-3 rounded-tr-2xl rounded-tl-2xl">
                
                <div className="absolute top-2 right-2 flex items-center">
                    <div className="p-1 w-[100px] h-[32px] flex items-center justify-center">
                        <CiCamera className='cursor-pointer w-1/2' />
                        <TiAttachment className=' mr-4 cursor-pointer w-1/2'/>
                    </div>
                    
                    {showLabels && (
                            <motion.button 
                                initial={{opacity:0, scale:0}}
                                animate={{opacity:1, scale:1}}
                                transition={spring}
                                className='cursor-pointer rounded-xl p-1 w-[32px] h-[32px]  bg-[#da7756] flex justify-center items-center'
                                onClick={handleSubmit}
                            >
                                <FaArrowUp className='text-white text-center' />
                            </motion.button>
                    )}
                </div>
                <textarea
                    value={userInput}
                    placeholder="Reply to claude..."
                    className="w-full border-none h- outline-none h-[80px] text-wrap"
                    onChange={(e) => {
                        setShowLabels(e.target.value.length > 0);
                        setUserInput(e.target.value)
                    }}
                />
                <div className="w-1/2 mr-auto text-left mt-auto text-[rgba(255,255,255,0.6)]">Claude 3.5 Sonnet</div>
            </div>
        </Container>
    )
}

export default Chat