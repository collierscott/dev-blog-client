import {
  BLOG_POST_LIST_REQUEST,
  BLOG_POST_LIST_ADD,
  BLOG_POST_LIST_RECEIVED,
  BLOG_POST_LIST_ERROR,
  BLOG_POST_LIST_SET_PAGE
} from "../actions/constants";
import {hydraPageCount} from "../apiUtils";

export default(
  state={
    posts: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null,
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
        pageCount: hydraPageCount(action.data),
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
    case BLOG_POST_LIST_SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}