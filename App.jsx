import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


import MainPage from './components/main/main-page';
import MainWelcomeSection from './components/main/main-welcome-section';
import MainContentSection from './components/main/main-content-section';

import RoutingComponent from './components/routing-component';

import IngresoDeCerealMainPage from './components/ingreso-de-cereal/ingreso-de-cereal-main-page';
import IngresoDeCerealMainTabs from './components/ingreso-de-cereal/ingreso-de-cereal-main-tabs';
import IngresoDeCerealModTabs from './components/ingreso-de-cereal/ingreso-de-cereal-mod-tabs';

import LoginPage from './components/login/login-page';

import AnalisisMainPage from './components/analisis/analisis-main-page';

var App = React.createClass ({

    render() {
      return (
         <div>
            <Router history={browserHistory}>
                <Route path={'/'} component={MainPage} >
                    <IndexRoute component={MainWelcomeSection} />
                    <Route path={'mainWelcomeSection'} component={MainWelcomeSection} />

                    <Route path={'ABM(/:type)'} component={RoutingComponent} />
                    <Route path={'ABM/mod/(:entity)/(:identifier)'} component={RoutingComponent} />

                    <Route path={'ingresodecereal'} component={IngresoDeCerealMainPage} />
                    <Route path={'ingresodecereal/altaCP'} component={IngresoDeCerealMainTabs} />
                    <Route path={'ingresodecereal/mod/(:identifier)'} component={IngresoDeCerealModTabs} />



                    <Route path={'analisis'} component={AnalisisMainPage}  />

                </Route>
            </Router>
         </div>
      )
    }

});

injectTapEventPlugin();

export default App;
