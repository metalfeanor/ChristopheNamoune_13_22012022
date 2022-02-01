import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logStatus: false,
  email: "",
  password: "",
  id: "",
  firstName: "",
  lastName: "",
  token: "",
  loginError: false,
};

export function fetchUserToken({ email, password }) {
  // on retourne un thunk
  return async (dispatch) => {
    // ...
    const url = "http://localhost:3001/api/v1/user/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      //console.log(data.body.token);
      const token = data.body.token;
      dispatch(actions.login(email, password, token));
    } catch (error) {
      dispatch(actions.loginError());
      console.log(error);
    }
  };
}

export function fetchUserInfo(token) {
  // on retourne un thunk
  return async (dispatch) => {
    // ...
    const url = "http://localhost:3001/api/v1/user/profile";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      //console.log(data);
      const firstName = data.body.firstName;
      const lastName = data.body.lastName;
      const id = data.body.id;
      dispatch(actions.edit(firstName, lastName, id));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUpdateUserInfo(firstNameInput, lastNameInput, token, callback) {
  // on retourne un thunk
  return async (dispatch) => {
    // ...
    const url = "http://localhost:3001/api/v1/user/profile";
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ firstName: firstNameInput, lastName: lastNameInput }),
      });
      const data = await response.json();
      //console.log(data);
      const firstName = data.body.firstName;
      const lastName = data.body.lastName;
      dispatch(actions.edit(firstName, lastName));
      //callback to reset Edit Name form
      callback();
    } catch (error) {
      console.log(error);
    }
  };
}

const { actions, reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: {
      prepare: (email, password, token) => ({
        payload: { email, password, token },
      }),
      reducer: (draft, action) => {
        draft.email = action.payload.email;
        draft.password = action.payload.password;
        draft.logStatus = true;
        draft.token = action.payload.token;
        draft.loginError = false;
        return;
      },
    },
    logout: {
      reducer: () => {
        return initialState;
      },
    },
    loginError: {
      reducer: (draft) => {
        draft.loginError = true;
        return;
      },
    },
    edit: {
      prepare: (firstName, lastName, id) => ({
        payload: { firstName, lastName, id },
      }),
      reducer: (draft, action) => {
        draft.firstName = action.payload.firstName;
        draft.lastName = action.payload.lastName;
        draft.id = action.payload.id;
      },
    },
  },
});

export const { login, logout, edit } = actions;

export default reducer;
