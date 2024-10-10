
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,  } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';

import axios from 'axios';

const Horarios = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/salas');
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  const renderItem = ({ item }) => (


      <View style={styles.item}>
          <TouchableOpacity onPress={() => router.push('/salas/aulas')} >
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