import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';
import { useRouter, Stack, Link } from 'expo-router';

const Avaliacaos = () => {  
  const navigation = useNavigation();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [matricula, setMatricula] = useState(''); 
  const [semAvaliaçao, setSemAvaliaçao] = useState(false)
 
  
  const [matriculaAluno, setMatriculaAluno] = useState();  
  const [isProfileModalVisible, setProfileModalVisible] = useState(false); 
  

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


  const fetchData = async () => {
    try {
      const response = await axios.get(construirUrl('avaliaçao/'+ matricula));
      console.log(matricula);
      setData(response.data); 
      setLoading(false);
      if (response.data.length === 0) {
        setSemAvaliaçao(true);
        console.log('olaaaaaaa');
      }
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
        fetchData(matricula); 
      }
    }
    fetchMatricula();
  },);

  
  const toggleProfileModal = () => setProfileModalVisible(!isProfileModalVisible);

  const VizualizarAluno = (matricula) => {
    const aluno = data.find((item) => item.matricula_aluno === matricula);
    console.log(aluno);
    setMatriculaAluno(aluno);
    setProfileModalVisible(!isProfileModalVisible);
  };
    
  
  const renderItem = ({ item }) => (
    
    

    <TouchableOpacity onPress={() => VizualizarAluno(item.matricula_aluno)} >    
      <View style={styles.alunos}>

              <View style={styles.alunos_icone}>
                  <Image
                source = {require('@/assets/images/icone-usuario-de-perfil.png')}
                style={{
                  width: 30,
                  height: 30,
                  margin: 10,
            
                }}
                    
                />
              </View>

              <View style={styles.alunos_nome}>
                      <Text style={styles.text}>{item.nome}</Text>
              </View >
              
              <View style={styles.alunos_matricula}>
                <Text style={styles.text}>{item.matricula}</Text>
                <Text style={styles.text}>{item.horario}</Text>
              </View>
        </View>      
    </TouchableOpacity>
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
       <ActivityIndicator size="large" color="#307E89" />   
       </View>
        
        </>;
  }


  return(
    <>
    <View style={styles.container}>

    { semAvaliaçao ? (
      <View>
        <Text>Sem Avaliação</Text>
      </View>
    ) : (
      <FlatList
        data={data}           
        keyExtractor={(item) => item.id}        
        renderItem={renderItem}  
      />            
        )
      }
    </View>
    <ScrollView   style={styles.teste}>


    {matriculaAluno && (

            <Modal
            visible={isProfileModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleProfileModal}
          >

          <ScrollView  style={{ flex: 1 }}>
            <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                
                <View style={styles.card}>
                  
                  <TouchableOpacity onPress={toggleProfileModal} >
                    <Image
                        source={require('@/assets/images/icone-X.png') } style={{
                          width: 60,
                          height: 30,
                          left: 10,
                          
                    
                        }} />
                    </TouchableOpacity>
                {/* Ícone de perfil (imagem do usuário) */}
                <Image
                        source={require('@/assets/images/icone-usuario-de-perfil.png')}
                  style={styles.profileImage}
                />
  
                {/* Nome do Aluno e Informações Pessoais */}
                <Text style={styles.infoText}>Matrícula Professor: {matriculaAluno.matricula_professor}</Text>
                <Text style={styles.infoText}>Dia: {matriculaAluno.dia}</Text>
                <Text style={styles.infoText}>Status: {matriculaAluno.status}</Text>
                <Text style={styles.infoText}>Pagamento: {matriculaAluno.pagamento}</Text>
  
                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Matrícula Aluno</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.matricula_aluno || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Cintura</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.cintura || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Braço DC</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.braco_dc || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Braço D</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.braco_d || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Braço EC</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.braco_ec || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Braço E</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.braco_e || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Coxa D</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.coxa_d || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Coxa E</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.coxa_e || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>PT D</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.pt_d || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>PT E</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.pt_e || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Tórax</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.torax || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Observação</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.obs || 'Nenhuma'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>IMC</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.imc || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Gordura Corporal</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.gordura_corporal || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Músculo Esquelético</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.musculo_esqueletico || 'Nenhum'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Metabolismo de Repouso</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.metabolismo_repouso || 'Nenhum'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Idade Biológica</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.idade_bio || 'Nenhuma'}</Text>
                        </View>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Gordura Visceral</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.gordura_visceral || 'Nenhuma'}</Text>
                        </View>
                      </View>

                      <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                          <Text style={styles.infoLabel}>Tempo de Gravidez</Text>
                          <Text style={styles.infoValue}>{matriculaAluno.tempo_gravidez || 'Nenhum'}</Text>
                        </View>
                      </View>
  
              </View>
            </View>
            </ScrollView>
          </Modal> 
         )}
          </ScrollView>
          </>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: estilo_padrao.Colors.background,
    padding: 10,
  },
  teste: {
    position: 'absolute',
    backgroundColor: estilo_padrao.Colors.background,
    padding: 10,
  },
  containerinput:{

    borderWidth: 2,
    marginVertical: 10,
    borderColor: estilo_padrao.Colors.primary,
    flexDirection: 'row',
    backgroundColor: '#333', 
    borderRadius: 10,
    marginBottom: 20 ,
    justifyContent: 'center',
    alignItems: 'center',   
  },
  buscaInput: {
    flex: 10,
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRightWidth: 2,
    borderColor: estilo_padrao.Colors.primary, 
   },
  iconelupa:{
    width: 30,
    height: 30,
    margin: 5,

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
  },card: {
    backgroundColor: '#f4f4f4',
    width: '90%',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 15,
    color: '#6b6b6b',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  infoColumn: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    color: '#6b6b6b',
  },
  infoValue: {
    fontSize: 19,
    color: '#285b67',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#285b67',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
  },
  resetButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Avaliacaos;
