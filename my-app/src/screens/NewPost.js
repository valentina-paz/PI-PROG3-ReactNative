import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Camara from '../components/Camara'

export default class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            descripcion: '',
            imgPostUrl: ''
        }
    }

    onSubmit(descripcion) {
        if (descripcion != '') {
            db.collection('posts').add({
                descripcion: descripcion,
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                imageUrl: this.state.imgPostUrl,
                likes: [],
                comentarios: [],
            })
                .then((resp) => {
                    this.setState({
                        descripcion: '',
                        imageUrl: '',
                        imgPostUrl: ''
                    },
                        () => this.props.navigation.navigate('home')
                    )
                })
                .catch((err) => console.log(err))
        }
    }

    actualizarImgUrl(url) {
        this.setState({
            imgPostUrl: url
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.imgPostUrl === ''
                        ?
                        <Camara actualizarImgUrl={(url) => this.actualizarImgUrl(url)} />
                        :
                        <>
                            <TextInput
                                value={this.state.descripcion}
                                onChangeText={(text) => this.setState({ descripcion: text })}
                                placeholder='Describe tu post'
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.btn}
                                onPress={() => this.onSubmit(this.state.descripcion)}
                            >
                                <Text style={styles.textBtn}>Crear post</Text>
                            </TouchableOpacity>
                        </>
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
});