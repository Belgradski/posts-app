import React, { useState, useEffect } from 'react';
import { useGetPostsQuery } from '../../entities/post/api/postApi';
import { useAppDispatch, useAppSelector } from '../../app/providers/store';
import {
  selectFilteredPosts,
  selectFilterByUserId,
  setFilterByUserId,
  addPosts,
} from '../../entities/post/model/slice/postSlice';
import PostCard from '../../entities/post/ui/PostCard';
import CommentList from '../CommentList/ui/CommentList';
import PostLengthFilter from '../../features/PostLengthFilter/ui/PostLengthFilter';
import { type FilterType, filterByLength } from '../../features/PostLengthFilter/lib/filterBylength';

const PostList = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<FilterType>('all');

  // RTK Query хук с автоматическим кэшированием
  const { data: posts, isLoading, error } = useGetPostsQuery();

  // Получаем посты из слайса (уже отфильтрованные по userId)
  const filteredByUserPosts = useAppSelector(selectFilteredPosts);
  const filterByUserId = useAppSelector(selectFilterByUserId);

  // Синхронизация данных из API со слайсом
  useEffect(() => {
    if (posts) dispatch(addPosts(posts));
  }, [posts, dispatch]);

  // Применяем фильтр по длине заголовка
  const filteredPosts = React.useMemo(() => filterByLength(filteredByUserPosts, filter), [filteredByUserPosts, filter]);

  // Обработчики
  const handleFilterChange = (newFilter: FilterType) => setFilter(newFilter);
  const handleUserFilter = (userId: number | null) => dispatch(setFilterByUserId(userId));

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка</div>;

  return (
    <div>
      <select value={filterByUserId || ''} onChange={(e) => handleUserFilter(e.target.value ? Number(e.target.value) : null)}>
        <option value="">Все пользователи</option>
        {[...new Set(posts?.map(p => p.userId) || [])].map(userId => (
          <option key={userId} value={userId}>Пользователь {userId}</option>
        ))}
      </select>
      <PostLengthFilter currentFilter={filter} onFilterChange={handleFilterChange} />
      {filteredPosts.map(post => (
        <PostCard key={post.id} title={post.title} content={post.body} />

      ))}
    </div>
  );
};

export default PostList;