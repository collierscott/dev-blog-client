import React from 'react';
import timeago from 'timeago.js';
import Message from './Message';

const BlogPost = ({post}) => {
  if (null === post) {
    return (<Message message="Blog post does not exist"/>);
  }
  console.log(post);
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
      <div className="card-body">
        {post.images && 0 < post.images.length && post.images.map(image => (
          <img key={image.url} alt="things" src={`http://localhost:8000${image.url}`} />
        ))}
      </div>
    </div>
  )
};

export default BlogPost;
