import React, { useState } from 'react';
import { useRouter, Stack, Link } from 'expo-router';
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { amazenar_noApp } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';
import estilo_padrao from '@/assets/padroes/estilo_padrao';

const Esqueci_senha = () => {
    const router = useRouter();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

    const Solicitar = async () => {
        setLoading(true); 
        // Aqui você pode colocar a lógica para enviar a solicitação de recuperação de senha
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.container}>
                <View style={styles.container_logo}>
                    <Image
                        source={require('../../assets/images/logo-projeto2.png')} 
                        style={styles.logo} 
                        resizeMode='contain'        
                    />
                    <Text style={styles.text_acesso}>Recuperação de senha</Text>
                </View>

                {loading ? (
                    <View style={styles.container_acesso}>
                        <View style={styles.card}>
                            <Text style={styles.message}>Solicitação de senha enviada. Aguarde a confirmação do administrador.</Text>
                            <ActivityIndicator style={styles.loading} size="large" color="#307E89" />
                            <TouchableOpacity style={styles.button} onPress={() => { router.push('/'); setLoading(false); }}>
                                <Text style={styles.text_button}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.container_acesso}>
                        <Text style={styles.text_acesso}>Matricula:</Text>
                        <TextInput
                            value={matricula}
                            onChangeText={setMatricula}
                            style={styles.input}
                        />
                        <Text style={styles.text_acesso}>CPF:</Text>
                        <TextInput
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                            style={styles.input}
                        />

                        <TouchableOpacity style={styles.button} onPress={Solicitar}>
                            <Text style={styles.text_button}>ENVIAR</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,         
        backgroundColor: estilo_padrao.Colors.background,     
        justifyContent: 'center',      
    },
    input: {
        marginBottom: 10,
        borderWidth: 3,
        borderColor: estilo_padrao.Colors.primary, 
        padding: 15,
        color: 'white', 
        borderRadius: 10,
        fontSize: 25,
        textAlign: 'center',
        width: '60%'
    },
    container_logo: {
        flex: 1.3,
        width: '100%', 
        height: undefined,                 
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    logo: {
        width: '50%',
        height: '50%', 
        marginBottom: 40,
    },
    container_acesso: {
        flex: 3.4,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#f4f4f4',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    text_acesso: {
        color: '#fff',
        paddingBottom: 10,
        fontSize: 30
    },
    button: {
        backgroundColor: estilo_padrao.Colors.primary,
        width: '50%',
        padding: 10,
        alignItems: 'center',
        margin: 15,
        borderRadius: 10
    },
    text_button: {
        fontSize: 30,
        fontWeight: 'bold',        
        color: '#fff'
    }, 
    loading: {
        padding: 10,
        margin: 15,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        marginBottom: 20,
    },
});

export default Esqueci_senha;
