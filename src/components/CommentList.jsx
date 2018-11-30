import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Comment from "./Comment";
import './CommentList.css';
import Message from "./Message";

const CommentList = ({comments}) => {

  if(null === comments || 0 === comments.length){
    return(<Message message="No comments" />);
  }
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