import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWriteBlogPost} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../Form/form";
import {blogPostAdd, blogPostFormUnload} from "../actions/blogActions";
import {imageDelete} from "../actions/imageActions";
import ImageUpload from "./ImageUpload";
import {ImageBrowser} from "./ImageBrowser";
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class BlogPostForm extends React.Component {
  onSubmit(values) {
    const {blogPostAdd, reset, history, images} = this.props;

    return blogPostAdd(values.title, values.content, images)
      .then(() => {
        reset();
        history.push('/');
      });
  }

  componentWillUnmount() {
    this.props.blogPostFormUnload();
  }

  render() {
    if (!canWriteBlogPost(this.props.userData)) {
      return <Redirect to="/login"/>
    }

    const {submitting, handleSubmit, error, images, imageReqInProgress, imageDelete} = this.props;

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="title" label="Title:" type="text" component={renderField}/>
            <Field name="content" label="Content:" type="textarea" component={renderField}/>
            <Editor />

            <ImageUpload />
            <ImageBrowser images={images}
                          deleteHandler={imageDelete}
                          isLocked={imageReqInProgress} />

            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting || imageReqInProgress}>
              Publish Now!
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  blogPostAdd,
  blogPostFormUnload,
  imageDelete
};

const mapStateToProps = state => ({
  userData: state.auth.userData,
  ...state.blogPostForm
});

export default reduxForm({
  form: 'BlogPostForm'
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))