import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPostList from '../components/BlogPostList';
import {blogPostListFetch, blogPostListSetPage} from '../actions/blogActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import Paginator from '../components/Paginator';

class BlogPostListContainer extends Component {
	componentDidMount() {
		this.props.blogPostListFetch();
	};

	componentDidUpdate(prevProps) {
	  const {blogPostListFetch, currentPage} = this.props;
	  if(prevProps.currentPage !== currentPage) {
      blogPostListFetch(currentPage);
    }
  }

  render() {
  	const {posts, isFetching, blogPostListSetPage, currentPage} = this.props;

		if(isFetching) {
			return(<Spinner />);
		}

		if(!posts || 0 === posts.length) {
			return(<Message message="No blog posts were found" />);
		}

    return (
      <div>
        <BlogPostList posts={posts} isFetching={isFetching} />
				<Paginator currentPage={currentPage} pageCount={10} setPage={blogPostListSetPage} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
	...state.blogPostList,
});

const mapDispatchToProps = {
	blogPostListFetch,
  blogPostListSetPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);
