/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
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
  HANDLE_CHANGE,
  HANDLE_DARK_MODE,
  TOGGLE_EDIT_STATE,
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
const reducer = (state, action) => {
  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload.user };
  }
  if (action.type === SETUP_USER_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === EDIT_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_USER_SUCCESS) {
    return { ...state, isLoading: false, user: action.payload.user };
  }
  if (action.type === EDIT_USER_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_NOTE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_NOTE_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_NOTE_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === GET_NOTES_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_NOTES_SUCCESS) {
    return { ...state, isLoading: false, notes: action.payload.notes };
  }
  if (action.type === GET_NOTES_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === DELETE_NOTE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_NOTE_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === DELETE_NOTE_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === TOGGLE_EDIT_STATE) {
    return { ...state, isEditing: !state.isEditing };
  }
  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }
  if (action.type === EDIT_NOTE_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_NOTE_SUCCESS) {
    return { ...state, isLoading: false };
  }
  if (action.type === EDIT_NOTE_ERROR) {
    return { ...state, isLoading: false };
  }

  if (action.type === HANDLE_DARK_MODE) {
    return {
      ...state,
      isDarkMode: !state.isDarkMode,
      theme: state.isDarkMode ? "dark" : "light",
    };
  }
  if (action.type === LOG_OUT_USER) {
    return { ...state, user: null, notes:[] };
  }

  throw new Error(`No such action exist: ${action.type}`);
};
export default reducer;
