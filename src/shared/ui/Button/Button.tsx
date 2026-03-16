import React, { type ButtonHTMLAttributes} from "react";
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children?: React.ReactNode;
    name?: string;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    className = '',
    name ='',
    ...props
}) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button className={buttonClass} {...props}>
           {name} {children}
        </button>
    )
}

export default Button;