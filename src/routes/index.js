import { React, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LaunchPage from '../pages/LaunchPage/LaunchPage';
// import PrivateRoute from "../containers/PrivateRoute";

const Routes = () => {
  useEffect(() => {
    document.body.style.margin = 0;
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        {/* <PrivateRoute path="/dashboard" component={DashboardRoutes} /> */}
        {/* <Route exact path="/login" component={LoginPage} /> */}
        {/* <Route exact path="/forgot-password" component={ForgotPasswordPage} /> */}
        {/* <Route exact path="/reset-password" component={ResetPasswordPage} /> */}
        {/* <Route exact path="/error" component={ErrorPage} /> */}

        <Route path="/" component={LaunchPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
