import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseRoute } from "../api";
import { Column } from "../types/Column";
import { Subtask, SubtaskRequest } from "../types/Subtask";
import { Task } from "../types/Task";

export const columnApiSlice = createApi({
  reducerPath: "columnApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseRoute,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Column", "Task"],
  endpoints: (builder) => ({
    getColumns: builder.query<Column[], number>({
      query: (boardId) => ({
        url: `api/column/board/${boardId}`,
      }),
      providesTags: ["Column"],
    }),
    createColumn: builder.mutation<Column, number>({
      query: (boardId) => ({
        url: "api/column/",
        method: "POST",
        body: { board: boardId },
      }),
      invalidatesTags: ["Column"],
    }),
    updateColumn: builder.mutation<
      Column,
      { id: number; body: Partial<Column> }
    >({
      query: ({ id, body }) => ({
        url: `api/column/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Column"],
    }),
    deleteColumn: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/column/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Column"],
    }),
    getTask: builder.query<Task, number>({
      query: (id) => ({
        url: `api/tasks/${id}`,
      }),
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "api/tasks/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Column"],
    }),
    updateTask: builder.mutation<Task, { id: number; body: Partial<Task> }>({
      query: ({ id, body }) => ({
        url: `api/tasks/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Column", "Task"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => ({
        url: `api/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Column"],
    }),
    createSubtask: builder.mutation<Subtask, SubtaskRequest>({
      query: (body) => ({
        url: "api/subtasks/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    updateSubtask: builder.mutation<
      Subtask,
      { id: number; body: Partial<Subtask> }
    >({
      query: ({ id, body }) => ({
        url: `api/subtasks/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Task", "Column"],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateColumnMutation,
  useCreateSubtaskMutation,
  useGetTaskQuery,
  useUpdateSubtaskMutation,
  useDeleteTaskMutation,
  useDeleteColumnMutation,
} = columnApiSlice;
