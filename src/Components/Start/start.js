import React, { Component } from 'react';
import * as actions from "../../actions/boardActions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './start.css';
import _ from 'lodash';
import StartBoard from './startBoard';

class Start extends Component {
    constructor() {
        super();
        this.state = ({
            boards: []
        })
    }
    componentWillMount() {
        this.props.fetchBoards();
    }

    addBoard = (event) => {
        this.props.addBoard();
        event.preventDefault();
    }
    deleteBoard = (boardId) => {
        this.props.deleteBoard(boardId);
    }
    renderDeleteButton(key, board) {
        const { auth } = this.props;
        if(auth && ( auth.uid === board.players.player1 || auth.uid === board.players.player2 )) {
            return(
                <button onClick={() => this.deleteBoard(key)}>delete</button>
            )
        }
    }
    renderStatus(board) {
        if(board.win) {
            return "Game over";
        }
        if(board.players && board.players.player1 && board.players.player2) {
            return "In progress";
        }
        return "Join this game";
    }
    renderBoards() {
        const { boards } = this.props;
        const boardsList = _.map(boards, (board, key) => {
            return (
                <div className="start__board" key={key}>Board -<Link to={`${process.env.REACT_APP_PUBLIC_URL}board/${key}`}>view</Link> 
                    { this.renderDeleteButton(key, board) }
                    - { this.renderStatus(board) }
                    <StartBoard board={board} />
                </div>
            )
        })
        // _.sortBy(boardList, 
        if(boards === 'loading') {
            return(
                <p>Loading boards...</p>
            )
        }
        if(typeof boardsList !== 'undefined' && boardsList.length) {
            console.log('boards lists', boardsList)
            return (
                <div className="start__boards">
                    { boardsList}
                </div>
            )
        }
        return (
            <p>No current games</p>
        )

    }
    renderAddButton() {
        const { auth } = this.props;
        if(auth) {
            return(
                <button onClick={this.addBoard.bind(this)}>Add a board</button>

            )
        }
    }
    render() {
        return (
            <div>
                { this.renderBoards() }
                { this.renderAddButton() }
            </div>
        )
    }
}

const mapStateToProps = ({boards, auth}) => {
    return {
        boards, auth
    };
};

export default connect(mapStateToProps, actions)(Start);