import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from './pages.module.css';

interface Album {
    id: number;
    title: string;
    userId: number;
}

const UserAlbumsPage: React.FC = () => {
    const { id } = useParams<{ id: string  }>();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true);
            setError(null)
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`);
                if (!response.ok) throw new Error("Ошибка загрузки");
                const data = await response.json();
                setAlbums(data);
            }
            catch(err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchAlbums()
    }, [id])

    if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Что то пошло не так:{error}</div>;
 
    
    return (
        <MainLayout>
            <UserTabs userId={id ? parseInt(id) : undefined}/>
            <div className={styles.container}>
                <h1 className={styles.title}>Альбомы пользователя: {id}</h1>
                <div className={styles.albumGrid}>
                    {albums.map((album) => (
                        <Link 
                                key={album.id}
                                to={`/albums/${album.id}/photos`}
                                className={styles.albumCard}>
                                <h3 className={styles.title}>{album.title}</h3>
                                <p className={styles.title}>Альбом #{album.id}</p>
                            </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    )

}

export default UserAlbumsPage;