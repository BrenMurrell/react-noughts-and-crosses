import { FETCH_BOARD } from '../actions/types';

export default function board(state = "loading", action) {
    switch (action.type) {
        case FETCH_BOARD:
            return action.payload;
        default:
            return state;
    }
}