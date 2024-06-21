import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import Buscar from '../components/Buscar'
import { db, auth} from '../firebase/config'

export default class Buscador extends Component {
  constructor(props) {
    super()
    this.state = {
      users: [],
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
          users: users
        })
      })
      {console.log('estos son mis users' + this.state.users.length)}
  }

  guardarBusqueda(valorInput) {
    this.setState({
      busqueda: valorInput
    })
  }

  render() {
    return (
      <View>
        <Buscar guardarBusqueda={(valorInput) => this.guardarBusqueda(valorInput)} />
        { this.state.busqueda !== '' ?
        (this.state.users.length !== 0 ?
          <View>
          <Text>Resultados para: {this.state.busqueda}</Text>
          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              <Text>{item.data.name}</Text>}
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