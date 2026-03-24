import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../features/PostList/model/hooks/usePosts";
import PostCard from "../entities/post/ui/PostCard";
import UserTabs from "../widgets/UserTabs/UserTabs";
import MainLayout from "../shared/layouts/MainLayout";
import styles from "./pages.module.css";

const UserPostPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const {posts, isLoading, error, fetchPostsByUser} = usePosts();

    useEffect(() => {
        if (id) {
            fetchPostsByUser(parseInt(id));
        }
    }, [id]);

    if (isLoading) return <div className={styles.loader}>Загрузка</div>;
    if (error) return <div className={styles.error}>Что то пошло не так:{error}</div>

    return (
        <MainLayout>
            <UserTabs userId={id ? parseInt(id) : undefined} />
            <div className={styles.container}>
                <h1 className={styles.title}>Посты пользователя {id}</h1>
                {posts.map((post) => (
                    <PostCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.body}
                    />
                ))}
            </div>
        </MainLayout>
    )

}

export default UserPostPage;