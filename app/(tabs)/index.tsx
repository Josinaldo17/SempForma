import { useRouter } from 'expo-router';
import { View, Button } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Button
        title="Aula"
        onPress={() => router.push('/salas/horarios')} 
      />
      <Button
        title="Salas"
        onPress={() => router.push('/salas/horarios')} 
      />
      <Button
        title="Professor"
        onPress={() => router.push('/salas/horarios')} 
      />
      <Button
        title="Alunos"
        onPress={() => router.push('/salas/horarios')}
      />
      <Button
        title="Avaliaçao"
        onPress={() => router.push('/salas/horarios')} 
      />
    </View>

  );
}
