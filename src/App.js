import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Feed from './Feed.js';
import Widgets from './Widgets';
import {RecoilRoot} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <Sidebar/>
        <Feed/>
        <Widgets/>
    </div>

    </RecoilRoot>

  );
}  

export default App;
