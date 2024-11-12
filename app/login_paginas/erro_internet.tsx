import React, { useEffect, useState } from 'react'; 
import { useRouter, Stack } from 'expo-router';
import { View, StyleSheet, ActivityIndicator, Text, Button } from 'react-native';
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
  return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
        <Text style={styles.errorText}>Houve um erro de conexão. Verifique sua internet e tente novamente.</Text>
        <Button 
          title="Tentar novamente"
          color="#307E89" 
          style={styles.retryButton} 
          onPress={() => router.push('/') }
        />
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
  errorText: {
    fontSize: 18,
    color: '#D32F2F', 
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#307E89',
    borderRadius: 5,
    color: '#fff',
  },
});

export default RedirecionarHome;
