import { boardsRef } from '../config/firebase';
import { FETCH_BOARDS, FETCH_BOARD } from './types';

//move this to separate reusable function
export const fetchBoards = () => async dispatch => {
    boardsRef.on('value', snapshot => {
        dispatch({
            type: FETCH_BOARDS,
            payload: snapshot.val()
        });
    });
}

export const updateBoard = ( boardId, value) => async dispatch => {
    boardsRef
        .child(boardId)
        .update(value)
}


export const fetchBoard = (boardId) => async dispatch => {
    boardsRef
        .child(boardId)
        .on('value', snapshot => {
            dispatch({
                type: FETCH_BOARD,
                payload: snapshot.val()
            });
        });
}

export const deleteBoard = boardId => async dispatch => {
    boardsRef.child(boardId).remove();
}



export const addBoard = () => async dispatch => {

    var newBoard = {
        "players": {
            "player1": "",
            "player2" : ""
        },
        "nextPlay": "X",
        "cells" : {
            0 : "",
            1 : "",
            2 : "",
            3 : "",
            4 : "",
            5 : "",
            6 : "",
            7 : "",
            8 : ""
        }   
    }
    boardsRef.push().set(newBoard);
}

