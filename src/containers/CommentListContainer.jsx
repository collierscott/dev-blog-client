import React, {Component} from 'react';
import {connect} from 'react-redux';
import {commentListFetch, commentListUnload} from '../actions/commentsActions';
import Spinner from '../components/Spinner';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LoadMore from "../components/LoadMore";

class CommentListContainer extends Component {
	componentDidMount() {
		this.props.commentListFetch(this.props.blogPostId);
	}

	componentWillUnmount() {
		this.props.commentListUnload();
	}

  onLoadMoreCommentClick = (e) => {
    const {blogPostId, currentPage, commentListFetch} = this.props;
    commentListFetch(blogPostId, currentPage);
  };

  render() {
		const {comments, isFetching, isAuthenticated, blogPostId, currentPage, pageCount} = this.props;
		const showLoadMore = pageCount > 1 && currentPage <= pageCount;

		if(isFetching && currentPage === 1) {
			return(<Spinner/>);
		}

    return (
      <div>
				<h3>Comments</h3>
        {comments && <CommentList comments={comments}/>}
        {
          showLoadMore &&
          <LoadMore
            label="Load more comments"
            onClick={this.onLoadMoreCommentClick}
            disabled={isFetching}
          />
        }
        {isAuthenticated && <CommentForm blogPostId={blogPostId} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		...state.commentList,
		isAuthenticated: state.auth.isAuthenticated,
	}
};

const mapDispatchToProps = {
	commentListFetch,
	commentListUnload
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
