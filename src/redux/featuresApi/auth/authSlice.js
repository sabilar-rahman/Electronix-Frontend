import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = async () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return { user: null };
    // to use json data there need to purse
    return { user: JSON.parse(serializedState) };
  } catch (error) {
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

/**
 * @function setUser
 * @description Set a user in the state and in the local storage
 * @param {Object} state - the state of the application
 * @param {Object} action - the action object with the user to set
 */
/**
 * @function logout
 * @description Remove the user from the state and from the local storage
 * @param {Object} state - the state of the application
 */



export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;