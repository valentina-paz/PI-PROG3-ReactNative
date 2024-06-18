import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Coments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: '',
        };
    }
    enviarComentario(comentario) {
        db.collection('posts')
            .doc(this.props.postId)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: comentario,
                }),
            });
        this.setState({ comentario: '' });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Agrega tu comentario"
                    keyboardType="default"
                    onChangeText={(text) => this.setState({ comentario: text })}
                    value={this.state.comentario}
                    multiline={true}
                    numberOfLines={4}
                   
                />
                {this.state.comentario === '' ? null : (
                    <TouchableOpacity
                        onPress={() => this.enviarComentario(this.state.comentario)}
                        
                    >
                        <Text >Enviar</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}


