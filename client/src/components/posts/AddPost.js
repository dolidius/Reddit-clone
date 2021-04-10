import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';

class AddPost extends Component {

    state = {
        title: '',
        text: ''
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    newPost = e => {
        e.preventDefault();
        const { title, text } = this.state;
        const newPost = { title, text }
        this.props.createPost(this.props.match.params.name, this.props.history, newPost);
    }

    render() {
        return (
            <div className="newpost__container">
                <form onSubmit={this.newPost} className="newpost">

                    <h2 className="newpost__title">Add new post</h2>

                    <div className="newpost__group">
                        <input value={this.state.title} name="title" onChange={this.inputChange} placeholder="Title" type="text" className="newpost__input newpost__item"/>
                    </div>

                    <div className="newpost__group">
                        <textarea value={this.state.text} name="text" onChange={this.inputChange} placeholder="Your post goes here..." className="newpost__area newpost__item newpost__input"/>
                    </div>

                    <div className="newpost__group">
                        <button className="button button--md button--blue newpost__item">Submit</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default connect(null, { createPost })(AddPost);