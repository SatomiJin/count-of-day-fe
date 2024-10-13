import CountDayPage from "../pages/CountDayPage/CountDayPage";
import HomePage from "../pages/HomePage/HomePage";
import NotesPage from "../pages/NotesPage/NotesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";

export let routes = [
  {
    path: "/",
    isLogin: false,
    page: HomePage,
  },
  {
    path: "/count-days",
    isLogin: false,
    page: CountDayPage,
  },
  {
    path: "/notes",
    isLogin: true,
    page: NotesPage,
  },
  {
    path: "/sign-in",
    isLogin: false,
    page: SignInPage,
  },
  {
    path: "/profile",
    isLogin: true,
    page: ProfilePage,
  },
  {
    path: "*",
    // isLogin: true,
    page: NotFoundPage,
  },
];
