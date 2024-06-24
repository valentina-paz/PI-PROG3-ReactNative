import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Post from '../components/Post'
import { db } from '../firebase/config'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posteos: []
        }
    }

    componentDidMount() {
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
            <View style={styles.container}>
                <Text style={styles.headerText}> Doggogram </Text>
                <FlatList style={styles.container}
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <Post navigation={this.props.navigation} post={item} id={item.id} />}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#134056'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
});