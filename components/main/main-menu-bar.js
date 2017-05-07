import React from 'react';
import {Link, browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import AssignmentIcon from 'react-material-icons/icons/action/assignment';
import FilterVintageIcon from 'react-material-icons/icons/image/filter-vintage';
import SchoolIcon from 'react-material-icons/icons/social/school';
import ArrowBackIcon from 'react-material-icons/icons/navigation/arrow-back';
import DashboardIcon from 'react-material-icons/icons/action/dashboard';
import DoneIcon from 'react-material-icons/icons/action/done';
import ContentCutIcon from 'react-material-icons/icons/content/content-cut';
import ModeEditIcon from 'react-material-icons/icons/editor/mode-edit';
import PeopleIcon from 'react-material-icons/icons/social/people';
import PersonIcon from 'react-material-icons/icons/social/person';
import CameraFrontIcon from 'react-material-icons/icons/image/camera-front';
import DirectionsWalkIcon from 'react-material-icons/icons/maps/directions-walk';
import MoodIcon from 'react-material-icons/icons/social/mood';
import LocalFloristIcon from 'react-material-icons/icons/maps/local-florist';
import AttachMoneyIcon from 'react-material-icons/icons/editor/attach-money';
import FormatColorFillIcon from 'react-material-icons/icons/editor/format-color-fill';
import GridOnIcon from 'react-material-icons/icons/image/grid-on';
import LocalShippingIcon from 'react-material-icons/icons/maps/local-shipping';
import PlaceIcon from 'react-material-icons/icons/maps/place';
import ImageIcon from 'react-material-icons/icons/image/image';
import LandscapeIcon from 'react-material-icons/icons/image/landscape';
import LocationCityIcon from 'react-material-icons/icons/social/location-city';
import PublicIcon from 'react-material-icons/icons/social/public';

//<span style={{border:'solid 1px',  borderColor:'rgba(154,119,119, 0.8)'}}></span>
var MainMenuBar = React.createClass ({

    propTypes: {

    },
    
    getInitialState: function () {
        return {
            open: false,
            active: '',
            popOverOpen: false,
            mainMenuDrawerOpen: false
        }
    },

    render() {
        return (
            <Paper zDepth={3}>
                {this.renderMainMenu()}
            </Paper>
        )
    },

    renderMainMenu: function () {
        return (
            <div>

                <Paper zDepth={5} style={{position:'fixed', top:'30px', right:'0px', backgroundColor:'rgba(0, 0, 0, 0.5)', zIndex:'2900', width:'100px', height:'75px'}}>
                    <FloatingActionButton style={{position:'relative', top:'9px', left:'10px'}}  onTouchTap={this.handleToggleMainMenuDrawer}>
                        <DashboardIcon />
                    </FloatingActionButton>
                </Paper>

                <Drawer
                    zDepth={5}
                    docked={false}
                    width={350}
                    open={this.state.mainMenuDrawerOpen}
                    onRequestChange={(mainMenuDrawerOpen) => this.setState({mainMenuDrawerOpen})}
                >
                    <Link to='/welcome' >
                        <AppBar
                            title="Menu Principal"
                            showMenuIconButton={false}
                            zDepth={1}

                        >
                        </AppBar>
                    </Link>
                    <Link to='/ingresodecereal' >
                        <MenuItem
                            primaryText="Ingreso de Cereal"
                            rightIcon={<LocalShippingIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}
                        />
                    </Link>
                    <Link to='/analisis' >
                        <MenuItem
                            primaryText="Análisis"
                            rightIcon={<FilterVintageIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}

                        />
                    </Link>
                    <Link to='/certificadodedeposito' >
                        <MenuItem
                            primaryText="Certificado de Deposito"
                            rightIcon={<AssignmentIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}

                        />
                    </Link>
                    <Link to='/venta' >
                        <MenuItem
                            primaryText="Venta de Cereal"
                            rightIcon={<AttachMoneyIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}

                        />
                    </Link>
                    <Link to='/egresodecereal' >
                        <MenuItem
                            primaryText="Generar Carta de porte"
                            rightIcon={<AssignmentIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}

                        />
                    </Link>
                    <Divider />
                    <MenuItem
                        primaryText="ABMs"
                        rightIcon={<ModeEditIcon />}
                        onTouchTap={this.handleABMOpen}

                    />
                    <Link to='/manualdeusuario' >
                        <MenuItem
                            primaryText="Manual de usuario"
                            rightIcon={<SchoolIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}

                        />
                    </Link>
                    <Divider />
                    <Link to='/login' >
                        <MenuItem
                            primaryText="Salir"
                            rightIcon={<ArrowBackIcon />}
                            onTouchTap={this.handleToggleMainMenuDrawer}
                        />
                    </Link>
                </Drawer>

                {this.renderABMDrawer()}
            </div>

        )
    },
    renderABMDrawer: function () {
        return (
            <Drawer
                openSecondary
                docked={false}
                width={250}
                open={this.state.open}
                onRequestChange={(open) => this.setState({open})}
                containerStyle={{zIndex:'3000'}}
            >
                <AppBar
                    title="ABMs"
                    showMenuIconButton={false}
                    zDepth={1}

                >
                </AppBar>
                <MenuItem
                    primaryText="Empleados"
                    rightIcon={<PeopleIcon />}
                    menuItems={[
                                        <Link to='/ABM/empleadoAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DashboardIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empleadoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empleadoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Usuarios"
                    rightIcon={<PersonIcon />}
                    menuItems={[
                                        <Link to='/ABM/usuarioAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/usuarioBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/usuarioModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Chofer"
                    rightIcon={<CameraFrontIcon />}
                    menuItems={[
                                        <Link to='/ABM/choferAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/choferBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/choferModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Transportista"
                    rightIcon={<DirectionsWalkIcon />}
                    menuItems={[
                                        <Link to='/ABM/transportistaAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/transportistaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/transportistaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Productor"
                    rightIcon={<MoodIcon />}
                    menuItems={[
                                        <Link to='/ABM/productorAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/productorBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/productorModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <Divider />
                <MenuItem
                    primaryText="Especie"
                    rightIcon={<LocalFloristIcon />}
                    menuItems={[
                                        <Link to='/ABM/especieAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/especieBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/especieModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Tarifa"
                    rightIcon={<AttachMoneyIcon />}
                    menuItems={[
                                        <Link to='/ABM/tarifaAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/tarifaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/tarifaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Mermas Humedad"
                    rightIcon={<FormatColorFillIcon />}
                    menuItems={[
                                        <Link to='/ABM/mermasHumedadAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/mermasHumedadBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/mermasHumedadModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Rubro"
                    rightIcon={<GridOnIcon />}
                    menuItems={[
                                        <Link to='/ABM/rubroAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/rubroBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/rubroModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Camion"
                    rightIcon={<LocalShippingIcon />}
                    menuItems={[
                                        <Link to='/ABM/camionAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/camionBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/camionModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Destino"
                    rightIcon={<PlaceIcon />}
                    menuItems={[
                                        <Link to='/ABM/destinoAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/destinoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/destinoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <Divider />
                <MenuItem
                    primaryText="Campo"
                    rightIcon={<ImageIcon />}
                    menuItems={[
                                        <Link to='/ABM/campoAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/campoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/campoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Cosecha"
                    rightIcon={<LandscapeIcon />}
                    menuItems={[
                                        <Link to='/ABM/cosechaAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/cosechaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/cosechaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
                <MenuItem
                    primaryText="Puerto"
                    rightIcon={<PublicIcon />}
                    menuItems={[
                                        <Link to='/ABM/puertoAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/puertoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/puertoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                    />
                <Divider />
                <MenuItem
                    primaryText="Empresa"
                    rightIcon={<LocationCityIcon />}
                    menuItems={[
                                        <Link to='/ABM/empresaAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleABMClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empresaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleABMClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empresaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleABMClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                />
            </Drawer>
        )
    },

    handleToggleMainMenuDrawer: function () {
        this.setState({
            mainMenuDrawerOpen: !this.state.mainMenuDrawerOpen
        });
    },
    handleABMOpen: function () {this.setState({open: true})},
    handleABMClose: function () {this.setState({open: false}, this.handleToggleMainMenuDrawer)}


});

export default MainMenuBar;