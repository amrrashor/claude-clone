import { motion } from "motion/react"
import CustomTextArea from '../CustomTextArea/CustomTextArea';
import { useEffect, useState } from "react";
import ChatHandlers from "../ChatHandlers/ChatHandlers";

const InputField = ({className, ref, setShowModal}: {className?:string, ref?:any, setShowModal?:any}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    useEffect(() => {
        setSelectedFile(null);
        setPreview(null);
    }, []);

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
        <motion.div
            ref={ref}
            initial={{opacity:0, translateY:15}}
            animate={{opacity:1, translateY:0}}
            transition={{duration:0.3, delay:0.1}}
            className={className}
        >
            <CustomTextArea setShowModal={setShowModal} />
            <ChatHandlers 
                preview={preview}
                selectedFile={selectedFile}
                removeUploadedItem={removeUploadedItem}
                handleFileChange={handleFileChange}
            />
        </motion.div>
    )
}

export default InputField