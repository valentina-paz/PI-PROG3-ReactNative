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
      <View style={styles.container}>
        {console.log('estos son mis users' + this.state.users)}
        {console.log('esta es mi busqueda' + this.state.busqueda)}
        <Buscar guardarBusqueda={(valorInput) => this.guardarBusqueda(valorInput)} filtroUsers={(busqueda) => this.filtroUsers(busqueda)} />
        { this.state.busqueda !== '' ?
        (this.state.users.length !== 0 ?
          <View>
          <Text style={styles.resultText}>Resultados para: {this.state.busqueda}</Text>
          <FlatList
            data={this.state.users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => 
              <TouchableOpacity style={styles.userItem} onPress={() => this.navegoAlPerfil(item.data.email)}>
              <Text style={styles.userName}>{item.data.name}</Text>
              <Text style={styles.userEmail}>{item.data.email}</Text> 
              </TouchableOpacity>}
          />
          </View>
          :
          <Text style={styles.noResultsText}>No se encontraron resultados para: {this.state.busqueda}</Text>)
          :
          <Text style={styles.noResultsText}>Busca un usuario</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#134056',
      padding: 20,
  },
  resultText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
  },
  userItem: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
      backgroundColor: '#ffffff',
  },
  userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
  },
  userEmail: {
      fontSize: 14,
      color: '#666',
  },
  noResultsText: {
      color: 'red',
      marginTop: 10,
  },
});