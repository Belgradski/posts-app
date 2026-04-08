import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { postsApi } from '../../../entities/post/api/postApi';
import { commentsApi } from '../../../entities/comment/api/commentsApi';
import { albumsApi } from '../../../entities/album/api/albumsApi';
import { todosApi } from '../../../entities/todo/api/todosApi';
import { usersApi } from '../../../entities/user/api/usersApi';
import postReducer from '../../../entities/post/model/slice/postSlice';
import userReducer from '../../../entities/user/model/slice/userSlice';

export const store = configureStore({
  reducer: {
   
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,

    posts: postReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware)
      .concat(albumsApi.middleware)
      .concat(todosApi.middleware)
      .concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;