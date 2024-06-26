import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'
import TabNav from './TabNav'
import Comentarios from '../screens/Comentarios'
import PerfilOtroUser from '../screens/PerfilOtroUser'
import Profile from '../screens/Perfil'
import Adicional from '../screens/Adicional'

const Stack= createNativeStackNavigator();

class MainNav extends Component {
  render() {
    return (
     <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
            name='register' 
            component={Register}
            options={{headerShown: false}}
            />
            <Stack.Screen 
            name='login' 
            component={Login}
            options={{headerShown: false}}/>
            <Stack.Screen 
            name='tabnav' 
            component={TabNav} 
            options={{headerShown: false}}/>
            <Stack.Screen
            name='Comments'
            component={Comentarios}
            options={{headerShown: true}}/>
            <Stack.Screen 
            name='miPerfil' 
            component={Profile} 
            options={{headerShown: false}}/>
            <Stack.Screen 
            name='perfilOtroUser' 
            component={PerfilOtroUser} 
            options={{headerShown: true}}/>
            <Stack.Screen
            name='Adicional'
            component={Adicional}
            options={{headerShown:false}}/>
        </Stack.Navigator>
     </NavigationContainer>
    )
  }
}

export default MainNav