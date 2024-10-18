import React, { useState } from 'react';
import { useRouter, Stack, Link } from 'expo-router';
import { View, TextInput, Button, Alert, ActivityIndicator, StyleSheet, Text,Image, TouchableOpacity} from 'react-native';
import { amazenar_noApp } from '@/assets/padroes/funçoes';
import { construirUrl } from '@/assets/padroes/apiConfig';

const LoginScreen = () => {
    const router = useRouter();
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

    const verificaLogin = async () => {
        if (!matricula || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Validação
            return;
        }

        console.log('Login button clicked');
        setLoading(true); // Inicia o carregamento
        try {
            const response = await fetch(construirUrl('login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matricula, senha }),
            });

            console.log('Request sent');
            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                amazenar_noApp('token', data.token);
                amazenar_noApp('matricula', matricula);
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                setMatricula(''); // Limpa o campo de matrícula
                setSenha(''); // Limpa o campo de senha
                router.push('/redirecionarHome');
            } else {
                Alert.alert('Erro', data.message || 'Erro ao realizar login.');
            }
        } catch (error) {
            console.log('Error:', error);
            Alert.alert('Erro', 'Erro ao se conectar à API');
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />


            <View style={styles.container}>

                    <View style={styles.container_logo} >

                        <Image
                            source={require('../assets/images/logo-projeto2.png')} 
                            style={styles.logo} 
                            resizeMode='contain'        
                        />


                    </View>

                    
                    <View style={styles.container_acesso} >
                        

                    <Text style={styles.text_acesso}>Matricula:</Text>
                        <TextInput
                            value={matricula}
                            onChangeText={setMatricula}
                            style={styles.input}
                        />
                    <Text style={styles.text_acesso} >Senha:</Text>
                        <TextInput
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                            style={styles.input}
                        />
                        <Link  href="/" style={styles.link_esqueci}>Esqueci a Senha !</Link>

                        {loading ? (
                            <ActivityIndicator style={styles.loading} size="large" color="#307E89" />
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={verificaLogin} >

                                <Text  style={styles.text_button}>ENTRAR</Text>


                            </TouchableOpacity>
                        )}

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text_cadastro} >E novo por aqui ? </Text>
                            <Link style={styles.link_cadastro} href="/">Cadastre-se</Link>


                        </View>
                      </View>

            
            </View>
        </>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,         
        backgroundColor: '#282525',      
        justifyContent: 'center',
             
    },
    input: {
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#307E89', 
        padding: 15,
        color: 'white', 
        borderRadius: '10%',
        fontSize: 25,
        textAlign: 'center',
        width: '60%'
    },
    container_logo: {
        flex: 1.3,
        width: '100%', 
        height: undefined,                 
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    logo: {
        width: '100%',
        height: '35%', 
        marginBottom: 40,
    },
    container_acesso: {
        flex: 2,
        alignItems: 'center',

    },
    text_acesso:{
        color: '#fff',
        paddingBottom: 10,
        fontSize: 30

    },
    link_esqueci:{
        color: 'red'

    },
    text_cadastro:{
        color: '#fff'

    },
    link_cadastro:{
        color: '#307E89'

    },
    button:{
        backgroundColor: '#307E89',
        width: '50%',
        padding: 10,
        alignItems: 'center',
        margin: 15,
        borderRadius: 10
    },
    text_button:{
        fontSize: 30,
        fontWeight: 'bold',        
        color: '#fff'

    }, 
    loading:{
        padding: 10,
        margin: 15,

    }

});

export default LoginScreen;
