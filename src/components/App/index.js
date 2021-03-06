import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "../Layout";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import PostListing from "../PostListing";
import ViewListings from "../ViewListings";
import Listing from "../Listing";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

function App() {
  return (
    <Router>
      <Navigation />

      <Layout>
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.POST_LISTING} component={PostListing} />
        <Route exact path={ROUTES.VIEW_LISTINGS} component={ViewListings} />
        <Route path={ROUTES.LISTING} component={Listing} />
      </Layout>
    </Router>
  );
}

export default withAuthentication(App);
