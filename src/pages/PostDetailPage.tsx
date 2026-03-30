import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { usePosts } from "../features/PostList/model/hooks/usePosts";
import CommentList from "../widgets/CommentList/ui/CommentList";
import MainLayout from "../shared/layouts/MainLayout";
import { type Post } from "../shared/types";
import styles from "./pages.module.css"

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const{fetchPostById, isLoading} = usePosts();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPost = async () => {
            if (!id) return;
            const postId = parseInt(id);
            const data = await fetchPostById(postId);
            if (data) {
                setPost(data)
            } else {
                setError('Пост не найден');
            }
        }
        loadPost();
        
    }, [id]);

    if (isLoading) return <div className={styles.loader}>Загрузка...</div>
    if (error) return <div className={styles.error}>Что то пошло не так:{error}</div>
    if (!post) return <div className={styles.error}>Пост не найден</div>

    return (
        <MainLayout>
        <div className={styles.container}>
            <Link to="/posts" className={styles.backLink}>Назад к постам</Link>
            <div className={styles.postDetail}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.author}>Автор: Пользователь:{post.userId}</p>
                <p className={styles.content}>{post.body}</p>
                <CommentList postId={post.id} />
            </div>
        </div>
        </MainLayout>
    )
}

export default PostDetailPage;