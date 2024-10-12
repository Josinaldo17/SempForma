
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useNavigation } from '@react-navigation/native';
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
    
    router.push({ pathname: '/salas/aulas', params: { data: aula } });
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
              <Text style={styles.text}>{item.horario}</Text>
          </TouchableOpacity>
      </View>
  );

  if (loading) {
    return <OrbitProgress color="#307E89" size="medium" text="" textColor="" />;  
  }
  
  return (
    <View style={styles.container}>
              <Text>Horarios</Text>
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
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Horarios;