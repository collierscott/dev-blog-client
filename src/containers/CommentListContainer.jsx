import React, {Component} from 'react';
import {connect} from 'react-redux';
import Comment from '../components/Comment';
import {commentListFetch, commentListUnload} from '../actions/commentsActions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import CommentForm from '../components/CommentForm';

class CommentListContainer extends Component {
	componentDidMount() {
		this.props.commentListFetch(this.props.blogPostId);
	}

	componentWillUnmount() {
		this.props.commentListUnload();
	}

  render() {
		const {comments, isFetching, isAuthenticated} = this.props;
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
				{comments.map(comment => (
					<Comment key={comment.id} comment={comment} />
				))}
        {isAuthenticated && <CommentForm/>}
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
