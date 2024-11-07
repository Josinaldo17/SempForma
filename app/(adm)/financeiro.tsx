import React, {useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import{construirUrl} from '@/assets/padroes/apiConfig';

export default function Financeiro() {
  const [matricula_adm, setMatricula_adm] = useState('');
  const [dadosFinanceiro, setDadosFinanceiro] = useState([]);
  const [alertas, setAlertas] = useState({}); // Armazena as datas de alerta

  const buscar_alunos = async () => {
    try {
      const response = await axios.get(construirUrl('alunos'));
      const dadosComAvaliacao = response.data.map(item => ({
        ...item,
        av: item.avaliacao === "Fez"  
      }));
      setDadosFinanceiro(dadosComAvaliacao);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    async function fetchMatricula() {
      const pegar_matricula = await AsyncStorage.getItem('matricula'); 
      setMatricula_adm(pegar_matricula || '');
    }
    fetchMatricula();
    buscar_alunos();
  }, []); 

  const AlertPress = async (matricula) => {
    const agora = new Date().getTime(); 
    const alertTime = alertas[matricula];

    if (!alertTime || (agora - alertTime) > 86400000) { 
      console.log('Matrícula alertada:', matricula);
      const response = await axios.post(construirUrl('cobranca'), {
        matricula_adm: matricula_adm,
        matricula_aluno: matricula
      });
      setAlertas(prev => ({ ...prev, [matricula]: agora })); 
    } else {
      console.log('Matrícula já foi avisada, tente novamente em 24 horas');
    }
  };

  const VizualizarAluno = (matricula) => {
    console.log('Esse e o aluno', matricula)
  }

  const renderRow = ({ item }) => {
    const agora = new Date().getTime();
    const alertTime = alertas[item.matricula];
    const desabilitarBotao = alertTime && (agora - alertTime) <= 86400000; 

    return (
    <TouchableOpacity onPress={() => VizualizarAluno(item.matricula)} >
      <View style={styles.row}>
        

       
        <Text style={styles.cell}>{item.matricula}</Text>
        <Image
          source={item.av ? require('@/assets/images/icone-V.png') : require('@/assets/images/icone-X.png')}
          style={styles.icon}
        />
        <Text style={styles.cell}>{item.vencimento}</Text>
        <TouchableOpacity 
          style={[styles.alertButton, desabilitarBotao && styles.disabledButton]} 
          onPress={() => AlertPress(item.matricula)} 
          disabled={desabilitarBotao}
        >
          <Text style={styles.alertButtonText}>{desabilitarBotao ? 'Alertado' : 'Alertar'}</Text>
        </TouchableOpacity>
      </View>
    
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Matricula</Text>
        <Text style={styles.headerText}>AV</Text>
        <Text style={styles.headerText}>Vencimento</Text>
        <Text style={styles.headerText}>10</Text>
      </View>
      <FlatList
        data={dadosFinanceiro}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    backgroundColor: estilo_padrao.Colors.background,
   },
  title: 
  { fontSize: 24,
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center', 
    margin: 20 },
  tableHeader: 
  { flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20 },
  headerText: 
  { color: '#fff', 
    fontWeight: 'bold' 
  },
  row: 
  { flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#006c81', 
    margin: 5,  
    borderRadius: 5 },
   cell: {
    marginLeft: 25,
    flex: 1,
    color: '#fff', 
    padding: 'auto',
    fontSize: 12,
  },
  icon: { 
    flex: 0.5,
    marginHorizontal: 10,
    width: 20, 
    height: 20 
  },
  alertButton: {    
    flex: 1,    
    marginLeft: 10,
    backgroundColor: '#cc0000', 
    padding: 15, 
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5

   },
  alertButtonText: 
  { color: '#fff', 
    fontWeight: 'bold' 
  },
});
