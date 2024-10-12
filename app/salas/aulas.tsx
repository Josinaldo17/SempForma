import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { OrbitProgress } from 'react-loading-indicators';
import { formatarData } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useNavigation } from '@react-navigation/native';


const Aulas = () => {  
  const navigation = useNavigation();
  const [aulas, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [treino, setTreino] = useState('');
  const [professor, setProfessor] = useState('');
  const [titulo, setTitulo] = useState('09:00');



  useEffect(() => {
    navigation.setOptions({
      title: titulo,
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(construirUrl('salas/2/2024-09-24'));
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  const renderAlunoItem = ({ item }) => (
    <View style={styles.item}>
       <TouchableOpacity
        onPress={() => {
          setTreino(item.nome_treino);
          setProfessor(item.nome_professor);
        }}
      >
      <Text style={styles.text}>Nome:  |  {item}</Text><Button title="Falta" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = (item) => (
    
    <View style={styles.item} key={item.id}>
      <View style={styles.fixedContainer}>
        


        
        <Text style={styles.fixedText}>{item.horario}</Text>
        <Text style={styles.fixedText}>{formatarData(item.dia)}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>V</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={item.nome_treino}
          value={treino}
          onChangeText={(text) => setTreino(text)}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={item.nome_professor}
          value={professor}
          onChangeText={(text) => setProfessor(text)}
        />
      </View>

      <FlatList
          data={item.alunos}
          keyExtractor={(aluno) => aluno.toString()}
          renderItem={renderAlunoItem} 
        />
    </View>
  );

  if (loading) {
    return <OrbitProgress color="#307E89" size="medium" text="" textColor="" />;
  }

  return (
    <ScrollView style={styles.container}>
      {aulas.map((item) => renderItem(item))}
    </ScrollView>
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
  },
  text: {
    fontSize: 16,
  },
});

export default Aulas;
