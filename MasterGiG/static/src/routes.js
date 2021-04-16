 
 
 
 export const Routes = {
    // pages
    DashboardOverview: { path: "/" },
    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/billing" },
    Invoice: { path: "/invoice" },
    Signin: { path: "/login" },
    Signup: { path: "/register" },
    ForgotPassword: { path: "/forgot-password" },
    ResetPassword: { path: "/reset-password" },
    Lock: { path: "/lock" },
    NotFound: { path: "/404" },
    ServerError: { path: "/Unauthorized" },
    SearchResult: { path: "/search/:query" },
    Message :{path: "/{userId}/message"},
    Admin : {path: "/adminHomePage"},
    UserHomePage : {path: "/UserHomePage"},

    Stream: {path: "/stream"},
    StreamInfo: { path: "/streamsinfo" },

    //content
    Video: {path: "/videos"},
    PlayVideo: { path: "/video/play" },
    UploadVideo: { path: "/video/upload" },
    EditVideo: { path: "/video/edit" },
    Analytics: { path: "/video/analytics" },

    //gig routes
    GigPlanAll: {path: "/gigs"},
    GigPlanNew: {path: "/gigs/new-plan"},
    GigMyRequestAll : {path:"/gigs/id/my-request"},
    GigPlanUpdate : {path: "/gigs/gigId/update"},
    GigPlanRequestAll : {patg:"/gigs/gigId/view-all-request"},


   

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};



export default Routes;  