export interface PostApi {
    userId: number;
    id: number;
    title: string;
    body: string;

}

export interface CommentApi {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Post extends PostApi {
    
}