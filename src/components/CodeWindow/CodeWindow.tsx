import {motion} from 'motion/react';
import { useDispatch } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";
import { ChatActons } from '../../store/Chat/Chat.slice';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useParams } from 'react-router';
import SyntaxHighlighter from '../SyntaxHighlighter/SyntaxHighlighter';
import { useEffect, useState } from 'react';
import { FaRegClipboard } from "react-icons/fa6";
import { BsDownload } from "react-icons/bs";
import { IoMdCheckmark } from 'react-icons/io';
const CodeWindow = () => {
    const dispatch = useDispatch();
    const location  = useLocation();
    const [displayedCode, setDisplayedCode] = useState("");
    const [copied, setCopied] = useState(false);
    const chatTitle = location.pathname.split("/")[2];
    const closeMenu = () => {
        dispatch(ChatActons.setShowCodeWindow(false));
    };

    const handleShowChatControl = () => {
        dispatch(ChatActons.setShowCodeWindow(false));
        dispatch(ChatActons.setShowChatControl(true));
    };
    const fullCode = `function validateAndTransformData(data, schema) {
    // Input validation
    if (!data || typeof data !== 'object') {
        throw new Error('Data must be a valid object');
    }
    if (!schema || typeof schema !== 'object') {
        throw new Error('Schema must be a valid object');
    }

    const result = {
        isValid: true,
        errors: [],
        transformedData: {},
        metadata: {
            processedAt: new Date(),
            fieldsProcessed: 0,
            validFields: 0,
            invalidFields: 0
        }
    };

    // Process each field in the schema
    for (const field in schema) {
        result.metadata.fieldsProcessed++;
        
        const fieldSchema = schema[field];
        const value = data[field];

        // Check required fields
        if (fieldSchema.required && (value === undefined || value === null)) {
            result.errors.push();
            result.isValid = false;
            result.metadata.invalidFields++;
            continue;
        }

        // Skip optional undefined fields
        if (value === undefined && !fieldSchema.required) {
            continue;
        }

        // Type validation
        if (fieldSchema.type && typeof value !== fieldSchema.type) {
            result.errors.push();
            result.isValid = false;
            result.metadata.invalidFields++;
            continue;
        }

        // Range validation for numbers
        if (fieldSchema.type === 'number' && (fieldSchema.min !== undefined || fieldSchema.max !== undefined)) {
            if (fieldSchema.min !== undefined && value < fieldSchema.min) {
                result;
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
            if (fieldSchema.max !== undefined && value > fieldSchema.max) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // String length validation
        if (fieldSchema.type === 'string' && (fieldSchema.minLength !== undefined || fieldSchema.maxLength !== undefined)) {
            if (fieldSchema.minLength !== undefined && value.length < fieldSchema.minLength) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
            if (fieldSchema.maxLength !== undefined && value.length > fieldSchema.maxLength) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // Custom validation function
        if (fieldSchema.validate && typeof fieldSchema.validate === 'function') {
            const isValid = fieldSchema.validate(value);
            if (!isValid) {
                result.errors.push();
                result.isValid = false;
                result.metadata.invalidFields++;
                continue;
            }
        }

        // Transform value if transformer function is provided
        if (fieldSchema.transform && typeof fieldSchema.transform === 'function') {
            result.transformedData[field] = fieldSchema.transform(value);
        } else {
            result.transformedData[field] = value;
        }
        
        result.metadata.validFields++;
    }

    return result;
}`;

    useEffect(() => {
        let index = 0;
        setDisplayedCode("");
        const interval = setInterval(() => {
            if (index < fullCode.length) {
                setDisplayedCode((prev) => prev + fullCode[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 10);

        return () => clearInterval(interval);
    }, []);

    const handleCopied = async () => {
        try {
            await navigator.clipboard.writeText(fullCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    const handleDownload = () => {
        const blob = new Blob([fullCode], { type: "text/javascript" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "script.js"; // File name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    return (
        <motion.div
            initial={{opacity:0, translateX:10}}
            animate={{opacity:1, translateX:0}}
            exit={{opacity:0, translateX:0}}
            transition={{duration:0.5, type:'tween'}}
            className='mt-10 rounded-lg bg-[#3d3d3a] w-4/12 border border-solid border-[rgba(255,255,255,0.1)] shadow-2xl'
        >
            <div className='flex justify-between items-center py-1 px-3'>
                <div className='flex items-center'>
                    <div onClick={handleShowChatControl} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <FaArrowLeftLong />
                    </div>
                    <h4 className='ml-2'>{chatTitle}</h4>
                </div>
                <div onClick={closeMenu} className='text-xl cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                    <IoCloseSharp  />
                </div>
            </div>

            <div className='bg-[#282c34] p-2 h-[550px] overflow-y-scroll'>
                <SyntaxHighlighter>
                    {displayedCode}
                </SyntaxHighlighter>
            </div>

            <div className='py-2 px-3 flex justify-between items-center'>
                <div className='text-xs text-[rgba(255,255,255,0.4)]'>Last Editied 2 days ago</div>

                <div className='flex items-center'>
                    <div onClick={handleCopied} className='text-sm cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        {copied ? <IoMdCheckmark  /> : <FaRegClipboard />}
                    </div>
                    <div onClick={handleDownload} className='text-sm cursor-pointer w-[35px] h-[35px] hover:bg-[#1a1918] duration-150 flex justify-center items-center rounded-md'>
                        <BsDownload />
                    </div>                    
                </div>
            </div>
        </motion.div>
    )
}

export default CodeWindow