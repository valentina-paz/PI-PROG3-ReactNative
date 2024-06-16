import { Text, View } from 'react-native'
import React, { Component } from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home'
import NewPost from '../screens/NewPost'
import Perfil from '../screens/Perfil'
import Buscador from '../screens/Buscador';

const Tab = createBottomTabNavigator()

export default class TabNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen 
        name='home' 
        component= {Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
        }}/>
        <Tab.Screen 
        name='new-post' 
        component= {NewPost}
        options={{headerShown: false,
          tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="black" />
        }}/>
        <Tab.Screen 
        name='search' 
        component= {Buscador}
        options={{headerShown: false,
          tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />
        }}/>
        <Tab.Screen 
        name='profile' 
        component= {Perfil}
        options={{headerShown: false,
          tabBarIcon: () => <FontAwesome name="user-circle" size={24} color="black" />
        }}/>
      </Tab.Navigator>
    )
  }
}