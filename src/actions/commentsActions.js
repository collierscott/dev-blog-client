import {
  COMMENT_LIST_ERROR,
  COMMENT_LIST_RECEIVED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_UNLOAD,
  COMMENT_ADDED,
} from './constants';
import {requests} from '../agent';
import {userLogout} from './userActions';
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

export const commentListRequest = () => (
  {
    type: COMMENT_LIST_REQUEST,
  }
);

export const commentListReceived = (data) => (
  {
    type: COMMENT_LIST_RECEIVED,
    data
  }
);

export const commentListError = (error) => (
  {
    type: COMMENT_LIST_ERROR,
  }
);

export const commentListUnload = () => (
  {
    type: COMMENT_LIST_UNLOAD,
  }
);

export const commentListFetch = (id, page = 1) => {
  return (dispatch) => {
    dispatch(commentListRequest());
    return requests.get(`/blog_posts/${id}/comments?_page=${page}`)
      .then(response => dispatch(commentListReceived(response)))
      .catch(error => dispatch(commentListError(error)))
  }
};

export const commentAdded = (comment) => ({
  type: COMMENT_ADDED,
  comment
});

export const commentAdd = (comment, blogPostId) => {
  return (dispatch) => {
    return requests.post(
      '/comments',
      {
        content: comment,
        post: `/api/blog_posts/${blogPostId}`
      }
    ).then(
      response => dispatch(commentAdded(response))
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};