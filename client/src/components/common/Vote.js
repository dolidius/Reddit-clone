import React, { Component } from 'react';

import { connect } from 'react-redux';
import { upvotePost, downvotePost } from '../../actions/postActions';

class Vote extends Component{

    state = {
        votes: null,
        upvoted: false,
        downvoted: false
    }

    componentDidMount(){

        if(this.props.upvotes.filter(upvote => upvote.user === this.props.auth.user.id).length > 0){
            this.setState({
                upvoted: true
            });
        }

        if(this.props.downvotes.filter(downvote => downvote.user === this.props.auth.user.id).length > 0){
            this.setState({
                downvoted: true
            });
        }

        this.setState({
            votes: (this.props.upvotes.length - this.props.downvotes.length)
        });
    }

    upvote = () => {
        this.props.upvotePost(this.props.id);

        if(!this.state.upvoted && !this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes + 1,
                upvoted: true
            }));
        }

        if(this.state.upvoted && !this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes - 1,
                upvoted: false
            }));
        }

        if(!this.state.upvoted && this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes + 2,
                upvoted: true,
                downvoted: false
            }));
        }

    }

    downvote = () => {
        this.props.downvotePost(this.props.id);

        if(!this.state.upvoted && !this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes - 1,
                downvoted: true
            }));
        }

        if(!this.state.upvoted && this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes + 1,
                downvoted: false
            }));
        }

        if(this.state.upvoted && !this.state.downvoted){
            this.setState(prevState => ({
                votes: prevState.votes - 2,
                upvoted: false,
                downvoted: true
            }));
        } 

    }

    render(){
        return(
            <div className="vote">
                <i onClick={this.upvote} className="fas fa-sort-up"></i>
                <span>{this.state.votes}</span>
                <i onClick={this.downvote} className="fas fa-sort-down"></i>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { upvotePost, downvotePost })(Vote);