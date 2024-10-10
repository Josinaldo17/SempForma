import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { OrbitProgress } from 'react-loading-indicators';

const Aulas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [treino, setTreino] = useState('');  
  const [professor, setProfessor] = useState(''); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/salas/2/2024-09-24');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {
        setTreino(item.nome_treino);
        setProfessor(item.nome_professor);
      }}>
        <Text style={styles.text}>OO  {item.nome_aluno}  | {item.matricula_aluno} </Text><Button title='Falta'/>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <OrbitProgress color="#307E89" size="medium" text="" textColor="" />;  
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.fixedContainer}>
        <Text style={styles.fixedText}>07:00</Text>
        <Text style={styles.fixedText}>19/03/2000</Text>

        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>V</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome do Treino"
          value={treino}
          onChangeText={(text) => setTreino(text)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome do Professor"
          value={professor}
          onChangeText={(text) => setProfessor(text)}
        />
      </View>

      
      <FlatList
        data={data}
        keyExtractor={(item) => item.matricula_aluno.toString()}
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
  fixedContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  fixedText: {
    fontSize: 16,
    marginVertical: 5, 
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: 200,
    borderRadius: 5,
    marginVertical: 5,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default Aulas;
