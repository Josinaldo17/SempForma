import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import axios from 'axios';
import { construirUrl } from '@/assets/padroes/apiConfig';
import { useNavigation } from '@react-navigation/native';

const ProfessoresAdm = () => {
  
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Professores',
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
      const response = await axios.get(construirUrl('professores'));
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };


  const renderHorarios = ({ item }) => (
    <Text style={styles.horarioText}>{item}</Text>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>Nome: {item.nome}</Text>
      <Text style={styles.text}>Matrícula: {item.matricula}</Text>
      <Text style={styles.text}>Horários:</Text>

      {/* FlatList para exibir horários */}
      <FlatList
        data={item.horarios}
        keyExtractor={(horario, index) => index.toString()} 
        renderItem={renderHorarios}
        style={styles.horariosList}
        horizontal={true}
      />
    </View>
  );

  if (loading) {  
    return <OrbitProgress color="#307E89" size="medium" text="" textColor="" />;    
  }

  return (
    <View style={styles.container}>
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
  horariosList: {
    marginTop: 5,
  },
  horarioText: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#555',
  },
});

export default ProfessoresAdm;
