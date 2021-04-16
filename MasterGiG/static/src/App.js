import React, {useState, useEffect } from 'react';
import {  Switch, Route, BrowserRouter,Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import { restoreUser } from "./store/session";

// Layouts
import LayoutDefault from './pages/LandingPageLayout';
import Header from "./components/layout/Header";
import FooterMain from "./components/layout/Footer";
import Footer from "./components/Footer"

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

//user

import SearchResult from "./pages/User/Search"


//Stream
import Stream from './pages/Streaming/Stream';
import StreamInfo from "./pages/Streaming/StreamInfo";

//content
import Video from "./pages/Content/Video";
import UploadVideo from"./pages/Content/UploadVideo";
import EditVideo from"./pages/Content/EditVideo";
import PlayVideo from "./pages/Content/VideoPlayer";
import Content from "./pages/Content/Content"
import ContentAnalytics from "./pages/Content/ContenManagementAnalyticContentCreator"


//gig pages
import GigPlanAll from "./pages/Gigs/Content_Creator/GigHomeContentCreator";                      
import GigPlanNew from "./pages/Gigs/Content_Creator/GiGPlanCreateCC";
import GigPlanRequestAll from "./pages/Gigs/Content_Creator/GigAllPending";
import GigPlanUpdate from "./pages/Gigs/Content_Creator/GigPlanUpdateFormCC";
import GigMyRequestAll from "./pages/Gigs/Content_Creator/GigMyReqsTable";


// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";


//to be remove later
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
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    />
  );
};




const App = () => {


  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

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
     
     {user}
   
        <Switch>
          <RouteWithLoader exact path="/"  layout={LayoutDefault} >
          <Header navPosition="right" className="reveal-from-bottom"/>
            <LandingPage/>
            <FooterMain/>
          </RouteWithLoader>
          <Route exact path="/login" component={Signin} />
          <Route exact path="/register" component={Signup}/>
          <Route exact path="/forgot-password" component={ForgotPassword}/>
          <Route exact path="/reset-password" component={ResetPassword}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Route exact path="/lock" component={Lock}/>
          <RouteWithLoader exact path="/unauthorize" component={ServerError}/>  
          <Route exact path = "/videos" ><RouteWithSidebar component = {Video}/></Route>
          <RouteWithSidebar exact path = {Routes.GigPlanAll.path} component ={GigPlanAll}/>
          <RouteWithSidebar exact path = {Routes.GigPlanNew.path} component ={GigPlanNew }/>
          <RouteWithSidebar exact path = {Routes.GigMyRequestAll.path} component ={GigMyRequestAll}/>
          <RouteWithSidebar exact path = {Routes.GigPlanUpdate.path} component ={GigPlanUpdate}/>
          <RouteWithSidebar exact path = {Routes.GigPlanRequestAll.path} component ={GigPlanRequestAll}/>
          <RouteWithSidebar exact path={Routes.Stream.path} component={Stream} />
          <RouteWithSidebar exact path={Routes.Video.path} component={Content} />
          <RouteWithSidebar exact path={Routes.PlayVideo.path} component={Video} />
          <RouteWithSidebar exact path={Routes.UploadVideo.path} component={UploadVideo} />
          <RouteWithSidebar exact path={Routes.EditVideo.path} component={EditVideo} />
          <RouteWithSidebar exact path={Routes.StreamInfo.path} component={StreamInfo} />
          <RouteWithSidebar exact path={Routes.SearchResult.path} component={SearchResult}/>
          <RouteWithSidebar exact path={Routes.Analytics.path} component={ContentAnalytics}/>  
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
          <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
          <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
          <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
          <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
          <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
         <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
          <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
         <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
         <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
          <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
          <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
         <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
          <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
          <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
          <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
          <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
         <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
          <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
          <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

          <Redirect to={Routes.NotFound.path} />
        </Switch>
  
    </BrowserRouter> 
  );
}

export default App;