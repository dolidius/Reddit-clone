import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getProfile, editProfile } from '../../actions/profileActions';

import isEmpty from '../../utilities/isEmpty';

//components
import Spinner from '../common/Spinner';
import Error from '../common/404Error';

class EditProfile extends Component {

    state = {
        avatar: '',
        background: '',
        description: ''
    }

    componentDidMount(){
        this.props.getProfile(this.props.match.params.login);
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.profile)){

            let { avatar, background, description, login } = nextProps.profile;

            if(login !== this.props.auth.user.login){
                this.props.history.push('/');
            }

            isEmpty(avatar) ? avatar = '' : avatar;
            isEmpty(background) ? background = '' : background;
            isEmpty(description) ? description = '' : description;

            this.setState({avatar, background, description});

        }

    }

    submitEdit = e => {
        e.preventDefault();
        const { avatar, background, description } = this.state;
        
        const editedProfile = {avatar, background, description};
    
        this.props.editProfile(this.props.match.params.login, editedProfile, this.props.history);
    }

    render() {
        if(this.props.profile.loading){
            return <Spinner centered={true} />
        }

        return (
            <div className="edit-profile__container">
                <form onSubmit={this.submitEdit} className="edit-profile__form">
                    <h2 className="edit-profile__title">Edit profile</h2>

                    <div className="edit-profile__group">
                        <input onChange={this.inputChange} value={this.state.avatar} name="avatar" placeholder="Avatar" type="text" className="edit-profile__item edit-profile__input"/>
                        <label className="edit-profile__label">Avatar</label>
                    </div>

                    <div className="edit-profile__group">
                        <input onChange={this.inputChange} value={this.state.background} name="background" placeholder="Background image" type="text" className="edit-profile__item edit-profile__input"/>
                        <label className="edit-profile__label">Background</label>
                    </div>

                    <div className="edit-profile__group">
                        <input onChange={this.inputChange} placeholder="Avatar" type="text" className="edit-profile__item edit-profile__input"/>
                    </div>

                    <div className="edit-profile__group">
                        <textarea onChange={this.inputChange} value={this.state.description} name="description" placeholder="Description" type="text" className="edit-profile__item edit-profile__area"/>
                    </div>

                    <div className="edit-profile__group">
                        <button className="edit-profile__item button button--blue button--md" >Submit</button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfile, editProfile })(EditProfile);