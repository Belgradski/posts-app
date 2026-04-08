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
            <li>✅ Список постов с фильтрацией по длине заголовка</li>
            <li>✅ Детальная страница поста с комментариями</li>
            <li>✅ Профили пользователей с постами, альбомами и задачами</li>
            <li>✅ Галерея фотографий из альбомов</li>
            <li>✅ Сворачиваемые комментарии (ленивая загрузка)</li>
            <li>✅ Тёмная/светлая тема с сохранением в localStorage</li>
            <li>✅ Модальное окно через React Portal</li>
            <li>✅ Глобальное состояние с Redux Toolkit</li>
            <li>✅ Автоматическое кэширование через RTK Query</li>
            <li>✅ Нормализация данных (createEntityAdapter)</li>
            <li>✅ Оптимизации: useMemo, useCallback, memo</li>
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
