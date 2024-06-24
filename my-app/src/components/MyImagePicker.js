import {  Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase/config';


export default class MyImagePicker extends Component {
    constructor(props){
        super(props)
        this.state={
            imagenCargada:''
        }
    }
    activarPicker(){
        ImagePicker.launchImageLibraryAsync()
        .then(imgData=>this.setState({imagenCargada: imgData.assets[0].uri}))
        .catch(err=>console.log(err))
    }
    rechazarImagen(){
        this.setState({imagenCargada:''})
    }
    aceptarImagen(){
        
            fetch(this.state.imagenCargada)
            .then((img) => img.blob())
            .then((imagen)=>{
                let ref=storage.ref(`ImgDePerfil/${Date.now()}.jpeg`)
                ref.put(imagen)
                .then(()=>{
                ref.getDownloadURL()
                .then()
            })
            })
            .catch(err => console.log(err))
          }
        
        

    

  render() {
    return (
      <View>
        
            {
                this.state.imagenCargada !== ''?
                <>
                <Image
                style={styles.img}
                source={{uri:this.state.imagenCargada}}
                />
                <TouchableOpacity
                 onPress={()=>this.aceptarImagen()}>
                    <Text>Aceptar imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>this.rechazarImagen()}>
                    <Text>Rechazar imagen</Text>
                </TouchableOpacity>
                </>
                :
                <>
                <Text>sube tu foto de perfil!</Text>
                <TouchableOpacity
                 onPress={()=>this.activarPicker()}>
                    <Text> Cargar una imgaen guardada</Text>
                 </TouchableOpacity>
        
                </>
        

            }
            </View>
          
    )
  }
}
const styles=StyleSheet.create({
    img:{
       height: 200
    }
})

