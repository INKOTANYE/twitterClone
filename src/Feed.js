import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import dbRef from "./firebase";
import FlipMove from "react-flip-move";
import { get } from "firebase/database";

function Feed() {
  const [posts, setPosts] = useState([]);
  const postList=[]
  useEffect(() => {
    const postDb=dbRef
  
    get(postDb).then((snapshot) =>{
      const post=snapshot.val()
      
      for(let i in post){
        postList.push(post[i])}
      setPosts(postList)
    }) 
  })
     
   

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <div className="tweetBorder">
      <TweetBox />
      </div>
      
      <FlipMove>
      {posts.map(p=>
        <Post
                displayName={p.displayName}
                username={p.username}
                verified={p.verified}
                text={p.text}
                avatar={p.avatar}
                image={p.image}
                time={p.time}
                key={p.key}
       />) }
      </FlipMove>

      
    </div>
  );
}

export default Feed;