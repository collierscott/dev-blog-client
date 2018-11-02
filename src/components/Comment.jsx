import React from 'react';
import timeago from 'timeago.js';

const Comment = ({comment}) => {
  return (
		<div className="card mb-3 mt-3 shadow-sm">
			<div className="card-body">
				<h2>{comment.title}</h2>
				<p className="card-text">{comment.content}</p>
				<p className="card-text border-top">
					<small className="text-muted">
						{timeago().format(comment.publishedAt)} by {' '}
						{comment.author.name}
					</small>
				</p>
			</div>
		</div>
  )
};

export default Comment;
