
import { IoCodeSlash } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { ChatActons } from '../../store/Chat/Chat.slice';

const CodeSnippet = () => {
    const dispatch = useDispatch();

    const handleShowChatControl = () => {
        dispatch(ChatActons.setShowChatControl(false));
        dispatch(ChatActons.setShowCodeWindow(true));
    };
    
    return (
        <div onClick={handleShowChatControl} className='flex items-center h-16 mb-3 cursor-pointer'>
            <div className='bg-[#323131] h-16 flex justify-center items-center p-4 rounded-tl-xl rounded-bl-xl border border-solid border-[rgba(255,255,255,0.2)]'>
                <IoCodeSlash className='text-xl' />
            </div>
            <div className='bg-[#282727] h-16 flex flex-col justify-center p-4 rounded-br-xl rounded-tr-xl  border border-solid border-[rgba(255,255,255,0.2)]'>
                <p className='font-bold text-sm text-white'>Data Validation Utility function</p>
                <p className='text-[rgba(255,255,255,0.7)] text-sm'>Click to open code</p>
            </div>
        </div>
    )
}

export default CodeSnippet