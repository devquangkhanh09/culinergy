import React from 'react';
import * as Localization from 'expo-localization';
import { i18n, Language } from '@/Localization';
import { NativeBaseProvider } from 'native-base';
import { store, persistor } from '@/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApplicationNavigator } from './Navigation';
import * as Font from 'expo-font';

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.ENGLISH;

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  async function loadFonts() {
    try {
      await Font.loadAsync({
        Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error('Error loading fonts', error);
    }
  }

  React.useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
