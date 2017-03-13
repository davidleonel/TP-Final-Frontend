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


var MainMenuBar = React.createClass ({

    propTypes: {

    },
    
    getInitialState: function () {
        return {
            open: false
        }
    },

    render() {
        return (
            <Paper zDepth={3}>
                <AppBar iconElementLeft={<img src="/assets/hoja.png" alt="logo" style={{height: '50px', margin:'0 0 0 8px', position:'relative', top:'5px'}} />}>
                    <Link class="brownHover" to={'/ingresodecereal'}><RaisedButton class="brownHover" secondary label="Ingreso de Cereal" style={{margin: 12, width: '226px'}} /></Link>
                    <Link to={'/analisis'}><RaisedButton secondary label="Analisis" style={{margin: 12, width: '226px'}}/></Link>
                    <Link to={'/certificadoDeDeposito'}><RaisedButton secondary label="Certificado de Deposito" style={{margin: 12, width: '226px'}} /></Link>
                    <RaisedButton secondary label="ABMs" onTouchTap={this.handleToggle} style={{margin: 12, width: '226px'}} />

                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >

                        <MenuItem
                            primaryText="Empleados"
                            rightIcon={<PeopleIcon />}
                            menuItems={[
                                        <Link to='/ABM/empleadoAltaForm'>
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empleadoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empleadoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/usuarioBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/usuarioModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/choferBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/choferModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/transportistaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/transportistaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/productorBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/productorModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/especieBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/especieModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/tarifaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/tarifaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/mermasHumedadBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/mermasHumedadModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/rubroBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/rubroModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/camionBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/camionModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/destinoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/destinoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/campoBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/campoModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/cosechaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/cosechaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
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
                                            <MenuItem primaryText="Alta" onTouchTap={this.handleClose}>
                                                <DoneIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empresaBajaForm'>
                                            <MenuItem primaryText="Baja" onTouchTap={this.handleClose}>
                                                <ContentCutIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>,
                                        <Link to='/ABM/empresaModForm'>
                                            <MenuItem primaryText="Modificacion" onTouchTap={this.handleClose}>
                                                <ModeEditIcon style={{marginTop: '10px', float:'right'}} />
                                            </MenuItem>
                                        </Link>
                                      ]}
                        />
                    </Drawer>
                </AppBar>
            </Paper>
        )
    },

    handleToggle: function () {this.setState({open: !this.state.open})},

    handleClose: function () {this.setState({open: false})}

});

export default MainMenuBar;