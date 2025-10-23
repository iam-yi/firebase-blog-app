import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const snapshot = await getDocs(postsCollectionRef);
      setPostList(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    getPosts();
    // postsCollectionRef is stable for this instance; omit from deps to avoid re-runs
  }, []); 

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // Optimistic UI update (optional if you switch to onSnapshot later)
    setPostList((prev) => prev.filter((p) => p.id !== id));
  };

  const currentUid = auth.currentUser?.uid; // 👈 guard against null

  return (
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth &&
                currentUid &&                         // 👈 only if we have a user
                post.author?.id === currentUid && (   // 👈 guard author
                  <button onClick={() => deletePost(post.id)} aria-label="Delete post">
                    &#128465;
                  </button>
                )}
            </div>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <h3>@{post.author?.name ?? "Unknown"}</h3>
        </div>
      ))}
    </div>
  );
}

export default Home;
