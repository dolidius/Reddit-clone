import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Vote from '../common/Vote';

class PostLink extends Component {
    render() {
        const { title, subredditName, postId, upvotes, downvotes, comments } = this.props;
        return (
            <div className="postlink">

                <div className="postlink__vote-container">
                    <Vote id={postId} upvotes={upvotes} downvotes={downvotes} />
                </div>

                <div className="postlink__photo">
                    <i className="fas fa-comment-dots"></i>
                </div>

                <div className="postlink__info">

                    <div className="postlink__title">
                        <Link to={`/r/${subredditName}/${postId}`}>{title}</Link>
                    </div>

                    <div className="postlink__subreddit">
                        <Link to={`/r/${subredditName}`}>/r/{subredditName}</Link>
                    </div>

                    <div className="postlink__links">
                        <Link className="postlink__link" to={`/r/${subredditName}/${postId}`}>{comments.length} Comments</Link>
                        <a className="postlink__link" href="#">Share</a>
                        <a className="postlink__link" href="#">Save</a>
                        <a className="postlink__link" href="#">Hide</a>
                        <a className="postlink__link" href="#">Report</a>
                    </div>

                </div>
                
            </div>
        );
    }
}

export default PostLink;