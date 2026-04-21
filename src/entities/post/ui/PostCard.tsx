import React from "react";
import styles from './PostCard.module.css'

interface PostCardProps {
    id: number;
    title: string;
    content: string;
    isLoading?: boolean;

}

const PostCard: React.FC<PostCardProps> = ({ title, content, isLoading = false}) => {

    if (isLoading) return (
        <div className={styles.container}>
            <h2 className={styles.skeletonTitle}></h2>
            <p className={styles.skeletonText}></p>
        </div>
    )

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
        </div>
    )
}

export default PostCard;