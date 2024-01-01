import { API } from "../base";
import { Ingredient } from "../ingredients";

export interface Recipe {
  _id: number;
  name: string;
  imageUrl: string;
  description: string;
  timeToCook: string;
  favoriteCount: number;
  tags: string[];
  ingredients: Array<any>;
  instructions: string[];
  isFavorite?: boolean;
}

export interface RecipeDetail extends Recipe {
  ingredients: Pick<Ingredient, '_id' | 'name'>[];
}

export interface RecommendedQuery {
  ofTheDay?: boolean;
}

export interface RecipeQuery {
  ingredients?: string[];
  name?: string;
}

const recipeApi = API.injectEndpoints({
  endpoints: (build) => ({
    getRecommendedRecipes: build.query<Recipe[], RecommendedQuery>({
      query: (query) => ({
        url: "recipes/recommended",
        method: "GET",
        params: query,
      }),
    }),

    getFavoriteRecipes: build.query<Recipe[], void>({
      query: () => ({
        url: "recipes/favorites",
        method: "GET",
      }),
    }),

    getRecipe: build.query<RecipeDetail, number>({
      query: (id) => ({
        url: `recipes/${id}`,
        method: "GET",
      }),
    }),

    toggleFavoriteRecipe: build.mutation<Recipe, number>({
      query: (id) => ({
        url: `recipes/${id}/favorite`,
        method: "PUT",
      }),
    }),

    searchRecipes: build.query<Recipe[], RecipeQuery>({
      query: (query) => ({
        url: "recipes/search",
        method: "GET",
        query,
      }),
    }),
  }),
});

export const { 
  useLazyGetRecommendedRecipesQuery,
  useLazyGetFavoriteRecipesQuery,
  useLazyGetRecipeQuery,
  useToggleFavoriteRecipeMutation,
  useLazySearchRecipesQuery,
} = recipeApi;
