import React, { Component } from 'react';
import { playersRef } from '../../config/firebase';
import Avatar from '../Generic/avatar';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: '',
            playerImage: ''
        }
    }
    componentWillMount() {
        playersRef
            .child(this.props.userId)
            .once('value')
            .then((snapshot) => {
                this.setState({
                    playerImage: snapshot.val().photoURL,
                    playerName: snapshot.val().displayName
                })
            });
    }

    

    render() {
        if(this.props.user === 'loading') {
            return false;
        }
        
        return(
            <div className="player">
                <Avatar imageUrl={this.state.playerImage} altText={this.state.playerName} />                   
                <h3>{this.props.playingAs}</h3>
                <p>{this.state.playerName}</p>
            </div>
        )
    }
}
export default Player;