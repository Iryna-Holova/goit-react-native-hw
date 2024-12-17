import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../config";
import {
  addUser,
  getUser,
  updateUserInFirestore,
  uploadImage,
} from "./firestore";
import { setUserInfo, clearUserInfo, updateAvatar } from "../redux/userSlice";

export const registerDB = async ({ login, email, password }, photoUri) => {
  if (photoUri) {
    photoUri = await uploadImage("users", photoUri, login);
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName: login,
    photoURL: photoUri,
  });

  await addUser(user.uid, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};

export const loginDB = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logoutDB = async () => {
  await signOut(auth);
};

export const updateUserAvatar = async (photoURL, dispatch) => {
  const user = auth.currentUser;
  if (photoURL) {
    photoURL = await uploadImage("users", photoURL, user.displayName);
  }
  await updateProfile(user, { photoURL });
  await updateUserInFirestore(user.uid, { photoURL });
  await dispatch(updateAvatar(photoURL));
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { uid, email, displayName, photoURL } = await getUser(user.uid);
      dispatch(setUserInfo({ uid, email, displayName, photoURL }));
    } else {
      dispatch(clearUserInfo());
    }
  });
};
