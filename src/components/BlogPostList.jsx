import React, {Component} from 'react';
import timeago from 'timeago.js';

class BlogPostList extends Component {
  render() {
		const {posts, isFetching} = this.props;

		if(isFetching) {
			return(<div><i className="fas fa-spinner fa-spin"/> </div>);
		}

		if(!posts || 0 === posts.length) {
			return(<div>No blog posts</div>);
		}

    return (
      <div>
				<h1>Blog Posts</h1>
				{posts && posts.map(post =>  (
						<div className="card mb-3 mt-3 shadow-sm" key={post.id} >
							<div className="card-body">
								<h3>{post.title}</h3>
								<p className="card-text border-top">
									<small className="text-muted">
										{timeago().format(post.publishedAt)}
									</small>
								</p>
							</div>
							<div className="card-body">
								<p className="card-text border-top">
									{post.content.length > 80 ? post.content.substr(0, 80) + '...' : post.content}
								</p>
							</div>
						</div>
					))}
			</div>
    );
  }
}

export default BlogPostList;
