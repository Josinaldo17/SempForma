import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator, View, Image, Text, Modal, Button, StyleSheet } from 'react-native'; // Importa o ActivityIndicator para a tela de carregamento
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '@/assets/padroes/header';

// Previne a tela de splash de ser escondida antes que os recursos estejam carregados
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();  
  const [matricula, setMatricula] = useState('');  
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Inder-Regular.ttf'),
  });
  
  // Estado para controlar se a tela de carregamento deve ser mostrada
  const [isReady, setIsReady] = useState(false);

  const [isProfileModalVisible, setProfileModalVisible] = useState(false);


  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula'); 
      setMatricula(pegar_matricula || '');
    }
    fetchMatricula();
  }); 

  const sair = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('matricula');
    router.push('/');
    toggleProfileModal();
  }

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


  const toggleProfileModal = () => setProfileModalVisible(!isProfileModalVisible);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(adm)"
          options={Header({ onPressProfile: () => setProfileModalVisible(!isProfileModalVisible), matricula })}
        />
        <Stack.Screen
          name="(aluno)"
          options={Header({ onPressProfile: () => setProfileModalVisible(!isProfileModalVisible), matricula })}
        />
        <Stack.Screen
          name="(prof)"
          options={Header({ onPressProfile: () => setProfileModalVisible(!isProfileModalVisible), matricula })}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Modal
        visible={isProfileModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleProfileModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            
        <View style={styles.card}>
          
          <TouchableOpacity onPress={toggleProfileModal} >
            <Image
                source={require('@/assets/images/icone-X.png') } style={{
                  width: 60,
                  height: 30,
                  left: 10,
                  
            
                 }} />
            </TouchableOpacity>
        {/* Ícone de perfil (imagem do usuário) */}
        <Image
                source={require('@/assets/images/icone-usuario-de-perfil.png')}
          style={styles.profileImage}
        />

        {/* Nome do Aluno e Informações Pessoais */}
        <Text style={styles.nameText}>Nome do aluno</Text>
        <Text style={styles.infoText}>Cpf: 000..-67</Text>
        <Text style={styles.infoText}>Nasc: 00/00/0000</Text>

        {/* Informações sobre a matrícula, pagamento, etc. */}
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Matrícula</Text>
            <Text style={styles.infoValue}>1234</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Vencimento</Text>
            <Text style={styles.infoValue}>dia 02</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Pagamento</Text>
            <Text style={styles.infoValue}>Pendente</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>00:00</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Intensidade</Text>
            <Text style={styles.infoValue}>Pesado</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Avaliação</Text>
            <Text style={styles.infoValue}>00/00/0000</Text>
          </View>
        </View>

        {/* Botão de Avaliação */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        {/* Botão de Redefinir Senha */}
        <TouchableOpacity style={styles.resetButton}onPress={sair}>
          <Text style={styles.resetButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
        </View>
      </Modal>

    </ThemeProvider>
  );
}


// Estilos da tela
const styles = StyleSheet.create({
  
  card: {
    backgroundColor: '#f4f4f4',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  infoColumn: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  infoValue: {
    fontSize: 16,
    color: '#285b67',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#285b67',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
