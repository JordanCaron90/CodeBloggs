import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import Registration from "./components/registration";
import Homepage from "./components/homepage";
import Mainpage from "./components/mainpage";
import Blog from "./components/blog";
import NetworkView from "./components/NetworkView";


const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route exact path="/RecordList" element={<RecordList />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/mainpage" element={<Mainpage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/NetworkView" element={<NetworkView/>}/>
      </Routes>
      </div>
    </div>
  );
};

export default App;
