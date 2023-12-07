import { BrowserRouter, Route, Routes } from "react-router-dom"
// import CreatePost from './Component/newPost';
import CreatePost from "./Component/CreatePost/newPost";
// import SignUser from "./Component/SignUp";
import SignUser from "./Component/SignUp/SignUp";
// import Login from "./Component/logInPage";
import Login from "./Component/login/logInPage";
// import GetBlog from "./Component/showBlogPage";
import GetBlog from "./Component/ShowBlogPage/showBlogPage";
// import HomePage from "./page/home";
import HomePage from "./page/home";
import Admin from "./Component/admin/Admin";
import GetPostUserApi from "./Component/ManagerMyPost/managerMyPost";
// import GetPostUserApi from "./Component/managerMyPost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/postnews" element={<CreatePost />} />
        <Route path="/signup" element={<SignUser />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/blogPage" element={<GetBlog />} /> */}
        <Route path="/:urlSlug" Component={GetBlog} />

        <Route path="/" element={<HomePage />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/GetPostUserApi" element={<GetPostUserApi />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;
