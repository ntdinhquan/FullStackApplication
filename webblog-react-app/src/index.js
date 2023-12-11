import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import CreatePost from "./Component/CreatePost/newPost";
import SignUser from "./Component/SignUp/SignUp";
import Login from "./Component/login/logInPage";
import GetBlog from "./Component/ShowBlogPage/showBlogPage";
import HomePage from "./page/home";
import Admin from "./Component/admin/Admin";
import GetPostUserApi from "./Component/ManagerMyPost/managerMyPost";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router >
      <Routes>
        <Route path="/postnews" element={<CreatePost />} />
        <Route path="/signup" element={<SignUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:urlSlug" Component={GetBlog} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/GetPostUserApi" element={<GetPostUserApi />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


reportWebVitals();
