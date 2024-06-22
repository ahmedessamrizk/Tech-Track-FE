import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootPage from "./pages/RootPage";
import Home from "./components/Home/Home";
import productsLoader, {
  ProductsPage,
  filterAction,
} from "./pages/ProductsPage";
import productDetailsLoader, { ProductPage } from "./pages/ProductPage";
import About from "./components/About/About";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import loginAction from "./pages/LoginPage";
import logoutAction from "./pages/LogoutPage";
import { getToken, rootLoader } from "./utils/tokenFunctions";
import profileLoader, {
  ProfilePage,
  changeAction,
  getUserRatings,
  getUsers,
  updateAction,
} from "./pages/ProfilePage";
import ProfileContent from "./components/Profile/ProfileContent";
import Favourites from "./components/Profile/Favourites";
import Users from "./components/Profile/Users";
import Ratings from "./components/Profile/Ratings";
import addReview, { RatePage } from "./pages/RatePage";
import Forget from "./components/Authentication/Forget";
import handleForget from "./pages/ForgetPasswordPage";
import signUpAction from "./pages/SignupPage";
import Compare from "./components/Compare/Compare";
import Technical from "./components/Technical/Technical";
import UpdateProfile from "./components/Profile/UpdateProfile";
import Reset from "./components/Authentication/Reset";
import resetAction from "./pages/ResetPasswordPage";
import LoggedRoute from "./components/ProtectedRoute/LoggedRoute";
import UnLoggedRoute from "./components/ProtectedRoute/UnLoggedRoute";
import withAuth, { withRole } from "./components/ProtectedRoute/withAuth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      loader: rootLoader,
      id: "root",
      children: [
        { index: true, element: <Home /> },
        {
          path: "profile",
          element: <ProfilePage />,
          loader: withAuth(profileLoader),
          id: "profile",
          children: [
            {
              path: "content",
              element: <ProfileContent />,
              children: [
                {
                  path: "changePassword",
                  action: changeAction,
                  element: <RatePage />,
                },
              ],
            },
            {
              path: "ratings",
              element: <Ratings />,
              loader: withRole(getUserRatings, ["user"]),
              children: [
                {
                  path: ":productId/edit",
                  action: addReview,
                  element: <RatePage />,
                },
              ],
            },
            {
              path: "favorites",
              element: <Favourites />,
              loader: withRole(null, ["user"]),
            },
            {
              path: "users",
              element: <Users />,
              loader: withRole(getUsers, ["admin", "superAdmin"]),
            },
            {
              path: "updateProfile",
              action: updateAction,
              element: <UpdateProfile />,
            },
          ],
        },
        {
          path: "login",
          element: (
            <LoggedRoute redirectTo="/">
              <Login />
            </LoggedRoute>
          ),
          action: loginAction,
          children: [
            {
              path: "forget",
              element: (
                <LoggedRoute redirectTo="/">
                  <Forget />
                </LoggedRoute>
              ),
              action: handleForget,
            },
          ],
        },
        { path: "logout", action: logoutAction },
        {
          path: "signUp",
          element: (
            <LoggedRoute redirectTo="/">
              <SignUp />
            </LoggedRoute>
          ),
          action: signUpAction,
        },
        {
          path: "reset",
          element: (
            <LoggedRoute redirectTo="/">
              <Reset />
            </LoggedRoute>
          ),
          action: resetAction,
        },
        { path: "about", element: <About /> },
        { path: "technical", element: <Technical /> },
        { path: "compare", element: <Compare /> },
        {
          path: "products",
          children: [
            {
              path: ":productId",
              loader: productDetailsLoader,
              id: "product",
              element: <ProductPage />,
              children: [
                {
                  path: "rate",
                  action: addReview,
                  element: (
                    <UnLoggedRoute redirectTo="..">
                      <RatePage />
                    </UnLoggedRoute>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "categories",
          children: [
            {
              path: ":category",
              loader: productsLoader,
              action: filterAction,
              id: "products",
              element: <ProductsPage />,
            },
          ],
        },
      ],
    },
  ]);
  if (getToken() === null) {
    localStorage.setItem("chatHistory", JSON.stringify([]));
    localStorage.setItem("compareProducts", JSON.stringify([]));
  }
  return <RouterProvider router={router} />;
}

export default App;
