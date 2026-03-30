import React from "react";
import styles from './PostCard.module.css'

interface PostCardProps {
    id: number;
    title: string;
    content: string;

}

const PostCard: React.FC<PostCardProps> = ({ title, content}) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
        </div>
    )
}

export default PostCard;