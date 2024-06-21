import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth} from '../firebase/config'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            email: '',
            miniBio: '',
            FotoPerfil: '',

        }

    }
    componentDidMount(){

    }

    onSubmit(name, email, password) {
        if (
            name === null || name === '' || name.length < 5
        ) {
            this.setState({ error: 'El name no puede tener menor de 5 caracteres' })
            return false
        }
        if (
            email === null || email === '' || !email.includes('@')
        ) {
            this.setState({ error: 'El email es invalido' })
            return false
        }
        if (

            password === null || password === '' || password.length < 6
        ) {
            this.setState({ error: 'La contraseña no puede tener menos de 6 caracteres' })
            return false
        }

        auth.createUserWithEmailAndPassword(email, password)
        
            .then((user) => {
                if (user) {
                    db.collection('users')
                    .add({
                      name: this.state.name,
                      password: this.state.password,
                      email: this.state.email,
                      miniBio: this.state.miniBio,
                      FotoPerfil: this.state.FotoPerfil
                    })
                    console.log('usuario registrado')
                    this.props.navigation.navigate('tabnav')
                }
            })
            .catch((err) => {
                if (err.code === "auth/email-already-in-use") {
                    this.setState({ error: 'El email ya se encuentra en uso' })
                }
            })



    }
    redirect() {
        this.props.navigation.navigate('login')
        

    }
    render() {
        return (
            <View>
                <Text>Registra tu usuario</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    placeholder='Indica tu email'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    placeholder='Indica tu contraseña'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({ miniBio: text })}
                    value={this.state.miniBio}
                    placeholder='Indica una mini biografia'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({ FotoPerfil: text })}
                    value={this.state.FotoPerfil}
                    placeholder='Agrega una foto de perfil'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.onSubmit(this.state.name, this.state.email, this.state.password, this.state.miniBio, this.state.FotoPerfil)}
                >
                    <Text style={styles.textBtn}>Registrarme</Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        Ya tienes una cuenta?
                        <TouchableOpacity
                            onPress={() => this.redirect()}
                        >
                            <Text> Ingresa aquí </Text>
                        </TouchableOpacity>

                    </Text>
                </View>
                {
                    this.state.error !== '' ?
                        <Text>
                            {this.state.error}
                        </Text>
                        :
                        ''
                }
            </View>
    )
    }
}
const styles = StyleSheet.create({
    input: {
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,

    },
    btn: {
        backgroundColor: 'green',
        textAlign: 'center',
        padding: 10
    },
    textBtn: {
        color: 'white',
    }
})

export default Register;