import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseRoute } from "../api";
import { User } from "../types/User";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseRoute,
  }),
  endpoints: (builder) => ({
    isAuthenticated: builder.query<User, void>({
      query: () => ({
        url: "api/auth/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: "api/auth/login",
        method: "POST",
        body,
      }),
    }),
    signUp: builder.mutation<void, UserRequest>({
      query: (body) => ({
        url: "api/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useIsAuthenticatedQuery,
  useLazyIsAuthenticatedQuery,
  useLoginMutation,
  useSignUpMutation,
} = authApiSlice;

type AuthResponse = {
  refresh: string;
  access: string;
};

type AuthRequest = {
  email: string;
  password: string;
};

type UserRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
