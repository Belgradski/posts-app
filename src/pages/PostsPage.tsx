import React, { useState, useMemo, useEffect, useCallback} from "react";
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
import { useInfiniteScroll } from "../shared/lib/hooks/useInfinityScroll";

const POSTS_PER_PAGE = 5;

const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>(PostLengthFilterType.ALL);
  const [displayCount, setDisplayCount] = useState<number>(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

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




    // Отображаемые посты (с пагинацией)
    const displayedPosts = useMemo((): Post[] => {
      return filteredPosts.slice(0, displayCount);
    }, [filteredPosts, displayCount]);
  
    // Проверка, есть ли ещё посты для загрузки
    const hasMore = useMemo((): boolean => {
      return displayCount < filteredPosts.length;
    }, [displayCount, filteredPosts.length]);
  
    // Загрузка следующей порции постов
    const loadMorePosts = useCallback((): void => {
      if (isLoadingMore || !hasMore) return;
  
      setIsLoadingMore(true);
      
      // Имитация задержки для плавности (опционально)
      setTimeout(() => {
        setDisplayCount((prev) => Math.min(prev + POSTS_PER_PAGE, filteredPosts.length));
        setIsLoadingMore(false);
      }, 300);
    }, [isLoadingMore, hasMore, filteredPosts.length]);
  
    // Хук для бесконечной прокрутки
    const { lastElementRef } = useInfiniteScroll({
      isLoading: isLoadingMore,
      hasMore,
      onLoadMore: loadMorePosts,
      threshold: 200,
    });





  const renderPostItem = useCallback((post: Post, index: number): React.ReactElement => {
    const isLastElement = index === displayedPosts.length - 1;
    return (
    
    <div 
    key={post.id}
    ref={isLastElement ? lastElementRef : null}
    >
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
    </div>
  ) },[displayedPosts.length, lastElementRef]);


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
                    items={displayedPosts}
                    renderItem={renderPostItem}
                    keyExtractor={(post) => post.id}
                    />}
        </div>
        
        
        {isLoadingMore && (
          <div className={styles.loadingMore}>
            <div className={styles.spinnerSmall}></div>
            <p>Загрузка ещё постов...</p>
          </div>
        )}
        
       
        {!hasMore && filteredPosts.length > 0 && (
          <div className={styles.endOfList}>
            <p>✨ Вы просмотрели все {filteredPosts.length} постов ✨</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostsPage;
