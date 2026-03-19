import React, {useState, useMemo, useCallback} from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { MOCK_POSTS } from "../../entities/api/mocks";
import styles from './PostList.module.css'
import { filterByLength, type FilterType } from "../../features/PostLengthFilter/lib/filterBylength";
import type { Post } from "../../entities/post/types";
import PostLengthFilter from "../../features/PostLengthFilter/ui/PostLengthFilter";
import  {withLoading}  from "../../shared/layouts/lib/hoc/withLoading";
import CommentList from "../CommentList/ui/CommentList";



const PostList: React.FC = () => {
    const [filter, setFilter] = useState<FilterType>('all');
    const [posts] = useState<Post[]>(MOCK_POSTS);

    const filteredPosts = useMemo(() => {
        return filterByLength(posts, filter)
    }, [posts, filter]);

    const handleFilterChange = useCallback((newFilter: FilterType) => {
        setFilter(newFilter);
    },[]);
    return (
        <div className={styles.container}>
            <PostLengthFilter currentFilter={filter} onFilterChange={handleFilterChange}/>
            
            {filteredPosts.length === 0 ? (<p className={styles.listEmpty}>Посты не найдены</p>) :
            (filteredPosts.map((post) => (
              <React.Fragment key={post.id}>
                <div><PostCard 
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                date={post.date}
                /></div>
                <div>
                    <CommentList postId={post.id}/>
                </div>
                </React.Fragment>
            )))}
        </div>
    );
}

export default withLoading(PostList);