import { Link } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import styles from "./pages.module.css"

const NotFoundPage: React.FC = () => {
    return (
        <MainLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Что то пошло не так</h1>
                <p>Извините, запрашиваемая страница не существует</p>
                <Link to="/">Вернуться на главную</Link>
            </div>
        </MainLayout>
    )
}
export default NotFoundPage;