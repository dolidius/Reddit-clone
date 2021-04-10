import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <div className="comment__author">
                    <Link to={`/u/${this.props.author}`}>{this.props.author}</Link>
                </div>
                <p className="comment__text">
                    {this.props.text}
                </p>                
            </div>
        )
    }
}

export default Comment;