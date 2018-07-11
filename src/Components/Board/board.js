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
            cells: '',
            boardId: this.props.match.params.boardId,
            nextPlay: 'X'
        }
    }
    componentWillMount() {
        this.props.fetchBoard(this.state.boardId);
    }
    componentWillReceiveProps(nextProps) {
        console.log('received', nextProps.board.nextPlay);
         this.setState({
             nextPlay: nextProps.board.nextPlay
         })
    }
    registerClick(key, boardId) {
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
        this.props.updateBoard(boardId, currentBoard)
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