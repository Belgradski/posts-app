import React from "react";
import Button from "../../../shared/ui/Button/Button";
import { useTheme } from "../../../shared/layouts/lib/theme/useTheme";
import styles from "./ThemeSwitcher.module.css"

const ThemeSwitcher: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <Button variant="primary" onClick={toggleTheme} className={styles.switcher}>
            {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
        </Button>
    )
}

export default ThemeSwitcher;