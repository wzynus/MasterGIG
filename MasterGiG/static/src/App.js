import React, {useState, useEffect } from 'react';
import {  Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import { restoreUser } from "./store/session";
// Layouts
import LayoutDefault from './pages/LandingPageLayout';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Views 
import ProtectedRoute from "./components/auth/ProtectedRoute"
import LandingPage from './pages/LandingPage';

import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import BootstrapTables from "./pages/tables/BootstrapTables";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Lock from "./pages/Lock";
import NotFoundPage from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import Gigs from "./pages/Gigs/GiGHomeContentCreator";
import Stream from './pages/Streaming/Stream';
import UserHomePage from "./pages/UserHomePage";
import Video from "./pages/Video";
import UploadVideo from"./pages/Content/UploadVideo";
import EditVideo from"./pages/Content/EditVideo";
import StreamInfo from "./pages/Streaming/StreamInfo"
import PlayVideo from "./pages/VideoPlayer"


// components


import Accordion from "./pages/components/Accordion";
import Alerts from "./pages/components/Alerts";
import Badges from "./pages/components/Badges";
import Breadcrumbs from "./pages/components/Breadcrumbs";
import Buttons from "./pages/components/Buttons";
import Forms from "./pages/components/Forms";
import Modals from "./pages/components/Modals";
import Navs from "./pages/components/Navs";
import Navbars from "./pages/components/Navbars";
import Pagination from "./pages/components/Pagination";
import Popovers from "./pages/components/Popovers";
import Progress from "./pages/components/Progress";
import Tables from "./pages/components/Tables";
import Tabs from "./pages/components/Tabs";
import Tooltips from "./pages/components/Tooltips";
import Toasts from "./pages/components/Toasts";
import {Routes} from "./routes";

const App = () => {


  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // Initialize Google Analytics for admin to view
  ReactGA.initialize(process.env.REACT_APP_GA_CODE);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    
    <BrowserRouter>
     <Header navPosition="right" className="reveal-from-bottom"/>
   
        <Switch>
          <Route exact path="/" component={LandingPage} layout={LayoutDefault} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/register" component={Signup}/>
          <Route exact path="/UserHomePage" component={UserHomePage}/>
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route exact path="/reset-password" component={ResetPassword}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Route exact path="/lock" component={Lock}/>
          <Route exact path="/unauthorize" component={ServerError}/>
          <ProtectedRoute path = "/UserHomePage" exact ={true}>
          <UserHomePage/>
          </ProtectedRoute>
          <ProtectedRoute path = "/gigs" exact ={true}>
          <Gigs/>
          </ProtectedRoute>
          <ProtectedRoute path = "/streams" exact ={true}>
          <Stream/>
          </ProtectedRoute>
          <ProtectedRoute path = "/videos" exact ={true}>
          <Video/>
          </ProtectedRoute>
          <ProtectedRoute path = "/streaminfo" exact = {true}>
          <StreamInfo/>
          </ProtectedRoute>
          <ProtectedRoute path = "/video/upload" exact = {true}>
          <UploadVideo/>
          </ProtectedRoute>
          <ProtectedRoute path = "/video/edit" exact = {true}>
          <EditVideo/>
          </ProtectedRoute>
          <ProtectedRoute path = "/video/play" exact = {true}>
          <PlayVideo/>
          </ProtectedRoute>
          <Route exact path={Routes.Transactions.path} component={Transactions} />
          <Route exact path={Routes.Settings.path} component={Settings} />
          <Route exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
          <Route exact path={Routes.Accordions.path} component={Accordion} />
          <Route exact path={Routes.Alerts.path} component={Alerts} />
         <Route exact path={Routes.Badges.path} component={Badges} />
          <Route exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
         <Route exact path={Routes.Buttons.path} component={Buttons} />
         <Route exact path={Routes.Forms.path} component={Forms} />
          <Route exact path={Routes.Modals.path} component={Modals} />
          <Route exact path={Routes.Navs.path} component={Navs} />
         <Route exact path={Routes.Navbars.path} component={Navbars} />
          <Route exact path={Routes.Pagination.path} component={Pagination} />
          <Route exact path={Routes.Popovers.path} component={Popovers} />
          <Route exact path={Routes.Progress.path} component={Progress} />
          <Route exact path={Routes.Tables.path} component={Tables} />
         <Route exact path={Routes.Tabs.path} component={Tabs} />
          <Route exact path={Routes.Tooltips.path} component={Tooltips} />
          <Route exact path={Routes.Toasts.path} component={Toasts} />

          <Redirect to={Routes.NotFound.path} />
        </Switch>
        <Footer/>
    </BrowserRouter> 
  );
}

export default App;