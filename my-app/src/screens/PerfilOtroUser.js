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
    <View style={styles.container}>
      <Text style={styles.headerText}>Posteos de {this.state.usuarios.email}</Text>
      <Text style={styles.bioText}>Minibio: {this.state.usuarios.miniBio}</Text>
      {/* <Text style={styles.text}> la url de la foto de perfil es: {this.state.usuarios.FotoPerfil}</Text> */}
      <Text style={styles.postCountText}> Cantidad de posteos de {this.state.usuarios.name}: {this.state.posteos.length}</Text>
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
                                <View style={styles.postsContainer}>
                                    <Post navigation={this.props.navigation} post={item} id={item.id} />  
                                </View>
                            }
                    />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f2f2f2',
  },
  headerBackground: {
      height: 200,
      justifyContent: 'flex-end',
  },
  headerOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 20,
  },
  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#ffffff',
  },
  bioContainer: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginTop: -30,
      marginHorizontal: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  bioText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  bioContent: {
      fontSize: 16,
      lineHeight: 22,
  },
  postCount: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
  },
  noPostsText: {
      fontStyle: 'italic',
      marginTop: 10,
      marginLeft: 20,
  },
  postsContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 3,
  },
  postCountText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
},
});