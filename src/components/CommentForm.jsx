import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {renderField} from '../Form/form';
import {commentAdd} from "../actions/commentsActions";

class CommentForm extends Component {
  onSubmit(values) {
    const {commentAdd, blogPostId, reset} = this.props;
    return commentAdd(values.content, blogPostId).then(() => reset());
  }

  render() {
    const {handleSubmit, submitting} = this.props;

    return (
      <div className="card mb-3 mt-3 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="content" label="Type your comment:"
                   type="textarea" component={renderField}/>
            <button type="submit" className="btn btn-primary btn-big btn-block"
                    disabled={submitting}>
              Add Comment
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  commentAdd
};

export default reduxForm({
  form: 'CommentForm'
})(connect(null, mapDispatchToProps)(CommentForm));
