import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import Buscar from '../components/Buscar'
import { db, auth} from '../firebase/config'

export default class Buscador extends Component {
  constructor(props) {
    super()
    this.state = {
      users: [],
      todosMisUsers: [],
      busqueda: ''
    }
  }

  componentDidMount() {
    db.collection('users')
      .onSnapshot((docs) => {
        let users = [];
        docs.forEach((doc) => {
          users.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          users: users,
          todosMisUsers: users 
        })
      })
      {console.log('estos son mis users' + this.state.users)}
  }

  guardarBusqueda(valorInput) {
    this.setState({
      busqueda: valorInput
    })
  }

  filtroUsers(busqueda){
    let filteredUsers = this.state.todosMisUsers.filter((elm) => 
      elm.data.name.toLowerCase().includes(busqueda.toLowerCase())
  ||
      elm.data.email.toLowerCase().includes(busqueda.toLowerCase()) //electiva buscador avanzado
);
    this.setState({
      users: filteredUsers
    })
  }

  navegoAlPerfil(user){
    user === auth.currentUser.email ?
    this.props.navigation.navigate('miPerfil')
    :
    this.props.navigation.navigate('perfilOtroUser',  { user: user})
  }

  render() {
    return (
      <View>
        {console.log('estos son mis users' + this.state.users)}
        {console.log('esta es mi busqueda' + this.state.busqueda)}
        <Buscar guardarBusqueda={(valorInput) => this.guardarBusqueda(valorInput)} filtroUsers={(busqueda) => this.filtroUsers(busqueda)} />
        { this.state.busqueda !== '' ?
        (this.state.users.length !== 0 ?
          <View>
          <Text>Resultados para: {this.state.busqueda}</Text>
          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 
              <TouchableOpacity onPress={() => this.navegoAlPerfil(item.data.email)}>
              <Text>{item.data.name}</Text>
              <Text>{item.data.email}</Text> 
              </TouchableOpacity>}
          />
          </View>
          :
          <h2>No se encontraron resultados para: {this.state.busqueda}</h2>)
          :
          <Text>Busca un usuario</Text>
        }
      </View>
    )
  }
}