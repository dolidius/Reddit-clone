import React, { Component } from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


import PropTypes from 'prop-types';

//components
import TextFieldGroup from './TextFieldGroup';

//higher order components
import redirectAuthenticated from '../common/HOC/redirectAuthenticated';

class Register extends Component {

    state = {
        login: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    reigsterUser = e => {
        e.preventDefault();
        const { login, password, email, password2 } = this.state;
        const user = { login, password, email, password2 };
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        return (
            <div className="authform__container">
                <form onSubmit={this.reigsterUser} className="authform" noValidate>
                    <h2 className="authform__title">Register</h2>

                    <TextFieldGroup error={this.state.errors.login} name="login" onChange={this.inputChange} value={this.state.login} type="text" placeholder="Login" />
                    <TextFieldGroup error={this.state.errors.email} name="email" onChange={this.inputChange} value={this.state.email} type="email" placeholder="Email" />
                    <TextFieldGroup error={this.state.errors.password} name="password" onChange={this.inputChange} value={this.state.password} type="password" placeholder="Password" />
                    <TextFieldGroup error={this.state.errors.password2} name="password2" onChange={this.inputChange} value={this.state.password2} type="password" placeholder="Repeat password" />

                    <div className="authform__group">
                        <button className="authform__item button button--md button--blue button--animated">Register</button>
                    </div>

                </form>
            </div>
        )
    }
}

Register.propTypes = {
    errors: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default redirectAuthenticated(connect(mapStateToProps, { registerUser })(Register));