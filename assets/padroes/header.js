import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

export function Header({ onPressProfile, matricula }) {
  return {
    title: '',
    headerShown: true,
    headerTitleAlign: 'center',
    headerRight: () => (
      <TouchableOpacity>
        <Image
          source={require('@/assets/images/icone-confg.png')}
          style={{ width: 30, height: 30, marginRight: 30 }}
        />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <View style={{ flexDirection: 'row', padding: '5%', margin: 10 }}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPressProfile}>
          <Image
            source={require('@/assets/images/usuario-de-perfil.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <Text>{matricula}</Text>
        </TouchableOpacity>
      </View>
    ),
    headerBackVisible: false,
    headerBackground: () => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('@/assets/images/logo-header.png')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>
    ),
  };
}
