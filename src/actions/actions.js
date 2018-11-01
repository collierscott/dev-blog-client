export const BLOG_POST_LIST = 'BLOG_POST_LIST';
export const BLOG_POST_LIST_ADD = 'BLOG_POST_LIST_ADD';

export const blogPostList = () => (
  {
    type: BLOG_POST_LIST,
    data: [
      {
        id: 1,
        title: 'Hello'
      },
      {
        id: 2,
        title: 'Hello 2'
      },
      {
        id: 3,
        title: 'Hello 3'
      }
    ]
  }
);

export const blogPostAdd = () => (
  {
    type: BLOG_POST_LIST_ADD,
    data: {
        id: Math.floor(Math.random() * 100 + 3),
        title: 'Hello! This is a new post.'
      }
  }
);