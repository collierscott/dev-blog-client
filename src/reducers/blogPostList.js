import {
  BLOG_POST_LIST_REQUEST,
  BLOG_POST_LIST_ADD,
  BLOG_POST_LIST_RECEIVED,
  BLOG_POST_LIST_ERROR
} from "../actions/constants";

export default(
  state={
    posts: null,
    isFetching: false
  }, action) => {
  switch (action.type) {
    case BLOG_POST_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        posts: action.data
      };
    case BLOG_POST_LIST_RECEIVED:
      return {
        ...state,
        posts: action.data['hydra:member'],
        isFetching: false
      };
    case BLOG_POST_LIST_ERROR:
      return {
        ...state,
        isFetching: false,
        posts: null
      };
    case BLOG_POST_LIST_ADD:
      return {
        ...state,
        posts: state.posts ? state.posts.concat(action.data) : state.posts
      };
    default:
      return state;
  }
}