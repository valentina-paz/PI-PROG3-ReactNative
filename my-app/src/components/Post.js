import { Text, View } from 'react-native'
import React, { Component } from 'react'

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            estaMiLike: false,
        }
    }
  render() {
    return (
      <View>
        <Text>{
            this.props.post.data.descripcion
            }
        </Text>
      </View>
    )
  }
}