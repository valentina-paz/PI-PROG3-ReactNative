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
      {/* {this.state.usuarios.fotoPerfil != '' ? (
                  <Image
                    source={this.state.usuarios.fotoPerfil}
                    style={styles.img}
                    resizeMode="contain"
                  />
                ) : ''} */}
        <Text style={styles.headerText}>Posteos de {this.state.usuarios.name}</Text>
        <Text style={styles.bioText}>Minibio: <Text style={styles.bioContent}>{this.state.usuarios.miniBio}</Text></Text>
       
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
      color: '#666',
  },
  postsContainer: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
  },
});