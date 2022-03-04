
import './Sidebar.css';
import TwitterIcon from '@mui/icons-material/Twitter.js';
import HomeIcon from '@mui/icons-material/Home.js';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SidebarOption from './SidebarOption.js';
import TweetBox from "./TweetBox";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {useRecoilState} from "recoil";
import { modalState } from "./atoms/modalAtom";


function Sidebar() {

  const [isOpen,setIsOpen] = useRecoilState(modalState)

  return (
    <div className="sidebar">
      <SidebarOption bird Icon={TwitterIcon}/>
      <SidebarOption active Icon={HomeIcon} text="Home"/>
      <SidebarOption Icon={TagIcon} text="Explore"/>
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
      <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
      <SidebarOption Icon={ArticleOutlinedIcon} text="Lists"/>
      <SidebarOption Icon={PermIdentityOutlinedIcon} text="Profile"/>
      <SidebarOption Icon={MoreHorizOutlinedIcon} text="More"/>

      
      
        <div className='popup_tweet'>
        <Popup className='popup_tweet_modal'
        trigger={<button>Tweet</button>} 
        position="right center" 
        modal
      >
          {close => (
            <div className="modal">
                <button className="close" onClick={close}>
                    &times;
                </button>
                {
                   <TweetBox/>  
                }
              
           </div>
          )}
      </Popup>  
      </div>
      )
         
      
    </div>
  );
}

export default Sidebar;