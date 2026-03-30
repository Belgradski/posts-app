import React from "react";
import styles from "./Modal.module.css"

interface ModalFooterProps {
    children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({children}) => {
    return (
        <div className={styles.footer}>{children}</div>
    )
}

export default ModalFooter;
