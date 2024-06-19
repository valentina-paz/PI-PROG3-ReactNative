import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            estaLogueado: false
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.setState({estaLogueado: true})
            }
        })
    }
    cerrarSesion(){
        auth.signOut()
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
    redirect() { //lo deberia hacer en cerras sesion
      this.props.navigation.navigate('login')
      
        //cuando cierre sesion tienen que reiniciarse los campos, chequear que siguen completos!!
  }
    render() {
    return (
      <View>
        <Text>Perfil del usuario</Text>
        {
            this.state.estaLogueado ?
            <TouchableOpacity
                onPress={()=> this.redirect()}
            >
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity>
                <Text>Iniciar sesion</Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}