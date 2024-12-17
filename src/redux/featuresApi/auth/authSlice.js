import { createSlice } from "@reduxjs/toolkit";

// Helper function to load user from localStorage synchronously
const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (!serializedState) return { user: null }; // If no user is stored
    return { user: JSON.parse(serializedState) }; // Parse and return stored user
  } catch (error) {
    console.error("Failed to load user from localStorage:", error);
    return { user: null };
  }
};

/**
 *  loadUserFromLocalStorage
 * Load the user from the local storage synchronously.
 */

const initialState = loadUserFromLocalStorage(); // Load user during initialization

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user; // Set user in the state
      localStorage.setItem("user", JSON.stringify(state.user)); // Save to localStorage
    },
    /**
     * @function setUser
     * @description Set a user in the state and in the local storage.
     * @param {Object} state - The current state.
     * @param {Object} action - The action payload containing the user object.
     */

    logout: (state) => {
      state.user = null; // Remove user from state
      localStorage.removeItem("user"); // Remove from localStorage
    },
  
  },
});

// Export the action creators
export const { setUser, logout } = authSlice.actions;

// Export the reducer to integrate with the store
export default authSlice.reducer;



