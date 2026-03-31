import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const albumsApi = createApi({
  reducerPath: 'albumsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Album', 'Photo'],
  endpoints: (builder) => ({
    getAlbumsByUserId: builder.query<Album[], number>({
      query: (userId) => `users/${userId}/albums`,
      providesTags: (result, error, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'Album', id: `USER_${userId}` },
            ]
          : [{ type: 'Album', id: `USER_${userId}` }],
    }),
    getPhotosByAlbumId: builder.query<Photo[], number>({
      query: (albumId) => `albums/${albumId}/photos`,
      providesTags: (result, error, albumId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Photo' as const, id })),
              { type: 'Photo', id: `ALBUM_${albumId}` },
            ]
          : [{ type: 'Photo', id: `ALBUM_${albumId}` }],
    }),
    getAlbums: builder.query<Album[], void>({
      query: () => 'albums',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'Album', id: 'LIST' },
            ]
          : [{ type: 'Album', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAlbumsByUserIdQuery,
  useGetPhotosByAlbumIdQuery,
  useGetAlbumsQuery,
} = albumsApi;