import { createApi } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('/');

export const chanelApi = createApi({
  reducerPath: 'chanelApi',
  endpoints: (builder) => ({
    removeChanelsApi: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
    getChanelsApi: builder.query({
      queryFn: async (arg, api) => {
        const state = api.getState();
        const authorizationTokenLocalStorage = JSON.parse(
          window.localStorage.getItem('auth')
        );
        const token = state.auth.token || authorizationTokenLocalStorage.token;
        try {
          const request = await axios.get('/api/v1/channels', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return { data: request.data };
        } catch (error) {
          console.log(error)
          return { error };
        }
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          socket.on('newChannel', (payload) => {
            updateCachedData((draft) => {
              console.log(draft, payload);
              draft.push(payload);
            });
          });
          socket.on('removeChannel', (payload) => {
            console.log(payload);
            updateCachedData((draft) => {
              return draft.filter((element) => element.id !== payload.id);
            });
          });
          socket.on('renameChannel', (payload) => {
            console.log(payload); 
            updateCachedData((draft) => {
              return draft.forEach((el) => {
                if (el.id === payload.id) {
                  return el.name = payload.name
                }
              })
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

export const { useGetChanelsApiQuery, useRemoveChanelsApiMutation } = chanelApi;
