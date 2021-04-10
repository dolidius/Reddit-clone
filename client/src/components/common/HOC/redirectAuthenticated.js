import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default ChildComponent => {
    class ComposedComponent extends Component {

        componentDidMount() {
            this.shouldNavigateAway();
        }
    
        componentDidUpdate() {
            this.shouldNavigateAway();
        }
    
        shouldNavigateAway(){
            if(this.props.auth.authenticated){
                this.props.history.push('/');
            }
        }

        render(){
            return(
                <ChildComponent {...this.props} />
            );
        }
    }

    ComposedComponent.propTypes = {
        auth: PropTypes.object.isRequired
    }

    const mapStateToProps = state => ({
        auth: state.auth
    });

    return connect(mapStateToProps, null)(ComposedComponent);
};