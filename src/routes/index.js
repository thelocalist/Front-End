import { React, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import LaunchPage from '../pages/LaunchPage';
import HomePage from '../pages/HomePage';

const Routes = () => {
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.fontFamily =
      'Libre Baskerville, Times New Roman, Georgia, serif';
  }, []);
  return (
    <Switch>
      {/* <PrivateRoute path="/dashboard" component={DashboardRoutes} /> */}
      {/* <Route exact path="/login" component={LoginPage} /> */}
      {/* <Route exact path="/forgot-password" component={ForgotPasswordPage} /> */}
      {/* <Route exact path="/reset-password" component={ResetPasswordPage} /> */}
      {/* <Route exact path="/error" component={ErrorPage} /> */}

      <Route path="/" exact component={LaunchPage} />
      <Route path="/home" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
