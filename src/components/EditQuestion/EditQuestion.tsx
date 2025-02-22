import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


interface props {
    oldTitle:string,
    setShowInputField: any,
    action:any,
    setEditingIndex?:any,
    onSave?: (newText: string) => void;
}
const EditQuestion = ({  onSave,setEditingIndex, oldTitle,  setShowInputField, action}:props) => {
    const dispatch = useDispatch();
    const [text, setText] = useState<string | null>("")
    return (
        <div>
            <input
                onChange={(e) => setText(e.target.value)}
                type="text" 
                placeholder={oldTitle} 
                className='ml-1 h-16 mb-2 duration-200 w-full bg-[#3d3d3a] rounded-lg p-2 outline-none border border-solid focus:border-blue-500' 
            />
            <div className='flex items-center'>
                <div className='text-xs text-wrap'>Editing this message will create a new conversation branch. You can switch between branches using the arrow navigation buttons.</div>
                <div className='flex items-center'>
                    <button onClick={() => {setShowInputField(false); setEditingIndex(null)}}  className="mr-4 bg-[#323131] rounded-lg px-2 py-1 text-[16px] text-white cursor-pointer font-bold">Cancel</button>
                    <button onClick={() => {dispatch(action(text)); setShowInputField(false); setEditingIndex(null);   onSave(text);}} className={`bg-[#da7756] rounded-lg px-4 py-1 text-[16px] text-white font-bold cursor-pointer`}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditQuestion