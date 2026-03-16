import React from "react";
import styles from './Footer.module.css'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer} >
            <p className={styles.text}>{currentYear} Aston React интенсив.</p>
        </footer>
    )
}

export default Footer;