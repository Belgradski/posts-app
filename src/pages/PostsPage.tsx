import React, {useState, useMemo} from "react";
import { usePosts } from "../features/PostList/model/hooks/usePosts"
import PostCard from "../entities/post/ui/PostCard";
import PostLengthFilter from "../features/PostLengthFilter/ui/PostLengthFilter";
import { type FilterType, filterByLength } from "../features/PostLengthFilter/lib/filterBylength";
import UserTabs from "../widgets/UserTabs/UserTabs";
import MainLayout from "../shared/layouts/MainLayout";
import styles from "../widgets/PostList/PostList.module.css"

const PostsPage: React.FC = () => {
    const {posts, isLoading, error} = usePosts();
    const [filter, setFilter] = useState<FilterType>('all')

    const filteredPosts = useMemo(() => {
        return filterByLength(posts, filter);
    }, [posts, filter])

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error}</div>

    return (
        <MainLayout>
            <UserTabs/>
            <div className={styles.container}>
                <h1>Все посты</h1>
                <PostLengthFilter currentFilter={filter} onFilterChange={setFilter}/>
                {filteredPosts.map(post => (
                    <PostCard 
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.body}
                    />
                ))}
            </div>
        </MainLayout>
    )

}

export default PostsPage;