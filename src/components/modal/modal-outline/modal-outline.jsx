import styles from '../modal-outline/modal-outline.module.css';

const ModalOutline = ({ onClose }) => {
    return (
        <div onClick={onClose} className={styles['modal-outline']}></div>
    );
};

export default ModalOutline;