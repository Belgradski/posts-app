import React, { useState, useMemo, useCallback, useEffect } from "react";
import PostCard from "../../entities/post/ui/PostCard";
import styles from "./PostList.module.css";
import {
  filterByLength,
  type FilterType,
} from "../../features/PostLengthFilter/lib/filterBylength";
import PostLengthFilter from "../../features/PostLengthFilter/ui/PostLengthFilter";
import { withLoading } from "../../shared/layouts/lib/hoc/withLoading";
import CommentList from "../CommentList/ui/CommentList";
import { type PostApi } from "../../shared/types";

const PostList: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<PostApi[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`ошибка ${response.status}`);
        }
        const data: PostApi[] = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Неизвестная ошибка"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, filter);
  }, [posts, filter]);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  if (isLoading) {
    return <div>Загрузка постов...</div>;
  }

  if (error) {
    return <div>Ошибка:{error.message}</div>;
  }
  return (
    <div className={styles.container}>
      <PostLengthFilter
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      {filteredPosts.length === 0 ? (
        <p className={styles.listEmpty}>Посты не найдены</p>
      ) : (
        filteredPosts.map((post) => (
          <React.Fragment key={post.id}>
            <div style={{ border: "1px solid grey", borderRadius: "10px" }}>
              <PostCard id={post.id} title={post.title} content={post.body} />

              <CommentList postId={post.id} />
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default withLoading(PostList);
