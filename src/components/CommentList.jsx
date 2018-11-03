import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Comment from "./Comment";
import './CommentList.css';

const CommentList = ({comments}) => {
  return (
    <TransitionGroup>
      {comments.map(comment => (
        <CSSTransition key={comment.id} timeout={500} classNames="fade">
          <Comment comment={comment} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
};

export default CommentList;