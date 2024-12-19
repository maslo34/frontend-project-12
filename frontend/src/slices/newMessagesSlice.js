import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import axios from 'axios';

import { getToken } from '../utils';

const socket = io('/');

export const messageApi = createApi({
  reducerPath: 'messageApi',
  endpoints: (builder) => ({
    getMessageApi: builder.query({
      queryFn: async (arg, api) => {
        const state = api.getState();
        const token = getToken(state.auth.token);
        console.log(token);
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
