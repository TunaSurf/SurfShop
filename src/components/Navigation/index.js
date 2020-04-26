import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Layout from "../Layout";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { AuthUserContext } from "../Session";

export default function Navigation() {
  return (
    <StyledNav>
      <Layout>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </Layout>
    </StyledNav>
  );
}

function NavigationAuth({ authUser }) {
  return (
    <nav>
      <h1>
        <Link to={ROUTES.HOME}>SurfShop</Link>
      </h1>
      <ul>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <Link to={ROUTES.POST_LISTING}>Post Listing</Link>
        </li>
        <li>
          <Link to={ROUTES.VIEW_LISTINGS}>View Listings</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

function NavigationNonAuth() {
  return (
    <nav>
      <h1>
        <Link to={ROUTES.LANDING}>SurfShop</Link>
      </h1>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

const StyledNav = styled.div`
  background: #333;

  nav {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
  }

  a {
    color: #fefefe;
    text-decoration: none;
  }
`;
