import React, { Component } from 'react';
import * as actions from "../../actions/boardActions";
import { connect } from 'react-redux';
import _ from 'lodash';
import './board.css';
import { Link } from 'react-router-dom';

import Join from './join';
import Player from '../User/Player';
import Avatar from '../Generic/avatar';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: [],
            boardId: this.props.match.params.boardId,
            nextPlay: 'X',
            win: '',
            canContinue: true,
            status: 'Waiting on players'
        }
    }
    componentWillMount() {
        this.props.fetchBoard(this.state.boardId);
    }
    componentWillReceiveProps(nextProps) {
         this.setState({
             nextPlay: nextProps.board.nextPlay
         });
         if(nextProps.board.players && (nextProps.board.players.player1 !== '') && (nextProps.board.players.player2 !== '')) {
            this.setState({
                status: 'In progress'
            })
         } 
         if(nextProps.board.win) {
            this.setState({
                status: nextProps.board.win + ' won!!!'
            })
            this.setState({
                canContinue: false
            });
         }
    }
    registerClick(key, boardId) {
        if(!this.props.auth) {
            return false; //not logged in
        }
        if(!this.state.canContinue) {
            alert('no new moves allowed');
            return false;
        }

        
        var currentBoard = this.props.board;
        var currentCell = currentBoard.cells[key];
        
        if((this.props.auth.uid === currentBoard.players.player1 && this.state.nextPlay === "X")
            ||(this.props.auth.uid === currentBoard.players.player2 && this.state.nextPlay === "O")) {
            if(currentCell === '') {
                currentBoard.cells[key] = this.state.nextPlay;
            } else {
                alert('Eeeep. that one is full already');
                return false;
            }
            var nextPlay = this.state.nextPlay === 'X' ? 'O' : 'X';
            currentBoard.nextPlay = nextPlay;
            currentBoard.win = this.checkWin(currentBoard.cells);
            this.props.updateBoard(boardId, currentBoard)
        } else {
            alert('it\'s not your turn');
        }
    }
    
    checkWin(cells) {        
        if(typeof cells !== 'undefined') {
            if(((cells[0] === cells[1]) && (cells[0] === cells[2]) && (cells[0] === "X")) 
            || ((cells[0] === cells[3]) && (cells[0] === cells[6]) && (cells[0] === "X"))
            || ((cells[0] === cells[4]) && (cells[0] === cells[8]) && (cells[0] === "X"))
            || ((cells[1] === cells[4]) && (cells[1] === cells[7]) && (cells[1] === "X"))             
            || ((cells[3] === cells[4]) && (cells[3] === cells[5]) && (cells[3] === "X")) 
            || ((cells[2] === cells[5]) && (cells[2] === cells[8]) && (cells[2] === "X")) 
            || ((cells[2] === cells[4]) && (cells[2] === cells[6]) && (cells[2] === "X")) 
            || ((cells[6] === cells[7]) && (cells[6] === cells[8]) && (cells[6] === "X"))) {
                return "X";
            } else if(((cells[0] === cells[1]) && (cells[0] === cells[2]) && (cells[0] === "O")) 
            || ((cells[0] === cells[3]) && (cells[0] === cells[6]) && (cells[0] === "O"))
            || ((cells[0] === cells[4]) && (cells[0] === cells[8]) && (cells[0] === "O"))
            || ((cells[1] === cells[4]) && (cells[1] === cells[7]) && (cells[1] === "O"))             
            || ((cells[3] === cells[4]) && (cells[3] === cells[5]) && (cells[3] === "O")) 
            || ((cells[2] === cells[5]) && (cells[2] === cells[8]) && (cells[2] === "O")) 
            || ((cells[2] === cells[4]) && (cells[2] === cells[6]) && (cells[2] === "O")) 
            || ((cells[6] === cells[7]) && (cells[6] === cells[8]) && (cells[6] === "O"))) {
                return "O";
            }
            
            else {
                return false;
            }

        }
    }
    
    renderCells() {
        const { board } = this.props;
        const cellsList = _.map(board.cells, (cell, key) => {
            return (
                <div className="cell" key={key} data-id={key} onClick={() => this.registerClick(key, this.state.boardId)}>{cell}</div>
            )
        })

        if(board === 'loading') {
            return(
                <p>Loading cells...</p>
            )
        }
        if(typeof cellsList !== 'undefined' && cellsList.length > 0) {
            return (
                <div className="cells">
                    { cellsList }
                </div>
            )
        }
        return (
            <p>No current cells (this seems improbable!)</p>
        )
    }

    renderWin() {
        var winner = false;
        winner = this.state.win !== '' ? <p>{this.state.win} wins!</p> : false;
        return (
            winner
        )
     
    }

    

    renderPlayer1() {
        const { board } = this.props;
        if(board.players.player1) {
            return (
                <Player userId={board.players.player1} playingAs="X" />                
            )
        }
        return <p>Join now</p>
    }
    renderPlayer2() {
        const { board } = this.props;
        if(board.players.player2) {
            return (
                <Player userId={board.players.player2} playingAs="O" />                
            )
        }
        return <p>Join now</p>
    }

    render() {
        const { board } = this.props;
        if(board === 'loading') {
            return false;
        }
        return (
            <div>
                <h2>Game</h2>
                <div className="board">
                    {this.renderCells()}
                </div>
                <p>Next move: {this.state.nextPlay }</p>
                <div className="board__players">
                    { this.renderPlayer1() }
                    <div className="board__vs"><p>vs</p></div>
                    { this.renderPlayer2() }
                    
                </div>

                <p>{this.state.status}</p>
                <p><Link to={process.env.REACT_APP_PUBLIC_URL}>Back to boards</Link></p>
                <Join board={this.props.board} boardId={this.state.boardId} />
            </div>
        )
    }
}
const mapStateToProps = ({board, auth}) => {
    return {
        board, auth
    };
};

export default connect(mapStateToProps, actions)(Board)