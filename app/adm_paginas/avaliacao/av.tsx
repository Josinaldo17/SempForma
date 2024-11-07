import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import { useRouter, Stack, Link } from 'expo-router';

const Avaliacaos = () => {  
  const navigation = useNavigation();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  
 
  

  useEffect(() => {
    navigation.setOptions({
      title: 'Avaliaçoes',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={() => { router.push('./criar_av');}}>
        <Image
        source = {require('@/assets/images/icone-adicionar.png')}
        style={{
          width: 30,
          height: 30,
          margin: 10,
    
         }}
        
        />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(construirUrl('avaliaçoes'));
      setData(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  
  const renderItem = ({ item }) => (
    
    <View style={styles.item}>
      <Text style={styles.text}>ID: {item.id}</Text>
      <Text style={styles.text}>Matrícula Professor: {item.matricula_professor}</Text>
      <Text style={styles.text}>Dia: {item.dia}</Text>
      <Text style={styles.text}>Status: {item.status}</Text>
      <Text style={styles.text}>Pagamento: {item.pagamento}</Text>
      <Text style={styles.text}>Matrícula Aluno: {item.matricula_aluno || 'Nenhum'}</Text>
      <Text style={styles.text}>Cintura: {item.cintura || 'Nenhum'}</Text>
      <Text style={styles.text}>Braço DC: {item.braco_dc || 'Nenhum'}</Text>
      <Text style={styles.text}>Braço D: {item.braco_d || 'Nenhum'}</Text>
      <Text style={styles.text}>Braço EC: {item.braco_ec || 'Nenhum'}</Text>
      <Text style={styles.text}>Braço E: {item.braco_e || 'Nenhum'}</Text>
      <Text style={styles.text}>Coxa D: {item.coxa_d || 'Nenhum'}</Text>
      <Text style={styles.text}>Coxa E: {item.coxa_e || 'Nenhum'}</Text>
      <Text style={styles.text}>PT D: {item.pt_d || 'Nenhum'}</Text>
      <Text style={styles.text}>PT E: {item.pt_e || 'Nenhum'}</Text>
      <Text style={styles.text}>Tórax: {item.torax || 'Nenhum'}</Text>
      <Text style={styles.text}>Observação: {item.obs || 'Nenhuma'}</Text>
      <Text style={styles.text}>IMC: {item.imc || 'Nenhum'}</Text>
      <Text style={styles.text}>Gordura Corporal: {item.gordura_corporal || 'Nenhum'}</Text>
      <Text style={styles.text}>Músculo Esquelético: {item.musculo_esqueletico || 'Nenhum'}</Text>
      <Text style={styles.text}>Metabolismo de Repouso: {item.metabolismo_repouso || 'Nenhum'}</Text>
      <Text style={styles.text}>Idade Biológica: {item.idade_bio || 'Nenhuma'}</Text>
      <Text style={styles.text}>Gordura Visceral: {item.gordura_visceral || 'Nenhuma'}</Text>
      <Text style={styles.text}>Tempo de Gravidez: {item.tempo_gravidez || 'Nenhum'}</Text>
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
        keyExtractor={(item) => item.id}        
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

export default Avaliacaos;
