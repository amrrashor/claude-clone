import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import NameAvatar from '../NameAvatar/NameAvatar'
import {motion} from'motion/react'
import { SiClaude } from 'react-icons/si';
import { useParams } from 'react-router';
import FeedbackBox from '../FeedbackBox/FeedbackBox';
import CodeSnippet from '../CodeSnippet/CodeSnippet';
import { FaPencilAlt } from "react-icons/fa";
import EditQuestion from '../EditQuestion/EditQuestion';
import { ChatActons } from '../../store/Chat/Chat.slice';
interface Message {
    text: string;
    isUser: boolean;
}

const ChatComponent = ({ messages }: { messages: string[] }) => {
    const dispatch = useDispatch();
    const { title, reGenerate} = useSelector((state: any) => state.chat);
    const { id } = useParams();
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [displayedText, setDisplayedText] = useState("");
    const [isGenerating, setIsGenerating] = useState(true);
    const [initialText, setInitialText] = useState("");
    const [copied, setCopied] = useState(false);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [showEditBtn, setShowEditBtn] = useState(false);
    const [showInputField, setShowInputField] = useState<boolean | null>(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedQuestions, setEditedQuestions] = useState({});

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
        }, 1000);

        return () => {
            clearTimeout(chatTimer);
        }
    }, [messages]);
    
    
    //useEffect for any other text generating
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
    
    //useEffect for initial text only
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
        }, typingSpeed);
        return () => clearInterval(interval);
        
    }, [dispatch]);
    
    const handleCopied = async () => {
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
            <motion.div
                initial={{translateY:10, opacity:0}}
                animate={{translateY:0, opacity:1}}
                transition={{duration:0.5, delay:0.1}}
                onMouseEnter={() => setShowEditBtn(true)}
                onMouseLeave={() => setShowEditBtn(false)}
                className='relative shadow-xl my-5 flex items-start rounded-xl py-2 px-3 bg-linear-to-b from-[#1a1918] to-[#1a1919] text-wrap text-left w-full h-max'
            >   
                <NameAvatar />
                {!showInputField && <div className='ml-5'>{title?.length > 0 ? title : id}</div>}
                {showEditBtn && (
                    <div onClick={() => setShowInputField(true)} className='cursor-pointer text-xs bg-[#1a1918] absolute bottom-[-10px] right-[-10px] flex items-center px-2 py-1 rounded-md'>
                        <FaPencilAlt />
                        <p className='ml-2'>Edit</p>
                    </div>
                )}
                {showInputField && (
                    <EditQuestion
                        oldTitle={id} 
                        setShowInputField={setShowInputField}
                        action={ChatActons.setQuestionTitle}
                    />
                )}
            </motion.div>

            <motion.div
                initial={{translateY:10, opacity:0}}
                animate={{translateY:0, opacity:1}}
                transition={{duration:0.5, delay:0.5}}
                className='relative text-left my-5 rounded-xl p-5 bg-[#3d3d3a] w-full h-max shadow-xl'
            >
                <CodeSnippet />
                {initialText}
                {chatHistory?.length === 0 && !isGenerating ?  (
                    <FeedbackBox handleCopied={handleCopied} copied={copied} />
                ) : ""}
            </motion.div>

            {chatHistory.map((message, index) => (
                message.isUser ? (
                    <motion.div
                        initial={{translateY:10, opacity:0}}
                        animate={{translateY:0, opacity:1}}
                        transition={{duration:0.5, delay:0.1}}
                        key={message.text + 1}
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(null)}
                        className='relative shadow-xl my-5 flex items-start rounded-xl py-2 px-3 bg-linear-to-b from-[#1a1918] to-[#1a1919] text-wrap text-left w-full h-max'
                    >
                        <NameAvatar />
                        {editingIndex !== index && (
                            <div className="ml-5">
                                {editedQuestions[index] ? editedQuestions[index] : message.text}
                            </div>
                        )}
                        {/* {editingIndex !== index && <div className='ml-5'>{editiedQuestion.length > 0 ? editiedQuestion : message.text}</div>} */}
                        {index === hoverIndex &&  !editingIndex && (
                            <div onClick={() => setEditingIndex(index)}  className='cursor-pointer text-xs bg-[#1a1918] absolute bottom-[-10px] right-[-10px] flex items-center px-2 py-1 rounded-lg'>
                                <FaPencilAlt />
                                <p className='ml-2'>Edit</p>
                            </div>
                        )}
                        {editingIndex === index && (
                            <EditQuestion
                                oldTitle={message.text} 
                                setShowInputField={setShowInputField}
                                action={ChatActons.setEditiedQuestion}
                                setEditingIndex={setEditingIndex}
                                onSave={(newText) => {
                                    setEditedQuestions((prev) => ({ ...prev, [index]: newText }));
                                    setEditingIndex(null);
                                }}
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{translateY:10, opacity:0}}
                        animate={{translateY:0, opacity:1}}
                        transition={{duration:0.5, delay:0.5}}
                        className='relative' key={message.text + 2}
                    >
                        <div  className='text-left my-5 rounded-xl p-5 bg-[#3d3d3a] w-full h-max shadow-xl'>
                            <CodeSnippet />
                            {index === chatHistory.length - 1 ? displayedText : message.text}
                            {index === chatHistory.length - 1 && !isGenerating ? (<FeedbackBox  handleCopied={handleCopied} copied={copied}/>) : ""}
                        </div>
                    </motion.div>
                )
            ))}
            <div className='flex items-center justify-between'>
                <motion.div 
                    className="w-[30px] h-[30px]"
                    animate={isGenerating ? {
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 360]
                    }: {}}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <SiClaude className=' absolute w-[30px] h-[30px] text-[#da7756] text-3xl' />
                </motion.div>
                {!isGenerating && <div className='underline text-white text-xs'>Claude can make mistakes. Please double-check responses.</div>}
            </div>

        </div>
    );
};

export default ChatComponent
