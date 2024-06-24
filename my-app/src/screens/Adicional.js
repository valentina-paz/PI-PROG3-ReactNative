import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MyImagePicker from '../components/MyImagePicker';
import { db } from '../firebase/config';

class Adicional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FotoDePerfil: ''
        };
    }

    actualizarEstadoFotoPerfil(url) {
        this.setState({
            FotoDePerfil: url
        });
    }

    actualizarDoc() {
        console.log(this.props.route.params.docId);
        db.collection('users')
            .doc(this.props.route.params.docId)
            .update({
                fotoPerfil: this.state.FotoDePerfil
            })
            .then(resp => {
                this.props.navigation.navigate('tabnav');
            });
    }

    omitirPaso() {
        this.props.navigation.navigate('tabnav');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Elige tu foto de perfil</Text>

                <MyImagePicker actualizarEstadoFotoPerfil={(url) => this.actualizarEstadoFotoPerfil(url)} />

                {this.state.FotoDePerfil !== '' ? (
                    <TouchableOpacity style={styles.btn} onPress={() => this.actualizarDoc()}>
                        <Text style={styles.btnText}>Añadir foto de perfil</Text>
                    </TouchableOpacity>
                ) : null}

                <TouchableOpacity style={styles.btn} onPress={() => this.omitirPaso()}>
                    <Text style={styles.btnText}>Omitir este paso</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#134056',
    },
    btn: {
        width: '100%',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Adicional;
