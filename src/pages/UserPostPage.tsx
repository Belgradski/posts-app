import React, { useCallback, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../entities/post/ui/PostCard";
import UserTabs from "../widgets/UserTabs/UserTabs";
import styles from "./pages.module.css";
import { useGetPostsByUserIdQuery } from "../entities/post/api/postApi";
import { useAppSelector } from "../app/providers/store";
import { selectUserById } from "../entities/user/model/slice/userSlice";
import CommentList from "../widgets/CommentList/ui/CommentList";
import type { Post } from "../entities/post/model/types";
import { ItemList } from "../shared/ui/ItemList/ItemList";
import { useInfiniteScroll } from "../shared/lib/hooks/useInfinityScroll";

const POSTS_PER_PAGE = 5;
const UserPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;

  const [displayCount, setDisplayCount] = useState<number>(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const {
    data: allPosts,
    isLoading,
    error,
  } = useGetPostsByUserIdQuery(userId, {
    skip: !userId || userId === 0,
  });

  const user = useAppSelector((state) => selectUserById(state, userId));

  //отображаемые посты (с пагинацией)
  const displayedPosts = useMemo((): Post[] => {
    if (!allPosts) return [];
    return allPosts.slice(0, displayCount);
  }, [displayCount, allPosts]);

  //проверка, если посты для загрузки
  const hasMore = allPosts ? displayCount < allPosts.length : false;

  //Загрузка следующей порции постов
  const loadMorePosts = useCallback((): void => {
    if (isLoadingMore || !hasMore || !allPosts) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayCount((prev) =>
        Math.min(prev + POSTS_PER_PAGE, allPosts.length)
      );
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, hasMore, allPosts]);

  const { lastElementRef } = useInfiniteScroll({
    isLoading: isLoadingMore,
    hasMore,
    onLoadMore: loadMorePosts,
    threshold: 100,
  });

  const renderPostItem = useCallback(
    (post: Post, index: number): React.ReactElement => {
      const isLastElement = index === displayedPosts.length - 1;
      return (
      <div key={post.id} ref={isLastElement ? lastElementRef : undefined}>
        <Link key={post.id} to={`/posts/${post.id}`}>
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.body}
          />
        </Link>
        <CommentList postId={post.id} />
      </div>
      )
    },
    [displayedPosts.length, lastElementRef]
  );

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка</div>
      </div>
    );
  if (error || !allPosts)
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
          {
            <ItemList<Post>
              items={displayedPosts}
              renderItem={renderPostItem}
              keyExtractor={(post) => post.id}
            />
          }
        </div>
        {isLoadingMore && (
          <div className={styles.loadingMore}>
            <div className={styles.spinnerSmall}></div>
            <p>Загрузка ещё постов...</p>
          </div>
        )}
        
       
        {!hasMore && allPosts.length > 0 && (
          <div className={styles.endOfList}>
            <p>✨ Вы просмотрели все {allPosts.length} постов ✨</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPostPage;
