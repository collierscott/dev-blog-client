import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';
import auth from './reducers/auth';
import blogPostList from './reducers/blogPostList';
import blogPost from './reducers/blogPost';
import commentList from './reducers/commentList';
import registration from './reducers/registration';
import blogPostForm from './reducers/blogPostForm';

export default combineReducers({
  auth,
  blogPostList,
  blogPost,
  blogPostForm,
  commentList,
  registration,
  router: routerReducer,
  form: formReducer
});