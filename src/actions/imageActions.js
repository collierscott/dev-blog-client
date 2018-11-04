import {
  IMAGE_UPLOADED,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_ERROR,
  IMAGE_DELETE_REQUEST,
  IMAGE_DELETED
} from '../actions/constants';
import {requests} from '../agent';

export const imageUploaded = (data) => {
  return {
    type: IMAGE_UPLOADED,
    image: data
  }
};

export const imageUploadRequest = () => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
  }
};

export const imageUploadError = () => {
  return {
    type: IMAGE_UPLOAD_ERROR,
  }
};

export const imageUpload = (file) => {
  return (dispatch) => {
    dispatch(imageUploadRequest());
    return requests.upload('/images', file)
      .then(response => dispatch(imageUploaded(response)))
      .catch(() => dispatch(imageUploadError))
  }
};

export const imageDeleteRequest = () => {
  return {
    type: IMAGE_DELETE_REQUEST,
  }
};

export const imageDelete = (id) => {
  return (dispatch) => {
    dispatch(imageDeleteRequest());
    return requests.delete(`/images/${id}`)
      .then(() => dispatch(imageDeleted(id)));
  }
};

export const imageDeleted = (id) => {
  return {
    type: IMAGE_DELETED,
    imageId: id
  }
};