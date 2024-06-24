import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import MyImagePicker from '../components/MyImagePicker'
import { db } from '../firebase/config'

export default class Adicional extends Component {
    constructor(props){
        super(props)
        this.state=
        {
            fotoPerfil:''

        }

    }
    actualizarEstadoFotoPerfil(url){
        this.setState({
            fotoPerfil:url
        })
    }
        actualizarDoc (){
            console.log(this.props.route.params.docId)
            db
            .collection('users')
            .doc(this.props.route.params.docId)
            .update({
                fotoPerfil:this.state.fotoPerfil
            })
            .then(resp=>
                {
                    this.props.navigation.navigate('tabnav')
                }
            )
        }
  render() {
    return (
      <View>
        <Text>Adicional</Text>
        
        <MyImagePicker
         actualizarEstadoFotoPerfil={(url)=>this.actualizarEstadoFotoPerfil(url)}/>
         {
            this.state.fotoPerfil !== ''?
            <TouchableOpacity
            onPress={()=>this.actualizarDoc()}>
            <Text>Añadir foto de perfil</Text>
         </TouchableOpacity>
         :
         null

         }
         <TouchableOpacity>
            <Text>Omitir este paso</Text>
         </TouchableOpacity>
        
      </View>
    )
  }
}