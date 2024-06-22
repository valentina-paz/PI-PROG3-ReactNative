import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'


class Coments extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario:''
    }
  }
  enviarComentario(comentario){
   
    db 
    .collection('posts')
    .doc(this.props.postId)
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        owner:auth.currentUser.email,
        createdAt: Date.now(),
        comentario: comentario
      })
    })

  }
  render() {
    return (
      <View>
        <TextInput
        placeholder='Agrega un comentario'
        keyboardType='default'
        onChangeText={(text)=>this.setState({comentario: text})}
        value= {this.state.comentario} 
        multiline={true}
        numberOfLines={5}
        style={StyleSheet.input}/>

                   
        <TouchableOpacity
        onPress={()=>this.enviarComentario(this.state.comentario)}>  
        <FontAwesome name='send' size={30} color={'black'} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Coments
const styles = StyleSheet.create({
  input : {
    borderwidth: 1,
    borderColor: 'green'
  }
})