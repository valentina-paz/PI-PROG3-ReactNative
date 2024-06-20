import { Text, View, FlatList } from 'react-native'
import React, { Component } from 'react'
import Post from '../components/Post'
import { db } from '../firebase/config'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            posteos: []
        }
    }

    componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
            let postObtenidos = []

            docs.forEach(doc => {
                postObtenidos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            
            this.setState({
                posteos: postObtenidos
            })
        })
    }

  render() {
    return (
      <View>
        <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => 
            <Post post={item} navigation={this.props.navigation}/>}
        />
      </View>
    )
  }
}