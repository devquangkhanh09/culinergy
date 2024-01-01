import { Home } from './Home';
import React, { useEffect } from 'react';
import { useLazyGetProfileQuery } from '@/Services';
import { useLazyGetRecommendedRecipesQuery } from '@/Services/recipes';
import { ScrollView } from 'react-native';
import { MainScreens } from '..';
import { useAppSelector } from '@/Hooks';

type HomeScreenNavigatorProps = {
  navigation: {
    navigate: (screen: MainScreens) => void;
  };
}

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const [fetchProfile, { data: profileData, isLoading: isLoading }] = useLazyGetProfileQuery();
  const [fetchRecommended, { data: recipesData, isLoading: isLoading2 }] = useLazyGetRecommendedRecipesQuery();
  const favoritesUpdatedIndex = useAppSelector((state) => state.favorites.favoritesUpdatedIndex);

  useEffect(() => {
    fetchProfile();
    fetchRecommended({
      ofTheDay: true,
    });
  }, []);

  // TODO: fix recipe not updating when favoriting (big recipe widget)
  useEffect(() => {
    fetchRecommended({
      ofTheDay: true,
    });
  }, [favoritesUpdatedIndex]);

  return (
    <ScrollView>
      <Home data={{
        profile: profileData,
        recipes: recipesData,
      }} isLoading={isLoading && isLoading2} />
    </ScrollView>
  );
};
