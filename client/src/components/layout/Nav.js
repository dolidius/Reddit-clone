import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import PropTypes from 'prop-types';

class Nav extends Component {

    showLinks = () => {
        const unAuthorizedLinks = 
        <ul className="nav__items">
            <li className="nav__item">
                <Link className="button button--blue-border button--sm" to="/login">Log in</Link>
            </li>
            <li className="nav__item">
                <Link className="button button--blue button--sm" to="/register" style={{padding: '1.1rem 4rem'}}>Sign up</Link>
            </li>
        </ul>;

        const authorizedLinks = 
        <ul className="nav__items">
            <li className="nav__item">
                <Link to={`/u/${this.props.auth.user.login}`}>
                    <img className="nav__user-avatar" src={this.props.auth.user.avatar} alt="User avatar"/>
                </Link>
            </li>
            <li className="nav__item">
                <span className="button button--blue button--sm" onClick={this.logout} style={{padding: '1.1rem 4rem'}}>Logout</span>
            </li>
        </ul>;

        if(this.props.auth.authenticated){
            return authorizedLinks;
        }else{
            return unAuthorizedLinks;
        }
        
    }

    logout = e => {
        this.props.logoutUser();
    }

    render() {
        return (
            <nav className="nav">
                <div className="nav__logo">
                    <img className="nav__logo-image" src={require(`../../img/logo.png`)} alt="logo"/>
                    <Link to="/">Reddit</Link>
                </div>


                <div className="nav__searchbar">
                    <label htmlFor="search" className="nav__searchbar-icon">
                        <i className="fas fa-search"></i>
                    </label>
                    <input id="search" className="nav__searchbar-input" placeholder="Search reddit..." type="text"/>
                </div>

                <div className="spacer" />

                {this.showLinks()}

            </nav>
        )
    }
}

Nav.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logoutUser })(Nav));