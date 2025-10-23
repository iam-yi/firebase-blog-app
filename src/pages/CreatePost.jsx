import React from 'react'
import { addDoc } from 'firebase/firestore' ;
import { collection } from 'firebase/firestore';
import { db, auth} from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CreatePost({isAuth}) {
  const [title, setTitle] =  React.useState("");
  const [postText, setPostText] = React.useState("");

  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
    });
    navigate("/");
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className='createPostPage'>
    <div className='cpContainer'>
      <h1>Create A Post</h1>
      <div className='inputGp'>
        <label>Title:</label>
        <input placeholder='Title...'
        onChange={(e) => setTitle(e.target.value)}  
        />
      </div>
      <div className='inputGp'>
        <label>Post:</label>
        <textarea 
        placeholder='Write your post...'
        onChange={(e) => setPostText(e.target.value)}
        />
      </div>
    <button onClick={createPost}>Submit Post</button>
    </div>
    </div>
  )
}

export default CreatePost