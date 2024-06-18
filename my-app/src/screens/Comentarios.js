import React, { Component } from 'react';
import { View, FlatList,  Text } from 'react-native';
import Coments from '../components/Coments';
import { db, auth } from '../firebase/config';

export default class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        db.collection('posts')
            .doc(this.props.route.params.id)
            .onSnapshot((doc) => {
                if (doc.exists) {
                    this.setState({ post: doc.data() });
                }
            });
    }

    render() {
        return (
            <View >
                <Text >Comments</Text>
                {this.state.post !== null ? (
                    this.state.post.comentarios.length !== 0 ? (
                        <FlatList
                            data={this.state.post.comentarios.sort(
                                (a, b) => b.createdAt - a.createdAt
                            )}
                            keyExtractor={(item) => item.createdAt.toString()}
                            renderItem={({ item }) => (
                                <View >
                                    <View >
                                        <Text >{item.owner}</Text>
                                        <Text >{item.comentario}</Text>
                                    </View>
                                    <View  />
                                </View>
                            )}
                        />
                    ) : (
                        <Text >
                            Aún no hay comentarios en este post
                        </Text>
                    )
                ) : null}
                <Coments postId={this.props.route.params.id} />
            </View>
        );
    }
}




