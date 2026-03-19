import React, {memo, useState, useCallback} from "react";
import { MOCK_COMMENTS } from "../../../entities/api/mocks";
import { type Comment } from "../../../entities/comment/types";
import styles from "./CommentList.module.css"
import Button from "../../../shared/ui/Button/Button";

interface CommentListProps {
    postId: number;
}

const CommentList: React.FC<CommentListProps> = memo(({ postId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments] = useState<Comment[]>(MOCK_COMMENTS[postId] || []);

    const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev)
    }, [])

    if (comments.length === 0) {
        return <p className={styles.commentsEmpty}>Нет комментариев</p>;
    }
    return (
        <div>
     <div className={styles.container}>
        <span className={styles.title}>Комментарии: ({comments.length})</span>
        <Button variant="secondary" className={styles.button} onClick={toggleExpand}>
            {isExpanded ? 'Свернуть' : 'Развернуть'}
        </Button>
        </div>   

        {isExpanded && (
            <div>
                {comments.map((commnent) => (
                    <div key={commnent.id} className={styles.commentBlock}>
                        <p>{commnent.text}</p>
                        <div className={styles.meta}>
                            <span>{commnent.author}</span>
                            <span>{commnent.date}</span>
                        </div>

                    </div>
                ))}
            </div>
        )}
     </div>
    )
})

export default CommentList;