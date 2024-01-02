import { Config } from "@/Config";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const { getState } = api;
  const token = (getState() as { user: { token: string }}).user.token;
  if (!token) {
    if (typeof args === 'string' && !args.startsWith('auth')) {
      args = 'guest/' + args;
    } else if (typeof args !== 'string' && !args.url.startsWith('auth')) {
      args.url = 'guest/' + args.url;
    }
  }

  const headers = new Headers();
  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: () => headers,
  })(args, api, extraOptions);
};

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
