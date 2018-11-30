import {requests} from "../agent";
import {
  BLOG_POST_LIST_REQUEST,
  BLOG_POST_LIST_RECEIVED,
  BLOG_POST_LIST_ERROR ,
  BLOG_POST_FORM_UNLOAD,
  BLOG_POST_REQUEST,
  BLOG_POST_RECEIVED,
  BLOG_POST_ERROR,
  BLOG_POST_UNLOAD,
  BLOG_POST_LIST_SET_PAGE,
} from './constants';
import {userLogout} from './userActions';
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

export const blogPostListRequest = () => (
  {
    type: BLOG_POST_LIST_REQUEST,
  }
);

export const blogPostListSetPage = (page) => (
  {
    type: BLOG_POST_LIST_SET_PAGE,
    page
  }
);

export const blogPostListReceived = (data) => (
  {
    type: BLOG_POST_LIST_RECEIVED,
    data
  }
);

export const blogPostListError = (error) => (
  {
    type: BLOG_POST_LIST_ERROR,
    error
  }
);

export const blogPostListFetch = (page = 1) => {
  return (dispatch) => {
    dispatch(blogPostListRequest());
    return requests.get(`/blog_posts?_page=${page}`)
      .then(response => dispatch( blogPostListReceived(response)))
      .catch(error => dispatch(blogPostListError(error)))
  }
};

export const blogPostRequest = () => (
  {
    type: BLOG_POST_REQUEST,
  }
);

export const blogPostReceived = (data) => (
  {
    type: BLOG_POST_RECEIVED,
    data
  }
);

export const blogPostError = (error) => (
  {
    type: BLOG_POST_ERROR,
  }
);

export const blogPostUnload = () => (
  {
    type: BLOG_POST_UNLOAD,
  }
);

export const blogPostFetch = (id) => {
  return (dispatch) => {
    dispatch(blogPostRequest());
    return requests.get(`/blog_posts/${id}`)
      .then(response => dispatch(blogPostReceived(response)))
      .catch(error => dispatch(blogPostError(error)))
  }
};

export const blogPostAdd = (title, content, images = []) => {
  return (dispatch) => {
    return requests.post(
      '/blog_posts',
      {
        title,
        content,
        slug: title && title.replace(/ /g, "-").toLowerCase(),
        images: images.map(image => `/api/images/${image.id}`)
      }
    ).catch((error) => {
      if (401 === error.response.status) {
        return dispatch(userLogout());
      } else if (403 === error.response.status) {
        throw new SubmissionError({
          _error: 'You do not have rights to publish blog posts!'
        });
      }
      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const blogPostFormUnload = () => ({
  type: BLOG_POST_FORM_UNLOAD
});