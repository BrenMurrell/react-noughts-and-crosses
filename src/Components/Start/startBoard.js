import React, { Component } from 'react';
import _ from 'lodash';
import Player from '../User/Player';

class StartBoard extends Component{

    constructor() {
        super();
        
    }

    renderStartBoard(cellIndex) {
        //{board.cells[0]}
        const { board } = this.props;
        console.log(board.cells);

        
        var cellsList = _.map(board.cells, (cell, idx) => {
            return (
                <div key={idx} className="start-board__cell">{cell}</div>
            )

        });
        if(board === 'loading') {
            return(
                <p>Loading cells...</p>
            )
        }
        if(typeof cellsList !== 'undefined' && cellsList.length > 0) {
            return (
                <div className="start-board">
                    { cellsList }
                </div>
            )
        }
        return (
            <p>No board</p>
        )     
        
    }

    renderPlayer1() {
        const { board } = this.props;
        if(board.players.player1) {
            return (
                <Player userId={board.players.player1} playingAs="X" />                
            )
        }
        return <div className="player"></div>
    }
    renderPlayer2() {
        const { board } = this.props;
        if(board.players.player2) {
            return (
                <Player userId={board.players.player2} playingAs="O" />                
            )
        }
        return <div className="player"></div>
    }

    render() {
        const { board } = this.props;
        return(
            <div className="start-board__wrapper">
                {this.renderPlayer1()}
                {this.renderStartBoard()}
                {this.renderPlayer2()}
            </div>
        )
    }
}

export default StartBoard;