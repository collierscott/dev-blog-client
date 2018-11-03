import {requests} from "../agent";
import {
  BLOG_POST_LIST_REQUEST,
  BLOG_POST_LIST_RECEIVED,
  BLOG_POST_LIST_ERROR ,
  BLOG_POST_LIST_ADD,
  BLOG_POST_REQUEST,
  BLOG_POST_RECEIVED,
  BLOG_POST_ERROR,
  BLOG_POST_UNLOAD,
  BLOG_POST_LIST_SET_PAGE,
} from './constants';

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

export const blogPostListAdd = () => (
  {
    type: BLOG_POST_LIST_ADD,
    data: {
      id: Math.floor(Math.random() * 100 + 3),
      title: 'Hello! This is a new post.'
    }
  }
);

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