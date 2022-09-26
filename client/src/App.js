import React from "react";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/home" element={<PostList />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/add" element={<CreatePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


