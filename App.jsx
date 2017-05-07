import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

//MAIN-PAGE
import MainPage from './components/main/main-page';
import MainWelcomeSection from './components/main/main-welcome-section';
import MainContentSection from './components/main/main-content-section';

//LOGIN
import LoginCheck from './components/login/login-check';
import LoginPage from './components/login/login-page';

//ABM
import RoutingComponent from './components/routing-component';

//INGRESO DE CEREAL
import IngresoDeCerealMainPage from './components/ingreso-de-cereal/ingreso-de-cereal-main-page';
import IngresoDeCerealMainTabs from './components/ingreso-de-cereal/ingreso-de-cereal-main-tabs';
import IngresoDeCerealModTabs from './components/ingreso-de-cereal/ingreso-de-cereal-mod-tabs';

//ANALISIS
import AnalisisMainPage from './components/analisis/analisis-main-page';
import AnalisisNuevoAnalisis from './components/analisis/analisis-nuevo-analisis';
import AnalisisModTabs from './components/analisis/analisis-mod-tabs';

//CERTIFICADO DE CEREAL
import CertificadoDeDepositoMainPage from './components/certificado-de-deposito/certificado-de-deposito-main-page';
import CertificadoDeDepositoNuevoCertificado from './components/certificado-de-deposito/certificado-de-deposito-nuevo-certificado';
import CertificadoDeDepositoBajaCertificado from './components/certificado-de-deposito/certificado-de-deposito-baja-certificado';
import CertificadoDeDepositoListado from './components/certificado-de-deposito/certificado-de-deposito-listado';

//VENTA DE CEREAL
import VentaMainPage from './components/venta/venta-main-page';
import VentaNuevaVenta from './components/venta/venta-nueva-venta';
import VentaBajaVenta from './components/venta/venta-baja-venta';
import VentaModTabs from './components/venta/venta-mod-tabs';

//ENGRESO DE CEREAL
import EgresoDeCerealMainPage from './components/egreso-de-cereal/egreso-de-cereal-main-page';
import EgresoDeCerealMainTabs from './components/egreso-de-cereal/egreso-de-cereal-main-tabs';
import EgresoDeCerealModTabs from './components/egreso-de-cereal/egreso-de-cereal-mod-tabs';

//MANUAL
import ManualDeUsuarioMainPage from './components/manual-de-usuario/manual-de-usuario-main-page';



var App = React.createClass ({

    render() {
      return (
         <div>
            <Router history={browserHistory}>
                <Route path={'/'} component={MainPage} >
                    <IndexRoute component={LoginCheck} />

                    <Route path={'login'} component={LoginPage} />
                    <Route path={'welcome'} component={MainWelcomeSection} />

                    <Route component={MainContentSection}>
                        <Route path={'ABM(/:type)'} component={RoutingComponent} />
                        <Route path={'ABM/mod/(:entity)/(:identifier)'} component={RoutingComponent} />

                        <Route path={'ingresodecereal'} component={IngresoDeCerealMainPage} />
                        <Route path={'ingresodecereal/altaCP'} component={IngresoDeCerealMainTabs} />
                        <Route path={'ingresodecereal/mod/(:identifier)'} component={IngresoDeCerealModTabs} />

                        <Route path={'analisis'} component={AnalisisMainPage}  />
                        <Route path={'analisis/nuevoAnalisis'} component={AnalisisNuevoAnalisis} />
                        <Route path={'analisis/mod/(:identifier)'} component={AnalisisModTabs} />

                        <Route path={'certificadodedeposito'} component={CertificadoDeDepositoMainPage} />
                        <Route path={'certificadodedeposito/nuevoCertificadoDeDeposito'} component={CertificadoDeDepositoNuevoCertificado} />
                        <Route path={'certificadodedeposito/bajaCertificadoDeDeposito'} component={CertificadoDeDepositoBajaCertificado} />
                        <Route path={'certificadodedeposito/listadoCertificadoDeDeposito/(:identifier)'} component={CertificadoDeDepositoListado} />

                        <Route path={'venta'} component={VentaNuevaVenta} />
                        <Route path={'venta/bajaventa'} component={VentaBajaVenta} />


                        <Route path={'egresodecereal'} component={EgresoDeCerealMainPage} />
                        <Route path={'egresodecereal/altaCP'} component={EgresoDeCerealMainTabs} />
                        <Route path={'egresodecereal/mod/(:identifier)'} component={EgresoDeCerealModTabs} />

                        <Route path={'manualdeusuario'} component={ManualDeUsuarioMainPage} />
                    </Route>
                </Route>
            </Router>
         </div>
      )
    }

});

//<Route path={'venta/nuevaVenta'} component={VentaNuevaVenta} />
//<Route path={'venta/mod/(:identifier)'} component={VentaModTabs} />

//<IndexRoute component={Login} />
injectTapEventPlugin();

export default App;