import {
  COMMENT_LIST_ERROR,
  COMMENT_LIST_RECEIVED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_UNLOAD,
} from './constants';
import {requests} from "../agent";

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

export const commentListFetch = (id) => {
  return (dispatch) => {
    dispatch(commentListRequest());
    return requests.get(`/blog_posts/${id}/comments`)
      .then(response => dispatch(commentListReceived(response)))
      .catch(error => dispatch(commentListError(error)))
  }
};