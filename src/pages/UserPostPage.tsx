import React from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../entities/post/ui/PostCard";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetPostsByUserIdQuery } from "../entities/post/api/postApi";
import { useAppSelector } from "../app/providers/store";
import {  selectUserById } from "../entities/user/model/slice/userSlice";
import CommentList from "../widgets/CommentList/ui/CommentList";

const UserPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: posts, isLoading, error } = useGetPostsByUserIdQuery(userId);

    const user = useAppSelector(state => selectUserById(state, userId));

    
  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка</div>
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
        <h1 className={styles.title}>Посты {user?.name}</h1>
        <div className={styles.postList}>
          {posts?.map((post) => (
            <>
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.body}
              />
            </Link>
            <CommentList postId={post.id}/>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPostPage;
