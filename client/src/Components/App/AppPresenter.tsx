import PropTypes from "prop-types";
import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import AddPhone from "../../Routes/AddPhone";
import AddPlace from "../../Routes/AddPlace";
import Chat from "../../Routes/Chat";
import CompleteProfile from "../../Routes/CompleteProfile";
import EditAccount from "../../Routes/EditAccount";
import EmailLogin from "../../Routes/EmailLogin";
import FindAddress from "../../Routes/FindAddress";
import Home from "../../Routes/Home";
import Login from "../../Routes/Login";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import Trips from "../../Routes/Trips";
import VerifyEmail from "../../Routes/VerifyEmail";
import VerifyPhone from "../../Routes/VerifyPhone";

const StyledTransition = styled(TransitionGroup)`
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 0.3 ease-in;
  }
`;

interface IAppPresenterProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IAppPresenterProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <WrappedLoggedInRoutes /> : <WrappedLoggedOutRoutes />}
  </BrowserRouter>
);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const LoggedOutRoutes: React.SFC<any> = ({ location }) => (
  <Wrapper>
    <StyledTransition>
      <CSSTransition key={location.key} timeout={200} classNames="fade">
        <Switch key={location.key}>
          <Route exact={true} path="/" component={Login} />
          <Route path="/email-login" component={EmailLogin} />
          <Route
            path="/verify-phone"
            component={VerifyPhone}
            mutation="completePhoneSignIn"
          />
          <Route path="/complete-profile" component={CompleteProfile} />
          <Redirect from={"*"} to={"/"} />
        </Switch>
      </CSSTransition>
    </StyledTransition>
  </Wrapper>
);

const WrappedLoggedOutRoutes = withRouter(LoggedOutRoutes);

const LoggedInRoutes: React.SFC<any> = ({ location }) => (
  <Wrapper>
    <StyledTransition>
      <CSSTransition key={location.key} timeout={200} classNames="fade">
        <Switch key={location.key}>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/edit-account"} component={EditAccount} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/places"} component={Places} />
          <Route path={"/add-place"} component={AddPlace} />
          <Route path={"/trips"} component={Trips} />
          <Route path="/verify-email/:key" component={VerifyEmail} />
          <Route path="/add-phone" component={AddPhone} />
          <Route path="/find-address" component={FindAddress} />
          <Route
            path="/verify-phone"
            component={VerifyPhone}
            mutation="addPhone"
          />
          <Route path="/ride" component={Ride} mutation="addPhone" />
          <Route path="/chat" component={Chat} mutation="addPhone" />
          <Redirect from={"*"} to={"/"} />
        </Switch>
      </CSSTransition>
    </StyledTransition>
  </Wrapper>
);

const WrappedLoggedInRoutes = withRouter(LoggedInRoutes);

export default AppPresenter;
