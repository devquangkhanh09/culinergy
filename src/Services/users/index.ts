import { API } from "../base";

export interface User {
  _id: string;
  name: string;
  email: string;
  isVegan: boolean;
  allergies: number[];
  favorites: number[];
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetProfileQuery } = userApi;
