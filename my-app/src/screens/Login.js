import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { auth } from '../firebase/config'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            email: '',
            error: ''
        }

    }
    //Para ver si algun usuario esta logueado
    componentDidMount(){
      auth.onAuthStateChanged ((user) => {
        if(user){
          console.log('Este es el mail logueado' ,auth.currentUser.email);
        }
        this.borrarCampos();
      })
    }
    borrarCampos(){
        this.setState({ email: '', password: '', error: '' });
    };

    onSubmit(email, password) {
        if (
            email === null || email === '' || !email.includes('@')
        ) {
            this.setState({ error: 'El email es invalido' })
            return false
        }
        if (

            password === null || password === '' 
        ) {
            this.setState({ error: 'La contraseña no puede tener menos de 6 caracteres' })
            return false
        }
    auth.signInWithEmailAndPassword(email,password)
    .then(user => {this.props.navigation.navigate('tabnav')})
    .catch(err => {
      if(err.code === 'auth/internal-error'){
        this.setState({error: 'Los datos ingresados son incorrectos'})
      }
    })

    }
    redirect(){
      this.props.navigation.navigate('register')
      this.borrarCampos();
  }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loguea tu usuario</Text>
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
                    secureTextEntry={true}
                    style={styles.input}
                ></TextInput>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.onSubmit(this.state.email, this.state.password)}
                >
                    <Text style={styles.btnText}>Loguearme</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.btnText}>
                        No tenes una cuenta?
                    <TouchableOpacity
                        onPress={()=> this.redirect()}
                    >
                        <Text style={styles.registerText}> Registrate aquí </Text>
                    </TouchableOpacity>
                    </Text>
                </View>
                {
                    this.state.error !== '' ?
                        <Text style={styles.errorText}>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#134056',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#ffffff',
    },
    btn: {
        width: '100%',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    registerText: {
        marginLeft: 5,
        color: '#BADBEC',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Login;