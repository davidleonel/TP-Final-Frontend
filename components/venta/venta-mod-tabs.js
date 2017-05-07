import React from 'react';

import {Link, browserHistory} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0'
    },
    propToggleHeader: {
        margin: '20px auto 10px'
    },
    toggle: {
        marginBottom: 16
    },
    checkbox: {
        display: 'inline-block',
        marginBottom: 16,
        verticalAlign: 'bottom'
    },
    radioButton: {
        marginBottom: 7
    },
    radioButtonGroup: {
        display: 'inline-block',
        marginLeft: '10px',
        verticalAlign: 'bottom',
        width: '23%'
    },
    textField: {
        display: 'block'
    },
    selectField: {
        float: 'right',
        height:'40px',
        width: '40%'
    },
    selectFieldIcon: {
        height:'18px',
        padding: '0',
        top: '-4px'
    },
    selectFieldLabel: {
        top:'-25'
    },
    selectFieldMenu: {
        height:'50%'
    },
    selectFieldHint: {
        top:'7px'
    },
    datePicker: {
        verticalAlign: 'bottom',
        display: 'inline-block',
        width: '30%'
    }
};

var VentaMod = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,

            items: [],
            productor: '',
            currentProductorCuil: '',
            currentPuerto: '',
            productoresCuil: [],
            puertosNombre: [],
            allProductoresEntities: [],
            allPuertosEntities: [],
            gastosDesc: [],
            gastosLiquidados: [],

            'Precio de venta': 0,
            'Precio de la operacion': 0,
            Factor: '',
            Comision: '',
            Grado: '',
            fieldsMissingModal: false

        }

    },
    componentDidUpdate: function (nextProps, nextState) {
        if (this.state.currentProductorCuil != nextState.currentProductorCuil) {
            //this.filter();
        }
    },
    componentDidMount: function () {
        this.getAllProductores();
        this.getAllPuertos();

        this.makeModRequest();
    },
    makeModRequest: function () {
        var analisisID = '';
        var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/' + this.props.params.identifier, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {

                this.makeCertAnalisisRequest(response.data['certificado']);
                this.makePuertoRequest(response.data['puerto']);
                this.forceUpdate();

                this.setState({
                    ['Precio de venta']: response.data['precio_venta']
                    //['Comision']: response.data['nro_cp'],
                });


            });

        this.makeCertGetAllRequest();
    },
    makeCertGetAllRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    items: response.data
                });
            })
    },
    makeCertAnalisisRequest: function (certID) {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getCertificado/' + certID, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {

                var request = new Request('http://proyecto-final-prim.herokuapp.com/analisis/getAnalisis/' + response.data['ingreso'].analisis, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });

                fetch(request)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        console.log(response.data);
                        this.setState({
                            ['Grado']: response.data['grado'],
                            ['Factor']: response.data['factor'],
                            currentProductorCuil:  response.data.productor.cuil,
                            ['Precio de la operacion']: this.state['Precio de venta'] * response.data['factor']
                        });
                    })


            });

    },
    makePuertoRequest: function (puertoID) {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/puertos/' + puertoID, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    currentPuertoNombre: response.data['nombre']
                });
            })

    },

  /*  updateFilterFields: function (field, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();


        if (field === 'Fecha desde') {
            this.setState({
                fechaDesde: year + '-' + month + '-' + day
            });
        }
        if (field === 'Fecha hasta') {
            this.setState({
                fechaHasta: year + '-' + month + '-' + day
            });
        }

        this.filter();
    },
    filter: function () {

        var request = new Request(
            'http://proyecto-final-prim.herokuapp.com/ingresoCereal/filtrar?' +
            this.returnFilterFields('fechaDesde') +
            this.returnFilterFields('fechaHasta') +
            this.returnFilterFields('chofer') +
            this.returnFilterFields('productor') +
            this.returnFilterFields('cp') ,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'text/plain'
                })
            });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    items: response.data
                });

            })

    },
    returnFilterFields: function (field) {
        var section = '';
        var fechaDesde = this.state.fechaDesde;
        var fechaHasta = this.state.fechaHasta;
        var currentChoferCuil = this.state.currentChoferCuil;
        var choferSeleccionado = null;
        var currentProductorCuil = this.state.currentProductorCuil;
        var productorSeleccionado = '';
        var cartaDePorte = this.state['Carta de porte'];

        this.state.allChoferesEntities.forEach(function (chofer) {
            if (chofer['cuil'] === currentChoferCuil) {
                choferSeleccionado = chofer['_id'];
            }
        });

        this.state.allProductoresEntities.forEach(function (productor) {
            if (productor['cuil'] === currentProductorCuil) {
                productorSeleccionado = productor['_id'];
            }
        });


        if (field === 'fechaDesde' && fechaDesde !== '') {
            section =  ('&fechaDesde=' + fechaDesde)
        }
        if (field === 'fechaHasta' && fechaHasta !== '') {
            section =   ('&fechaHasta=' + fechaHasta)
        }
        if (field === 'chofer' && choferSeleccionado !== null) {
            section =  ('&chofer=' + choferSeleccionado)
        }
        if (field === 'productor' && productorSeleccionado !== '') {
            section =   ('&productor=' + productorSeleccionado)
        }
        if (field === 'cp' && cartaDePorte !== '') {
            section =   ('&nro_cp=' + cartaDePorte)
        }
        return section
    },*/

    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Productor') {
            value = this.state.currentProductorCuil;
        }
        if (label === 'Puerto') {
            value = this.state.currentPuertoNombre;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'Puerto') {
            this.setState({
                currentPuertoNombre: payload
            });
        }
    },
    renderSelectFieldsValues: function (label) {
        var values;

        if (label === 'Productor') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        if (label === 'Puerto') {
            values = this.state.puertosNombre.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        return values
    },

    handleLimpiarFiltros: function () {
        console.log('entro al limpiarfiltros');
        this.setState({
            fechaDesde : null,
            fechaHasta: null,
            chofer: '',
            currentChoferCuil: '',
            productor: '',
            currentProductorCuil: '',
            'Carta de porte': ''
        }, this.makeRequest());


    },

    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        }, this.calculatePrecioOperacion(event.target.id, event.target.value));

    },
    calculatePrecioOperacion: function (id, value) {
        if (id === 'Precio de venta' || id === 'Factor' ) {
            this.setState({
                ['Precio de la operacion']: this.state['Precio de venta'] * this.state['Factor']
            }, console.log(this.state['Precio de la operacion']))
        }
    },


    render() {
        return (
            <div style={{
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Detalle de la venta" value={0} />
                    <Tab label="Detalle de liquidacion de gastos" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >

                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '10px 20px 0pc 20px'}}>
                                <h1 style={{marginBottom: '0px', marginTop:'2px'}}>Venta de cereal</h1>
                                <p>Elija el Productor que se corresponda con la venta a generar. Luego seleccione de la
                                    tabla el certificado correspondientes al hacer esto los valores para el grado
                                    y el facto se autocompletarán</p>
                                <p>Por último complete los valores faltantes del detalle.</p>
                                <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                                    <SelectField
                                        labelStyle={styles.selectFieldLabel}
                                        iconStyle={styles.selectFieldIcon}
                                        style={{height:'40px', width: '520px', marginTop:'5px', float:'left'}}
                                        menuStyle={styles.selectFieldMenu}
                                        floatingLabelStyle={styles.selectFieldHint}
                                        floatingLabelText='Productor'
                                        maxHeight={200}
                                        ref='Productor'
                                        value={this.getControlledSelectFieldValue('Productor')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Productor')}
                                    >
                                        {this.renderSelectFieldsValues('Productor')}
                                    </SelectField>
                                    <SelectField
                                        labelStyle={styles.selectFieldLabel}
                                        iconStyle={styles.selectFieldIcon}
                                        style={{height:'40px', top:'-9px', marginRight:'15px', float:'left', top:'5px', left:'15px'}}
                                        menuStyle={styles.selectFieldMenu}
                                        floatingLabelStyle={styles.selectFieldHint}
                                        floatingLabelText='Puerto'
                                        maxHeight={200}
                                        ref='Puerto'
                                        value={this.getControlledSelectFieldValue('Puerto')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Puerto')}
                                    >
                                        {this.renderSelectFieldsValues('Puerto')}
                                    </SelectField>
                                </div>
                                <br/>
                                <div>
                                    <h3 style={{marginBottom: '0px', marginTop:'2px'}} >Grado y factor del certificado</h3>
                                    <TextField
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Grado'
                                        floatingLabelText='Grado'
                                        id='Grado'
                                        ref='Grado'
                                        value= {this.state['Grado']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        style={{display:'inline-block'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Factor'
                                        floatingLabelText='Factor'
                                        id='Factor'
                                        ref='Factor'
                                        value= {this.state['Factor']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                </div>
                                <div>
                                    <h3 style={{marginBottom: '0px', marginTop:'2px'}} >Detalles de la venta</h3>
                                    <TextField
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Precio de venta'
                                        floatingLabelText='Precio de venta'
                                        id='Precio de venta'
                                        ref='Precio de venta'
                                        value= {this.state['Precio de venta']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Comision'
                                        floatingLabelText='Comision'
                                        id='Comision'
                                        ref='Comision'
                                        value= {this.state['Comision']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Precio de la operación'
                                        floatingLabelText='Precio de la operación'
                                        id='Precio de la operacion'
                                        ref='Precio de la operacion'
                                        value= {this.state['Precio de la operacion']}
                                    />
                                </div>
                                <div>
                                    <Table
                                        height={'336px'}
                                        fixedHeader={this.state.fixedHeader}
                                        fixedFooter={this.state.fixedFooter}
                                        selectable={true}
                                        multiSelectable= {false}
                                        onRowSelection={this.handleRowSelection}
                                    >
                                        <TableHeader
                                            displaySelectAll= {false}
                                            adjustForCheckbox={true}
                                            enableSelectAll= {false}
                                        >
                                            <TableRow>
                                                <TableHeaderColumn colSpan="7" tooltip="Agregar una nueva venta de cereales" style={{textAlign: 'right'}}>
                                                    Una vez completa la información requirida haga click en "Calcular Liquidación" para calcular los gastos de la venta.
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        label="Calcular liquidación"
                                                        onTouchTap={this.handleCalcularLiquidacion}
                                                    />
                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow style={{width: '100%'}}>
                                                <TableHeaderColumn tooltip="Nro. de certificado">Nro. de certificado</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Nro. de carta de porte">Nro. de carta de porte</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Fecha Emision">Fecha Emision</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Bruto">KG. Bruto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Tara">KG. Tara</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Neto">KG. Neto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Calidad">Calidad</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {true}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                            deselectOnClickaway={false}
                                        >
                                            {this.renderRows()}
                                        </TableBody>
                                        <TableFooter
                                            adjustForCheckbox={this.state.showCheckboxes}
                                        >
                                            <TableRow>
                                                <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>

                                                </TableRowColumn>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            </Paper>
                        </div>
                    </div>

                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1 style={{marginTop: '0px'}}>Detalles de los gastos correspondientes a la carta de porte seleccionada</h1>
                                <p>Listado de todos los gastos correspondientes con a la carta de porte seleccionada:</p>
                                <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Productor'
                                        floatingLabelText='Productor'
                                        id='ProductorElegido'
                                        ref='ProductorElegido'
                                        value= {this.state['currentProductorCuil']}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Grado'
                                        floatingLabelText='Grado'
                                        value= {this.state['Grado']}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Factor'
                                        floatingLabelText='Factor'
                                        value= {this.state['Factor']}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Precio de venta'
                                        floatingLabelText='Precio de venta'
                                        value= {this.state['Precio de venta']}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Comisión'
                                        floatingLabelText='Comisión'
                                        value= {this.state['Comision']}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Puerto'
                                        floatingLabelText='Puerto'
                                        value= {this.state['currentPuertoNombre']}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', color:'black', display:'inline-block', marginLeft:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Precio de la operación'
                                        floatingLabelText='Precio de la operación'
                                        value= {this.state['Precio de la operacion']}
                                    />
                                </div>
                                <div style={{marginTop: '-27px'}}>
                                    <Table
                                        height={'512px'}
                                        fixedHeader= {true}
                                        fixedFooter= {true}
                                        selectable= {false}
                                        multiSelectable= {false}
                                    >
                                        <TableHeader
                                            displaySelectAll= {false}
                                            adjustForCheckbox= {false}
                                            enableSelectAll= {false}
                                        >
                                            <TableRow>
                                                <TableHeaderColumn colSpan="3" tooltip='Si todos los datos son correctos, para terminar la venta haga click en "Aceptar".' style={{textAlign: 'right'}}>
                                                    Si todos los datos son correctos, para terminar la venta haga click en "Aceptar".
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        label="Aceptar"
                                                        onTouchTap={this.handleAceptar}
                                                    />
                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn tooltip="Descripción">Descripción</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Tarifa">Tarifa</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Importe">Importe</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {false}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                        >
                                            {this.renderGastosRows()}
                                        </TableBody>
                                        <TableFooter
                                            adjustForCheckbox={false}
                                        >
                                        </TableFooter>
                                    </Table>
                                </div>

                                <Dialog
                                    title={"Se esta por registrar una nueva Venta en la base de datos"}
                                    actions={[
                                                <FlatButton
                                                    label="Cancelar"
                                                    primary={true}
                                                    onTouchTap={this.handleCloseVentaConfirmationModal}
                                                />,
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleVentaConfirmationModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.ventaConfirmationModal}
                                >
                                    {"¿Está seguro que los datos correspondientes a la nueva Venta son correctos?"}
                                </Dialog>
                                <Dialog
                                    title={"La Venta correspondiente al Certificado Nro: " + this.state['Nro. de carta de porte'] + " fue ingresada a la base de datos con éxito"}
                                    actions={[
                                                <a target="_blank" href='../assets/document(3).pdf'>
                                                    <FlatButton
                                                        label="Ver PDF"
                                                        primary={true}
                                                        disabled={false}
                                                    />
                                                </a>,
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseVentaConfirmadaModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.ventaConfirmadaModal}
                                >
                                    {'Para ver el pdf correspondiente a la nueva venta seleccione la opcion "Ver PDF".\n Al seleccionar "OK", sera redireccionado a la pagina de inicio de Ventas de cereal.'}
                                </Dialog>

                                <Dialog
                                    title={"Faltan campos por completar!!"}
                                    actions={[

                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseFieldsMissingModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.fieldsMissingModal}
                                >
                                    {"Por favor complete los campos faltates para continuar."}
                                </Dialog>


                            </Paper>
                        </div>
                    </div>
                </SwipeableViews>
            </div>
        )
    },

    handleOpenFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: true});
    },
    handleCloseFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: false});
    },
    handleAceptar: function () {

        console.log(this.state);
        if (
            this.state['currentProductorcuil'] === '' ||
            this.state['currentPuerto'] === '' ||
            this.state['Grado'] === '' ||
            this.state['Factor'] === '' ||
            this.state['Precio de venta'] === '' ||
            this.state['Precio de la operacion'] === '' ||
            this.state['Comision'] === ''

        ) {
            this.handleOpenFieldsMissingModal();
        } else {
            //this.handleOpenAltaConfirmationModal();
        }

        //this.handleOpenAltaConfirmationModal();
    },

    renderRows: function () {
        var items = this.state.items;
        if (items) {
            return (items.map(this.renderRow))
        }
    },
    renderRow: function (row, index) {
        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{row['numero']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['nro_cp']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['fecha_emision']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['kg_bruto']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['kg_tara']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['kg_neto']}</TableRowColumn>
                <TableRowColumn>{row.ingreso['calidad']}</TableRowColumn>
            </TableRow>
        )
    },


    /*    handleSelection: function (rowNumber, columnId) {
     var selectedItem = this.state.items[rowNumber];

     browserHistory.push('ingresodecereal/mod/' + selectedItem['_id']);
     },*/

    handleRowSelection: function (selectedRows) {
        var index = selectedRows[0];

        this.setState({
            'certificadoSeleccionado': this.state.items[index],
            'Nro. de certificado': this.state.items[index]['numero'],
        });

    },

    handleCalcularLiquidacion: function () {
        this.makeCalcularLiquidacionRequest();
        this.handleChange(1);
    },

    makeCalcularLiquidacionRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    gastosLiquidados: response.gastos
                });

            })
    },

    renderGastosRows: function () {
        var rows = this.state.gastosLiquidados.map(this.renderGastosRow);

        rows.push(this.renderTotalRow());

        return rows;
    },
    renderGastosRow: function (gasto, index) {

        if (gasto) {
            return(
                <TableRow key={index} >
                    <TableRowColumn>
                        {gasto.descripcion}
                    </TableRowColumn>
                    <TableRowColumn>
                        {gasto.tarifa}
                    </TableRowColumn>
                    <TableRowColumn>
                        {gasto.importe}
                    </TableRowColumn>
                </TableRow>
            )
        }
    },
    renderTotalRow: function () {
        return(
            <TableRow  >
                <TableRowColumn>
                    <span style={{fontWeight: '900'}}>Total:</span>
                </TableRowColumn>
                <TableRowColumn>
                    <span></span>
                </TableRowColumn>
                <TableRowColumn>
                    <span style={{fontWeight: '900'}}>{this.calculateTotal()}</span>
                </TableRowColumn>
            </TableRow>
        )
    },

    calculateTotal: function () {
        var total = 0;

        this.state.gastosLiquidados.forEach(function (gasto) {
            total = total + gasto.importe;
        });

        return total;
    },

    getAllProductores: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/productores/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    allProductoresEntities: response.data,
                    productoresCuil: response.data.map(function (productor) {
                        return productor['cuil']
                    })
                });

            })
    },
    getAllPuertos: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/puertos/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    allPuertosEntities: response.data,
                    puertosNombre: response.data.map(function (puerto) {
                        return puerto['nombre']
                    })
                });
            })
    },

    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },
});

export default VentaMod;