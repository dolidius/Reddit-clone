import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utilities/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.scss';

// Components
import PrivateRoute from './components/common/PrivateRoute';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Subreddit from './components/subreddit/Subreddit';
import AddPost from './components/posts/AddPost';
import Post from './components/posts/Post';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Error from './components/common/404Error';

if(localStorage.jwt){
    setAuthToken(localStorage.jwt);
    const decoded = jwt_decode(localStorage.jwt);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;

    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

class App extends Component {

    render(){
        return(
            <Provider store={store} >
                <Router>
                    <Layout>
                        <Route path="/" exact component={Home} />

                        <Switch>
                            <Route path="/page/:n(\d+)" exact component={Home} />
                            <Route path="/page/:n(\w+)" exact render={() => <Error error="This page doesn't exists" />} />
                        </Switch>

                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/u/:login" exact component={Profile} />

                        <Switch>
                            <Route path="/u/:login/page/:n(\d+)" exact component={Profile} />
                            <Route path="/u/:login/page/:n(\w+)" exact render={() => <Error error="This page doesn't exists" />} />
                        </Switch>

                        <PrivateRoute path="/u/:login/edit" exact component={EditProfile} />
                        <Route path="/r/:name" exact component={Subreddit}/>

                        <Switch>
                            <Route path="/r/:name/page/:n(\d+)" exact component={Subreddit}/>
                            <Route path="/r/:name/page/:n(\w+)" exact render={() => <Error error="This page doesn't exists" />} />
                        </Switch>

                        <Switch>
                            <PrivateRoute path="/r/:name/addpost" exact component={AddPost} />
                            <Route path="/r/:name/:id" exact component={Post} />
                        </Switch>

                    </Layout>
                </Router>
            </Provider> 
        );
    }

}

export default App;