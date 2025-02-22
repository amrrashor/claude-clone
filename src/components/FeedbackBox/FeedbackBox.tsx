import React, { useState } from 'react'
import { AiOutlineDislike } from 'react-icons/ai';
import { AiFillDislike } from "react-icons/ai";
import { BiLike } from 'react-icons/bi'
import { FaRegClipboard } from 'react-icons/fa6'
import { IoMdCheckmark } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { ChatActons } from '../../store/Chat/Chat.slice';
const FeedbackBox = ({handleCopied, copied}: {handleCopied: any, copied:boolean}) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState<boolean | null>(false);
    const [dislike, setDislike] = useState<boolean | null>(false);

    const handleLike = () => {
        setLike(!like);
        setDislike(false);
    }
    const handleDislike = () => {
        setDislike(!dislike);
        setLike(false);
    };

    const handleTextReGenerate = () => {
        dispatch(ChatActons.reGenerateText(true));
    }
    return (
        <div className='bg-[#3d3d3a] absolute bottom-[-10px] right-[-10px] flex items-center px-2 py-1 rounded-md'>
            {copied ? <IoMdCheckmark className='cursor-pointer text-sm text-white' /> : <FaRegClipboard onClick={handleCopied} className='cursor-pointer text-sm text-white' />}
            {like ? <BiSolidLike onClick={handleLike} className='cursor-pointer ml-2 text-sm text-white' /> : <BiLike onClick={handleLike} className='cursor-pointer ml-2 text-sm text-white' />}
            {dislike ? <AiFillDislike onClick={handleDislike} className='cursor-pointer ml-2 text-sm text-white' /> : <AiOutlineDislike onClick={handleDislike} className='cursor-pointer ml-2 text-sm text-white' />}
            <div onClick={handleTextReGenerate} className='ml-2 text-xs cursor-pointer'>Retry</div>
        </div>
    )
}

export default FeedbackBox