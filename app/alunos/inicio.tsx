import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Se quiser usar axios, você pode importar
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]); // Para armazenar os dados do JSON

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      // Aqui, você pode substituir pelo URL da sua API
      const response = await axios.get('http://127.0.0.1:5000/alunos');
      setData(response.data); // Armazena os dados no estado
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // UseEffect para chamar a função fetchData quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // Renderização dos dados usando FlatList
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data}           // Dados que vieram da API
        keyExtractor={(item) => item.cpf.toString()}  // Usamos o CPF como chave única
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

export default App;
