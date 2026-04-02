import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./pages.module.css";
import { useGetPhotosByAlbumIdQuery } from "../entities/album/api/albumsApi";
import type { Photo } from "../entities/album/model/types";
import { ItemList } from "../shared/ui/ItemList/ItemList";

const AlbumPhotosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: photos,
    isLoading,
    error,
  } = useGetPhotosByAlbumIdQuery(Number(id), {
    skip: !id,
  });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderPhotoItem = (photo: Photo) => (
    <div key={photo.id} className={styles.photoCard}>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className={styles.title}
                loading="lazy"
              />
              <p className={styles.title}>{photo.title}</p>
            </div>
  )


  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка...</div>
      </div>
    );
  if (error || !photos)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Что то пошло не так</div>
      </div>
    );

  return (
    <>
      <div className={styles.container}>
        <button onClick={handleGoBack} className={styles.backLink}>
          назад к альбомам
        </button>
        <h1 className={styles.title}>Фотографии альбома #{id}</h1>
        <div className={styles.photoGrid}>
          {<ItemList<Photo>
          items={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(photo) => photo.id}
          emptyMessage="Фотографии не найдены"
          />}
        </div>
      </div>
    </>
  );
};

export default AlbumPhotosPage;
