
import { SiClaude } from "react-icons/si";

import Container from '../../components/Container/Container'
import InputField from '../../components/InputField/InputField';
import History from '../../components/Histroy/History';
import {motion} from 'motion/react'
import { Greeting } from "../../helpers/helpers";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ChatActons } from "../../store/Chat/Chat.slice";
import Loader from "../../components/Loader/Loader";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
const Home = () => {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        document.title = "Claude"
    }, []);
    
    useEffect(() => {
        dispatch(ChatActons.reset());
        dispatch(ChatActons.setShowCodeWindow(false));
    }, []);

    useEffect(() => {
        let timer:number;
        timer = setTimeout(() => {
            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>  
            {isLoading ? (
                <Loader />
            ) : (
                <Container extraClasses='mt-10'>
                    <div className='text-xs font-bold w-3/12 mx-auto border border-solid border-[rgba(255,255,255,0.1)] rounded-2xl py-2 px-1 shadow-2xl mb-10'>
                        Using Limited Free Plan <a className='text-violet-400'>Upgrade</a>
                    </div>

                    <h1 className='mb-10 text-5xl font-medium flex justify-center items-center'>
                        <motion.div
                            initial={{translateX:200}}
                            animate={{translateX:0}}
                            transition={{type:'spring', duration:1.5}}
                        >
                            <SiClaude className='mr-3 text-[#da7756]' />
                        </motion.div>
                        <motion.span
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5, delay:0.5}}
                        >
                            {Greeting()}, Amr
                        </motion.span>
                    </h1>
                    
                    <InputField />

                    <History />
                </Container>
            )}
        </>
    )
}

export default Home