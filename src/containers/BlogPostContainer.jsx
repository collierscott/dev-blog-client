import React, {Component} from 'react';
import {connect} from 'react-redux';
import BlogPost from '../components/BlogPost';
import {blogPostFetch, blogPostUnload} from '../actions/actions';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

class BlogPostContainer extends Component {
	componentDidMount() {
		//console.log(this.props.match.params.id);
		this.props.blogPostFetch(this.props.match.params.id);
	}

	componentWillUnmount() {
		this.props.blogPostUnload();
	}

  render() {
		const {post, isFetching} = this.props;

		if(isFetching) {
			return(<Spinner/>);
		}

		if(!post) {
			return(<Message message="The blog post was not found" />);
		}

    return (
      <div>
        <BlogPost post={post} isFetching={isFetching}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	...state.blogPost
});

const mapDispatchToProps = {
	blogPostFetch,
	blogPostUnload
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);
