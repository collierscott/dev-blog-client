import React from 'react';
import timeago from 'timeago.js';

const BlogPost = ({post}) => {
 //console.log(post);
  return (
    <div className="card mb-3 mt-3 shadow-sm">
			<div className="card-body">
      <h2>{post.title}</h2>
				<p className="card-text">{post.content}</p>
				<p className="card-text border-top">
					<small className="text-muted">
						{timeago().format(post.publishedAt)} by {' '}
						{post.author.name}
					</small>
				</p>
			</div>
    </div>
  )
};

export default BlogPost;
