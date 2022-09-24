import React from "react";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/add" element={<CreatePost />} />
          <Route path="/" element={<PostList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


