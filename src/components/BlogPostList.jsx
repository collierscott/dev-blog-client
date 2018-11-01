import React, {Component} from 'react';

class BlogPostList extends Component {
  render() {
		const {posts} = this.props;
    return (
      <div>
				<h1>Blog Post List</h1>
				<ul>
				{posts && posts.map(post =>  (
						<li key={post.id} >{post.title}</li>
					))}
				</ul>
			</div>
    );
  }
}

export default BlogPostList;
