import { API } from '@/Services/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  firstTimeReducers,
  homeReducers,
  themeReducers,
  userReducers,
} from './reducers';
import { cameraReducers } from './reducers/camera';
import { exploreReducers } from './reducers/explore';
import { favoritesReducers } from './reducers/favorites';
import { modalReducers } from './reducers/modal';
import { ingredientReducers } from './reducers/ingredient';
import { recipeReducers } from './reducers/recipe';
import { ingredientListReducers } from './reducers/ingredientsList';

const reducers = combineReducers({
  api: API.reducer,
  theme: themeReducers,
  home: homeReducers,
  firstTime: firstTimeReducers,
  user: userReducers,
  camera: cameraReducers,
  explore: exploreReducers,
  favorites: favoritesReducers,
  modal: modalReducers,
  ingredient: ingredientReducers,
  ingredientList: ingredientListReducers,
  recipe: recipeReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme', 'firstTime', 'user'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }).concat(API.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require("redux-flipper").default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
