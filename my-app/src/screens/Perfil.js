import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { auth, db } from '../firebase/config';
import Feather from '@expo/vector-icons/Feather';
import Post from '../components/Post';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            posts: [],
        };
    }

    componentDidMount() {
        db.collection('users')
            .where("email", "==", auth.currentUser.email)
            .onSnapshot((docs) => {
                let arrDocs = [];
                docs.forEach((doc) => {
                    arrDocs.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({
                    usuarios: arrDocs,
                });
            });

        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            //.orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let arrPosts = [];
                docs.forEach(doc => {
                    arrPosts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                arrPosts.sort((a, b) => b.data.createdAt - a.data.createdAt)
                this.setState({
                    hayData: true,
                    posts: arrPosts
                });
            });
    }

    cerrarSesion() {
        auth.signOut();
        this.props.navigation.navigate('login');
    }

    borrarMiPerfil() {
        const user = auth.currentUser;
        const userEmail = user.email;
        db.collection('users')
            .where('email', '==', userEmail)
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    doc.ref
                        .delete()
                        .then(() => {
                            user.delete()
                                .then(() => {
                                    console.log('Se ha eliminado al usuario con exito');
                                    this.props.navigation.navigate('register');
                                })
                                .catch((err) => {
                                    console.log('No se pudo eliminar el usuario. Error: ' + err);
                                });
                            console.log('Se han eliminado los datos del usuario con exito');
                        })
                        .catch((error) => {
                            console.error('No se pudieron eliminar los datos del usuario. Error: ' + error);
                        });
                });
            })
            .catch((error) => {
                console.error('No se pudieron encontrar los datos del usuario. Error: ', error);
            });
    }

    borrarPost = (postId) => {
        db.collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                console.log('Post borrado correctamente');
            })
            .catch((error) => {
                console.error('Error al borrar el post:', error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Bienvenido/a a tu perfil</Text>
                    <Text>El email logueado es:</Text>
                    <Text>{auth.currentUser.email}</Text>
                </View>

                <View style={styles.userInfoContainer}>
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <Text style={styles.boldText}>Nombre:</Text>
                                <Text>{item.data.name}</Text>
                                <Text style={styles.boldText}>Bio:</Text>
                                <Text>{item.data.miniBio}</Text>
                                {item.data.fotoPerfil !== '' ? (
                                    <Image
                                        style={styles.userAvatar}
                                        source={{ uri: item.data.fotoPerfil }}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    null
                                )}
                            </View>
                        )}
                    />
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.cerrarSesion()}>
                        <Text style={styles.buttonText}>Cerrar sesión <Feather name="log-out" size={24} color="white" /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => this.borrarMiPerfil()}>
                        <Text style={[styles.buttonText, styles.deleteButtonText]}>Eliminar perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.postsContainer}>
                    {this.state.posts.length === 0 ? (
                        <Text style={styles.noPostsText}>Todavía no tienes posteos.</Text>
                    ) : (
                        <Text style={styles.postsText}>Aquí se muestran tus posteos</Text>
                    )}
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.postItem}>
                                <Post navigation={this.props.navigation} post={item} />
                                <TouchableOpacity style={styles.deletePostButton} onPress={() => this.borrarPost(item.id)}>
                                    <Text style={styles.deletePostText}>Borrar posteo</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    userInfoContainer: {
        marginBottom: 20,
    },
    userItem: {
        marginBottom: 10,
    },
    userAvatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#4CAF50', 
        borderRadius: 5,
    },
    deleteButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#E57373', 
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    deleteButtonText: {
        fontSize: 14, 
    },
    postsContainer: {
        flex: 1,
    },
    noPostsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    postsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    postItem: {
        marginBottom: 20,
    },
    deletePostButton: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginTop: 10,
    },
    deletePostText: {
        color: 'red',
    },
});

export default Perfil;


