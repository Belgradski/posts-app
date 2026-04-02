import React, { useState, useMemo, useEffect} from "react";
import PostCard from "../entities/post/ui/PostCard";
import PostLengthFilter from "../features/PostLengthFilter/ui/PostLengthFilter";
import {
  type FilterType,
  PostLengthFilterType,
  filterByLength,
} from "../features/PostLengthFilter/lib/filterBylength";
import UserTabs from "../widgets/UserTabs/UserTabs";

import styles from "./pages.module.css";
import { useAppDispatch, useAppSelector } from "../app/providers/store";
import { useGetPostsQuery } from "../entities/post/api/postApi";
import {
  addPosts,
  selectAllPosts,
} from "../entities/post/model/slice/postSlice";
import { Link } from "react-router-dom";
import CommentList from "../widgets/CommentList/ui/CommentList";
import { ItemList } from "../shared/ui/ItemList/ItemList";
import type { Post } from "../shared/types";


const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>(PostLengthFilterType.ALL);

  const { data: postsFromApi, isLoading, error } = useGetPostsQuery();

  const filteredByUserPosts = useAppSelector(selectAllPosts);

  useEffect(() => {
    if (postsFromApi) {
      dispatch(addPosts(postsFromApi));
    }
  }, [postsFromApi, dispatch]);

  const filteredPosts = useMemo(() => {
    return filterByLength(filteredByUserPosts, filter);
  }, [filteredByUserPosts, filter]);


  const renderPostItem = (post: Post): React.ReactElement => (
    <>
      <Link
        to={`/posts/${post.id}`}
      >
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.body}
        />
      </Link>
      <CommentList postId={post.id} />
    </>
  )


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
      <UserTabs />
      <div className={styles.container}>
        <h1 className={styles.title}>Все посты</h1>
        <PostLengthFilter currentFilter={filter} onFilterChange={setFilter} />
        <div className={styles.postList}>
          {<ItemList<Post>
            items={filteredPosts}
            renderItem={renderPostItem}
            keyExtractor={(post) => post.id}
            emptyMessage="Посты не найдены"
          />}
        </div>
      </div>
    </>
  );
};

export default PostsPage;
