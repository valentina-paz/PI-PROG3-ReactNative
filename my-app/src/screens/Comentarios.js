import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Coments from '../components/Coments'

 class Comentarios extends Component {
    constructor(props){
        super(props)
       
    }
    componentDidMount(){
        console.log(this.props)
    }
  render() {
    return (
      <View>
        <Text>Comentarios:</Text>
        <Coments postId={this.props.route.params.id}/>
      </View>
    )
  }
}
export default Comentarios




