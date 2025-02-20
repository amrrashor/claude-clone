import { CiCamera } from "react-icons/ci";
import { TiAttachment } from "react-icons/ti";

import CustomTextArea from '../CustomTextArea/CustomTextArea';
const InputField = () => {
    

    return (
        <>
            <CustomTextArea />
            <div className='px-3 py-6 bg-[#282727] w-7/12 mx-auto h-[40px] rounded-b-2xl flex justify-between items-center'>
                <div className='text-xs font-semibold'>Collaborate with Claude using documents, images, and more</div>
                <div className='text-[19px] flex items-center'>
                    <CiCamera className='mr-4 cursor-pointer' />
                    <TiAttachment className='cursor-pointer'/>
                </div>
            </div>
        </>
    )
}

export default InputField