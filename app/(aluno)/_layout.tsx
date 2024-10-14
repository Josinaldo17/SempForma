import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import styles from '@/assets/padroes/styles';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: styles.Colors.primary,
        tabBarInactiveTintColor: '#888', 
        headerShown: false,
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="aluno_home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-home.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />

      {/* Aba Notificações */}
      <Tabs.Screen
        name="aluno_notificacao"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-notificacao.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />

    </Tabs>
  );
}
