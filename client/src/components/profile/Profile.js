import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProfile } from '../../actions/profileActions';
import { getLatestUserPosts } from '../../actions/postActions';

import isEmpty from '../../utilities/isEmpty';

// components
import PostLink from '../posts/PostLink';
import Spinner from '../common/Spinner';
import Error from '../common/404Error';
import ProfileDetails from './ProfileDetails';
import Pages from '../common/Pages';

class Profile extends Component {

    state = {
        profile: null,
        posts: null
    }

    componentDidMount(){
        this.props.getProfile(this.props.match.params.login);
        if(this.props.match.params.n){
            this.props.getLatestUserPosts(this.props.match.params.login, this.props.match.params.n);
        }else{
            this.props.getLatestUserPosts(this.props.match.params.login);            
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.login !== this.props.match.params.login){ 
            this.props.getProfile(this.props.match.params.login);
            this.props.getLatestUserPosts(this.props.match.params.login);
        }

        if(prevProps.match.params.n !== this.props.match.params.n){ 
            this.props.getLatestUserPosts(this.props.match.params.login, this.props.match.params.n);
        }
    }

    countPages = () => {
        const pages = Math.ceil(this.props.posts.amount / 10);
        return pages;
    }

    render() {
        // if(this.props.profile.loading && this.props.posts.loading){
        //     return <Spinner centered={true} />
        if(!this.props.profile){
            return <Error error='User not found' />
        }

        if(!this.props.posts.loading && (this.countPages() < this.props.match.params.n)){
            return <Error error="This page doesn't exists" />
        }

        const { profile } = this.props;
        const posts = this.props.posts.posts;

        return (
            <div>
                <div className="profile">
                    <div style={{width: '74%'}}>
                        {this.props.posts.loading ? <Spinner centered={true} /> : 
                        posts.map(post => 
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
                        
                    <div style={{width: '26%', marginLeft: '5rem'}}>

                        {this.props.profile.loading ? null :
                        <ProfileDetails 
                            avatar={profile.avatar} 
                            login={profile.login} 
                            joinedDate="October 21, 2018"
                            description={profile.description ? profile.description : 'Description will be here soon'} 
                            background={profile.background ? profile.background : ''}
                            editable={this.props.auth.user.login === this.props.match.params.login}
                        />}

                    </div>
                </div>

                {!this.props.posts.loading && <Pages amount={this.countPages()} link={`/u/${this.props.match.params.login}`} />}

            </div>
        )
        
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    posts: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfile, getLatestUserPosts })(Profile);