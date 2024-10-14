import React, { useEffect, useState } from 'react'; 
import { useRouter, Stack } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { OrbitProgress } from 'react-loading-indicators';

import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const Tela_loading = () => {
  const [loading, setLoading] = useState(true);  
    
    return( 
    <><Stack.Screen options={{ headerShown: false }} />

    <View style={styles.container}>
        <OrbitProgress color="#307E89" size="medium" text="" textColor="" />    
    </View></>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Tela_loading;
