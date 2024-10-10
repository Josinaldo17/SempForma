import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import axios from 'axios';

const Alunos_inicio = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/alunos');
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    
    <View style={styles.item}>
      <Text style={styles.text}>Nome: {item.nome}</Text>
      <Text style={styles.text}>CPF: {item.cpf}</Text>
      <Text style={styles.text}>Altura: {item.altura}</Text>
      <Text style={styles.text}>Peso: {item.peso}</Text>
      <Text style={styles.text}>Telefone: {item.telefone}</Text>
      <Text style={styles.text}>Data de inserção: {item.data_insercao}</Text>
      <Text style={styles.text}>Avaliação: {item.avaliacao}</Text>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;  
  }
  
  return (
    <View style={styles.container}>
              <Text>Hoaratios</Text>
      <FlatList
        data={data}           
        keyExtractor={(item) => item.matricula.toString()}        
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

export default Alunos_inicio;
