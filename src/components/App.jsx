import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {connect} from 'react-redux';
import LoginForm from "./LoginForm";
import BlogPostListContainer from '../containers/BlogPostListContainer';
import BlogPostContainer from '../containers/BlogPostContainer';
import Header from './Header';
import {requests} from '../agent';
import {userProfileFetch, userSetId, userLogout} from '../actions/userActions';
import RegisterFormContainer from "../containers/RegistrationContainer";
import BlogPostForm from "../components/BlogPostForm";

class App extends Component {
	constructor(props) {
		super(props);
		const token = window.localStorage.getItem('jwtToken');

		if(token) {
			requests.setToken(token);
		}
	}

	componentDidMount() {
	  const {userSetId} = this.props;
		const userId = window.localStorage.getItem('userId');

		if(userId) {
      userSetId(userId);
		}
	}

  componentDidUpdate(prevProps) {
		const {userId, userData, userProfileFetch} = this.props;
		if (prevProps.userId !== userId && null !== userId && userData === null) {
			userProfileFetch(userId);
		}
	}

  render() {
		const {isAuthenticated, userData, userLogout} = this.props;

		const routes = (
      <Switch>
        <Route path="/login" component={LoginForm}/>
        <Route path="/blog-post-form" component={BlogPostForm}/>
        <Route path="/blog-post/:id" component={BlogPostContainer}/>
        <Route path="/register" component={RegisterFormContainer} />
        <Route exact path="/:page?" component={BlogPostListContainer}/>
      </Switch>
    );

    return (
    	<div>
				<Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout} />
        {routes}
			</div>
    );
  }
}

const mapStateToProps = state => ({
	...state.auth,
});

const mapDispatchToProps = {
	userProfileFetch,
  userSetId,
	userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
