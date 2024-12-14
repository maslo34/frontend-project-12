import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('/');

export const messageApi = createApi({
  reducerPath: 'messageApi',
  endpoints: (builder) => ({
    getMessageApi: builder.query({
      queryFn: async (arg, api) => {
        const state = api.getState();
        const token = state.auth.token;
        console.log(api.getState());
        try {
          const request = await axios.get('/api/v1/messages', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { data: request.data };
        } catch (error) {
          return { error };
        }
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on('connect', () => {
            console.log('connected to server');
          });
          socket.on('newMessage', (payload) => {
            updateCachedData((draft) => {
                draft.push(payload)
            })
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
