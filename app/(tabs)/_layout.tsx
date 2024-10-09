import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-home.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />

      {/* Aba Mídia */}
      <Tabs.Screen
        name="midia"
        options={{
          title: 'Mídia',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-midia.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />

      {/* Aba Notificações */}
      <Tabs.Screen
        name="notificaçao"
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-notificacao.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />

      {/* Aba Financeiro */}
      <Tabs.Screen
        name="financeiro"
        options={{
          title: 'Financeiro',
          tabBarIcon: ({ color }) => (
            <Image
            source={require('@/assets/images/icone-financeiro.png')}  
            style={{ width: 24, height: 24, tintColor: color }}/>
          ),
        }}
      />
    </Tabs>
  );
}
