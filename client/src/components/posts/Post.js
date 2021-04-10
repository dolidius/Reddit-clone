import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getPost, addComment } from '../../actions/postActions';

//components
import Spinner from '../common/Spinner';
import Vote from '../common/Vote';
import Comment from './Comment';
import Error from '../common/404Error';
import SubredditDetails from '../subreddit/SubredditDetails';

class Post extends Component {

    state = {
        comment: ''
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitComment = () => {
        const commentData = { text: this.state.comment }
        this.props.addComment(commentData, this.props.match.params.id);
        this.setState({comment: ''});
    }

    componentDidMount(){
        this.props.getPost(this.props.match.params.id);
    }

    render() {
        if(this.props.post.loading){
            return <Spinner centered={true} />
        }else{
            if(this.props.post.post){
                const post = this.props.post.post;
                return (
                    <div className="post__container">
                        
                        <div style={{width: '70%'}}>
                        
                            <div className="post">

                                <header className="post__header">
                                    <div className="post__vote-container">
                                        <Vote id={post._id} upvotes={post.upvotes} downvotes={post.downvotes} />
                                    </div>
                                    <h2 className="post__title">{post.title}</h2>
                                </header>

                                <p className="post__text">
                                    {post.text}
                                </p>

                                <div className="post__add-comment">
                                    <textarea onChange={this.inputChange} name="comment" value={this.state.comment} placeholder="What are your thoughts?" />
                                    <button onClick={this.submitComment} className="button button--sm button--blue">Add comment</button>
                                </div>

                                <div className="post__comments">
                                    {post.comments.map(comment => 
                                        <Comment author={comment.authorName} text={comment.text} key={comment._id} />
                                    )}
                                </div>
                                
                            </div>

                        </div>
                        
                        <div style={{width: '30%', marginLeft: '5rem'}}>
                            <SubredditDetails name={this.props.match.params.name} description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam accusantium saepe iure maxime aut animi laboriosam maiores porro ex tenetur quasi numquam quam mollitia aspernatur velit odio, facilis repellendus officia voluptatibus ipsam voluptatum! Amet aperiam nemo debitis quos recusandae numquam consequuntur quia, doloremque odit qui officiis quaerat animi dolorum sit." />
                        </div>

                    </div>
                );
            }else{
                return <Error error="This post doesn't exists" />
            }
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post,
    errors: state.errors
});

export default connect(mapStateToProps, { getPost, addComment })(Post);