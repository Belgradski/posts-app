import React from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { MOCK_POSTS } from "../../entities/api/mocks";
import styles from './PostList.module.css'


const PostList: React.FC = () => {
    return (
        <div className={styles.container}>
            {MOCK_POSTS.map((post) => (
              <React.Fragment key={post.id}>
                <PostCard 
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                date={post.date}
                />
                </React.Fragment>
            ))}
        </div>
    );
}

export default PostList;