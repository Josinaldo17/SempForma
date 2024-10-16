import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Button, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


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

    
  const sair = async () => {

    const deleteToken = await AsyncStorage.removeItem('token');
    const deleteMatricula = await AsyncStorage.removeItem('matricula');
    router.push('/');
    


  }

  return (
    <View  style={{  flex: 1}}>
      <View style={{ backgroundColor: 'green', padding: 10, flex: 1}}>
        <View style={{ flexDirection: 'row', backgroundColor: 'yellow', flex: 1}}>
            <View style={{ flexDirection: 'column', backgroundColor: 'purple', flex: 2}}>

            <View style={{ backgroundColor: '#2C166C', padding: 20, flex: 1.1}}>

                <TouchableOpacity style={{ backgroundColor: 'blue' , height: '100%'}} onPress={() => router.push('/adm_paginas/salas/aulas')} >


                  <Image
                    source={require('@/assets/images/usuario-de-perfil.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />

                  <Text>Aula</Text>

                </TouchableOpacity> 

                </View>
                 <View style={{ backgroundColor: '#E08F4C', padding: 20, flex: 0.9}}>             

                <TouchableOpacity style={{ backgroundColor: 'blue'}} onPress={() => router.push('/adm_paginas/professores/professores_adm')} >


                  <Image
                    source={require('@/assets/images/usuario-de-perfil.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />

                  <Text>Professor</Text>

                </TouchableOpacity>
                </View>  
                
            </View>

            <View style={{ flexDirection: 'column', backgroundColor: 'brown', flex: 2}} >


            <View style={{ backgroundColor: '#376990', padding: 20, flex: 0.6}}>  
                
                <TouchableOpacity style={{ backgroundColor: 'blue', width: '100%', height: '100%'}} onPress={() => router.push('/adm_paginas/salas/horarios')}>


                  <Image
                    source={require('@/assets/images/usuario-de-perfil.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />

                  <Text>Salas</Text>

                </TouchableOpacity>

                </View>
                <View style={{ backgroundColor: '#4D429B', padding: 20, flex: 1}}>    
                
                <TouchableOpacity style={{ backgroundColor: 'blue'}} onPress={() => router.push('/adm_paginas/alunos/inicio')}>
                
                <Image
                    source={require('@/assets/images/usuario-de-perfil.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />

                  <Text>Alunos</Text>

                </TouchableOpacity>
                </View>

            </View>

        </View>
        <View  style={{ flexDirection: 'column', backgroundColor: 'white', flex: 0.5}}>

        <TouchableOpacity style={{ backgroundColor: 'blue'}} onPress={() => router.push('/adm_paginas/avaliacao/av')} >


            <Image
              source={require('@/assets/images/usuario-de-perfil.png')}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />

            <Text>Avaliaçao</Text>

        </TouchableOpacity>
        
        </View>
        
      </View>
      <View style={{position : 'absolute'}} >

        <Text>matricula: {matricula}</Text> 
      <TouchableOpacity style={{backgroundColor : 'red'} } onPress={sair} >
        <Text>Sair</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}
