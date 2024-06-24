import { Text, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'

export default class Buscar extends Component {
    constructor(props) {
        super(props)
    }

    evitarSubmit(evento) {
        evento.preventDefault()
    }

    filtradoYGuardado(busqueda){
        this.props.guardarBusqueda(busqueda)
        this.props.filtroUsers(busqueda)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Buscador</Text>
                <TextInput
                    onChangeText={(busqueda) => this.filtradoYGuardado(busqueda)}
                    placeholder='Busca un usuario'
                    keyboardType='default'
                    style={styles.input}
                ></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        color: '#333',
    },
});