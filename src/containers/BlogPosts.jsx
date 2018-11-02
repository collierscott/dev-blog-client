import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPostList from '../components/BlogPostList';
import {blogPostListFetch} from '../actions/actions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

class BlogPosts extends Component {
	componentDidMount() {
		this.props.blogPostListFetch();
	};

  render() {
  	const {posts, isFetching} = this.props;

		if(isFetching) {
			return(<Spinner />);
		}

		if(!posts || 0 === posts.length) {
			return(<Message message="No blog posts were found" />);
		}

    return (
      <div>
        <BlogPostList posts={posts} isFetching={isFetching}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	...state.blogPostList
});

const mapDispatchToProps = {
	blogPostListFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPosts);
