import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

import toast, { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";

// const store = configureStore({
//   reducer: rootReducer,
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <Toaster />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
