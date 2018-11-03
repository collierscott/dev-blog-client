import React, {Component} from 'react';
import {connect} from 'react-redux';
import {commentListFetch, commentListUnload} from '../actions/commentsActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

class CommentListContainer extends Component {
	componentDidMount() {
		this.props.commentListFetch(this.props.blogPostId);
	}

	componentWillUnmount() {
		this.props.commentListUnload();
	}

  render() {
		const {comments, isFetching, isAuthenticated, blogPostId} = this.props;
		//console.log(comments);
		if(isFetching) {
			return(<Spinner/>);
		}

		if(!comments || 0 === comments.length) {
			return(<Message message="No comments" />);
		}
    return (
      <div>
				<h3>Comments</h3>
        <CommentList comments={comments}/>
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
