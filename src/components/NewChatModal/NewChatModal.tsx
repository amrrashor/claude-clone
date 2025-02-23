import React, { useRef, useEffect } from 'react';
import InputField from '../InputField/InputField';

const NewChatModal = ({ showModal, setShowModal }: { showModal?: boolean; setShowModal?: any }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowModal]);

    return (
        showModal && (
            <div className="bg-[rgba(0,0,0,0.8)] fixed inset-0 z-[60] flex justify-center items-center">
                <div ref={modalRef} className="w-3/4">
                    <InputField className="w-full" setShowModal={setShowModal} />
                </div>
            </div>
        )
    );
};

export default NewChatModal;
