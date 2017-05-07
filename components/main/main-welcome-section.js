import React from 'react';

import {Link, browserHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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


const mainStyle = {
    marginTop: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    height: '925px'
};

var MainWelcomeSection = React.createClass ({

    propTypes: {
        nombre: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            nombre: 'Roberto',

        };
    },

    getInitialState: function () {
        return {
            abmOpen: false
        }
    },

    render() {
        return (
            <Paper zDepth={3}  style={mainStyle}>
                <div style={{position:'absolute', top:'30px', left:'22px'}}>
                    <Link to={'/ingresodecereal'}>
                       <RaisedButton
                           zDepth={5}
                           primary={true}
                           backgroundColor="#8bc34a"
                           style={{borderRadius:'50px', margin:'10px'}}
                           buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                           overlayStyle={{backgroundColor:"#8bc34a"}}
                       >
                           <LocalShippingIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'25px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Ingreso de Cereal</p>

                       </RaisedButton>
                    </Link>
                    <Link to={'/analisis'}>
                       <RaisedButton
                           zDepth={5}
                           primary={true}
                           backgroundColor="#8bc34a"
                           style={{borderRadius:'50px', margin:'10px'}}
                           buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                           overlayStyle={{backgroundColor:"#8bc34a"}}
                       >
                           <FilterVintageIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'28px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Análisis</p>
                       </RaisedButton>
                    </Link>
                    <Link to={'/certificadodedeposito'}>
                       <RaisedButton
                           zDepth={5}
                           primary={true}
                           backgroundColor="#8bc34a"
                           style={{borderRadius:'50px', margin:'10px'}}
                           buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                           overlayStyle={{backgroundColor:"#8bc34a"}}
                       >
                           <AssignmentIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Certificado</p>
                           <br/>
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'20px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-48px'}} >de Deposito</p>
                       </RaisedButton>
                    </Link>
                    <Link to={'/venta'}>
                       <RaisedButton
                           zDepth={5}
                           primary={true}
                           backgroundColor="#8bc34a"
                           style={{borderRadius:'50px', margin:'10px'}}
                           buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                           overlayStyle={{backgroundColor:"#8bc34a"}}
                       >
                           <AttachMoneyIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Venta</p>
                           <br/>
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'20px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-48px'}} >de Granos</p>
                       </RaisedButton>
                    </Link>
                    <Link to={'/egresodecereal'}>
                        <RaisedButton
                            zDepth={5}
                            primary={true}
                            backgroundColor="#8bc34a"
                            style={{borderRadius:'50px', margin:'10px'}}
                            buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                            overlayStyle={{backgroundColor:"#8bc34a"}}
                            >
                            <AssignmentIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                            <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Generar</p>
                            <br/>
                            <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'20px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-48px'}} >Carta de Porte</p>
                        </RaisedButton>
                    </Link>
                   <br/>
                   <RaisedButton
                       zDepth={5}
                       primary={true}
                       backgroundColor="#8bc34a"
                       style={{borderRadius:'50px', margin:'10px'}}
                       buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                       overlayStyle={{backgroundColor:"#8bc34a"}}
                       onTouchTap={this.toggleABMOpen}
                   >
                       <ModeEditIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                       <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >ABM</p>
                   </RaisedButton>
                    <Link to={'/manualdeusuario'}>
                       <RaisedButton
                           zDepth={5}
                           primary={true}
                           backgroundColor="#8bc34a"
                           style={{borderRadius:'50px', margin:'10px'}}
                           buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                           overlayStyle={{backgroundColor:"#8bc34a"}}
                       >
                           <SchoolIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Manual</p>
                           <br/>
                           <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'20px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-48px'}} >de Usuario</p>
                       </RaisedButton>
                    </Link>
                    <br/>
                    <Link to={'/login'}>
                        <RaisedButton
                            zDepth={5}
                            primary={true}
                            backgroundColor="#8bc34a"
                            style={{borderRadius:'50px', margin:'10px'}}
                            buttonStyle={{backgroundColor:"#8bc34a", width:'300px', height:'150px', borderRadius:'20px'}}
                            overlayStyle={{backgroundColor:"#8bc34a"}}
                        >
                            <ArrowBackIcon style={{lineHeight:'0px', padding:'0px', margin:'0px', width:'70px', height:'70px', position:'relative', top:'-40px'}} />
                            <p style={{opacity:'0.85', lineHeight:'0px', fontSize:'27px', fontWeight:'600', padding:'0px', margin:'0px', position:'relative', top:'-33px'}} >Salir</p>
                        </RaisedButton>
                    </Link>
               </div>

                <div style={{position: 'absolute', top: '285px', right: '100px'}}>
                    <img src="/assets/logos/flower.png" alt="logo"/>
                </div>
                <div style={{position: 'absolute', top: '476px', right: '895px'}}>
                    <img src="/assets/logos/primBig.png" alt="logo"/>
                </div>
                <div style={{position: 'absolute', top: '711px', right: '1015px'}}>
                    <img src="/assets/logos/iSolutionsBig.png" alt="logo"/>
                </div>



                <Drawer
                    openSecondary
                    docked={false}
                    width={250}
                    open={this.state.abmOpen}
                    onRequestChange={(abmOpen) => this.setState({abmOpen})}
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
            </Paper>
        )
    },

    toggleABMOpen: function () {this.setState({abmOpen: !this.state.abmOpen})}

});

export default MainWelcomeSection;