import { useEffect, useState } from "react"
import Container from "../../components/Container/Container"
import { IoChatbubblesOutline, IoClose } from "react-icons/io5";
import ChatComponent from "../../components/Chat/Chat";
import {motion} from "motion/react"
import { spring } from "motion";
import { FaArrowUp } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";
import { useParams } from "react-router";

const Chat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    const [showLabels, setShowLabels] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const {id} = useParams();
    
    useEffect(() => {
        document.title = id;
        return () => {
            document.title = id
        }
    }, []);

    const handleSubmit = () => {
        if (userInput.trim()) {
            setMessages(prev => [...prev, userInput]);
            setUserInput("");
            setShowLabels(false);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            if (file.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
        }
    };

    const removeUploadedItem = () => {
        setPreview(null); 
        setSelectedFile(null)
    };

    return (
        <Container extraClasses="relative p-4 h-[90vh]">
            <div>
                <div className="flex items-center justify-center  text-lg text-white font-bold ">
                    <IoChatbubblesOutline className="mr-3" />
                    <span>Answering the {id}</span>
                </div>
                <ChatComponent messages={messages} />
            </div>
            
            <div className=" absolute bottom-0 left-10 right-10 z-20 shadow-2xl h-[125px] w-8/12 mx-auto bg-[#3d3d3a] p-3 rounded-2xl">
                <>
                    {preview ? (
                            <motion.div
                                initial={{opacity: 0, scale:0.8}}
                                animate={{opacity: 1, scale:1}}
                                exit={{opacity: 0, scale:0.8}}
                                transition={{type:'spring', duration:0.5}}
                                className="bg-[#282727] w-10/12 h-[150px] mx-auto p-5 rounded-t-2xl absolute top-[-150px] z-10 left-10 right-10"
                            >
                                <div className="relative">
                                    <div className=" absolute top-[-10px] left-[-10px] flex justify-center duration-200 cursor-pointer items-center hover:bg-[#da7756] bg-[#5e5d59cc] w-[25px] h-[25px] rounded-full" onClick={removeUploadedItem}>
                                        <IoClose />
                                    </div>
                                    <img 
                                        src={preview} 
                                        alt={selectedFile?.name} 
                                        className="w-[100px] h-[100px] object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            </motion.div>
                        ) : selectedFile ? (
                            <motion.div 
                                initial={{opacity: 0, scale:0.8}}
                                animate={{opacity: 1, scale:1}}
                                exit={{opacity: 0, scale:0.8}}
                                transition={{type:'spring', duration:0.5}}
                                className="bg-[#282727] w-10/12 h-[150px] mx-auto p-5 rounded-t-2xl absolute top-[-150px] z-10 left-10 right-10"
                            >
                                <div className="flex justify-center flex-col items-center w-[140px] h-[90px] rounded-lg shadow-lg relative bg-white text-[#5e5d59cc]">
                                <div className=" absolute top-[-10px] left-[-10px] flex justify-center duration-200 cursor-pointer items-center hover:bg-[#da7756] bg-[#7f7f7acc] w-[25px] h-[25px] rounded-full" onClick={removeUploadedItem}>
                                    <IoClose />
                                </div>
                                <div className="text-[#1c6bbb] text-xs font-extrabold">{selectedFile?.name.substring(0,12)}...</div>
                                    <div className="absolute px-2 bottom-[-10px] bg-[#E3DAC9] font-extrabold shadow-2xl text-xs rounded-sm text-[rgba(0,0,0,0.7)]">document</div>
                                </div>
                            </motion.div>
                            
                    ) : null}
                </>
                <div className="absolute top-2 right-2 flex items-center">
                    <div className="h-[32px] flex items-center justify-center ">
                        <div className="mr-3 cursor-pointer w-[35px] h-[35px] bg-[#3d3d3a] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md">
                            <CiCamera className='cursor-pointer w-1/2' />
                        </div>
                        <label htmlFor="file-upload" className="mr-3 bg-[#3d3d3a] cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md">
                            <TiAttachment />
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                        />
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
                    className="w-full border-none outline-none h-[80px] text-wrap"
                    onChange={(e) => {
                        setShowLabels(e.target.value.length > 0);
                        setUserInput(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <div className="w-1/2 mr-auto text-left mt-auto text-[rgba(255,255,255,0.6)]">Claude 3.5 Sonnet</div>
            </div>
        </Container>
    )
}

export default Chat