import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Image, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const Alunos_inicio = () => {
  const navigation = useNavigation();  
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);   
  const [matriculaAluno, setMatriculaAluno] = useState();  

  const [isProfileModalVisible, setProfileModalVisible] = useState(false); 
  
  useEffect(() => {
    navigation.setOptions({
      title: 'Alunos',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: estilo_padrao.Colors.background, 
        borderBottomWidth: 1, 
        borderBottomColor: estilo_padrao.Colors.primary, 
      },
      headerTitleStyle: {
        fontWeight: 'bold', 
        color: '#fff', 
      },
      headerRight: () => (
        <TouchableOpacity onPress={ () => router.push('../../login_paginas/cadastro')}>
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

  

  const toggleProfileModal = () => setProfileModalVisible(!isProfileModalVisible);

  const VizualizarAluno = (matricula) => {
    const aluno = data.find((item) => item.matricula === matricula);
    setMatriculaAluno(aluno);
    setProfileModalVisible(!isProfileModalVisible);
  };
    
  
  const renderItem = ({ item }) => (


    <TouchableOpacity onPress={() => VizualizarAluno(item.matricula)} >    
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
      
      <View style={styles.containerinput} >


          <TouchableOpacity>
          <Image
          source = {require('@/assets/images/icone-filtro.png')}
          style={styles.iconelupa}
          
          />
          </TouchableOpacity>

          <TextInput
            placeholder="Matricula"
            style={styles.buscaInput}
          />
          <TouchableOpacity>
          <Image
          source = {require('@/assets/images/icone-lupa.png')}
          style={styles.iconelupa}
          
          />
          </TouchableOpacity>

      </View>

      <FlatList
        data={data}           
        keyExtractor={(item) => item.matricula.toString()}        
        renderItem={renderItem}  
      />
    </View>
    <ScrollView   style={styles.teste}>


    {matriculaAluno && (

            <Modal
            visible={isProfileModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleProfileModal}
          >
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
                <Text style={styles.nameText}>{matriculaAluno.nome}</Text>
                <Text style={styles.infoText}>Cpf: {matriculaAluno.cpf}</Text>
                <Text style={styles.infoText}>Nasc: {matriculaAluno.nive}</Text>
  
                {/* Informações sobre a matrícula, pagamento, etc. */}
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Matrícula</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.matricula}</Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Vencimento</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.vencimento}</Text>
                  </View>
                </View>
  
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Pagamento</Text>
                    <Text style={styles.infoValue}>Pendente</Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Horário</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.horario}</Text>
                  </View>
                </View>
  
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Intensidade</Text>
                    <Text style={styles.infoValue}>Pesado</Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Avaliação</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.avaliacao}</Text>
                  </View>
                </View>
                  
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Altura</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.altura}</Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Peso</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.peso}</Text>
                  </View>
                </View>

                                  
                <View style={styles.infoRow}>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Sexo</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.sexo}</Text>
                  </View>
                  <View style={styles.infoColumn}>
                    <Text style={styles.infoLabel}>Telefone</Text>
                    <Text style={styles.infoValue}>{matriculaAluno.telefone}</Text>
                  </View>
                </View>
  
              </View>
            </View>
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
    borderLeftWidth: 2,
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

export default Alunos_inicio;
