import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import Home from "./pages/home/Home";
import DemoDrop from "./pages/demoDrop/DemoDrop";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import MyDemos from "./pages/myDemos/MyDemos";
import Login from "./pages/login/Login";
import AdminController from "./pages/administrator/AdminController";
import UserProfile from "./pages/userProfile/UserProfile";
import MyProfile from "./pages/myProfile/MyProfile";

function App() {
  return (
      <>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <PrivateRoute path="/demo-drop">
                <DemoDrop />
            </PrivateRoute>
            <Route path="/sign-up">
                <SignUp />
            </Route>
            <Route path="/sign-in">
                <SignIn />
            </Route>
            <PrivateRoute path="/my-demos">
                <MyDemos />
            </PrivateRoute>
            <Route path="/login">
                <Login />
            </Route>
            <PrivateRoute path="/my-profile">
                <MyProfile />
            </PrivateRoute>
            <PrivateRoute path="/admin-controller">
                <AdminController />
            </PrivateRoute>
            <PrivateRoute path="/user-profile">
                <UserProfile />
            </PrivateRoute>
        </Switch>
      </>
  );
}

export default App;
