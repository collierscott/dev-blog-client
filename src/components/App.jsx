import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import {connect} from 'react-redux';
import LoginForm from "./LoginForm";
import BlogPosts from '../containers/BlogPosts';
import BlogPostContainer from '../containers/BlogPostContainer';
import Header from './Header';
import {requests} from "../agent";

class App extends Component {
	constructor(props) {
		super(props);
		const token = window.localStorage.getItem('jwtToken');

		if(token) {
			requests.setToken(token);
		}
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps);
		const {userId} = this.props;
		if (prevProps.userId !== userId && null !== userId) {

		}
	}

  render() {
		const {isAuthenticated} = this.props;
    return (
    	<div>
				<Header isAuthenticated={isAuthenticated}/>
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
	...state.auth
});

export default connect(mapStateToProps)(App);
