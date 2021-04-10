import React, { Component } from 'react';

import { createSubreddit } from '../../actions/subredditActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class NewSubredditModal extends Component {

    state = {
        name: '',
        inputStyles: {},
        nameError: ''
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors.name){
            this.setState({
                nameError: nextProps.errors.name,
                inputStyles: { borderBottom: '2px solid red' }
            });
        }
    }

    addNew = e => {
        e.preventDefault();
        const subredditData = {
            name: this.state.name
        }

        // Client validation
        if(subredditData.name.trim().length === 0){
            return this.setState({nameError: 'Name field is required', inputStyles: { borderBottom: '2px solid red' }});
        }else if(subredditData.name.split(' ').length !== 1){
            return this.setState({nameError: "Space is not allowed for subreddit names", inputStyles: { borderBottom: '2px solid red' }});
        }else if(subredditData.name.trim().length < 3){
            return this.setState({nameError: "Name has to contain at least 3 characters", inputStyles: { borderBottom: '2px solid red' }});
        }

        this.props.createSubreddit(subredditData, this.props.history);
    }

    render() {
        if(this.props.opened){
            return (
                <div className="sub-modal__background">
                    <div className="sub-modal">

                        <div className="sub-modal__close">
                            <i onClick={this.props.toggleModal} className="fas fa-times"></i>                        
                        </div>
                        
                        <h2 className="sub-modal__title">Create new subreddit!</h2>

                        <form onSubmit={this.addNew} className="sub-modal__form">
                            <div className="sub-modal__form-item">
                                <input style={this.state.inputStyles} value={this.state.name} name="name" onChange={this.inputChange} placeholder="Subreddit name..." type="text" className="sub-modal__input"/>
                                <label className="sub-modal__label">{this.state.nameError}</label>
                            </div>
                            <div className="sub-modal__form-item">
                                <button className="button button--md button--blue sub-modal__button">Create</button>
                            </div>
                        </form>

                    </div>
                </div>
            )
        }else{
            return null;
        }
    }
}

NewSubredditModal.propTypes = {
    createSubreddit: PropTypes.func.isRequired,
    opened: PropTypes.bool,
    toggleModal: PropTypes.func,
    errors: PropTypes.object
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default withRouter(connect(mapStateToProps, { createSubreddit })(NewSubredditModal));