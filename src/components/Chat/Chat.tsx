import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import NameAvatar from '../NameAvatar/NameAvatar'
import {motion} from'motion/react'
import { SiClaude } from 'react-icons/si';
import { useParams, useSearchParams } from 'react-router';
import { FaRegClipboard } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { AiOutlineDislike } from "react-icons/ai";
import FeedbackBox from '../FeedbackBox/FeedbackBox';
import { IoCodeSlash } from "react-icons/io5";
import CodeSnippet from '../CodeSnippet/CodeSnippet';
interface Message {
    text: string;
    isUser: boolean;
}

const ChatComponent = ({ messages }: { messages: string[] }) => {
    const { title } = useSelector((state: any) => state.chat);
    const { id } = useParams();
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [displayedText, setDisplayedText] = useState("");
    const [isGenerating, setIsGenerating] = useState(true);
    const [initialText, setInitialText] = useState("");
    const [copied, setCopied] = useState(false);
    const typingSpeed = 30;
    const fullText = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore sit itaque tempora reprehenderit ipsa. Alias reiciendis suscipit sint magnam tempore tempora aliquid, excepturi nesciunt natus ratione laudantium omnis amet cupiditate!`
    const initialfullText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus omnis numquam vero ab laudantium odio non, eveniet exercitationem optio ea temporibus recusandae enim atque pariatur excepturi vel cupiditate, ipsa explicabo."

    useEffect(() => {
        if (messages.length === 0) return;
    
        const userMessage = messages[messages.length - 1];
    
        if (chatHistory.length > 0 && chatHistory[chatHistory.length - 1].text === userMessage) {
            return;
        }
    
        setChatHistory(prev => [...prev, { text: userMessage, isUser: true }]);
        setIsGenerating(true);
        const chatTimer = setTimeout(() => {
            setChatHistory(prev => [...prev, { text: fullText, isUser: false }]);
            setDisplayedText("");
        }, 500);

        return () => {
            clearTimeout(chatTimer);
        }
    }, [messages]);
    
    
    useEffect(() => {
        const lastMessage = chatHistory[chatHistory.length - 1];
        if (lastMessage && !lastMessage.isUser) {
            let index = 0;
            const textToType = lastMessage.text;
            const interval = setInterval(() => {
                if (index < textToType.length) {
                    setDisplayedText(prev => prev + textToType[index]);
                    index++;
                } else {
                    clearInterval(interval);
                    setIsGenerating(false);
                }
            }, typingSpeed);

            return () => clearInterval(interval);
        }
    }, [chatHistory]);
    
    useEffect(() => {
        let index = 0
        const interval = setInterval(() => {
                    if (index < initialfullText.length) {
                        setInitialText(prev => prev + initialfullText[index])
                        index++
                    } else {
                        clearInterval(interval);
                        setIsGenerating(false)
                    }
                }, typingSpeed)
        
                return () => clearInterval(interval)
    }, []);
    
    const handleCopied =async () => {
        const textToCopy = chatHistory?.length > 0 ? displayedText : initialText
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };


    return (
        <div className='w-3/4 mx-auto overflow-y-scroll max-h-[520px] h-3/4 scroll p-10'>
            <div className='shadow-xl my-5 flex items-start rounded-xl py-2 px-3 bg-linear-to-b from-[#1a1918] to-[#1a1919] text-wrap text-left w-full h-max'>
                <NameAvatar />
                <div className='ml-5'>{id}</div>
            </div>

            <div className='relative text-left my-5 rounded-xl p-5 bg-[#3d3d3a] w-full h-max shadow-xl'>
                <CodeSnippet />
                {initialText}
                {chatHistory?.length === 0 && !isGenerating ?  (
                    <FeedbackBox handleCopied={handleCopied} copied={copied} />
                ) : ""}
            </div>

            {chatHistory.map((message, index) => (
                message.isUser ? (
                    <div key={message.text + 1} className='shadow-xl my-5 flex items-start rounded-xl py-2 px-3 bg-linear-to-b from-[#1a1918] to-[#1a1919] text-wrap text-left w-full h-max'>
                        <NameAvatar />
                        <div className='ml-5'>{message.text}</div>
                    </div>
                ) : (
                    <div className='relative' key={message.text + 2}>
                        <div  className='text-left my-5 rounded-xl p-5 bg-[#3d3d3a] w-full h-max shadow-xl'>
                            {index === chatHistory.length - 1 ? displayedText : message.text}
                            {index === chatHistory.length - 1 && !isGenerating ? (
                                <FeedbackBox  handleCopied={handleCopied} copied={copied}/>
                                ) :
                            ""}
                        </div>
                    </div>
                )
            ))}
            {isGenerating && (
                <motion.div 
                    className="w-[30px] h-[30px]"
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                >
                    <SiClaude className='w-full h-full absolute top-0 left-0 bottom-0 right-0 text-[#da7756] text-3xl' />
                </motion.div>
            )}
        </div>
    );
};

export default ChatComponent
