import PostsPage from '../../../pages/PostsPage';
import PostDetailPage from '../../../pages/PostDetailPage';
import UserAlbumsPage from '../../../pages/UserAlbumsPage';
import AlbumPhotosPage from '../../../pages/AlbumPhotosPage';
import UserTodosPage from '../../../pages/UserTodosPage';
import UserPostsPage from '../../../pages/UserPostPage';
import NotFoundPage from '../../../pages/NotFoundPage'
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../../../shared/layouts/MainLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <PostsPage/>
                },
                {
                    path: '/posts',
                    element: <PostsPage />
                },
                {
                    path: '/posts/:id',
                    element: <PostDetailPage />
                },
                {
                    path: '/users/:id/albums',
                    element: <UserAlbumsPage />
                },
                {
                    path: '/albums/:id/photos',
                    element: <AlbumPhotosPage />
                },
                {
                    path: '/users/:id/todos',
                    element: <UserTodosPage />
                },
                {
                    path: '/users/:id/posts',
                    element: <UserPostsPage />
                },
                {
                    path: '/*',
                    element: <NotFoundPage />
                },
            ]
    },
   
])