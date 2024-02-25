/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useReducer, useContext, useEffect, useCallback } from "react";
import axios from "axios";
import reducer from "./reducer";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();
import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  GET_NOTES_BEGIN,
  GET_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  DELETE_NOTE_BEGIN,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_ERROR,
  TOGGLE_EDIT_STATE,
  HANDLE_CHANGE,
  HANDLE_DARK_MODE,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  LOG_OUT_USER,
  EDIT_NOTE_BEGIN,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_ERROR,
  CREATE_NOTE_BEGIN,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_ERROR,
} from "./actions";

const addUserToLocalstorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUserFromLocalstorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

const removeUserFromLocalstorage = () => {
  localStorage.removeItem("user");
};
const initialState = {
  user: getUserFromLocalstorage(),
  isLoading: false,
  notes: [],
  isEditing: false,
  searchQuery: "",
  sort: "latest",
  category: "all",
  isDarkMode: localStorage.getItem("isDark") || true,
  theme: localStorage.getItem("theme") || "light",
};

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const toggleDark = () => {
    dispatch({ type: HANDLE_DARK_MODE });
  };

  const logOutUser = () => {
    dispatch({ type: LOG_OUT_USER });
    removeUserFromLocalstorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const toggleEdit = () => {
    dispatch({ type: TOGGLE_EDIT_STATE });
  };

  const setUpUser = async ({ currentUser, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/${endPoint}`,
        currentUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { user, message } = response.data;
      dispatch({ type: SETUP_USER_SUCCESS, payload: { user } });

      toast.success(message, {
        theme: "colored",
      });
      addUserToLocalstorage(user);
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR });
      toast.error(error.response.data.msg, {
        theme: "colored",
      });
    }
  };

  const updateUser = async ({ currentUser, endPoint }) => {
    dispatch({ type: EDIT_USER_BEGIN });
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/auth/${endPoint}`,
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      const { user, message } = response.data;
      dispatch({ type: EDIT_USER_SUCCESS, payload: { user } });
      toast.success(message, {
        theme: "colored",
      });
      addUserToLocalstorage(user);
    } catch (error) {
      dispatch({ type: EDIT_USER_ERROR });
      toast.error(error.response.data.msg, {
        theme: "colored",
      });
    }
  };

  const createNote = async (data) => {
    dispatch({ type: CREATE_NOTE_BEGIN });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/notes`,
        data,
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("New note created!", {
          theme: "colored",
        });
        dispatch({ type: CREATE_NOTE_SUCCESS });
      } else {
        toast.error("Problem creating a note. Please try again!");
      }
      getNotes();
    } catch (error) {
      dispatch({ type: CREATE_NOTE_ERROR });
      console.log(error);
    }
  };

  const getNotes = async () => {
    const { searchQuery, sort, category } = state;

    let url = `http://localhost:5000/api/v1/notes?sort=${sort}&category=${category}`;
    if (searchQuery) {
      url = url + `&search=${searchQuery}`;
    }
    dispatch({ type: GET_NOTES_BEGIN });
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const { notes } = response.data;
      dispatch({ type: GET_NOTES_SUCCESS, payload: { notes } });
    } catch (error) {
      dispatch({ type: GET_NOTES_ERROR });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const deleteNote = async (id) => {
    dispatch({ type: DELETE_NOTE_BEGIN });
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      const { msg } = response.data;

      dispatch({ type: DELETE_NOTE_SUCCESS });
      toast.success(msg, {
        theme: "colored",
      });
      getNotes();
    } catch (error) {
      dispatch({ type: DELETE_NOTE_ERROR });
      toast.error(error.response.data.msg, {
        theme: "colored",
      });
    }
  };

  const updateNote = async ({ data, id }) => {
    dispatch({ type: EDIT_NOTE_BEGIN });
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/notes/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        }
      );
      const { msg } = response.data;
      toast.success(msg, {
        theme: "colored",
      });

      dispatch({ type: EDIT_NOTE_SUCCESS });
      getNotes();
    } catch (error) {
      dispatch({ type: EDIT_NOTE_ERROR });
      toast.error(error.response.data.msg, {
        theme: "colored",
      });

      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    localStorage.setItem("isDark", state.isDarkMode);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme, state.isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getNotes();
    }, 500);
    return () => clearTimeout(timer);
  }, [state.sort, state.searchQuery, state.category]);

  useEffect(() => {
    if (state.user) {
      navigate("/notes");
    }
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUpUser,
        createNote,
        deleteNote,
        updateNote,
        toggleEdit,
        getNotes,
        handleChange,
        toggleDark,
        updateUser,
        logOutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { AppProvider, useAppContext };
