import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase/config';

export default class MyImagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagenCargada: ''
        };
    }

    activarPicker() {
        ImagePicker.launchImageLibraryAsync()
            .then((imgData) => this.setState({ imagenCargada: imgData.assets[0].uri }))
            .catch((err) => console.log(err));
    }

    rechazarImagen() {
        this.setState({ imagenCargada: '' });
    }

    aceptarImagen() {
        fetch(this.state.imagenCargada)
            .then((img) => img.blob())
            .then((imagen) => {
                let ref = storage.ref(`ImgDePerfil/${Date.now()}.jpeg`);
                ref.put(imagen)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((url) => this.props.actualizarEstadoFotoPerfil(url));
                    });
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.imagenCargada !== '' ? (
                    <>
                        <Image
                            style={styles.img}
                            source={{ uri: this.state.imagenCargada }}
                        />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.aceptarImagen()}
                        >
                            <Text style={styles.btnText}>Aceptar imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.rechazarImagen()}
                        >
                            <Text style={styles.btnText}>Rechazar imagen</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.text}>Sube tu foto de perfil!</Text>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.activarPicker()}
                        >
                            <Text style={styles.btnText}>Cargar una imagen guardada</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    img: {
        width: 200,
        height: 200,
        marginBottom: 10,
        borderRadius: 100,
    },
    text: {
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
    },
});

