import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const Alunos_inicio = () => {
  const navigation = useNavigation();
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
      const response = await axios.get(construirUrl('alunos'));
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    
   <View style={styles.alunos}>

          <View style={styles.alunos_icone}>
          </View>

          <View style={styles.alunos_nome}>
                  <Text style={styles.text}>{item.nome}</Text>
          </View >
          
          <View style={styles.alunos_matricula}>
            <Text style={styles.text}>{item.matricula}</Text>
            <Text style={styles.text}>{item.horario}</Text>
          </View>
      
    
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


  return(
    <View style={styles.container}>
      
      <View style={styles.containerinput} >

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
    backgroundColor: estilo_padrao.Colors.background,
    padding: 10,
  },
  containerinput:{
    borderWidth: 2,
    marginVertical: 10,
    borderColor: estilo_padrao.Colors.primary,

  },
  alunos: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: estilo_padrao.Colors.primary,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },alunos_icone:{
    flex: 2,

  },
  alunos_nome:{
    flex: 5

  },
  alunos_matricula:{
    flex: 2,
    alignItems: 'center'

  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Alunos_inicio;
