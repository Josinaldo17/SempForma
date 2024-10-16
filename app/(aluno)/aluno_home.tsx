import React from 'react';
import { useRouter } from 'expo-router';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AlunoMidia = () => {
  const router = useRouter();

    
  const sair = async () => {

    const deleteToken = await AsyncStorage.removeItem('token');
    const deleteMatricula = await AsyncStorage.removeItem('matricula');
    router.push('/');
    


  }

  return (
    <View>
      <Text>HOME DO ALUNO</Text>
      <TouchableOpacity style={{backgroundColor : 'red'} } onPress={sair} >
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlunoMidia;