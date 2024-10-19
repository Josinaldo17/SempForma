import React , { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {View, Text, StyleSheet, us } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';


const Midia = () => {
  
  const router = useRouter();
  const [matricula, setMatricula] = useState('');


  const sair = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('matricula');
    router.push('/');
  }

    // Usar o useEffect para buscar os dados de forma assíncrona
    useEffect(() => {
      async function fetchMatricula() {
        const pegar_matricula = await AsyncStorage.getItem('matricula'); 
        setMatricula(pegar_matricula || '');
      }
      fetchMatricula();
    }, []); 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
     
     <View style={styles.footer}>
        <Text style={styles.matriculaText}>Matrícula: {matricula}</Text> 
        <TouchableOpacity style={styles.logoutButton} onPress={sair}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
     
      
        
     
    </ParallaxScrollView>
 

  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'relative',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  matriculaText: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  }, 
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Midia;