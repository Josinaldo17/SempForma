import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0C5660',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: estilo_padrao.Colors.primary, 
          borderTopColor: estilo_padrao.Colors.primary, 
          paddingBottom: 3, 
        }, 
        headerShown: false,
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="prof_home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-home.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),tabBarLabelStyle: {
            color: '#FFF',
          },
        }}
      />

      {/* Aba Mídia */}
      <Tabs.Screen
        name="prof_midia"
        options={{
          title: 'Mídia',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-midia.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),tabBarLabelStyle: {
            color: '#FFF',
          },
        }}
      />

      {/* Aba Notificações */}
      <Tabs.Screen
        name="prof_notificaçao"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-notificacao.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),tabBarLabelStyle: {
            color: '#FFF',
          },
        }}
      />
    </Tabs>
  );
}
