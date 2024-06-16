import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'

export default class Camara extends Component {
  constructor(props){
    super(props)
    this.state={
        dioPermiso: false,
        urlTemporal: ''
    }
    this.metodosCamara= null
  }

  componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(() => this.setState({dioPermiso: true}))
    .catch(() => console.log('No nos dieron los permisos'))
  }

  render() {
    return (
      <View style={styles.contenedor}>
        {
            this.state.dioPermiso ?
                this.state.urlTemporal === '' ?
                <>
                    <Camara 
                    type={Camera.Constants.Type.back}
                    style={styles.camara}
                    ref={(metodos) => this.metodosCamara = metodos}
                    />
                    <TouchableOpacity> 
                        <Text>Tomar foto</Text>
                    </TouchableOpacity>
                </>
                :
                <Image />
            :
            <Text>No diste permisos para usar la camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    contenedor:{
        flex: 1
    },
    camara:{
        height: 400
    }
})