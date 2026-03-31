import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css'
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        
        // Объявляем rootElement здесь, чтобы он был доступен во всей функции
        const rootElement = document.getElementById('root');
        
        if (isOpen) {
            if (rootElement) {
                rootElement.classList.add(styles.blurBackground);
            }
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            if (rootElement) {
                rootElement.classList.remove(styles.blurBackground);
            }
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            if (rootElement) {
                rootElement.classList.remove(styles.blurBackground);
            }
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    const modalRoot = document.getElementById("modal");
    if (!modalRoot) return null;
    
    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>, 
        modalRoot 
    );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;