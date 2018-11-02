import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPostList from '../components/BlogPostList';
import {blogPostAdd, blogPostListFetch} from '../actions/actions';

class BlogPosts extends Component {
	componentDidMount() {
		this.props.blogPostListFetch();
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
	blogPostListFetch
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
