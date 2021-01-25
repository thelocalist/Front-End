import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ExamplePage from '../pages/ExamplePage';
// import PrivateRoute from "../containers/PrivateRoute";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      {/* <PrivateRoute path="/dashboard" component={DashboardRoutes} /> */}
      {/* <Route exact path="/login" component={LoginPage} /> */}
      {/* <Route exact path="/forgot-password" component={ForgotPasswordPage} /> */}
      {/* <Route exact path="/reset-password" component={ResetPasswordPage} /> */}
      {/* <Route exact path="/error" component={ErrorPage} /> */}

      <Route path="/" component={ExamplePage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
