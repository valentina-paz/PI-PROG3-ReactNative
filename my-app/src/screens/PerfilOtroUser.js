import { Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity,StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth } from '../firebase/config'
import Post from '../components/Post'

export default class PerfilOtroUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuarios: [],
            posteos: []
        }
    }

componentDidMount(){
  db.collection('usuarios')
  .where('owner', '==', this.props.route.params.user)
  .onSnapshot((docs)=> {
      let arrayUsuarios = []       
      docs.forEach((doc)=> {
          arrayUsuarios.push({
              id: doc.id,
              data: doc.data()
          })
      })
      this.setState({
          usuarios: arrayUsuarios[0].data}, ()=> console.log(this.state.usuarios))
  })

  db.collection('posteos')
  .where('owner', '==', this.props.route.params.user)
  .onSnapshot((docs)=> {
      let arrayPosteo = []
      docs.forEach((doc)=> {
          arrayPosteo.push({
              id: doc.id,
              data: doc.data()
          })
      })
      this.setState({
          posteos: arrayPosteo }, ()=> console.log(this.state.posteos))
  })
}

render () {
  return (
    <View>
        <View> 
          <Text> Perfil </Text>
          <FlatList
            data={this.state.usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              
              <View>
                <Text> Usuario: {item.data.name}</Text>
                {item.data.fotoPerfil != '' ? (
                  <Image
                    source={item.data.FotoPerfil}
                    resizeMode="contain"
                  /> ) : ''}
                <Text>Email del usuario: {item.data.owner}</Text>
                
              </View>
            )}
          />
        </View>

          <Text>Posteos</Text>
          <Text>Cantidad de posteos: {this.state.posteos.length}</Text>
          {
            this.state.posteos.length === 0 
            ?
            <Text> El usuario no tiene posteos aun.</Text>
            :
            <></>
          }
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Post navigation={this.props.navigation} data={item.data} id={item.id} />
              </View>
            )}
          />
      </View>
    );
  }
}