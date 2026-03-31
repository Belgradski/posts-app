import { Link } from "react-router-dom";
import styles from "./pages.module.css"

const NotFoundPage: React.FC = () => {
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>Что то пошло не так</h1>
                <p className={styles.title}>Извините, запрашиваемая страница не существует</p>
                <Link to="/" className={styles.backLink}>Вернуться на главную</Link>
            </div>
        </>
    )
}
export default NotFoundPage;