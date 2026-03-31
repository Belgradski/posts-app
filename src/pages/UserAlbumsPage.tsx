import React from "react";
import { useParams, Link } from "react-router-dom";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetAlbumsByUserIdQuery } from "../entities/album/api/albumsApi";
import { useAppSelector } from "../app/providers/store";
import { selectUserById } from "../entities/user/model/slice/userSlice";

const UserAlbumsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: albums, isLoading, error } = useGetAlbumsByUserIdQuery(userId);

const user = useAppSelector(state => selectUserById( state, userId))

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка...</div>
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Что то пошло не так</div>
      </div>
    );

  return (
    <>
      <UserTabs userId={id ? parseInt(id) : undefined} />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Альбомы пользователя: {user?.name}
        </h1>
        <div className={styles.albumGrid}>
          {albums?.map((album) => (
            <Link
              key={album.id}
              to={`/albums/${album.id}/photos`}
              className={styles.albumCard}
            >
              <h3 className={styles.title}>{album.title}</h3>
              <p className={styles.title}>Альбом #{album.id}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserAlbumsPage;
