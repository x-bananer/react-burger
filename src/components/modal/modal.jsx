import styles from '../modal/modal.module.css';

import ModalOutline from './modal-outline/modal-outline';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.getElementById('modals');
const Modal = ({ children, onClose }) => {
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
                        <Button
                            extraClass={`${styles['modal__close']} pl-2`}
                            type="secondary"
                            htmlType="button"
                            size="medium"
                            onClick={onClose}
                        >
                            <CloseIcon type="primary" />
                        </Button>
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