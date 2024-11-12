
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput,Image, Modal, ActivityIndicator } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useNavigation } from '@react-navigation/native';
import { Picker} from '@react-native-picker/picker';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import axios from 'axios';

const Horarios = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  
 
  

  const toggleProfileModal = () => setProfileModalVisible(!isProfileModalVisible);


  useEffect(() => {
    navigation.setOptions({
      title: 'Salas',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: estilo_padrao.Colors.background, 
        borderBottomWidth: 1, 
        borderBottomColor: estilo_padrao.Colors.primary, 
      },
      headerTitleStyle: {
        fontWeight: 'bold', 
        color: '#fff', 
      },
      headerRight: () => (
        <TouchableOpacity onPress={toggleProfileModal}>
        <Image
        source = {require('@/assets/images/icone-adicionar.png')}
        style={{
          width: 30,
          height: 30,
          margin: 10,
    
         }}
        
        />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const Olhar_aulas = () => {
    const aula = { message: 'Olá, Josinaldo' };
    
    router.push({ pathname: '/adm_paginas/salas/aulas', params: { data: aula } });
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(construirUrl('salas'));
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  const renderItem = ({ item }) => (


      <View style={styles.item}>
          <TouchableOpacity onPress={Olhar_aulas} >
              <Text style={styles.timeText}>{item.horario}</Text>
          </TouchableOpacity>
      </View>
  );

  if (loading) {
    return <> 
       <View  
       style={{
            flex: 1,
            backgroundColor:estilo_padrao.Colors.background,
            alignItems: 'center',
            justifyContent: 'center'
        }}>       
       <ActivityIndicator size="large" color="#307E89" />    
       </View> 
        </>;
  }

  return (
    <>
    <View style={styles.container}>
              <Text  style={styles.subTitle} >Horarios</Text>
      <FlatList
        data={data}           
        keyExtractor={(item) => item.id.toString()}        
        renderItem={renderItem}  // Função para renderizar cada item
      />
    </View>
     <Modal
     visible={isProfileModalVisible}
     transparent={true}
     animationType="slide"
     onRequestClose={toggleProfileModal}
   >
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
         
     <View style={styles.card}>
       
       <TouchableOpacity onPress={toggleProfileModal} >
         <Image
             source={require('@/assets/images/icone-X.png') } style={{
               width: 60,
               height: 30,
               left: 10,
               
         
              }} />
         </TouchableOpacity>
     {/* Ícone de perfil (imagem do usuário) */}
     <Image
             source={require('@/assets/images/icone-professor.png')}
       style={styles.profileImage}
     />

     <View style={styles.infoRow}>
       <View style={styles.infoColumn}>
         
         <Text>Matricula Professor</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
          />
 

        <Text>Horario</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
        />
        <Picker >
                <Picker.Item label="Planos" value="" />
                <Picker.Item label="Funcional" value="S" />
          </Picker>
 

       </View>
     </View>

     {/* Botão de Avaliação */}
     <TouchableOpacity style={styles.button}>
       <Text style={styles.buttonText}>ADICIONAR</Text>
     </TouchableOpacity>

   </View>
     </View>
   </Modal> 
   </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: estilo_padrao.Colors.background,
    padding: 10,
  },
  subTitle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  item: {
    padding: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: estilo_padrao.Colors.primary
    
  },
  timeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#f4f4f4',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  }, input: {
    width: '80%',
    height: 50,
    borderColor: estilo_padrao.Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,  
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
    color: '#fff',
    fontSize: 15
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  infoColumn: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  infoValue: {
    fontSize: 16,
    color: '#285b67',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#285b67',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Horarios;