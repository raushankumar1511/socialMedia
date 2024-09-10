import { createContext, useCallback, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
  increaseLikes: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }

  if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }

  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }

  if (action.type === "INCREASE_LIKES") {
    newPostList = currPostList.map((post) =>
      post.id === action.payload.postId
        ? { ...post, reactions: { likes: post.reactions.likes + 1 } }
        : post
    );
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const addPost = (userId, postTitle, postBody, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: { likes: 0 },
        userId: userId,
        tags: tags,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: { postId },
      });
    },
    [dispatchPostList]
  );

  const increaseLikes = (postId) => {
    dispatchPostList({
      type: "INCREASE_LIKES",
      payload: { postId },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList: postList,
        addPost: addPost,
        addInitialPosts: addInitialPosts,
        deletePost: deletePost,
        increaseLikes: increaseLikes,
      }}
    >
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
