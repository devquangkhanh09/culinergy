import { SimplifiedIngredient } from "@/Store/reducers";
import { API } from "../base";

export interface Ingredient {
  _id: number;
  name: string;
  description: string;
  nutritionInfo: Object;
}

const ingredientApi = API.injectEndpoints({
  endpoints: (build) => ({
    getIngredients: build.query<SimplifiedIngredient[], void>({
      query: () => ({
        url: "ingredients",
        method: "GET",
      }),
    }),

    getIngredient: build.query<Ingredient, number>({
      query: (id) => ({
        url: `ingredients/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { 
  useLazyGetIngredientsQuery, 
  useLazyGetIngredientQuery
} = ingredientApi;
