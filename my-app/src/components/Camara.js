import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera/legacy'
import { storage, auth } from '../firebase/config'

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

  tomarFoto(){
    this.metodosCamara.takePictureAsync()
    .then((urlTemp) => this.setState({urlTemporal: urlTemp.uri}))
    .catch((err) => console.log(err))
  }

  descartarFoto(){
    this.setState({
      urlTemporal: ''
    })
  }

  guardarFotoEnFirebase(){
    fetch(this.state.urlTemporal)
    .then((img) => img.blob())
    .then((imgProcesada) => {
      const ref = storage.ref(`fotosPosts/${Date.now()}.jpeg`)
      ref.put(imgProcesada)
      .then((url) => {
        ref.getDownloadURL()
        .then(url => this.props.actualizarImgUrl(url))
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.dioPermiso ?
                this.state.urlTemporal === '' ?
                <>
                    <Camera 
                    style={styles.camera}
                    ref={(metodos) => this.metodosCamara = metodos}
                    type={Camera.Constants.Type.back}
                    />
                    <TouchableOpacity
                    style={styles.acepto}
                      onPress={() => this.tomarFoto()}
                    > 
                        <Text style={styles.textBtn}>Tomar foto</Text>
                    </TouchableOpacity>
                </>
                :
                <>
                  <Image 
                    style={styles.image}
                    source={{uri: this.state.urlTemporal}}
                  />
                  <TouchableOpacity
                  style={styles.rechazo}
                    onPress={() => this.descartarFoto()}
                  >
                    <Text style={styles.textBtn}>Rechazar foto</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.acepto}
                    onPress={() => this.guardarFotoEnFirebase()}
                  >
                    <Text style={styles.textBtn}>Aceptar foto</Text>
                  </TouchableOpacity>
                </>
            :
            <Text style={styles.errorText}>No diste permisos para usar la camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#134056',
      padding: 20,
  },
  camera: {
      height: 500,
      width: 500,
      marginBottom: 10,
  },
  image: {
      height: 400,
      width: '100%',
      marginBottom: 20,
  },
  acepto: {
      width: '100%',
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
  },
  rechazo: {
    width: '100%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
},
  textBtn: {
      color: 'white',
      fontSize: 16,
  },
  errorText: {
      color: 'white',
      fontSize: 16,
  },
});