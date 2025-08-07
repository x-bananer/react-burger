import styles from '../modal-header/modal-header.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalHeader = ({ title, onClose }) => {
    return (
        <div className={styles['modal-header']}>
            {title &&
                <h1 className="text text_type_main-large">
                    {title}
                </h1>
            }
            <Button extraClass={`${styles['modal-header__button']} pl-2`} type="secondary" onClick={onClose} htmlType="button" size="medium">
                <CloseIcon type="primary" />
            </Button>
        </div>
    );
};

export default ModalHeader;