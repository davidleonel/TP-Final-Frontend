import React from 'react';
import {Link, browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

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
                <AppBar iconElementLeft={<img src="/assets/primLogo.png" alt="logo" style={{height: '50px', margin:'0 0 0 8px'}} />}>
                    <Link to={'/ingresodecereal'}><RaisedButton label="Ingreso de Cereal" style={{margin: 12}} /></Link>
                    <Link to={'/analisis'}><RaisedButton label="Analisis" style={{margin: 12}} /></Link>
                    <RaisedButton label="ABMs" onTouchTap={this.handleToggle} style={{margin: 12}} />

                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >

                        <MenuItem
                            primaryText="Empleados"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/empleadoAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/empleadoBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/empleadoModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Usuarios"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/usuarioAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/usuarioBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/usuarioModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Chofer"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/choferAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/choferBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/choferModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Transportista"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/transportistaAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/transportistaBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/transportistaModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Productor"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/productorAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/productorBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/productorModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <Divider />
                        <MenuItem
                            primaryText="Especie"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/especieAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/especieBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/especieModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Tarifa"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/tarifaAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/tarifaBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/tarifaModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Mermas Humedad"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/mermasHumedadAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/mermasHumedadBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/mermasHumedadModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Rubro"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/rubroAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/rubroBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/rubroModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Camion"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/camionAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/camionBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/camionModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Destino"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/destinoAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/destinoBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/destinoModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                            />
                        <Divider />
                        <MenuItem
                            primaryText="Campo"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/campoAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/campoBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/campoModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <MenuItem
                            primaryText="Cosecha"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/cosechaAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/cosechaBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/cosechaModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
                                      ]}
                        />
                        <Divider />
                        <MenuItem
                            primaryText="Empresa"
                            rightIcon={<ArrowDropRight />}
                            menuItems={[
                                        <Link to='/ABM/empresaAltaForm'><MenuItem primaryText="Alta" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/empresaBajaForm'><MenuItem primaryText="Baja" onTouchTap={this.handleClose} /></Link>,
                                        <Link to='/ABM/empresaModForm'><MenuItem primaryText="Modificacion" onTouchTap={this.handleClose} /></Link>
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