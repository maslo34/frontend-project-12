import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import instanceAxios from '../fetchApi.js';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  endpoints: (builder) => ({
    getMessageApi: builder.query({
      queryFn: async () => {
        const fetchMessage = instanceAxios('messages');
        try {
          const request = await fetchMessage.get();
          return { data: request.data };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const socket = io('/');
        try {
          await cacheDataLoaded;
          socket.on('newMessage', (payload) => {
            updateCachedData((draft) => {
              draft.push(payload);
            });
          });
        } catch {
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),
  }),
});

export const { useGetMessageApiQuery } = messageApi;
