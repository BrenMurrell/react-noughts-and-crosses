import React, { Component } from 'react';
import * as actions from "../../actions/authActions";
import { connect } from 'react-redux';
import Button from '../Generic/button';
import { google, facebook, twitter } from "../../config/firebase";
import './userbar.css';

class UserBar extends Component {
    // componentWillMount = () => {
    //     this.props.fetchUser();
    // }
    constructor() {
        super();
        this.state = ({
            displayName: '',
            photoURL: ''
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth) {
            this.setState({
                displayName: nextProps.auth.displayName,
                photoURL: nextProps.auth.photoURL
            })
        }
    }
    render() {
        const { auth } = this.props;
        
        if(this.auth === 'loading') {
            return "<p>Loading...</p>"
        }
        if(auth) {
            return(
                <div className="userbar">
                    <img src={this.state.photoURL} className="avatar" />
                    {this.state.displayName}
                    <Button                        
                        clickHandler={this.props.signOut}
                        label="Sign out"
                    />
                </div>
            )
        }
        return(
            <div className="userbar">
                Sign in to join a game
                <Button                        
                    clickHandler={() => this.props.signIn(google)}
                    label="Sign in with Google"
                />
                <Button                        
                    clickHandler={() => this.props.signIn(facebook)}
                    label="Sign in with Facebook"
                />
                <Button                        
                    clickHandler={() => this.props.signIn(twitter)}
                    label="Sign in with Twitter"
                />               
            </div>
        )
    }
}
const mapStateToProps = ({auth}) => {
    return {
        auth
    };
};

export default connect(mapStateToProps, actions)(UserBar)