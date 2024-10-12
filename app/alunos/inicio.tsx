import React, { useEffect, useState } from 'react';
import { UseNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';

import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const Alunos_inicio = () => {
  const navigation = UseNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Alunos',
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

  useEffect(() => {
    Buscar_dados();
  }, []);

  const Buscar_dados = async () => {
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
      <Text style={styles.text}>Matricula: {item.matricula}</Text>
      <Text style={styles.text}>Horario: {item.horario}</Text>
    
    {/* 
      <Text style={styles.text}>Nome: {item.nome}</Text>
      <Text style={styles.text}>CPF: {item.cpf}</Text>
      <Text style={styles.text}>Altura: {item.altura}</Text>
      <Text style={styles.text}>Peso: {item.peso}</Text>
      <Text style={styles.text}>Telefone: {item.telefone}</Text>
      <Text style={styles.text}>Data de inserção: {item.data_insercao}</Text>
      <Text style={styles.text}>Avaliação: {item.avaliacao}</Text>*/}
    </View>
  );

  if (loading) {
    
    return( 
      <View style={styles.container}>

        <TextInput />

        <OrbitProgress color="#307E89" size="medium" text="" textColor="" />    
      
      </View>
  );  
  }

  return(
    <View style={styles.container}>
      
      <View>

        <TextInput />

      </View>

      <FlatList
        data={data}           
        keyExtractor={(item) => item.matricula.toString()}        
        renderItem={renderItem}  
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
