import React from "react";
import Modal from "../../shared/ui/Modal/Modal";
import styles from "./AboutModal.module.css";
import ModalHeader from "../../shared/ui/Modal/ModalHeader";
import ModalFooter from "../../shared/ui/Modal/ModalFooter";
import ModalBody from "../../shared/ui/Modal/ModalBody";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <ModalHeader
          title="Приложение для просмотра постов и комментариев."
          onClose={onClose}
        ></ModalHeader>
        <ModalBody>
          <h3>Функциональность:</h3>
          <ul>
            <li>Переключение светлой и темной темы.</li>
            <li>Модальное окно через React.CreatePortal.</li>
            <li>Css Modules для стилизации.</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <p>Автор: Белградский Алексей</p>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default AboutModal;
