import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `comments?postId=${postId}`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Comment' as const, id })),
              { type: 'Comment', id: `POST_${postId}` },
            ]
          : [{ type: 'Comment', id: `POST_${postId}` }],
    }),
  }),
});

export const { useGetCommentsByPostIdQuery } = commentsApi;