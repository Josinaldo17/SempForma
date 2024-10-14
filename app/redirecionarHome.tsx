import React, { useEffect, useState } from 'react'; 
import { useRouter, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { amazenar_noApp } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RedirecionarHome = () => {
  const [dados, setDados] = useState({});
  const [token, setToken] = useState(null);
  const [token_status, setToken_status] = useState('');
  const [tipoUsuario, setTipoUsu] = useState('');
  const [loading, setLoading] = useState(true);  
  const router = useRouter();

  const verificarToken = async (key) => {
    if (key == null ) {

      router.push('/login');
      return;
    }

    try {
      const response = await axios.get(construirUrl(`verificar_token?token=${key}`));
      setDados(response.data);
      amazenar_noApp('matricula', response.data.data.matricula);
      setTipoUsu(response.data.data.usuario);
      setToken_status(response.data.message);
    } catch (error) {
      console.log('Error:', error); 
      console.log('Erro ao se conectar à API'); 
    } 
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token'); 
      setToken(storedToken);
    };

    fetchToken(); 
  }, []);

  useEffect(() => {
    if (token) {
      verificarToken(token); 
    } else {
      router.push('/login'); 
    }
  }, [token]); 

  useEffect(() => {
    if (token_status === "Token é válido!") {
      switch (tipoUsuario) {
        case "aluno":
          router.push('/(aluno)/aluno_home');
          break;
        case "professor":
          router.push('/(prof)/prof_home');
          break;
        case "adm":
          router.push('/(adm)/home');
          break;
        case "Expierado":
          router.push('/login');
          break;
        default:
          router.push('/login');
      }
    }
  }, [token_status, tipoUsuario, router]);

  if (loading) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <OrbitProgress color="#307E89" size="medium" />
        </View>
      </>
    );  
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default RedirecionarHome;
