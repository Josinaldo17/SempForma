import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

const data = [
  { matricula: '1234', av: true, vencimento: '00/00/00' },
  { matricula: '1234', av: false, vencimento: '00/00/00' },
  // Continue para os outros itens...
];

export default function Financeiro() {
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.matricula}</Text>
      <Image
        source={item.av ? require('@/assets/images/icone-home.png') : require('@/assets/images/icone-home.png')}
        style={styles.icon}
      />
      <Text style={styles.cell}>{item.vencimento}</Text>
      <TouchableOpacity style={styles.alertButton}>
        <Text style={styles.alertButtonText}>Alertar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Matricula</Text>
        <Text style={styles.headerText}>AV</Text>
        <Text style={styles.headerText}>Vencimento</Text>
        <Text style={styles.headerText}></Text>
      </View>
      <FlatList
        data={data}
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
    padding: 15, 
    backgroundColor: '#006c81', 
    marginVertical: 5 },
   cell: {
     color: '#fff', 
     width: '25%' },
  icon: { width: 24, 
    height: 24 },
  alertButton: 
  { backgroundColor: '#cc0000', 
    padding: 10, 
    borderRadius: 5 },
  alertButtonText: 
  { color: '#fff', 
    fontWeight: 'bold' 
  },
});
