import React, {useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import {formatarData} from '@/assets/padroes/funçoes';
import { OrbitProgress } from 'react-loading-indicators';
import axios from 'axios';
import{construirUrl} from '@/assets/padroes/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Aluno_notificacao = () => {
  const [matricula, setMatricula] = useState('');
  const [dadosMensagem, setDados] = useState([]);  
  const [loading, setLoading] = useState(true);  

  const buscar_notificacao = async (matricula) => {
    try {
      const response = await axios.get(construirUrl(`notificacao/${matricula}`));
      setDados(response.data);      
      setLoading(false); 
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula');
      const matriculaArmazenada = pegar_matricula || '';
      setMatricula(matriculaArmazenada);
      if (matriculaArmazenada) {
        buscar_notificacao(matriculaArmazenada); 
      }
    }
    fetchMatricula();
  }, []);

  
  const renderNotificacao = ({ item }) => (

    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Assunto:</Text>
        <Text style={styles.objetivo}>{item.tipo}</Text>
      </View>
      <Text style={styles.data}>{formatarData(item.dia)}</Text>

      <Text style={styles.mensagem}>{item.mensagem}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <View style={styles.enviarcontainer}>

      </View>
      <FlatList
        data={dadosMensagem}
        renderItem={renderNotificacao}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({

container: { flex: 1, backgroundColor: estilo_padrao.Colors.background, padding: 10 },
title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },

enviarcontainer: { 
   flexDirection: 'row',
   backgroundColor: '#333', 
   borderRadius: 10,
   marginBottom: 20 ,
   alignItems: 'center',   
   borderTopWidth: 2, 
   borderColor: estilo_padrao.Colors.primary, 
   },
card: { 
    backgroundColor: '#333', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    borderWidth: 2, 
    borderColor: estilo_padrao.Colors.primary, 
  },
  
row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
label: { fontSize: 14, color: '#aaa', fontWeight: 'bold' },

objetivo: { color: '#fff', fontSize: 14, textAlign: 'right', flex: 1 },
destinatario: { color: '#fff', fontSize: 14, textAlign: 'right', flex: 1 },
 
data: { color: '#fff', fontSize: 12, textAlign: 'left', marginBottom: 10 },
mensagem: { color: '#fff', fontSize: 14, backgroundColor: '#005f6b', padding: 10, borderRadius: 5 },

});
  

export default Aluno_notificacao;
