import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            estaMiLike: false,
        }
    }

  componentDidMount(){
    console.log( 'mis props son estas', this.props)
    let estaMiLike = this.props.post !== undefined ? this.props.post.data.likes.includes(auth.currentUser.email) : false
    if(estaMiLike){
        this.setState({estaMiLike: true})
    }
  }

  ponerLike(){
    db.collection('posts')
        .doc(this.props.post.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) => this.setState({estaMiLike: true}))
        .catch(err => console.log(err))
  }

  sacarLike(){
    db.collection('posts')
    .doc(this.props.post.id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then((resp) => this.setState({estaMiLike: false}))
    .catch(err => console.log(err))
  }
  
  verComentarios(){
    this.props.navigation.navigate('Comments', {id:this.props.id})

  }

  navegoAlPerfil(){
    this.props.post.data.owner === auth.currentUser.email ?
    this.props.navigation.navigate('miPerfil')
    :
    this.props.navigation.navigate('perfilOtroUser',  { user: this.props.post.data.owner})
  }

  render() {
    return (
      <View style={styles.containerPost}>
        <Image 
          source={{uri: this.props.post.data.imageUrl}}
          style={styles.imgPost}
        />
        <TouchableOpacity onPress={() => this.navegoAlPerfil()}>
          <Text>{this.props.post.data.owner}</Text>
        </TouchableOpacity>
        <Text>{this.props.post.data.descripcion}</Text>
        <Text>{this.props.post.data.likes.length}</Text>
        {
            this.state.estaMiLike ?
                <TouchableOpacity onPress={()=> this.sacarLike()}>
                    <FontAwesome name='heart' size={24} color={'red'} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.ponerLike()}>
                    <FontAwesome name='heart-o' size={24} color={'red'} />
                </TouchableOpacity>
            }
          <View>
            <FlatList 
              data={this.props.post.data.comentarios.slice(-4).reverse()} //electiva 4 comentarios debajo del post
              keyExtractor={(item, index) => index.toString()} //usamos index porque no tiene id y si no tira error porque item puede no ser unico
              renderItem={({item}) => 
              <View> 
                <Text>{item.owner}</Text>
                <Text>{item.comentario}</Text>
              </View>}
            />
              <TouchableOpacity onPress={()=>this.verComentarios()}> <Text> Ver comentarios: {this.props.post.data.comentarios.length} </Text>
              </TouchableOpacity>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerPost: {
    marginBottom: 16
  },
  imgPost: {
    height: 200,
    width: '100%'
  }
})