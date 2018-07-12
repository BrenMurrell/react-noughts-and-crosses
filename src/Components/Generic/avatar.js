import React, { Component } from 'react';
import './avatar.css';

class Avatar extends Component {
    render() {
        return (
            <img src={this.props.imageUrl} alt={this.props.altText} className="avatar" />
        )
    }
}

export default Avatar;