import React, { Component } from 'react';

import { loginUser } from '../../actions/authActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import TextFieldGroup from './TextFieldGroup';

// higher order components
import redirectAuthenticated from '../common/HOC/redirectAuthenticated';

class Login extends Component {

    state = {
        login: '',
        password: '',
        errors: {}
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    loginUser = e => {
        e.preventDefault();
        const { login, password } = this.state;
        const user = { login, password };
        this.props.loginUser(user, this.props.history);
    }

    render() {
        return (
            <div className="authform__container">
                <form onSubmit={this.loginUser} className="authform">
                    <h2 className="authform__title">Login</h2>

                    <TextFieldGroup error={this.state.errors.login} name="login" onChange={this.inputChange} value={this.state.login} type="text" placeholder="Login" />
                    <TextFieldGroup error={this.state.errors.password} name="password" onChange={this.inputChange} value={this.state.password} type="password" placeholder="Password" />
                
                    <div className="authform__group">
                        <button className="authform__item button button--md button--blue button--animated">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    errors: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
});

export default redirectAuthenticated(connect(mapStateToProps, { loginUser })(Login));