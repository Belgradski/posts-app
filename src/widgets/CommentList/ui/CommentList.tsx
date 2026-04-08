import React, { memo, useState, useCallback } from "react";
import styles from "./CommentList.module.css";
import Button from "../../../shared/ui/Button/Button";
import { useGetCommentsByPostIdQuery } from "../../../entities/comment/api/commentsApi";
import type { Comment } from "../../../entities/comment/model/types";
import { ItemList } from "../../../shared/ui/ItemList/ItemList";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = memo(({ postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {data: comments, isLoading, error} = useGetCommentsByPostIdQuery(postId)

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const renderCommentItem = (comment: Comment) => (
    <div key={comment.id} className={styles.commentBlock}>
              <p>{comment.body}</p>
              <div className={styles.meta}>
                <span>Автор: {comment.name}</span>
                <span>Email: {comment.email}</span>
              </div>
            </div>
  )

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Загрузка</div>
      </div>
    );
  if (error || !comments)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Что то пошло не так</div>
      </div>
    );
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
      {!isLoading && !error && isExpanded && (
        <div>
          {<ItemList<Comment> 
          items={comments}
          renderItem={renderCommentItem}
          keyExtractor={(comment) => comment.id}
          />}
        </div>
      )}
    </div>
  );
});

CommentList.displayName = 'CommentList';

export default CommentList;
