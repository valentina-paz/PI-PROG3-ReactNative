import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'
import Feather from '@expo/vector-icons/Feather';
import Post from '../components/Post';


class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usuarios: [],
            posts: [],
        }

    }
    componentDidMount() {
        db
            .collection('users').where("email", "==", auth.currentUser.email).onSnapshot((docs) => {
                let arrDocs = []
                docs.forEach((doc) => {
                    arrDocs.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    usuarios: arrDocs,
                }, () => console.log(this.state.usuarios))
            })
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs => {
            let arrPosts = []
            docs.forEach(doc => {
                arrPosts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                hayData: true,
                posts: arrPosts
            }, () => console.log(this.state.posts))

        })
        console.log(this.state.usuarios)
    }

    cerrarSesion() {
        auth.signOut
        this.props.navigation.navigate('login')
    }

    borrarPost(postId) {
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

    borrarMiPerfil() {
        const user = auth.currentUser;
        const userEmail = user.email;
        db.collection('users')
            .where('owner', '==', userEmail)
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    doc.ref
                        .delete()
                        .then(() => {
                            user.delete()
                                .then(() => {
                                    console.log('Se ha eliminado al usuario con exito')
                                    this.props.navigation.navigate('register')
                                })
                                .catch((err) => {
                                    console.log('No se pudo eliminar el usuario. Error: ' + err);
                                });
                            console.log('Se han eliminado los datos del usuario con exito')
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
    confirmarEliminarPost(postId) {
        console.log('Borrando post con ID:', postId);
        Alert.alert(
            'Confirmar Borrado',
            '¿Estás seguro de que deseas borrar este post?',
            [
                { text: 'Cancelar'},
                { text: 'Confirmar', onPress: () => this.borrarPost(postId) }
            ]
        );
    }

    render() {
        console.log('Posts:', this.state.posts);
        return (
            <View>
                <View>
                    <Text >Bienvenido/a a tu perfil</Text>
                    <Text>el email logueado es:</Text>
                    <Text>{auth.currentUser.email}</Text>

                </View>
                
                <View>
                    <Text>
                        <FlatList
                            data={this.state.usuarios}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <View>
                                <Text> Foto de perfil: {item.data.FotoPerfil}</Text>
                                <Text>nombre: {item.data.name}</Text>
                                <Text>bio: {item.data.miniBio}</Text>

                            </View>
                            }
                        /></Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.cerrarSesionBtn} onPress={() => this.cerrarSesion()}>
                        <Text >cerrar sesion<Feather name="log-out" size={24} color="black" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.borrarMiPerfil()}>
                        <Text>Eliminar mi perfil</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        this.state.posts.length === 0 ?
                            <Text> Todavia no tienes posteos.</Text>
                            :
                            <Text>Aqui se muestran tus posteos</Text>
                    }
                    <View >
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) =>
                                <View>
                                    <Post navigation={this.props.navigation} post={item} />
                                    <TouchableOpacity onPress={() => this.confirmarEliminarPost(item.id)}>
                                        <Text>Borrar posteo</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                </View>
                <View>
                </View>
            </View >
        )
    }
}

export default Perfil
const styles = StyleSheet.create({
    cerrarSesionBtn: {
        backgroundColor: 'green',
        padding: 16

    }
})
