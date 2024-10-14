import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(''); // Estado para armazenar o token

    const handleLogin = async () => {
        console.log('Login button clicked'); // Log para verificar se o botão foi clicado
        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Adiciona o cabeçalho correto
                },
                body: JSON.stringify({ username, password }),
            });

            console.log('Request sent'); // Verifica se a requisição foi enviada

            const data = await response.json(); // Tenta converter o corpo da resposta em JSON
            console.log('Response:', data); // Verifica a resposta do backend

            if (response.ok) {
                setToken(data.token); // Armazena o token retornado
                Alert.alert('Sucesso', 'Login realizado com sucesso!'); // Alerta de sucesso
                router.push('/(alunos)/aluno_midia');
            } else {
                Alert.alert('Erro', data.message); // Alerta de erro
            }
        } catch (error) {
            console.log('Error:', error); // Loga o erro no console
            Alert.alert('Erro', 'Erro ao se conectar à API'); // Alerta de erro de conexão
        }
    };

    return (
        
    <>

      <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
            <TextInput
                placeholder="Nome de usuário"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Entrar" onPress={handleLogin} />
            {token ? <Text style={styles.tokenText}>Token: {token}</Text> : null} {/* Exibe o token se existir */}
        </View>
          
    </>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
    },
    tokenText: {
        marginTop: 20,
        fontSize: 16,
        color: 'green',
    },
});

export default LoginScreen;
