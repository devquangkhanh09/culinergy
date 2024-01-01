import { API } from "../base";

export interface Token {
  accessToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  name: string;
}

const authApi = API.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Token, LoginDTO>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),

    register: build.mutation<Token, RegisterDTO>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
