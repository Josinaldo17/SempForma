import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  
  
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
        onPress={() => router.push('/salas/aulas')} 
      />
      <Button
        title="Salas"
        onPress={() => router.push('/salas/horarios')} 
      />
      <Button
        title="Professor"
        onPress={() => router.push('/professores/professores_adm')} 
      />
      <Button
        title="Alunos"
        onPress={() => router.push('/alunos/inicio')}
      />
      <Button
        title="Avaliaçao"
        onPress={() => router.push('/avaliacao/av')} 
      />
      
    </View>

  );
}
