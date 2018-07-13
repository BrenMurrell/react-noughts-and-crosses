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
            </div>
        )
    }



    render() {
        
        return (
            <div className="player">
                { this.renderJoinControls() }
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