import React from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../entities/post/ui/PostCard";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetPostsByUserIdQuery } from "../entities/post/api/postApi";
import { useAppSelector } from "../app/providers/store";
import {  selectUserById } from "../entities/user/model/slice/userSlice";
import CommentList from "../widgets/CommentList/ui/CommentList";
import type { Post } from "../shared/types";
import { ItemList } from "../shared/ui/ItemList/ItemList";

const UserPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: posts, isLoading, error } = useGetPostsByUserIdQuery(userId);

    const user = useAppSelector(state => selectUserById(state, userId));

    const renderPostItem = (post: Post) => (
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
    )

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка</div>
      </div>
    );
  if (error || !posts)
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
          {<ItemList<Post> 
          items={posts}
          renderItem={renderPostItem}
          keyExtractor={(post) => post.id}
          />}
        </div>
      </div>
    </>
  );
};

export default UserPostPage;
