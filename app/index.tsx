import { useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Importar Animatable
import { construirUrl } from '@/assets/padroes/apiConfig';

const LoginScreen = () => {
    const router = useRouter();
    const [token, setToken] = useState('vedadeiro');

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../assets/images/logo-projeto.png')} 
                        style={styles.logo} 
                        resizeMode='contain' 
                    />
                </View>

                <Animatable.View 
                    animation="slideInUp"    
                    duration={2000}          
                    style={styles.rodape}
                >
                    <Text style={styles.title}>Acompanhe seu desempenho em treinamento funcional de qualquer lugar!</Text>
                    <TouchableOpacity style={styles.botao} onPress={ () => router.push('/redirecionarHome')}>
                        <Text style={styles.textBotao}>Acessar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#282525',        
    },
    imageContainer: {
        flex: 3,  
        width: '60%', 
        height: undefined,                 
        justifyContent: 'center',
        aspectRatio: 1, 
    },
    logo: {
        width: '100%',
        height: '25%', 
    },
    rodape: {
        flex: 1,  
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: '4%',
        bottom: 0,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '2%',
        marginBottom: '10%',
        color: '#000',
        textAlign: 'left', 
    },
    botao: {
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#307E89',
        width: '60%',
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        bottom: '10%'      
    },
    textBotao: {
        color: '#fff',      
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export default LoginScreen;
