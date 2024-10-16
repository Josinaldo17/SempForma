import React, { useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { amazenar_noApp, removeData } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';

const LoginScreen = () => {
    const router = useRouter();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');


    const verificaLogin = async () => {
        console.log('Login button clicked'); 
        try {
            const response = await fetch(construirUrl('login'), {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ "matricula": matricula, "senha": senha }),
            });

            console.log('Request sent'); 
            const data = await response.json(); 
            console.log('Response:', data); 

            if (response.ok) {
                amazenar_noApp('token', data.token);
                amazenar_noApp('matricula', matricula);
                Alert.alert('Sucesso', 'Login realizado com sucesso!'); 
                router.push('/redirecionarHome');
            } else {
                Alert.alert('Erro', data.message); 
            }
        } catch (error) {
            console.log('Error:', error); 
            Alert.alert('Erro', 'Erro ao se conectar à API'); 
        }
    };

    return (
        
    <>

      <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
            <TextInput
                placeholder="Nome de usuário"
                value={matricula}
                onChangeText={setMatricula}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Entrar" onPress={verificaLogin} />
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
