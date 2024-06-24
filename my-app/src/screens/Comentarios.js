import { FlatList, Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Coments from '../components/Coments'
import { db } from '../firebase/config'

 class Comentarios extends Component {
    constructor(props){
        super(props)
        this.state={
          infoPost: null,
          comentarios:[]
        }

       
    }
    componentDidMount(){
        db
        .collection('posts')
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=>{
          
          
          this.setState({infoPost: doc.data()})

        })
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Comentarios:</Text>
        {this.state.infoPost !=null?
        <FlatList
        data={this.state.infoPost.comentarios.sort((a,b)=>a.createdAt - b.createdAt).reverse()}
        keyExtractor={(item)=> item.createdAt.toString()}
        renderItem={({item})=> <View style={styles.commentContainer}>
          <Text style={styles.commentOwner} >{item.owner}</Text>
          <Text style={styles.commentText}>{item.comentario}</Text>
        </View>}
        />
        :
        <Text style={styles.noCommentsText}>No hay comentarios todavía.</Text>
        }
        <Coments postId={this.props.route.params.id}/>
      </View>
    )
  }
}
export default Comentarios

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f2f2f2',
  },
  headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      textAlign: 'center',
  },
  commentContainer: {
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
  },
  commentOwner: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
  },
  commentText: {
      fontSize: 14,
      color: '#666',
  },
  noCommentsText: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
  }
});


