import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loadSubreddit } from '../../actions/subredditActions';

import isEmpty from '../../utilities/isEmpty';

// Components
import PostLink from '../posts/PostLink';
import Error from '../common/404Error';
import Spinner from '../common/Spinner';
import SubredditDetails from './SubredditDetails';
import Pages from '../common/Pages';

class Subreddit extends Component {

    componentDidMount(){
        if(this.props.match.params.n){
            this.props.loadSubreddit(this.props.match.params.name, this.props.match.params.n);
        }else{
            this.props.loadSubreddit(this.props.match.params.name);
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.n !== this.props.match.params.n){ 
            this.props.loadSubreddit(this.props.match.params.name, this.props.match.params.n);
        }
    }

    countPages = () => {
        const pages = Math.ceil(this.props.posts.amount / 10);
        return pages;
    }

    render() {

        if(!this.props.subreddit.loading && isEmpty(this.props.subreddit.info)){
            return <Error error={`r/${this.props.match.params.name} doesn't exist`} />;
        }

        if(!this.props.posts.loading && (this.countPages() < this.props.match.params.n)){
            return <Error error="This page doesn't exists" />
        }

        return (
            <div>
                <div className="subreddit__container">
                    <div style={{width: '73%'}}>
                        {this.props.posts.loading ? <Spinner centered={true} /> : this.props.posts.posts.map(post => (
                            <PostLink 
                                key={post._id} 
                                postId={post._id} 
                                title={post.title} 
                                subredditName={this.props.match.params.name} 
                                upvotes={post.upvotes}
                                downvotes={post.downvotes}
                                comments={post.comments}
                            />
                        ))}
                    </div>
                    <div style={{width: '27%', marginLeft: '5rem'}}>
                                
                        {this.props.subreddit.loading ? null :
                        <SubredditDetails 
                            name={this.props.subreddit.info.name} 
                            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam accusantium saepe iure maxime aut animi laboriosam maiores porro ex tenetur quasi numquam quam mollitia aspernatur velit odio, facilis repellendus officia voluptatibus ipsam voluptatum! Amet aperiam nemo debitis quos recusandae numquam consequuntur quia, doloremque odit qui officiis quaerat animi dolorum sit." 
                        />}
                                
                    </div>

                </div>

                {!this.props.posts.loading && <Pages amount={this.countPages()} link={`/r/${this.props.match.params.name}`} />}

            </div>
        )        
    }
}

const mapStateToProps = state => ({
    subreddit: state.subreddit,
    posts: state.post
});

export default connect(mapStateToProps, { loadSubreddit })(Subreddit);