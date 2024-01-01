import { Home } from './Home';
import React, { useEffect } from 'react';
import { useLazyGetProfileQuery } from '@/Services';
import { useLazyGetRecommendedRecipesQuery } from '@/Services/recipes';
import { ScrollView } from 'react-native';
import { MainScreens } from '..';

type HomeScreenNavigatorProps = {
  navigation: {
    navigate: (screen: MainScreens) => void;
  };
}

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const [fetchOne, { data: profileData, isLoading: isLoading }] = useLazyGetProfileQuery();
  const [fetchTwo, { data: recipesData, isLoading: isLoading2 }] = useLazyGetRecommendedRecipesQuery();

  useEffect(() => {
    fetchOne();
    fetchTwo({
      ofTheDay: true,
    });
  }, []);

  return (
    <ScrollView>
      <Home data={{
        profile: profileData,
        recipes: recipesData,
      }} isLoading={isLoading && isLoading2} />
    </ScrollView>
  );
};
