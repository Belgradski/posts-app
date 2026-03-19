import { type Post } from "../../../entities/post/types";

export type FilterType = 'all' | 'short' | 'medium' | 'long';

export const filterByLength = (posts: Post[], filterType: FilterType) => {
    switch (filterType) {
        case 'short':
            return posts.filter(post => post.title.length < 30);
        case 'medium':
            return posts.filter(post => post.title.length >= 30 && post.title.length < 60);
        case 'long':
            return posts.filter(post => post.title.length >= 60);
        case 'all':
            default:
                return posts;
    }
}

export const getFilterLabel = (filterType: FilterType): string => {
    switch (filterType) {
        case ('short'):
            return 'Короткие(<30 символов)';
        case ('medium'):
            return 'Средние(30-60 символов)';
        case ('long'):
            return 'Длинные(>60 символов)';
        case ('all'):
            default:
            return 'Все посты';
    }
}