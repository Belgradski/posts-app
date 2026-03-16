import React, { useState } from "react";
import styles from './Header.module.css'
import Button from "../../shared/ui/Button/Button";
import ThemeSwitcher from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import AboutModal from "../AboutModal/AboutModal";

const Header: React.FC = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Мой блог</h1>
            <div className={styles.buttons} >
                <Button variant="primary" onClick={() => setIsAboutModalOpen(true)}>О проекте</Button>
                <ThemeSwitcher />
            </div>

            <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}/>
        </header>
    )
}

export default Header;