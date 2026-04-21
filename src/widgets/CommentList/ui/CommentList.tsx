import React, { memo, useState, useCallback } from "react";
import styles from "./CommentList.module.css";
import Button from "../../../shared/ui/Button/Button";
import { useGetCommentsByPostIdQuery } from "../../../entities/comment/api/commentsApi";
import type { Comment } from "../../../entities/comment/model/types";
import { ItemList } from "../../../shared/ui/ItemList/ItemList";

interface CommentListProps {
  postId: number;
  isLoading?: boolean;
}

const CommentList: React.FC<CommentListProps> = memo(({ postId, isLoading: externalLoading = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {data: comments, isLoading: internalLoading, error, isError} = useGetCommentsByPostIdQuery(postId, {
    skip: !isExpanded,
  });

  const isLoading = externalLoading || (isExpanded && internalLoading);

  const showError = !isLoading && isExpanded && (isError || error);

  const toggleExpand = useCallback(() => {
    if (!externalLoading) { // Не даем развернуть во время загрузки постов
      setIsExpanded((prev) => !prev);
    }
  }, [externalLoading]);

  const renderSkeletonComment = useCallback((index: number) => (
    <div key={index} className={styles.commentBlock}>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonLine}/>
        <div className={styles.skeletonLine} style={{width: '80%'}}/>
        <div className={styles.skeletonLine} style={{width: '60%'}}/>
      </div>
      <div className={styles.skeletonMeta}>
        <div className={styles.skeletonAuthor}/>
        <div className={styles.skeletonEmail}/>
      </div>
    </div>

  ),[])

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
      <div>
      <div className={styles.container}>
        <div className={styles.skeletonTitle}/>
        <Button 
        variant="secondary"
        className={styles.button}
        disabled={true}
        >Загрузка...</Button>
      </div>
      <div>
        {[1,2].map((_, index) => renderSkeletonComment(index))}
      </div>
      </div>
    );
  if (showError)
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
            disabled={externalLoading} // Блокируем кнопку во время загрузки постов
          >
            {isExpanded ? "Свернуть" : "Развернуть"}
          </Button>
        </div>
        {isExpanded && !isLoading && comments && comments.length > 0 && (
          <ItemList<Comment> 
            items={comments}
            renderItem={renderCommentItem}
            keyExtractor={(comment) => comment.id}
          />
        )}
        {isExpanded && !isLoading && comments && comments.length === 0 && (
          <div className={styles.noComments}>Нет комментариев</div>
        )}
      </div>
    );
  });

CommentList.displayName = 'CommentList';

export default CommentList;
