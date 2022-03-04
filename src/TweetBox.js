import React, { useState, useRef } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import dbRef from "./firebase";
import {storage} from "./firebase";
import { push, update,set, serverTimestamp, get, child, key} from "firebase/database";
import "./pp.png"
import {v4 as uuidv4} from "uuid";
import { ref, put, getDownloadURL, uploadString, uploadBytes} from "firebase/storage";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import zIndex from "@material-ui/core/styles/zIndex";
import {useRecoilState} from "recoil";
import { modalState } from "./atoms/modalAtom";



function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  const [url, setUrl] = useState("");
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [imagesRef, setimagesRef] = useState(null);
  const [isOpen,setIsOpen] = useRecoilState(modalState)

  const sendTweet = (e) => {
    

    const post= {
      
      displayName: "Zeyneppp",
      username: "inkotanye",
      verified: true,
      text: tweetMessage,
      avatar:"https://1.bp.blogspot.com/-zLGOvW7aTbY/YH68Te7DRrI/AAAAAAAAAyA/aqS-tynqQSszv60O60t1gbz9sIimorF1wCLcBGAsYHQ/w1200-h630-p-k-no-nu/3315707_oc7e8.jpg" ,
      time: serverTimestamp(),
      key: uuidv4(),
  
    };
    
  
    const newPostKey=push(dbRef,post).key
    setimagesRef ( ref(storage,`images/${newPostKey}`));
    
  
     if (tweetImage) {
      
      fetch(tweetImage)
      .then(res => res.blob())
      .then(blob => {
      let file = new File([blob], "File name",{ type: "image/png" })
      const uploadTask= uploadBytes(imagesRef,file)
    })

    getDownloadURL(imagesRef)
    .then((u) => {
     
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', u);
      setUrl(`${u}`)
      console.log(url)
    })  

    const postDb=child(dbRef,newPostKey)
    update(postDb,{image:url}) 

      }; 
    
    setTweetMessage("");
    setTweetImage(null);
    setShowEmojis(false);
    setUrl("")
    setimagesRef(null);
    
 
};

  const addImageToPost = (e) => { 
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]); 
  }

  reader.onload = (readerEvent) => {
    setTweetImage(readerEvent.target.result)
  };
};


  const addEmoji = (e) => {
  let sym = e.unified.split("-");
  let codesArray = [];
  sym.forEach((el) => codesArray.push("0x" + el));
  let emoji = String.fromCodePoint(...codesArray);
  setTweetMessage(tweetMessage + emoji);
};

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">

          <Avatar src="https://1.bp.blogspot.com/-zLGOvW7aTbY/YH68Te7DRrI/AAAAAAAAAyA/aqS-tynqQSszv60O60t1gbz9sIimorF1wCLcBGAsYHQ/w1200-h630-p-k-no-nu/3315707_oc7e8.jpg" />
          <input
            className="tweetBox__textInput"
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
          </div>

          
         {tweetImage &&(
            <div className="image">
              <div className="image_close" onClick={()=>setTweetImage(null)}>
                <CloseIcon/>
              </div>
              < img className="image_image"
                  src={tweetImage}
                  alt=""/>
            </div>
          )}


            <div className="sendPost">
              <div className="sendpost_icons">
                <div className="sendPost_photoIcon" onClick={()=>filePickerRef.current.click()}>
                  <AddPhotoAlternateOutlinedIcon/>
                  <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
                </div>
                <div className="sendPost_emojiIcon" onClick={() => setShowEmojis(!showEmojis)}>
                  <SentimentSatisfiedAltOutlinedIcon/>
                </div>

                {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "500px",
                    marginLeft: -10,
                    maxWidth: "320px",
                    borderRadius: "20px",
                    zIndex:"10"
                  } }/>
                )}
              </div>
              <Button
                 onClick={sendTweet}
                 type="submit"
                 className="tweetBox__tweetButton"
                 disabled={!tweetMessage && !tweetImage}>
                  Tweet
                </Button>
            </div>
          
      </form>
    </div>
  );
}

export default TweetBox;
