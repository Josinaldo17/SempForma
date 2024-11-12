import React, { useEffect, useState } from 'react'; 
import { useRouter, Stack } from 'expo-router';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { amazenar_noApp } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RedirecionarHome = () => {
  const [token, setToken] = useState(null);
  const [token_status, setToken_status] = useState('');
  const [tipoUsuario, setTipoUsu] = useState('');
  const [isMounted, setIsMounted] = useState(false); // Estado para verificar se o componente foi montado
  const router = useRouter();

  const verificarToken = async (key) => {
    if (key == null) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.get(construirUrl(`verificar_token?token=${key}`));
      setTipoUsu(response.data.data.usuario);
      setToken_status(response.data.message);
      amazenar_noApp('matricula', response.data.data.matricula);
    } catch (error) {
      console.log('Erro ao se conectar à API');
      router.push('/login_paginas/erro_internet');
    }
  };

  useEffect(() => {
    // Garante que o código de navegação só será executado após o componente ser montado
    setIsMounted(true);

    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };

    fetchToken();
  }, []); // Executa apenas uma vez, quando o componente é montado

  useEffect(() => {
    // Só chama a navegação depois que o componente foi montado
    if (!isMounted) return;

    if (token) {
      verificarToken(token);
    } else {
      router.push('/login_paginas/login');
    }
  }, [token, isMounted, router]); 

  useEffect(() => {
    // Só chama a navegação depois que o token foi validado
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
          router.push('/login_paginas/login');
          break;
        default:
          router.push('/login_paginas/login');
      }
    }
  }, [token_status, tipoUsuario, router]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
           <ActivityIndicator style={styles.loading} size="large" color="#307E89" />
        </View>
    </>
  );  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  loading:{
      padding: 10,
      margin: 15,

  },
});

export default RedirecionarHome;
