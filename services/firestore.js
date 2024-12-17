import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  arrayUnion,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  arrayRemove,
  increment,
  documentId,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../config";
import { uriToBlob } from "../utils/uriToBlob";

export const addUser = async (userId, userData) => {
  await setDoc(doc(db, "users", userId), userData, { merge: true });
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const addPost = async ({ title, location, photoUri }) => {
  const image = await uploadImage("posts", photoUri, title);

  await addDoc(collection(db, "posts"), {
    authorId: auth.currentUser.uid,
    title,
    location,
    image,
    createdAt: serverTimestamp(),
  });
};

export const toggleLike = async (postId, isLiked) => {
  const userId = auth.currentUser?.uid;
  const postRef = doc(db, "posts", postId);

  if (isLiked) {
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });
  }
};

export const addComment = async (postId, text) => {
  const authorId = auth.currentUser.uid;
  const commentRef = await addDoc(collection(db, "comments"), {
    postId,
    authorId,
    text,
    createdAt: serverTimestamp(),
  });

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentsCount: increment(1),
  });

  const comment = await getDoc(commentRef);
  return {
    ...comment.data(),
    id: comment.id,
    authorAvatar: auth.currentUser.photoURL,
  };
};

export const getPosts = async (owner) => {
  const postsCollection = collection(db, "posts");

  let q;
  if (owner) {
    q = query(
      postsCollection,
      where("authorId", "==", owner),
      orderBy("createdAt", "desc")
    );
  } else {
    q = query(postsCollection, orderBy("createdAt", "desc"));
  }

  const querySnapshot = await getDocs(q);

  const posts = [];
  querySnapshot.forEach((doc) => {
    const postData = doc.data();
    posts.push({
      id: doc.id,
      ...postData,
    });
  });

  return posts;
};

export const getCommentsByPostId = async (postId) => {
  const commentsRef = collection(db, "comments");
  const q = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc") // Упорядочиваем по дате создания
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const comments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userIds = Array.from(
    new Set(comments.map((comment) => comment.authorId)) // Убираем undefined/null
  );

  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where(documentId(), "in", userIds));
  const usersSnapshot = await getDocs(usersQuery);

  const users = {};
  usersSnapshot.forEach((doc) => {
    users[doc.id] = doc.data();
  });

  const commentsWithAuthors = comments.map((comment) => ({
    ...comment,
    authorAvatar: users[comment.authorId]?.photoURL || null,
  }));

  return commentsWithAuthors;
};

export const updateUserInFirestore = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};

export const uploadImage = async (db, uri, fileName) => {
  const imageBlob = await uriToBlob(uri);
  const imageRef = ref(
    storage,
    `${db}/${fileName.split(" ").join("_")}_${Date.now()}`
  );
  await uploadBytes(imageRef, imageBlob);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
