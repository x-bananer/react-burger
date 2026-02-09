import styles from "../modal/modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import type { FC, ReactNode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	children: ReactNode;
	onClose: () => void;
}

const modalRoot = document.getElementById("modals") as HTMLElement;

const Modal: FC<ModalProps> = ({ children, onClose }) => {
	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onEsc);

		return () => {
			document.removeEventListener("keydown", onEsc);
			document.body.style.overflow = "";
		};
	}, []);

	return createPortal(
		<>
			<div className={styles["modal"]}>
				<div className={styles["modal__container"]}>
					<Button
						extraClass={styles["modal__close"]}
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
			<ModalOverlay onClose={onClose} />
		</>,
		modalRoot
	);
};

export default Modal;
