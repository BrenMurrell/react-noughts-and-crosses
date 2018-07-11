import React, { Component } from 'react';
import * as actions from "../../actions/boardActions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';

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
    renderBoards() {
        const { boards } = this.props;
        const boardsList = _.map(boards, (board, key) => {
            return (
                <div key={key}>Board {key} -<Link to={`${process.env.REACT_APP_PUBLIC_URL}/board/${key}`}>view</Link> <span onClick={() => this.deleteBoard(key)}>delete</span></div>
            )
        })

        if(boards === 'loading') {
            return(
                <p>Loading boards...</p>
            )
        }
        if(typeof boardsList !== 'undefined' && boardsList.length) {
            return (
                <div className="boards">
                    { boardsList}
                    <p>PUBLIC_URL: {process.env.REACT_APP_PUBLIC_URL}</p>
                </div>
            )
        }
        return (
            <p>No current games</p>
        )

    }

    render() {
        return (
            <div>
                { this.renderBoards() }
                <button onClick={this.addBoard.bind(this)}>Add a board</button>
            </div>
        )
    }
}

const mapStateToProps = ({boards}) => {
    return {
        boards
    };
};

export default connect(mapStateToProps, actions)(Start);