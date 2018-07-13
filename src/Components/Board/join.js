import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut, fetchUser } from "../../actions/authActions";
import { updateBoard } from '../../actions/boardActions';
import { google, facebook, twitter } from "../../config/firebase";
import Button from '../Generic/button';

class Join extends Component {
    componentWillMount() {
        this.props.fetchUser(); //don't use auth - use user actions
    }
    
    joinGame(playerId) {
        var currentBoard = this.props.board;
        if(currentBoard.players.player1) {
            currentBoard.players.player2 = playerId;
        } else {
            currentBoard.players.player1 = playerId;
        }
        this.props.updateBoard(this.props.boardId, currentBoard);
    }

    renderJoinControls() {
        const { auth, board } = this.props;
        console.log(board.players.player1, board.players.player2, board);
        if(auth) { 
            if(board.players.player1 === auth.uid) {
                return(
                    <p>Waiting on another player</p>
                )
            }
            if((board.players.player1 === '' || board.players.player2 === '')) {
                return(
                    <div>
                        <Button
                            extraClasses="btn--test"
                            clickHandler={() => this.joinGame(auth.uid)}
                            label="Join"
                        />
                    </div>
                )
            } else {
                return( 
                    <p>Game full...</p>
                )
            }
        } 
        return(
            <div>
                <h1>Sign in to join</h1>  
                <Button                        
                    clickHandler={() => this.props.signIn(google)}
                    label="Sign in with Google"
                />
                <Button                        
                    clickHandler={() => this.props.signIn(facebook)}
                    label="Sign in with Facebook"
                />
                <Button                        
                    clickHandler={() => this.props.signIn(twitter)}
                    label="Sign in with Twitter"
                />               
                
                
            </div>
        )
    }



    render() {
        
        return (
            <div className="player">
                { this.renderJoinControls() }
                <Button                        
                    clickHandler={this.props.signOut}
                    label="Sign out"
                />
            </div>
        )
    }
}


const mapStateToProps = ({auth}) => {
    return {
        auth
    };
};

export default connect(mapStateToProps, { signIn, signOut, fetchUser, updateBoard })(Join)