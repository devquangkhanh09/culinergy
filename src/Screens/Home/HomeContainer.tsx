import { Home } from './Home';
import React, { useEffect } from 'react';
import { useLazyGetProfileQuery } from '@/Services';
import { useLazyGetRecommendedRecipesQuery } from '@/Services/recipes';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MainScreens } from '..';
import { useAppSelector, useAppDispatch } from '@/Hooks';
import { LoadingIndicator } from '@/Components/Indicator/LoadingIndicator';
import { setUserProfile } from '@/Store/reducers';

type HomeScreenNavigatorProps = {
  navigation: {
    navigate: (screen: MainScreens) => void;
  };
}

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const [fetchProfile, { data: profileData, isLoading: isLoading }] = useLazyGetProfileQuery();
  const [fetchRecommended, { data: recipesData, isLoading: isLoading2 }] = useLazyGetRecommendedRecipesQuery();
  const favoritesUpdatedIndex = useAppSelector((state) => state.favorites.favoritesUpdatedIndex);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.isGuest) {
      fetchProfile();
    }
    fetchRecommended({
      ofTheDay: true,
    });
  }, []);

  useEffect(() => {
    fetchRecommended({
      ofTheDay: true,
    });
  }, [favoritesUpdatedIndex]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (profileData) {
      dispatch(setUserProfile(profileData));
    }
  }, [profileData]);

  return (
    <View style={styles.container}>
      {isLoading || isLoading2 ? <LoadingIndicator /> : (
        <ScrollView>
          <Home data={{
            profile: profileData,
            recipes: recipesData,
          }}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f7",
    alignItems: "center",
    justifyContent: "flex-start",
    height: '100%',
  },
});
