import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator, View, Image, Text } from 'react-native'; // Importa o ActivityIndicator para a tela de carregamento
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <Stack.Screen
          name="(adm)"
          options={{ 
            title: '',
            headerShown: true, 
            headerTitleAlign: 'center', // Alinha o título ao centro
            headerRight: () => (
            <>
              <TouchableOpacity>

              <Image
                   source={require('@/assets/images/icone-confg.png')}
                   style={{ width: 30, height: 30, marginRight: 30 }}
                 />
               
             </TouchableOpacity>
            </>
              
                
            ),
            headerLeft: () => (
              <View style={{ flexDirection: 'row', padding: '5%', margin: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row'}}>
                <Image
                  source={require('@/assets/images/usuario-de-perfil.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                
                <Text>Josinaldo</Text>

                </TouchableOpacity>

              </View>
            ),
            headerBackVisible: false,
            headerBackground: () => (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
                <Image
                  source={require('@/assets/images/logo-header.png')}
                  style={{ 
                    width: '100%',  // Largura adaptável ao tamanho da tela
                    height: '100%', // Altura adaptável ao tamanho da tela
                    resizeMode: 'cover', // Adapta a imagem ao tamanho da tela
                  }}
                />
            </View>
            ),
          }}
        />
        <Stack.Screen name="(aluno)" options={{ headerShown: false }} />
        <Stack.Screen name="(professor)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
