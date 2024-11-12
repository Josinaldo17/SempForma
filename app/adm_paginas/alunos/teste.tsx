import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <Text style={styles.headerText}>Perfil</Text>

      <View style={styles.card}>
        {/* Ícone de perfil (imagem do usuário) */}
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // URL placeholder para a imagem de perfil
          style={styles.profileImage}
        />

        {/* Nome do Aluno e Informações Pessoais */}
        <Text style={styles.nameText}>Nome do aluno</Text>
        <Text style={styles.infoText}>Cpf: 000..-67</Text>
        <Text style={styles.infoText}>Nasc: 00/00/0000</Text>

        {/* Informações sobre a matrícula, pagamento, etc. */}
        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Matrícula</Text>
            <Text style={styles.infoValue}>1234</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Vencimento</Text>
            <Text style={styles.infoValue}>dia 02</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Pagamento</Text>
            <Text style={styles.infoValue}>Pendente</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValue}>00:00</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Intensidade</Text>
            <Text style={styles.infoValue}>Pesado</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Avaliação</Text>
            <Text style={styles.infoValue}>00/00/0000</Text>
          </View>
        </View>

        {/* Botão de Avaliação */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avaliação</Text>
        </TouchableOpacity>

        {/* Botão de Redefinir Senha */}
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#285b67', // Cor de fundo da tela principal
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    top: 40,
    left: 20,
  },
  card: {
    backgroundColor: '#f4f4f4',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 12,
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
    fontSize: 12,
    color: '#6b6b6b',
  },
  infoValue: {
    fontSize: 16,
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
    fontSize: 16,
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