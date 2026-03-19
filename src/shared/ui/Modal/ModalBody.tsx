import React from "react";
import styles from "./Modal.module.css"

interface ModalBodyProps {
    children: React.ReactNode
}

const ModalBody: React.FC<ModalBodyProps> = ({children}) => {
    return (
        <div className={styles.body}>{children}</div>
    )
}
export default ModalBody;