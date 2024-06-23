import { Text, View, FlatList, TouchableOpacity,StyleSheet} from 'react-native'
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
      db.collection('users').where('email', '==', this.props.route.params.user).onSnapshot((docs)=> {
          let arrUser = []       
          docs.forEach((doc)=> {
            console.log('users'+ doc.id)
              arrUser.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
            usuarios: arrUser[0].data
          }, ()=> console.log(this.state.usuarios))
      })

      db.collection('posts').where('owner', '==', this.props.route.params.user).onSnapshot((docs)=> {
          let arrPost = []
          docs.forEach((doc)=> {
            console.log('posts' + doc.id)
              arrPost.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
            posteos: arrPost
          }, ()=> console.log(this.state.posteos))
      })
  }

render () {
  return (
    <View>
      <text>Posteos de {this.state.usuarios.email}</text>
      <text style={styles.text}> Minibio: {this.state.usuarios.miniBio}</text>
      <text style={styles.text}> la url de la foto de perfil es: {this.state.usuarios.FotoPerfil}</text>
      <text> Cantidad de posteos de {this.state.usuarios.name}: {this.state.posteos.length}</text>
                {
                  this.state.posteos.length === 0 ?
                  <Text style={styles.text}>You don't have posts yet.</Text>
                  :
                  <></>
                }
      <FlatList
                        data={this.state.posteos}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} post={item} id={item.id} />  
                            </View>
                        }
                />
    </View>
    );
  }
}

const styles = StyleSheet.create({
text: {
    color: 'red'
},
})