import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
  
const notificacoes = [
   { id: '1', objetivo: 'Objetivo 1', destinatario: 'Destinatario 1', data: '00/00/00', mensagem: 'A jndswudonsenijs fsd faeud s Problema Cardiaco ?' },
   { id: '2', objetivo: 'Objetivo 2', destinatario: 'Destinatario 2', data: '00/00/00', mensagem: 'A jndswudonsenijs fsd faeud s Problema Cardiaco ?' },
   // Continue para os outros itens...
];

const Aluno_notificacao = () => {
  
  const renderNotificacao = ({ item }) => (
    <View style={styles.card}>
      {/* Objetivo e Destinatário na mesma linha */}
      <View style={styles.row}>
        <Text style={styles.label}>Objetivo:</Text>
        <Text style={styles.objetivo}>{item.objetivo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Destinatário:</Text>
        <Text style={styles.destinatario}>{item.destinatario}</Text>
      </View>

      {/* Data */}
      <Text style={styles.data}>{item.data}</Text>

      {/* Mensagem */}
      <Text style={styles.mensagem}>{item.mensagem}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificação</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar mensagem..."
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={notificacoes}
        renderItem={renderNotificacao}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#004d5a', padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  searchContainer: { backgroundColor: '#333', borderRadius: 10, paddingHorizontal: 10, marginBottom: 20 },
  searchInput: { color: '#fff', paddingVertical: 8, fontSize: 16 },
  
  card: { 
    backgroundColor: '#333', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: '#666' 
  },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  label: { fontSize: 14, color: '#aaa', fontWeight: 'bold' },
  
  objetivo: { color: '#fff', fontSize: 14, textAlign: 'right', flex: 1 },
  destinatario: { color: '#fff', fontSize: 14, textAlign: 'right', flex: 1 },
  
  data: { color: '#fff', fontSize: 12, textAlign: 'right', marginBottom: 10 },
  mensagem: { color: '#fff', fontSize: 14, backgroundColor: '#005f6b', padding: 10, borderRadius: 5 },
});
  

export default Aluno_notificacao;
