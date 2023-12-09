import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import HomePage from './Component/page/home';
import reportWebVitals from './reportWebVitals';
// import DemoApp2 from './DemoApp2';
// import TestFetchApi from './test/testFetchApi';
// import HandleSubmit from './test/testPostFetch';
// import HomePage from './Component/page/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* {<DemoApp2 />}; */}
    {/* {<TestFetchApi />} */}
    {/* <HandleSubmit /> */}
  </React.StrictMode>
);


reportWebVitals();
