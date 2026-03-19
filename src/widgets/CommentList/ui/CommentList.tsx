import React, { memo, useState, useCallback, useEffect } from "react";
import { type CommentApi } from "../../../shared/types";
import styles from "./CommentList.module.css";
import Button from "../../../shared/ui/Button/Button";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = memo(({ postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState<CommentApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isExpanded) return;
    setIsLoading(true);
    setError(null);
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        const data: CommentApi[] = await response.json();
        setComments(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Неизвестная ошибка"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [isExpanded, postId]);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);


  return (
    <div>
      <div className={styles.container}>
        <span className={styles.title}>Комментарии</span>
        <Button
          variant="secondary"
          className={styles.button}
          onClick={toggleExpand}
        >
          {isExpanded ? "Свернуть" : "Развернуть"}
        </Button>
      </div>
      {isLoading && <p>Загрузка коментариев...</p>}
      {error && <p>Ошибка загрузки:{error.message}</p>}
      {!isLoading && !error && isExpanded && (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentBlock}>
              <p>{comment.body}</p>
              <div className={styles.meta}>
                <span>Автор: {comment.name}</span>
                <span>Email: {comment.email}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default CommentList;
