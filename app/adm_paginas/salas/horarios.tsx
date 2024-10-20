
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useNavigation } from '@react-navigation/native';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import axios from 'axios';

const Horarios = () => {
  const router = useRouter();
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      title: 'Salas',
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
       <OrbitProgress color="#307E89" size="large" text="" textColor="" />  
       </View> 
        </>;
  }

  return (
    <View style={styles.container}>
              <Text  style={styles.subTitle} >Horarios</Text>
      <FlatList
        data={data}           
        keyExtractor={(item) => item.id.toString()}        
        renderItem={renderItem}  // Função para renderizar cada item
      />
    </View>
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
});

export default Horarios;