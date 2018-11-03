import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {connect} from 'react-redux';
import LoginForm from "./LoginForm";
import BlogPosts from '../containers/BlogPosts';
import BlogPostContainer from '../containers/BlogPostContainer';
import Header from './Header';
import {requests} from '../agent';
import {userProfileFetch} from '../actions/userActions';

class App extends Component {
	constructor(props) {
		super(props);
		const token = window.localStorage.getItem('jwtToken');

		if(token) {
			requests.setToken(token);
		}
	}

  componentDidUpdate(prevProps) {
		const {userId, userProfileFetch} = this.props;
		if (prevProps.userId !== userId && null !== userId) {
			userProfileFetch(userId);
		}
	}

  render() {
		const {isAuthenticated, userData} = this.props;
    return (
    	<div>
				<Header isAuthenticated={isAuthenticated} userData={userData} />
				<Switch>
					<Route path="/login" component={LoginForm}/>
					<Route path="/blog-post/:id" component={BlogPostContainer}/>
					<Route exact path="/" component={BlogPosts}/>
				</Switch>
			</div>
    );
  }
}

const mapStateToProps = state => ({
	...state.auth,
});

const mapDispatchToProps = {
	userProfileFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
