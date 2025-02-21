import React from 'react'
import { AiOutlineDislike } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { FaRegClipboard } from 'react-icons/fa6'
import { IoMdCheckmark } from "react-icons/io";
const FeedbackBox = ({handleCopied, copied}: {handleCopied: any, copied:boolean}) => {
    return (
        <div className='bg-[#3d3d3a] absolute bottom-[-10px] right-[-10px] flex items-center px-2 py-1 rounded-md'>
            {copied ? <IoMdCheckmark className='cursor-pointer text-sm text-white' /> : <FaRegClipboard onClick={handleCopied} className='cursor-pointer text-sm text-white' />}
            <BiLike className='cursor-pointer ml-2 text-sm text-white' />
            <AiOutlineDislike className='cursor-pointer ml-2 text-sm text-white' />
            <div className='ml-2 text-xs cursor-pointer'>Retry</div>
        </div>
    )
}

export default FeedbackBox