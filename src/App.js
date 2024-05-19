import React, { useState, useReducer } from "react";
import './App.scss';
import Header from './components/Header.js';
import HomeBanner from "./components/HomeBanner";
import { initialState, updateUserDetails } from "./store/store.reducers.js";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserContext from "./userContext.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userDetails, dispatch] = useReducer(updateUserDetails, initialState);
  const [userData, setUserData] = useState([]);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
  return (
    <UserContext.Provider value={{ dispatch, userData, setUserData, userDetails, persist, setPersist }}>
      <Router>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <Header/>
              <HomeBanner/>
            </React.Fragment>
          }/>
          <Route path="/login" element={
            <React.Fragment>
              <Header/>
              <Login/>
            </React.Fragment>
          }/>
          <Route path="/register" element={
            <React.Fragment>
              <Header/>
              <Login/>
            </React.Fragment>
          }/>
          <Route element={<ProtectedRoute />}>
                <Route element={<DashBoard/>} path="/dashboard" exact/>
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
