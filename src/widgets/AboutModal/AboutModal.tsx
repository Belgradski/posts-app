import React from "react";
import Modal from "../../shared/ui/Modal/Modal";
import styles from './AboutModal.module.css';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const AboutModal: React.FC<AboutModalProps> = ({isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="О проекте">
            <div className={styles.content}>
                <div>
                <h3>Приложение для просмотра постов и комментариев.</h3>
                <p>Закрепляем знания по React и Typescript.</p>
                </div>
                <div >
                    <h3>Функциональность:</h3>
                    <ul>
                        <li>Переключение светлой и темной темы.</li>
                        <li>Модальное окно через React.CreatePortal.</li>
                        <li>Css Modules для стилизации.</li>
                    </ul>
                </div>
                <div >
                    <p>Автор: Белградский Алексей.</p>
                </div>
                
            </div>
        </Modal>
    )
}

export default AboutModal;