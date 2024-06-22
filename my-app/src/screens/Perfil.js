import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import React, { Component } from 'react'
import{ auth, db} from '../firebase/config'
import Feather from '@expo/vector-icons/Feather';
import Post from '../components/Post';

class Perfil extends Component {
    constructor(props){
        super(props)
        this.state ={
            usuarios: [],
            posts:[],
            hayData: false
            
        }

    }
    componentDidMount(){
        db
        .collection('users').where("owner", "==", auth.currentUser.email).onSnapshot((docs)=>{
           let arrDocs = []
           docs.forEach((doc)=>{
            arrDocs.push({
                id: doc.id,
                data:doc.data()
            })
           })
            this.setState({
            usuario : arrDocs[0].data,
            id: arrDocs[0].id
          }, () => console.log(this.state.usuarios))
        
        })
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(docs =>{
            let arrPosts = []
            docs.forEach(doc =>{
                arrPosts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
                this.setState({
                    hayData: true,
                    posts: arrPosts
                },()=> console.log(this.state.posts))
                
        })
        
        
    }
    cerrarSesion(){
        auth.signOut
        this.props.navigation.navigate('login')
    }
    
  borrarPost(postId) {
    db
    .collection('posts')
      .doc(postId)
      .delete();
  }
  render() {
    return (
      <View>
        <View>
            <Text>Bienvenido/a a tu perfil: {this.state.usuarios.name}</Text>
        </View>
        <Text>el email logueado es:</Text>
        <Text>{auth.currentUser.email}</Text>
        <View>
            <Text>
                <FlatList 
        data={this.state.usuarios}
        keyExtractor={(item)=> item.id.toString()}
        renderItem={({item})=> <View>
            <Text>nombre: {item.data.name}</Text>
            <Text>bio: {item.data.miniBio}</Text>
            </View>
        }
        /></Text>
             </View>
           
        <Image //me parece que no funciona
                  source={{uri: this.state.usuarios.FotoPerfil ? this.state.usuarios.FotoPerfil : 'https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg'}}
                  
                  resizeMode = 'contain'
                />
        
        <View>
        <TouchableOpacity style={styles.cerrarSesionBtn} onPress={()=> this.cerrarSesion()}>
                  <Text >cerrar sesion<Feather name="log-out" size={24} color="black" />
                    </Text>
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
                                 <TouchableOpacity
                
                onPress={() => this.borrarPost(item.id)}>
                    
                <Text >Borrar posteo</Text>
                
              </TouchableOpacity>
                                
                            </View>
                        }
                />
                </View>
        </View>
        <View>
       
       
        </View>
       
        
        
      </View>
    )
  }
}
export default Perfil
const styles =StyleSheet.create({
    cerrarSesionBtn :{
        backgroundColor: 'green',
        padding: 16

    }
})

/*

      
  }

   



  render() {
    return (
     
                <View >
                
                <Text>Tus posteos</Text>
                {
                  this.state.posts.length === 0 ?
                  <Text> Todavia no hay posteos.</Text>
                  :
                  <></>
                }
                <View >
                <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) =>
                            <View>
                                <Post navigation={this.props.navigation} data={item} id={item.id} profile = {true}/>
                                
                            </View>
                        }
                />
                </View>
                </View> )}}*/