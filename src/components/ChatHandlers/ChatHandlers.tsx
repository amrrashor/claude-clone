import React from 'react'
import { CiCamera } from 'react-icons/ci'
import { IoClose } from 'react-icons/io5'
import { TiAttachment } from 'react-icons/ti'
import { startScreenShare } from '../../helpers/helpers'


interface handlerProps {
    selectedFile:any,
    preview:any,
    handleFileChange:any,
    removeUploadedItem:any
}
const ChatHandlers = ({selectedFile, preview, handleFileChange, removeUploadedItem}: handlerProps) => {
    return (
        <div className=' duration-300 px-2 md:px-3 py-6 bg-[#282727] w-9/12 md:w-7/12 mx-auto h-max rounded-b-2xl flex flex-col items-start'>
            <div className={`w-full flex items-end justify-between ${(preview && "mb-5" || selectedFile && "mb-5")} `}>
                {selectedFile ? <div className='text-xs font-semibold'></div> : <div className='text-xs font-semibold text-left'>Collaborate with Claude using documents, images, and more</div>}
                    <div className='text-[19px] flex items-center'>
                        <CiCamera className='mr-4 cursor-pointer' onClick={startScreenShare} />
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <TiAttachment />
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
            </div>
        
            {preview ? (
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
            ) : selectedFile ? (
                <div className="flex justify-center flex-col items-center w-[140px] h-[90px] rounded-lg shadow-lg relative bg-white text-[#5e5d59cc]">
                    <div className=" absolute top-[-10px] left-[-10px] flex justify-center duration-200 cursor-pointer items-center hover:bg-[#da7756] bg-[#7f7f7acc] w-[25px] h-[25px] rounded-full" onClick={removeUploadedItem}>
                        <IoClose />
                    </div>
                <div className="text-[#1c6bbb] text-xs font-extrabold">{selectedFile?.name.substring(0,12)}...</div>
                <div className="absolute px-2 bottom-[-10px] bg-[#E3DAC9] font-extrabold shadow-2xl text-xs rounded-sm text-[rgba(0,0,0,0.7)]">document</div>
                </div>
            ) : null}
        </div>
    )
}

export default ChatHandlers