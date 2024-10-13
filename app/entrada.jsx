
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Certifique-se de importar useRouter


const LoginScreen = () => {
    const router = useRouter();
    const [token, setToken] = useState('falso'); // Estado do token

    const handleLogin = () => {
        // Condição para redirecionar com base no valor do token
        if (token === 'vedadeiro') {
            console.log('Token verdadeiro, redirecionando para Home');
            router.push('/(tabs)/home'); // Redireciona para a tela Home
        } else {
            console.log('Token falso, redirecionando para Login');
            router.push('/midia'); // Redireciona para a tela de Login
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/icone-home.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>
                Monitore, organize suas gastos de qualquer lugar!
            </Text>
            <Text style={styles.footer}>
                Faça o login para começar
            </Text>
            <Button title="Acessar" onPress={handleLogin} />
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00BFAE', // Cor de fundo
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20, // Espaçamento abaixo da logo
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10, // Espaçamento abaixo do título
    },
    footer: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20, // Espaçamento abaixo do rodapé
    },
});

export default LoginScreen;

