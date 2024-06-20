import { Text, View, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'

export default class Buscar extends Component {
    constructor(props) {
        super(props)
    }

    evitarSubmit(evento) {
        evento.preventDefault()
    }

    render() {
        return (
            <View>
                <Text>Buscador</Text>
                <TextInput
                    onChangeText={(text) => this.props.guardarBusqueda(text)}
                    //value={this.state.password}
                    placeholder='Busca un usuario'
                    keyboardType='default'
                    style={styles.form}
                ></TextInput>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        color: 'black',
    },
})