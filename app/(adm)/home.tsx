import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [matricula, setMatricula] = useState('');

  // Usar o useEffect para buscar os dados de forma assíncrona
  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula'); 
      setMatricula(pegar_matricula);
    }
    fetchMatricula();
  }, []); 

  useEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerTitleAlign: 'center',
      headerRight: () => (
        <Button
          onPress={() => alert('Botão foi pressionado!')}
          title="Info"
          color="#000"
        />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Button
        title="Aula"
        onPress={() => router.push('/adm_paginas/salas/aulas')} 
      />
      <Button
        title="Salas"
        onPress={() => router.push('/adm_paginas/salas/horarios')} 
      />
      <Button
        title="Professor"
        onPress={() => router.push('/adm_paginas/professores/professores_adm')} 
      />
      <Button
        title="Alunos"
        onPress={() => router.push('/adm_paginas/alunos/inicio')}
      />
      <Button
        title="Avaliaçao"
        onPress={() => router.push('/adm_paginas/avaliacao/av')} 
      />
      <Text>matricula: {matricula}</Text> 
    </View>
  );
}
