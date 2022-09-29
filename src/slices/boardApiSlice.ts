import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseRoute } from "../api";
import { Board } from "../types/Board";

export const boardApiSlice = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseRoute,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Board"],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => ({
        url: "api/board/",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      providesTags: ["Board"],
    }),
    getBoard: builder.query<Board, number>({
      query: (boardId) => ({
        url: `api/board/${boardId}`,
      }),
    }),
    createBoard: builder.mutation<Board, void>({
      query: () => ({
        url: "api/board/",
        method: "POST",
      }),
      invalidatesTags: ["Board"],
    }),
    deleteBoard: builder.mutation<void, number>({
      query: (boardId) => ({
        url: `api/board/${boardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Board"],
    }),
    updateBoard: builder.mutation<Board, { id: number; body: Partial<Board> }>({
      query: ({ id, body }) => ({
        url: `api/board/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Board"],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useLazyGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardApiSlice;
