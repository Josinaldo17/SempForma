import React from 'react';
import { useRouter } from 'expo-router';
import {View, Text, Image,  StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

const AlunoHome = () => {
  const router = useRouter();

    
  const sair = async () => {

    const deleteToken = await AsyncStorage.removeItem('token');
    const deleteMatricula = await AsyncStorage.removeItem('matricula');
    router.push('/');
    


  }

  return (  
      <>
    

    <View style={styles.container}>
      
      <View  style={styles.avaliacaos}>


        <View style={styles.column }>

          <View style={styles.btn_aula }>
            

                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => router.push('/(aluno)/aluno_home')}
                >
                  <Image
                    source={require('@/assets/images/icone-aula.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.buttonText}>Aula</Text>
                </TouchableOpacity>

            </View>
        </View>




        <View style={styles.column}>

        <View style={styles.btn_salas }>

                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => router.push('/(aluno)/aluno_home')}
                >
                  <Image
                    source={require('@/assets/images/icone-professor.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.buttonText}>Sala</Text>
                </TouchableOpacity>

            </View>

        </View>


      </View>


      <View  style={styles.avaliacaos}>

        <View style={styles.btn_avaliacao}>
        
        <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/(aluno)/aluno_home')}>
            <Image
                source={require('@/assets/images/icone-avaliacao.png')}
                style={styles.iconav}
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
  backgroundColor: estilo_padrao.Colors.background,
},
row: {    
  flex: 1,
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
btn_aula:{
  flex: 2,
  backgroundColor: estilo_padrao.Colors.primary,
  borderRadius: 20,
  margin: 10


},
btn_salas:{
  flex: 1.2,
  margin: 10,
  backgroundColor: estilo_padrao.Colors.primary,
  borderRadius: 20,

},
btn_prof:{
  flex: 1.8,
  backgroundColor: estilo_padrao.Colors.primary,
  borderRadius: 20,
  margin: 10


},
btn_alunos:{
  flex: 1.8,
  backgroundColor: estilo_padrao.Colors.primary,
  borderRadius: 20,
  margin: 10

},
btn_avaliacao:{
  flex: 1.8,
  backgroundColor: estilo_padrao.Colors.primary,
  borderRadius: 20,
  margin: 10
  
},
buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  paddingVertical: 10,
},
icon: {
  width: '25%',
  height: '110%',
},
iconav: {
  width: '42%',
  height: '150%',
}
}); 


export default AlunoHome;