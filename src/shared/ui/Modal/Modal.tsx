import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import Button from "../Button/Button";
import styles from './Modal.module.css'

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e:KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            };
        } 
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.addEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>{title}</h2>
                <div>{children}</div>
                <div className={styles.footer}>
                    <Button onClick={onClose}>Закрыть</Button>
                </div>

            </div>

        </div>, modalRoot 

    )
}

export default Modal;