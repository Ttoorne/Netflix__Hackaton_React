import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ACTIONS } from '../helpers/consts';

export const commentContext = createContext();
export const useComment = () => useContext(commentContext);

const INIT_STATE = {
  comments: JSON.parse(localStorage.getItem('comments')),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_COMMENTS:
      return { ...state, comments: action.payload };

    default:
      return state;
  }
};

const CommentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getComments = () => {
    let comments = JSON.parse(localStorage.getItem('comments'));
    if (!comments) {
      localStorage.setItem(
        'comments',
        JSON.stringify({
          comments: [],
        })
      );
      comments = [];
    }
    dispatch({ type: ACTIONS.GET_COMMENTS, payload: comments });
  };

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(state.comments));
  }, [state.comments]);

  const addComment = (comment) => {
    let comments = JSON.parse(localStorage.getItem('comments'));
    if (!comments) {
      comments = [];
    }
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
    dispatch({ type: ACTIONS.GET_COMMENTS, payload: comments });
  };

  const deleteComment = (id) => {
    let comments = JSON.parse(localStorage.getItem('comments'));
    comments = comments.filter((elem) => elem.uniqueId !== id);
    localStorage.setItem('comments', JSON.stringify(comments));
    dispatch({ type: ACTIONS.GET_COMMENTS, payload: comments });
  };

  const values = {
    getComments,
    comments: state.comments,
    deleteComment,
    addComment,
  };

  return (
    <commentContext.Provider value={values}>{children}</commentContext.Provider>
  );
};

export default CommentsContextProvider;
