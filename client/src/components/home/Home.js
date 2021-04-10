import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getLatestPosts } from '../../actions/postActions';

import PropTypes from 'prop-types';

// Components
import PostLink from '../posts/PostLink';
import NewSubredditModal from '../subreddit/NewSubredditModal';
import Spinner from '../common/Spinner';
import Pages from '../common/Pages';
import Error from '../common/404Error';

class Home extends Component {

    state = {
        opened: false,
        buttonClasses: '',
        disabled: null,
        posts: null
    }

    toggleModal = () => {
        this.setState(prevState => ({
            opened: !prevState.opened
        }));
    }

    checkAuth = () => {
        if(this.props.auth.authenticated){
            this.setState({
                buttonClasses: 'button--blue',
                disabled: false
            });
        }else{
            this.setState({
                buttonClasses: 'button--disabled',
                disabled: true
            });
        }
    }

    componentDidMount(){
        this.checkAuth();

        if(this.props.match.params.n){
            this.props.getLatestPosts(this.props.match.params.n);
        }else{
            this.props.getLatestPosts();
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.n !== this.props.match.params.n){ 
            this.props.getLatestPosts(this.props.match.params.n);
        }
    }

    countPages = () => {
        const pages = Math.ceil(this.props.posts.amount / 10);
        return pages;
    }

    render() {
        const { posts } = this.props.posts;
        if(!this.props.posts.loading && (this.countPages() < this.props.match.params.n)){
            return <Error error="This page doesn't exists" />
        }
        return (
            <div>
                <div className="home__container">
                    <div style={{width: '70%'}}>
                        {this.props.posts.loading && <Spinner centered={true} />}
                        {!this.props.posts.loading && posts && posts.map(post => 
                        <PostLink 
                            key={post._id} 
                            postId={post._id} 
                            title={post.title} 
                            subredditName={post.subredditName}
                            upvotes={post.upvotes}
                            downvotes={post.downvotes}
                            comments={post.comments}
                        />)}
                    </div>
                    <div style={{width: '30%', marginLeft: '5rem'}}>
                        <div className="home__new">
                            <h1 className='home__title'>Welcome to reddit</h1>
                            <p className="home__desc">Come here to check in with your favourite communities</p>
                            <button disabled={this.state.disabled} onClick={this.toggleModal} className={`button button--md home__button ${this.state.buttonClasses}`}>Create new subreddit</button>
                        </div>
                    </div>
                    
                    <NewSubredditModal 
                        opened={this.state.opened} 
                        toggleModal={this.toggleModal}
                    />

                </div>


                {!this.props.posts.loading && <Pages amount={this.countPages()} link="" />}

            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.post
});

export default connect(mapStateToProps, { getLatestPosts })(Home);