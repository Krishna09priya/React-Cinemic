import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./Components/landingPage";
import LoginPage from "./Components/loginPage";
import SignupPage from "./Components/SignupPage";
import ForgotPassword from "./Components/forgotPassword";
import ResetPassword from "./Components/resetPassword";
import MovieListingPage from "./Components/movieListingPage";
import MovieViewPage from "./Components/movieViewPage";
import PlanListingPage from "./Components/subscriptionListingPage";
import ChangePassword from "./Components/changePassword";
import Watchlater from "./Components/WatchLater";
import WatchHistory from "./Components/watchHistory";
import PlanStatusPage from "./Components/subscriptionStatus";
import PlanViewPage from "./Components/planViewPage";



const router = createBrowserRouter([
    { path: '', element: <LandingPage/> },
    {path: '/signup', element:<SignupPage/>},
    { path: '/login', element: <LoginPage/> },
    { path: '/forgotPassword', element: <ForgotPassword/>},
    {path:'/reset-password/:token', element:<ResetPassword/>},
    {path:'/movie-listing-page',element:<MovieListingPage/>},
    {path:'/movie-view-page/:movie_id',element:<MovieViewPage/>},
    {path:'/plan-listing-page', element:<PlanListingPage/>},
    {path:'/changePassword', element:<ChangePassword/>},
    {path:'/watchlater', element:<Watchlater/>},
    {path:'/watch-history', element:<WatchHistory/>},
    {path:'/plan-status-page', element:<PlanStatusPage/>},
    {path:'/plan-view-page/:plan_id', element:<PlanViewPage/>},

]);

export default router;