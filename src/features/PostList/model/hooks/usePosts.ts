import { useState, useEffect } from 'react';
import  { type PostApi } from '../../../../shared/types';

interface UsePostsReturn {
    posts: PostApi[];
    isLoading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostsByUser: (userId: number) => Promise<void>;
    fetchPostById: (id: number) => Promise<PostApi | null>
}

export const usePosts = (): UsePostsReturn => {
    const [posts, setPosts] = useState<PostApi[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            setPosts(data)
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка")
        }
        finally {
            setIsLoading(false)
        }
    };

    const fetchPostsByUser = async (userId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }
            const data = await response.json();
            setPosts(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвесная ошибка')
        }
        finally {
            setIsLoading(false)
        }
    }

    const fetchPostById = async (id: number) => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`)
            }
            const data = await response.json();
            return data;
        }
        catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка")
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return {
        posts, isLoading, error, fetchPosts, fetchPostById, fetchPostsByUser
    }
}