import React , { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native';
import LoginScreen from '@/screens/LoginScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    
  const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          title: null,
          headerTitleAlign: null,
          headerRight: null,
        });
      }, []);

    return (
        <Tab.Navigator>
            {/* Defina suas abas aqui */}
            <Tab.Screen name="Login" component={LoginScreen} />
            {/* Adicione outras abas conforme necessário */}
        </Tab.Navigator>
    );
};

export default Tabs;

