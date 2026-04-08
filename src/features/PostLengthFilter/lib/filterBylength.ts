import { type PostApi } from "../../../shared/types"; 

export enum PostLengthFilterType {
    ALL = 'all',
    SHORT = 'short',
    MEDIUM = 'medium',
    LONG = 'long'
}

export type FilterType = PostLengthFilterType;

export const filterByLength = (posts: PostApi[], filterType: FilterType) => {
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
        case PostLengthFilterType.SHORT:
            return 'Короткие(<30 символов)';
        case PostLengthFilterType.MEDIUM:
            return 'Средние(30-60 символов)';
        case PostLengthFilterType.LONG:
            return 'Длинные(>60 символов)';
        case PostLengthFilterType.ALL:
            default:
            return 'Все посты';
    }
}

export const ALL_FILTERS = Object.values(PostLengthFilterType);