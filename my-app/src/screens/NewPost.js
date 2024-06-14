import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../firebase/config'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            descripcion: ''
        }
    }

    onSubmit(descripcion){
        if(descripcion.length != ''){
            db.collection('posteos').add({
                descripcion: descripcion,
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                imageUrl: '',
                likes: [],
                comments: []
            })
            .then((resp)=>{
                this.setState({
                    descripcion: '' //cuando tengamos la foto tenemos que limpiarla tambien
                },
            () => this.props.navigation.navigate('home')
            )
        })
            .catch((err) => console.log(err))
        }
    }

  render() {
    return (
      <View>
        <TextInput
        value= {this.state.descripcion}
        onChangeText={(text) => this.setState({descripcion: text})}
        placeholder='Describe tu post'
        style={styles.input}
        />
        <TouchableOpacity
            onPress={()=> this.onSubmit(this.state.descripcion)}
        >
            <Text>Crear post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
    input:{
        borderColor: 'green',
        borderWidth: 1,
    }
})