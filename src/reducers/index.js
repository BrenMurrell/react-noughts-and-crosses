import { combineReducers } from "redux";

// import caseStudies from './caseStudiesReducer';
import board from './boardReducer';
import boards from './boardsReducer';

import auth from './authReducer';

export default combineReducers({
    auth, boards, board
});
