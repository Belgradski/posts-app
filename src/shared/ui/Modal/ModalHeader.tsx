import React from 'react';
import styles from './Modal.module.css';

interface ModalHeaderProps {
    title: string;
    onClose?: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({title, onClose}) => {
    return (
        <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {onClose && (
                <button className={styles.closeButton} onClick={onClose}>x</button>
            )}
        </div>
    )
}

export default ModalHeader;

