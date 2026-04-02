export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  selectedPostId: number | null;
  filterByUserId: number | null;
}