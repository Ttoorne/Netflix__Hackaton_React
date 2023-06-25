import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ACTIONS } from "../helpers/consts";

export const libraryContext = createContext();
export const useLibrary = () => useContext(libraryContext);

const INIT_STATE = {
  library: JSON.parse(localStorage.getItem("library")),
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_LIBRARY:
      return { ...state, library: action.payload };

    default:
      return state;
  }
};

const LibraryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getLibrary = () => {
    let library = JSON.parse(localStorage.getItem("library"));
    if (!library) {
      localStorage.setItem(
        "library",
        JSON.stringify({
          products: [],
        })
      );
      library = {
        products: [],
      };
    }
    dispatch({ type: ACTIONS.GET_LIBRARY, payload: library });
  };

  useEffect(() => {
    localStorage.setItem("library", JSON.stringify(state.library));
  }, [state.library]);

  const addLibraryProduct = (product) => {
    let library = JSON.parse(localStorage.getItem("library"));
    if (!library) {
      library = {
        products: [],
      };
    }
    library.products.push(product);
    localStorage.setItem("library", JSON.stringify(library));
    dispatch({ type: ACTIONS.GET_LIBRARY, payload: library });
  };

  const checkProductLibrary = (id) => {
    let library = JSON.parse(localStorage.getItem("library"));

    if (library) {
      let newLib = library.products.filter((elem) => elem.id === id);
      return newLib.length > 0 ? true : false;
    }
  };

  const deleteLibraryProduct = (id) => {
    let library = JSON.parse(localStorage.getItem("library"));
    library.products = library.products.filter((elem) => elem.id !== id);
    localStorage.setItem("library", JSON.stringify(library));
    dispatch({ type: ACTIONS.GET_LIBRARY, payload: library });
  };

  const values = {
    getLibrary,
    library: state.library,
    deleteLibraryProduct,
    addLibraryProduct,
    checkProductLibrary,
  };

  return (
    <libraryContext.Provider value={values}>{children}</libraryContext.Provider>
  );
};

export default LibraryContextProvider;
