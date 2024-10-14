import { useRouter, Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'; // Importar Animatable

const Prof_home = () => {
    

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

                
                <View style={styles.imageContainer}>
                    <Image 
                        source={require('@/assets/images/logo-projeto.png')} 
                        style={styles.logo} 
                        resizeMode='contain' 
                    />
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
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '2%',
        marginBottom: '10%',
        color: '#000',
        textAlign: 'center',
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

export default Prof_home;
