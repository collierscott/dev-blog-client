import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPostList from '../components/BlogPostList';
import {blogPostListFetch, blogPostListSetPage} from '../actions/blogActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import Paginator from '../components/Paginator';

class BlogPostListContainer extends Component {
	componentDidMount() {
		this.props.blogPostListFetch(this.getQueryParamPage());
	};

	componentDidUpdate(prevProps) {
	  const {blogPostListFetch, currentPage, blogPostListSetPage} = this.props;

    if (prevProps.match.params.page !== this.getQueryParamPage()) {
      blogPostListSetPage(this.getQueryParamPage());
    }

	  if(prevProps.currentPage !== currentPage) {
      blogPostListFetch(currentPage);
    }
  }

  getQueryParamPage = () => {
    console.log(this.props.match.params.page);
	  return Number(this.props.match.params.page) || 1;
  };

	changePage = page => {
    const {history, blogPostListSetPage} = this.props;
    blogPostListSetPage(page);
    history.push(`/${page}`);
  };

  render() {
  	const {posts, isFetching, currentPage} = this.props;

		if(isFetching) {
			return(<Spinner />);
		}

		if(!posts || 0 === posts.length) {
			return(<Message message="No blog posts were found" />);
		}

    return (
      <div>
        <BlogPostList posts={posts} isFetching={isFetching} />
				<Paginator currentPage={currentPage} pageCount={10} setPage={this.changePage} />
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
