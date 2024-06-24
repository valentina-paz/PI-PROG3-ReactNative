import { Text, View, FlatList, TouchableOpacity,StyleSheet, Image} from 'react-native'
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
      <View style={styles.profileHeader}>
      <Text style={styles.headerText}>Perfil de  {this.state.usuarios.name}</Text>
      <Image
          source={{uri: this.state.usuarios.fotoPerfil ? this.state.usuarios.fotoPerfil : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
          style = {styles.img}
          resizeMode = 'contain'
      />
         {
                  this.state.usuarios.miniBio === '' ?
                  <Text style={styles.noPostsText}>El usuario no tiene Biografia.</Text>
                  :
                  <Text style={styles.noBio}>{this.state.usuarios.miniBio}</Text>
                }
        
        
       
        <Text style={styles.postCountText}> Cantidad de posteos de {this.state.usuarios.name}: {this.state.posteos.length}</Text>
      </View>
                {
                  this.state.posteos.length === 0 ?
                  <Text style={styles.noPostsText}>El usuario no tiene posteos.</Text>
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
      backgroundColor: '#134056'
  },
  noBio: {
    fontStyle: 'italic',
      marginTop: 10,
      textAlign: 'center',
      color: '#0F6591',
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  img: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileHeader: {
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#BADBEC',
      padding: 15,
      borderRadius: 10,
  },
  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
  },
  bioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
},
bioContent: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 15,
},

postCountText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
},
  noPostsText: {
      fontStyle: 'italic',
      marginTop: 10,
      textAlign: 'center',
      color: 'white',
      fontSize: 25
  },
  postsContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
  },
});