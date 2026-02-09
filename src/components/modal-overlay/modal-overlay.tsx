import type { FC } from "react";

import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
	onClose: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClose }) => {
	return <div onClick={onClose} className={styles["modal-overlay"]}></div>;
};

export default ModalOverlay;
