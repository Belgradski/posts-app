import { createSlice, createEntityAdapter,  } from '@reduxjs/toolkit';
import { type Post, type PostState } from '../types'; 
import type { RootState } from '../../../../app/providers/store';

// Нормализация постов
export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.id - b.id,
});



const initialState = postsAdapter.getInitialState<PostState>({
  selectedPostId: null,
  filterByUserId: null,
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: { 
    addPosts: postsAdapter.addMany,
    },
  },
);

// Готовые селекторы
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state: RootState) => state.posts);


export const {
  addPosts,
} = postSlice.actions;

export default postSlice.reducer;