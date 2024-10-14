import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native'; // Importa o ActivityIndicator para a tela de carregamento
import { useColorScheme } from '@/hooks/useColorScheme';

// Previne a tela de splash de ser escondida antes que os recursos estejam carregados
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Inder-Regular.ttf'),
  });
  
  // Estado para controlar se a tela de carregamento deve ser mostrada
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Aguarda o carregamento das fontes
      if (loaded) {
        // Oculta a tela de splash
        await SplashScreen.hideAsync();
        setIsReady(true); // Define que o aplicativo está pronto
      }
    };

    prepare();
  }, [loaded]);

  // Se o aplicativo não estiver pronto, exibe uma tela de carregamento
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" /> 
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(adm)" options={{ headerShown: false }} />
        <Stack.Screen name="(aluno)" options={{ headerShown: false }} />
        <Stack.Screen name="(professor)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
