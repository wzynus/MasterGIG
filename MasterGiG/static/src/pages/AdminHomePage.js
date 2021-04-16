import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";


// pages
import Homepage from "./admin/Homepage";
import ViewAllUsers from "./admin/ViewAllUsers";
import ViewAllFeedbacks from "./admin/ViewAllFeedbacks";
import ViewAllReports from "./admin/ViewAllReports";
import BroadcastAllUsers from "./admin/BroadcastAllUsers";
import BroadcastSelectedUsers from "./admin/BroadcastSelectedUsers";



// components
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavBar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";




const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <AdminSidebar />

        <main className="content">
          <AdminNavbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
   

    {/* pages */}
    <RouteWithSidebar exact path={Routes.AdminHome.path} component={Homepage} />
    <RouteWithSidebar exact path={Routes.ViewAllUsers.path} component={ViewAllUsers} />
    <RouteWithSidebar exact path={Routes.ViewAllFeedbacks.path} component={ViewAllFeedbacks} />
    <RouteWithSidebar exact path={Routes.ViewAllReports.path} component={ViewAllReports} />
    <RouteWithSidebar exact path={Routes.BroadcastAllUsers.path} component={BroadcastAllUsers} />
    <RouteWithSidebar exact path={Routes.BroadcastSelectedUsers.path} component={BroadcastSelectedUsers} />


    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
