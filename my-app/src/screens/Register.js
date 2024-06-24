import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            email: '',
            miniBio: '',
            fotoPerfil: '',
            error: ''
        };
    }

    componentDidMount() {
        console.log(this.state);
    }

    onSubmit(name, email, password, miniBio, fotoPerfil) {
        if (name === null || name === '' || name.length < 5) {
            this.setState({ error: 'El nombre no puede tener menos de 5 caracteres' });
            return false;
        }
        if (email === null || email === '' || !email.includes('@')) {
            this.setState({ error: 'El email es inválido' });
            return false;
        }
        if (password === null || password === '' || password.length < 6) {
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres' });
            return false;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                if (userCredential) {
                    db.collection('users')
                        .add({
                            name: this.state.name,
                            password: this.state.password,
                            email: this.state.email,
                            miniBio: this.state.miniBio,
                            fotoPerfil: ''
                        })
                        .then(resp => {
                            console.log(resp);
                            console.log('Usuario registrado');
                            this.props.navigation.navigate('Adicional', { docId: resp.id });
                        });
                }
            })
            .catch((err) => {
                if (err.code === 'auth/email-already-in-use') {
                    this.setState({ error: 'El email ya se encuentra en uso' });
                } else {
                    this.setState({ error: 'Ocurrió un error al registrar el usuario' });
                }
            });
    }

    redirect() {
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Registra tu usuario</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    placeholder='Indica tu email'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    placeholder='Indica tu contraseña'
                    keyboardType='default'
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ miniBio: text })}
                    value={this.state.miniBio}
                    placeholder='Indica una mini biografía'
                    keyboardType='default'
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => this.onSubmit(this.state.name, this.state.email, this.state.password, this.state.miniBio, this.state.fotoPerfil)}
                >
                    <Text style={styles.textBtn}>Registrarme</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.textBtn}>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={() => this.redirect()}>
                        <Text style={styles.registerText}> Ingresa aquí </Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.error !== '' ?
                        <Text style={styles.errorText}>
                            {this.state.error}
                        </Text>
                        :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  '#134056',
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
        marginTop: 10,
    },
    textBtn: {
        color: 'white',
        fontSize: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        
    },
    registerText: {
        marginLeft: 5,
        color: 'white',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Register;
