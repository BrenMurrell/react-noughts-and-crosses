import React, { Component } from 'react';
import * as actions from "../../actions/boardActions";
import { connect } from 'react-redux';
import _ from 'lodash';
import './board.css';
import { Link } from 'react-router-dom';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: [],
            boardId: this.props.match.params.boardId,
            nextPlay: 'X',
            win: '',
            canContinue: true
        }
    }
    componentWillMount() {
        this.props.fetchBoard(this.state.boardId);
    }
    componentWillReceiveProps(nextProps) {
        var lastPlay = this.state.nextPlay;
         this.setState({
             nextPlay: nextProps.board.nextPlay
         });
         if(nextProps.board.win) {
            alert(lastPlay + ' won!!!');
            this.setState({
                canContinue: false
            });
         }
    }
    registerClick(key, boardId) {
        if(!this.state.canContinue) {
            alert('no new moves allowed');
            return false;
        }
        var currentBoard = this.props.board;
        var currentCell = currentBoard.cells[key];
        
        if(currentCell === '') {
            currentBoard.cells[key] = this.state.nextPlay;
        } else {
            alert('eeeep. that one is full already');
            return false;
        }
        var nextPlay = this.state.nextPlay === 'X' ? 'O' : 'X';
        currentBoard.nextPlay = nextPlay;
        currentBoard.win = this.checkWin(currentBoard.cells);
        this.props.updateBoard(boardId, currentBoard)
    }
    
    checkWin(cells) {        
        if(typeof cells !== 'undefined') {
            if(((cells[0] === cells[1]) && (cells[0] === cells[2]) && (cells[0] !== "")) 
            || ((cells[0] === cells[3]) && (cells[0] === cells[6]) && (cells[0] !== ""))
            || ((cells[0] === cells[4]) && (cells[0] === cells[8]) && (cells[0] !== ""))
            || ((cells[1] === cells[4]) && (cells[1] === cells[7]) && (cells[1] !== ""))             
            || ((cells[3] === cells[4]) && (cells[3] === cells[5]) && (cells[3] !== "")) 
            || ((cells[2] === cells[5]) && (cells[2] === cells[8]) && (cells[2] !== "")) 
            || ((cells[2] === cells[4]) && (cells[2] === cells[6]) && (cells[2] !== "")) 
            || ((cells[6] === cells[7]) && (cells[6] === cells[8]) && (cells[6] !== ""))) {
                return true;
            } else {
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
    render() {
        return (
            <div>
                <h2>Game</h2>
                <div className="board">
                    {this.renderCells()}
                </div>
                <p>Next move: {this.state.nextPlay }</p>
                <p><Link to="/">Back to boards</Link></p>
            
            </div>
        )
    }
}
const mapStateToProps = ({board}) => {
    return {
        board
    };
};

export default connect(mapStateToProps, actions)(Board)