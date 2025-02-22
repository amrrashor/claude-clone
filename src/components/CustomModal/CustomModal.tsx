import { useDispatch, useSelector } from "react-redux";
import {motion} from "motion/react"
import { useState } from "react";
import { ChatActons } from "../../store/Chat/Chat.slice";
import { useNavigate } from 'react-router';

interface customModalProps {
    modalTitle: string;
    isRename?: boolean;
    showModal: boolean;
    setShowModal: any;
}
const CustomModal = ({modalTitle, isRename, showModal= false, setShowModal}:customModalProps) => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    const {title} = useSelector((state:any) => state.chat);
    const [chatTitle, setChatTitle] = useState<string | null>("")

    const handleTitleChange = () => {
        dispatch(ChatActons.setQuestionTitle(chatTitle));
        setShowModal(false)
    };
    
    const handleChatDelete = () => {
        navigate("/");
        setShowModal(false)
    };
    return (
        showModal && (
            <div className="bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
                <motion.div 
                    className="p-4 w-4/12 mx-auto bg-[#1a1918] rounded-xl shadow-2xl"
                    initial={{opacity: 0, translateY:10}}
                    animate={{opacity: 1, translateY:0}}
                    exit={{opacity: 0, translateY:10}}
                    transition={{duration:0.3}}
                >
                    <h1 className="text-xl text-white font-bold mb-3 text-left">{modalTitle}</h1>
                    {isRename ? (
                        <input 
                            type="text" 
                            className="bg-[#323131] outline-none p-3 rounded-lg mb-3 w-full"
                            value={chatTitle}
                            placeholder={title}
                            onChange={(e) => setChatTitle(e.target.value)}
                        />
                    ) : (
                        <div className="mb-3 w-full">Are you sure you want to delete this chat?</div>
                    )}

                    <div className="flex justify-end items-end">
                        <button onClick={() => setShowModal(false)} className="mr-4 bg-[#323131] rounded-lg px-2 py-1 text-[16px] text-white cursor-pointer font-bold">
                            Cancel
                        </button>
                        <button onClick={isRename ? handleTitleChange : handleChatDelete} className={`${isRename ? "bg-[#da7756]" : "bg-amber-600"} rounded-lg px-2 py-1 text-[16px] text-white font-bold cursor-pointer`}>
                            {isRename ? "Rename" : "Delete"}
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    )
}

export default CustomModal