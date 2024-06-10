import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../screens/Register'
import Login from '../screens/Login'


const Stack= createNativeStackNavigator();

class MainNav extends Component {
  render() {
    return (
     <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='register' component={Register}/>
            <Stack.Screen name='login' component={Login}/>

        </Stack.Navigator>
     </NavigationContainer>
    )
  }
}

export default MainNav