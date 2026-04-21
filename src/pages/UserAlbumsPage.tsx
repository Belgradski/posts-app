import React from "react";
import { useParams, Link } from "react-router-dom";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetAlbumsByUserIdQuery } from "../entities/album/api/albumsApi";
import { useAppSelector } from "../app/providers/store";
import { selectUserById } from "../entities/user/model/slice/userSlice";
import type { Album } from "../entities/album/model/types";
import { ItemList } from "../shared/ui/ItemList/ItemList";


const AlbumSkeleton: React.FC = () => {
  return (
    <div className={styles.albumCardSkeleton}>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonTextShort}></div>
    </div>
  )
}


const UserAlbumsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: albums, isLoading, error } = useGetAlbumsByUserIdQuery(userId);

  const user = useAppSelector((state) => selectUserById(state, userId));

  const renderAlbumItem = (album: Album) => (
    <div className={styles.albumCard}>
      <Link key={album.id} to={`/albums/${album.id}/photos`}>
        <h3 className={styles.title}>{album.title}</h3>
        <p className={styles.title}>Альбом #{album.id}</p>
      </Link>
    </div>
  );

  if (isLoading)
    return  <>
  <UserTabs userId={userId} />
  <div className={styles.container}>
    <div className={styles.skeletonTitle}></div>
    <div className={styles.albumGrid}>
      {[...Array(10).map((_, index) => (
        <AlbumSkeleton key={index} />
      ))]
        
      }
    </div>
  </div>
</>;

  if (error || !albums)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Что то пошло не так</div>
      </div>
    );

  return (
    <>
      <UserTabs userId={userId} />
      <div className={styles.container}>
        <h1 className={styles.title}>Альбомы пользователя: {user?.name}</h1>
        <div className={styles.albumGrid}>
          {
            <ItemList<Album>
              items={albums}
              renderItem={renderAlbumItem}
              keyExtractor={(album) => album.id}
            />
          }
        </div>
      </div>
    </>
  );
};

export default UserAlbumsPage;
