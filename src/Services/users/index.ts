import { SimplifiedIngredient } from "@/Store/reducers";
import { API } from "../base";

export interface User {
  _id: string;
  name: string;
  email: string;
  isVegan: boolean;
  allergies: SimplifiedIngredient[];
  favorites: number[];
}

export interface UserUpdate {
  allergies?: number[];
  isVegan?: boolean;
}

const userApi = API.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<User, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
      }),
    }),

    updateProfile: build.mutation<User, UserUpdate>({
      query: (body) => ({
        url: "users/profile",
        method: "PUT",
        body,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLazyGetProfileQuery, useUpdateProfileMutation } = userApi;
