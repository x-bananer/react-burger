import styles from '../modal/modal.module.css';

import ModalOutline from './modal-outline/modal-outline';
import ModalHeader from './modal-header/modal-header';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modals');
const Modal = ({ children, title, onClose }) => {
    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onEsc);

        return () => {
            document.removeEventListener('keydown', onEsc);
            document.body.style.overflow = '';
        };
    }, []);

    return createPortal(
        (
            <>
                <div className={styles['modal']}>
                    <div className={styles['modal__container']}>
                        <ModalHeader title={title} onClose={onClose} />
                        {children}
                    </div>
                    
                </div>
                <ModalOutline onClose={onClose} />
            </>
        ),
        modalRoot
    )
};

export default Modal;