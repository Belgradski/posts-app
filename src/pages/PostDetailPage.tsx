import React from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../widgets/CommentList/ui/CommentList";
import styles from "./pages.module.css";
import { useGetPostByIdQuery } from "../entities/post/api/postApi";

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id) : 0;
  const {
    data: post,
    isLoading,
    error,
  } = useGetPostByIdQuery(postId, {
    skip: !id,
  });

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

  if (!post)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Пост не найден</div>
      </div>
    );

  return (
    <>
      <div className={styles.container}>
        <Link to="/posts" className={styles.backLink}>
          Назад к постам
        </Link>
        <div className={styles.postDetail}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.author}>Автор: Пользователь:{post.userId}</p>
          <p className={styles.content}>{post.body}</p>
          <CommentList postId={post.id} />
        </div>
      </div>
    </>
  );
};

export default PostDetailPage;
