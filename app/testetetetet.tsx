import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Button, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Avaliacaos from '../adm_paginas/avaliacao/av';

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [matricula, setMatricula] = useState('');

  // Usar o useEffect para buscar os dados de forma assíncrona
  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula'); 
      setMatricula(pegar_matricula || '');
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
    <>
      <View style={styles.container}>
        <View style={styles.row}>


          <View style={styles.column }>

            <View style={styles.btn_aula }>


                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/adm_paginas/salas/aulas')}
                  >
                    <Image
                      source={require('@/assets/images/icone-home.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Aula</Text>
                  </TouchableOpacity>

              </View>
              <View style={styles.btn_prof }>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/adm_paginas/professores/professores_adm')}
                  >
                    <Image
                      source={require('@/assets/images/icone-home.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Professor</Text>
                  </TouchableOpacity>
                  
              </View>
          </View>




          <View style={styles.column}>

          <View style={styles.btn_salas }>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/adm_paginas/salas/horarios')}
                  >
                    <Image
                      source={require('@/assets/images/icone-home.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Salas</Text>
                  </TouchableOpacity>

              </View>
              <View style={styles.btn_alunos }>

                  <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => router.push('/adm_paginas/alunos/inicio')}
                  >
                    <Image
                      source={require('@/assets/images/icone-home.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.buttonText}>Alunos</Text>
                  </TouchableOpacity>
              </View>

          </View>


        </View>


        <View  style={styles.avaliacaos}>

          <View style={styles.btn_avaliacao}> 
            
            <Image source={require('@/assets/images/img-av.png')} 
                      style={styles.background} />
                        
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => router.push('/adm_paginas/avaliacao/av')}>
                            <Image
                              source={require('@/assets/images/icone-home.png')}
                              style={styles.icon}
                            />
                            <Text style={styles.buttonText}>Avaliação</Text>
                          </TouchableOpacity>

                 
            
            </View>

        </View>

        
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#282525',
  },
  row: {    
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  avaliacaos: {
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    width: '100%',
    height: '110%',
    marginTop: 10,
    paddingBottom: '100%',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '99%',
    height: '99%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  btn_aula:{
    flex: 2,
    backgroundColor: '#307E89',
    borderRadius: 20,
    margin: 10


  },
  btn_salas:{
    flex: 1.2,
    margin: 10,
    backgroundColor: '#307E89',
    borderRadius: 20,

  },
  btn_prof:{
    flex: 1.8,
    backgroundColor: '#307E89',
    borderRadius: 20,
    margin: 10


  },
  btn_alunos:{
    flex: 1.8,
    backgroundColor: '#307E89',
    borderRadius: 20,
    margin: 10

  },
  btn_avaliacao:{
    alignItems: 'center',
    flex: 1.8,
    backgroundColor: '#307E89',
    borderRadius: 20,
    margin: 10
    
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 16,
  },
  icon: {
    width: 30,
    height: 30,
  }
});
