import React from 'react';
import { SiClaude } from "react-icons/si";

import Container from '../../components/Container/Container'
import InputField from '../../components/InputField/InputField';
const Home = () => {
    return (
        <Container extraClasses='mt-10'>
            <div className='text-xs font-bold w-3/12 mx-auto border border-solid border-[rgba(255,255,255,0.1)] rounded-2xl py-2 px-1 shadow-2xl mb-10'>
                Using Limited Free Plan <a className='text-violet-400'>Upgrade</a>
            </div>

            <h1 className='mb-10 text-5xl font-medium flex justify-center items-center'><SiClaude className='mr-3 text-[#da7756]' />Good Afternoon, Amr</h1>
            
            <InputField />
        </Container>
    )
}

export default Home