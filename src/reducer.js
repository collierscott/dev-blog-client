import {combineReducers} from 'redux';
import auth from './reducers/auth';
import blogPostList from './reducers/blogPostList';
import blogPost from './reducers/blogPost';
import commentList from './reducers/commentList';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';

export default combineReducers({
  auth,
  blogPostList,
  blogPost,
  commentList,
  router: routerReducer,
  form: formReducer
});