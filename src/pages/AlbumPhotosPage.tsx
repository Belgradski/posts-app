import React, {useState, useEffect} from "react";
import { useParams,  useNavigate} from "react-router-dom";
import MainLayout from "../shared/layouts/MainLayout";
import styles from "./pages.module.css";

interface Photo {
    id: number;
    title: string;
    url: string;
    thumbnaiURL: string;
}

const AlbumPhotosPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true);
            setError(null);
            try {
               const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
               if (!response.ok) throw new Error("Ошибка загрузки");
               const data = await response.json();
               setPhotos(data);
            }
            catch(err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchPhotos();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);
    }

    if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
    if (error) return <div className={styles.error}>Что то пошло не так:{error}</div>;

    return (
        <MainLayout>
            <div className={styles.container}>
                <button onClick={handleGoBack} className={styles.backLink}>назад к альбомам</button>
                <h1 className={styles.title}>Фотографии альбома #{id}</h1>
                <div className={styles.photoGrid}>
                    {photos.map((photo) => (
                        <div key={photo.id} className={styles.photoCard}>
                            <img src={photo.thumbnaiURL} alt={photo.title} className={styles.title}/>
                            <p className={styles.title}>{photo.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default AlbumPhotosPage;