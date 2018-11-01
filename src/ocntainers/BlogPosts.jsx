import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPostList from '../components/BlogPostList';
import {blogPostAdd, blogPostList} from '../actions/actions';
import {requests} from '../agent';

class BlogPosts extends Component {
	componentDidMount() {
		requests.get('/blog_posts')
			.then(response =>console.log(response));
		setTimeout(this.props.blogPostAdd, 3000);
		setTimeout(this.props.blogPostAdd, 5000);
		setTimeout(this.props.blogPostAdd, 7000);
		this.props.blogPostList();
	};

  render() {
  	const {posts} = this.props;
    return (
      <div>
        <BlogPostList posts={posts}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	...state.blogPostList
});

const mapDispatchToProps = {
	blogPostAdd,
	blogPostList
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
