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
      <text style={styles.text}> la url de la foto de perfil es: {this.state.usuarios.FotoPerfil}</text>
      <text style={styles.text}>soy el perfil de: {this.state.usuarios.name}</text>
      <text style={styles.text}>el email es: {this.state.usuarios.email}</text>
      <text style={styles.text}>minibio: {this.state.usuarios.miniBio}</text>


      <text>POSTEOS</text>
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
  signoutBtn:{
    backgroundColor: '#4caf50',
      color: '#fff',
      padding: 10,
      border: 'none',
      borderRadius: 4,
      width: 100
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: '50%'
},
btn:{
  backgroundColor: '#87ceeb',
  color: '#fff',
  padding: 10,
  border: 'none',
  borderRadius: 4,
  width: 150
},
text: {
    color: 'red'
},
container: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 'wrap',
  flexDirection: 'wrap'
},
backgroundImage: {
  flex: 1,
  resizeMode: 'cover', 
  justifyContent: 'center',
},
txt: {
    color: 'white'
}
})