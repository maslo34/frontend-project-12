/*eslint no-param-reassign: ["error", { "props": false }]*/
import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import instanceAxios from '../fetchApi.js';

export const chanelApi = createApi({
  reducerPath: 'chanelApi',
  endpoints: (builder) => ({
    getChanelsApi: builder.query({
      queryFn: async () => {
        const fetchChannels = instanceAxios('channels');
        try {
          const request = await fetchChannels.get();
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
          socket.on('newChannel', (payload) => {
            updateCachedData((draft) => {
              console.log(draft, payload);
              draft.push(payload);
            });
          });
          socket.on('removeChannel', (payload) => updateCachedData((draft) => {
              return draft.filter((element) => element.id !== payload.id);
            })
          );
          socket.on('renameChannel', (payload) => updateCachedData((draft) => {
              return draft.forEach((el) => {
                if (el.id === payload.id) { el.name = payload.name }
              });
            })
          );
        } catch {
          await cacheEntryRemoved;
          socket.close();
        }
      },
    }),
  }),
});

export const { useGetChanelsApiQuery, useRemoveChanelsApiMutation } = chanelApi;
