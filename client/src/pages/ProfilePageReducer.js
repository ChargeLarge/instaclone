export const INITIAL_STATE = {
  fetching: false,
  fetchingAdditionalPosts: false,
  error: false,
  data: null,
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROFILE_START': {
      return { ...state, fetching: true, error: false };
    }
    case 'FETCH_PROFILE_FAILURE': {
      return { ...state, fetching: false, error: action.payload };
    }
    case 'FETCH_PROFILE_SUCCESS': {
      return {
        ...state,
        fetching: false,
        error: false,
        data: {
          ...action.payload,
          posts: action.payload.posts.data,
          postCount: action.payload.posts.postCount,
        },
      };
    }
    case 'FETCH_ADDITIONAL_POSTS_START': {
      return { ...state, fetchingAdditionalPosts: true };
    }
    case 'FETCH_ADDITIONAL_POSTS_FAILURE': {
      return {
        ...state,
        fetchingAdditionalPosts: false,
        error: action.payload,
      };
    }
    case 'FETCH_ADDITIONAL_POSTS_SUCCESS': {
      return { ...state, fetchingAdditionalPosts: false, error: false };
    }
    case 'SET_POST_VOTES_COUNT': {
      const { postId, votes } = action.payload;
      const posts = JSON.parse(JSON.stringify(state.data.posts));
      const postIndex = posts.findIndex((post) => post._id === postId);
      posts[postIndex].postVotes = votes;

      return {
        ...state,
        data: {
          ...state.data,
          posts,
        },
      };
    }
    case 'INCREMENT_POST_COMMENTS_COUNT': {
      const postId = action.payload;
      const posts = JSON.parse(JSON.stringify(state.data.posts));
      const postIndex = posts.findIndex((post) => post._id === postId);
      posts[postIndex].comments += 1;

      return {
        ...state,
        data: {
          ...state.data,
          posts,
        },
      };
    }
    case 'DECREMENT_POST_COMMENTS_COUNT': {
      const { decrementCount, postId } = action.payload;
      const posts = JSON.parse(JSON.stringify(state.data.posts));
      const postIndex = posts.findIndex((post) => post._id === postId);
      posts[postIndex].comments -= decrementCount;

      return {
        ...state,
        data: {
          ...state.data,
          posts,
        },
      };
    }
    case 'ADD_POSTS': {
      const posts = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          posts: [...state.data.posts, ...posts],
        },
      };
    }
    default: {
      throw new Error(
        `Invalid action type '${action.type}' passed to profileReducer.`
      );
    }
  }
};