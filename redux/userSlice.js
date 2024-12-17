import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  uid: null,
  login: null,
  email: null,
  avatar: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, { payload }) {
      const { displayName, email, photoURL, uid } = payload;
      state.isAuth = true;
      state.uid = uid;
      state.login = displayName;
      state.email = email;
      state.avatar = photoURL;
    },
    clearUserInfo(state) {
      state.isAuth = false;
      state.uid = null;
      state.login = null;
      state.email = null;
      state.avatar = null;
    },
    updateAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
  },
});

export const { setUserInfo, clearUserInfo, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
