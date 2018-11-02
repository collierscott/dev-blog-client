import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPosts from '../containers/BlogPosts';
import BlogPostContainer from '../containers/BlogPostContainer';
import Header from './Header';

class App extends Component {
  render() {
    return (
    	<div>
				<Header/>
				<Switch>
					<Route path="/login" component={LoginForm}/>
					<Route path="/blog-post/:id" component={BlogPostContainer}/>
					<Route exact path="/" component={BlogPosts}/>
				</Switch>
			</div>
    );
  }
}

export default App;
