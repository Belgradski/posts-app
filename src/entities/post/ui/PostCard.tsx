import React from "react";
import styles from './PostCard.module.css'

interface PostCardProps {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, author, date}) => {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
            <div className={styles.meta}>
                <span>{author}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}

export default PostCard;