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

import DeleteIcon from 'react-material-icons/icons/action/delete';

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

var VentaInicio = React.createClass ({

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
            currentProductorCuil:'',
            currentPuerto:'',
            productoresCuil: [],
            puertosNombre: [],
            allChoferesEntities: [],
            allProductoresEntities: [],
            allPuertosEntities: [],
            gastosDesc:[],
            gastosLiquidados:[],

            'Precio de venta': 0,
            'Precio de la operacion': 0,
            Factor: '',
            Comision: '',
            Grado:'',
            fieldsMissingModal: false,
            ivas: ['Régimen Simplificado', 'Responsable Inscripto', 'Exento', 'Consumidor Final'],


            'gastosDesc': [
                'Gastos generales 1116A',
                'Flete',
                'Ret. IVA RG 1394-2004',
                'Ret. II.B. BS. AS.',
                'Ret. ganancia',
                'Registro',
                'Gastos administrativos',
                'Resolucion ONCCA 49-05',
                'Almacenaje'
            ],
            ['Gastos generales 1116A']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Flete']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Ret. IVA RG 1394-2004']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Ret. II.B. BS. AS.']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Ret. ganancia']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Registro']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Gastos administrativos']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Resolucion ONCCA 49-05']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Almacenaje']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['IVA']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Sellado']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },

            nroCertificado: '',
            ['Nro. de orden']: '',
            ['Kilometros a destino']: '',
            ['Precio de venta']: '',
            ['Comision']: '',


            "razon_social": '',
            "domicilio": '',
            "localidad": '',
            "iva": '',
            "cuit": '',
            "ing_bruto": ''

        }

    },

    getFactorGradoProductor: function (analisisId) {
       var request = new Request('http://proyecto-final-prim.herokuapp.com/analisis/getAnalisis/' + analisisId, {
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
                this.setState({
                    Grado: response.data.grado,
                    Factor: response.data.factor,
                    currentProductorCuil: response.data.productor.cuil

                });
            });
    },

    componentDidUpdate: function (nextProps, nextState) {
        if (this.state.currentProductorCuil != nextState.currentProductorCuil){
        }
    },
    componentDidMount: function() {
        this.getAllProductores();
        this.getAllPuertos();

        this.makeRequest();
    },
    makeRequest: function () {
        fetch(this.getRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    items: response.data
                });
            })
    },
    //filtrar/true --> no liquidados
    //filtrar/false -->  todos
    //filtrar/false/nro  --> puede ser parcial

    getRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAllNoLiquidados', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    updateFilterFields: function (field, event, date) {
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
    },

    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Productor') {
            value = this.state.currentProductorCuil;
        }
        if (label === 'Puerto') {
            value = this.state.currentPuertoNombre;
        }
        if (label === 'IVA') {
            value = this.state.currentIVA;
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
        if (label === 'IVA') {
            this.setState({
                currentIVA: payload
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
        if (label === 'IVA') {
            values = this.state.ivas.map(function (value, key) {
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

        if (event.target.id === 'nroCertificado') {
            this.filtrarCertificado(event.target.value);
        }


    },
    calculatePrecioOperacion: function (id, value) {
        if (id === 'Precio de venta' || id === 'Factor' ) {
            this.setState({
                ['Precio de la operacion']: this.state['Precio de venta'] * this.state['Factor']
            }, console.log(this.state['Precio de la operacion']))
        }
    },

    //MENEJO DE ERRORES
    handleControlledInputBlur: function (event) {
        if (event.target.value === '') {
            this.setState({
                [event.target.id + 'error']: 'Este campo es requerido.'
            });
        }
        else {
            this.setState({
                [event.target.id + 'error']: false
            });
        }
    },

    round: function (value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
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
                    <Tab label="Detalle de liquidación de gastos" value={1} />
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
                                    tabla el certificado correspondiente al hacer esto los valores para el grado
                                    y el facto se autocompletarán</p>
                                <p>Por último complete los valores faltantes del detalle.</p>
                                <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', height:'40px', width: '520px', marginTop:'5px', float:'left'}}
                                        inputStyle={{marginTop:'0px'}}
                                        floatingLabelStyle={styles.selectFieldHint}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Productor'
                                        floatingLabelText='Productor'
                                        id='Productor'
                                        ref='Productor'
                                        value= {this.state['currentProductorCuil']}
                                        onChange={this.handleControlledInputChange}
                                    />
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
                                    <TextField
                                        errorText={this.state['Kilometros a destino' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px', top:'-27px', left:'12px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Kilómetros a destino'
                                        floatingLabelText='Kilómetros a destino'
                                        id='Kilometros a destino'
                                        ref='Kilometros a destino'
                                        value= {this.state['Kilometros a destino']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                </div>
                                <br/>
                                <div>
                                    <h3 style={{marginBottom: '0px', marginTop:'2px'}} >Grado y factor del Certificado</h3>
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', display:'inline-block', marginRight:'15px'}}
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
                                        disabled={true}
                                        style={{cursor: 'default', display:'inline-block'}}
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
                                        errorText={this.state['Precio de venta' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
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
                                        errorText={this.state['Comision' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Comisión'
                                        floatingLabelText='Comisión'
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
                                        value= {this.round(this.state['Precio de la operacion'], 2)}
                                    />
                                </div>
                                <div>
                                    <Table
                                        height={'238px'}
                                        fixedHeader={this.state.fixedHeader}
                                        fixedFooter={this.state.fixedFooter}
                                        selectable={true}
                                        multiSelectable= {false}
                                        onRowSelection={this.handleRowSelection}
                                    >
                                        <TableHeader
                                            displaySelectAll= {false}
                                            adjustForCheckbox={false}
                                            enableSelectAll= {false}
                                        >

                                            <TableRow>
                                                <TableHeaderColumn colSpan="7" tooltip="Para dar de baja alguna venta clickee el botón" style={{textAlign: 'right'}}>
                                                    Para dar de baja alguna venta clickee el botón
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        icon={<DeleteIcon style={{paddingBottom: '6px'}} />}
                                                        label="Dar de baja"
                                                        buttonStyle={{width:'201.6px'}}
                                                        onTouchTap={this.handleDarDeBajaVentas}
                                                    />
                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn colSpan="3" tooltip="Si conoce el número de certificado puede buscarlo." style={{textAlign: 'left'}}>
                                                    <TextField
                                                        style={{display:'inline-block', marginRight:'15px', left:'-24px'}}
                                                        floatingLabelStyle={{lineHeight:'10px'}}
                                                        hintStyle={{bottom:'7px'}}
                                                        underlineStyle={{width:'100%'}}
                                                        hintText='Nro. de Certificado'
                                                        floatingLabelText='Nro. de Certificado'
                                                        id='nroCertificado'
                                                        ref='nroCertificado'
                                                        value= {this.state['nroCertificado']}
                                                        onChange={this.handleControlledInputChange}
                                                        onBlur={this.handleControlledInputChange}
                                                    />
                                                    Si conoce el número de certificado puede buscarlo
                                                </TableHeaderColumn>
                                                <TableHeaderColumn colSpan="4" tooltip="Agregar una nueva venta de cereales" style={{textAlign: 'right'}}>
                                                    Una vez completa la información requerida haga click en "Calcular Liquidación" para calcular los gastos de la venta.
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        label="Calcular liquidacion"
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
                                <h1 style={{marginTop: '0px', marginBottom:'0px'}}>Detalles de los gastos correspondientes a la carta de porte seleccionada</h1>
                                <TextField
                                    errorText={this.state['Nro. de orden' + 'error']}
                                    onBlur={this.handleControlledInputBlur}
                                    style={{display:'inline-block', marginRight:'15px'}}
                                    floatingLabelStyle={{lineHeight:'10px'}}
                                    hintStyle={{bottom:'7px'}}
                                    underlineStyle={{width:'100%'}}
                                    hintText='Nro. de orden'
                                    floatingLabelText='Nro. de orden'
                                    id='Nro. de orden'
                                    ref='Nro. de orden'
                                    value= {this.state['Nro. de orden']}
                                    onChange={this.handleControlledInputChange}
                                />
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
                                        hintText='Comision'
                                        floatingLabelText='Comision'
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
                                        height={'445px'}
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
                                                <TableHeaderColumn colSpan="4" tooltip='Si todos los datos son correctos, para terminar la venta haga click en "Aceptar".' style={{textAlign: 'right'}}>
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
                                                <TableHeaderColumn tooltip="Descripcion">Descripcion</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Kilos">Kilos</TableHeaderColumn>
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
                                    title={"Se está por registrar una nueva Venta en la base de datos"}
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
                                    <br/>
                                    <br/>
                                    {"De ser así por favor complete los datos del comprador:"}
                                    <br/>
                                    <TextField
                                        errorText={this.state['Razon social' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Razón social'
                                        floatingLabelText='Razón social'
                                        id='Razon social'
                                        ref='Razon social'
                                        value= {this.state['Razon social']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <TextField
                                        errorText={this.state['Domicilio' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Domicilio'
                                        floatingLabelText='Domicilio'
                                        id='Domicilio'
                                        ref='Domicilio'
                                        value= {this.state['Domicilio']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <TextField
                                        errorText={this.state['Localidad' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Localidad'
                                        floatingLabelText='Localidad'
                                        id='Localidad'
                                        ref='Localidad'
                                        value= {this.state['Localidad']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <TextField
                                        errorText={this.state['Cuit' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Cuit'
                                        floatingLabelText='Cuit'
                                        id='Cuit'
                                        ref='Cuit'
                                        value= {this.state['Cuit']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <TextField
                                        errorText={this.state['Ingresos brutos' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{display:'inline-block', marginRight:'15px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Ingresos brutos'
                                        floatingLabelText='Ingresos brutos'
                                        id='Ingresos brutos'
                                        ref='Ingresos brutos'
                                        value= {this.state['Ingresos brutos']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <SelectField
                                        labelStyle={styles.selectFieldLabel}
                                        iconStyle={styles.selectFieldIcon}
                                        style={{height:'40px', top:'30px', marginRight:'15px', float:'left', left:'0px'}}
                                        menuStyle={styles.selectFieldMenu}
                                        floatingLabelStyle={styles.selectFieldHint}
                                        floatingLabelText='IVA'
                                        maxHeight={200}
                                        ref='IVA'
                                        value={this.getControlledSelectFieldValue('IVA')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'IVA')}
                                    >
                                        {this.renderSelectFieldsValues('IVA')}
                                    </SelectField>
                                    <br/>
                                </Dialog>
                                <Dialog
                                    title={"La Venta correspondiente al Certificado Nro: " + this.state['Nro. de certificado'] + " fue ingresada a la base de datos con éxito"}
                                    actions={[
                                                <a target="_blank" href={'http://proyecto-final-prim.herokuapp.com/liquidacion/liqpdf/' + this.state.newVentaId} >
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
                                                    onTouchTap={this.handleCloseConfirmadaModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.confirmationModal}
                                >
                                    {'Para ver el pdf correspondiente a la nueva venta seleccione la opción "Ver PDF".\n Al seleccionar "OK", será redireccionado a la página de inicio de Ventas de cereal.'}
                                </Dialog>

                                <Dialog
                                    title={"Faltan campos por completar!"}
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

    filtrarCertificado: function (nroCert) {
        var request;

        if (nroCert === '') {
            request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAllNoLiquidados' , {
                method: 'Get',
                headers: new Headers({
                    'Content-Type': 'application/json'
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
        } else {
            request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/filtrar/true/' + nroCert , {
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
                    this.setState({
                        items: response.data
                    });
                })
        }

    },


    handleOpenFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: true});
    },
    handleCloseFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: false});
    },
    handleAceptar: function () {
        if (
            this.state['Precio de venta'] === '' ||
            this.state['Comision'] === '' ||
            this.state['Kilometros a destino'] === '' ||
            this.state['Nro. de orden'] === ''
           //this.state['currentPuertoNombre'] === ''

        ) {
            this.handleOpenFieldsMissingModal();
        } else {
            this.handleOpenVentaConfirmationModal();
        }

    },
    handleOpenVentaConfirmationModal: function (event) {
        this.setState({ventaConfirmationModal: true});
    },
    handleCloseVentaConfirmationModal: function () {
        this.setState({ventaConfirmationModal: false});
    },
    handleVentaConfirmationModal: function (event) {
        if (
            this.state['Razon social'] === '' ||
            this.state['Domicilio'] === '' ||
            this.state['Localidad'] === '' ||
            this.state['Cuit'] === '' ||
            this.state['Ingresos brutos'] === ''

        ) {
            this.handleOpenFieldsMissingModal();
        } else {
            this.makeAceptarRequest();
            this.setState({confirmationModal: true, ventaConfirmationModal: false});
        }

    },
    handleCloseConfirmadaModal: function () {
        this.setState({confirmationModal: false, ventaConfirmationModal: false});
        browserHistory.push('venta');
    },

    getPuertoId: function () {
        var id = '';
        var state = this.state;

        this.state.allPuertosEntities.forEach(function (puerto) {
            if (puerto.nombre === state.currentPuertoNombre) {
                id = puerto['_id'];
            }
        });

        return id
    },


    makeAceptarRequest: function () {
        var puerto = this.getPuertoId();

        var bodyRequested = {
            "certificado": this.state.idCertSeleccionado,
            "puerto": puerto,
            "gastos": [
                this.state['Gastos generales 1116A'],
                this.state['Flete'],
                this.state['Ret. IVA RG 1394-2004'],
                this.state['Ret. II.B. BS. AS.'],
                this.state['Ret. ganancia'],
                this.state['Registro'],
                this.state['Gastos administrativos'],
                this.state['Resolucion ONCCA 49-05'],
                this.state['Almacenaje'],
                this.state['IVA'],
                this.state['Sellado']
            ],
            "comprador": {
                "razon_social": this.state['Razon social'],
                "domicilio": this.state['Domicilio'],
                "localidad": this.state['Localidad'],
                "iva": this.state.currentIVA,
                "cuit": this.state['Cuit'],
                "ing_bruto": this.state['Ingresos brutos']
            },
            "precio_venta": this.state['Precio de venta'],
            "comision": this.state['Comision'],
            "habilitado": true,
            "nro_orden": this.state['Nro. de orden'],
            "kms": this.state['Kilometros a destino']
        };
        var bodyJson = JSON.stringify(bodyRequested);

        var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/create' , {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bodyJson
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {

                console.log('se ingreso la nueva venta a la bd con id ', response);
                this.setState({
                    'newVentaId': response.data['_id']
                });
            })
            .then((response) => {

                var certJson = JSON.stringify({"liquidado": true});
                console.log('this.state.idCertSeleccionado',this.state.idCertSeleccionado);

                var certRequest = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/update/' + this.state.idCertSeleccionado, {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: certJson
                });

                fetch(certRequest)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        console.log('salio bien se updeteo el certificado como liquidado');
                        console.log('repsonse: ', response);
                    })
            })
    },

    //********************

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

    handleRowSelection: function (selectedRows) {
        var index = selectedRows[0];

        this.getFactorGradoProductor(this.state.items[index].ingreso.analisis);

        console.log(this.state.items[index]);
        this.setState({
            'certificadoSeleccionado': this.state.items[index],
            'Nro. de certificado': this.state.items[index]['numero'],
            'idCertSeleccionado': this.state.items[index]['_id'],
            'idCPSeleccionada': this.state.items[index].ingreso['_id'],
            'kgNeto': this.state.items[index].ingreso['kg_neto']

        });
    },

    handleCalcularLiquidacion: function () {
        this.makeGastosRequest();
        this.handleChange(1);
    },
    makeGastosRequest: function () {
        var request;
        var ivaRequest;
        var selladoRequest;

        this.state.gastosDesc.forEach(function (gastoDesc) {
            request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/gastos/' + this.state.kgNeto + '/' + gastoDesc, {
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
                    this.setState({
                        [gastoDesc]: response.data
                    });
                });
        }.bind(this));


        ivaRequest = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/gastos/' +
            this.state.idCPSeleccionada + '/IVA?subtotal=' + this.calculateTotal(), {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        fetch(ivaRequest)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    ['IVA']: response.data
                });
            });
        selladoRequest = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/gastos/' +
            this.state.idCPSeleccionada + '/Sellado?subtotal=' + this.calculateTotal(), {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        fetch(selladoRequest)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    ['Sellado']: response.data
                });
            });

    },
    calculateTotal: function () {
        var total =
            this.state['Gastos generales 1116A'].importe +
            this.state['Flete'].importe +
            this.state['Ret. IVA RG 1394-2004'].importe +
            this.state['Ret. ganancia'].importe +
            this.state['Registro'].importe +
            this.state['Gastos administrativos'].importe +
            this.state['Resolucion ONCCA 49-05'].importe +
            this.state['Almacenaje'].importe;
        return total;
    },

    renderGastosRows: function () {
        var rows = [];

        if (this.state.certificadoSeleccionado) {
            rows = this.state.gastosDesc.map(this.renderGastosRow);
        }

        
        //rows.push(this.renderIvaRow());
        //rows.push(this.renderSelladoRow());
        rows.push(this.renderTotalRow());

        return rows;
    },

    renderGastosRow: function (detalle, index) {

        if (detalle) {
            return(
                <TableRow key={index} >
                    <TableRowColumn>
                        {this.state[detalle].descripcion}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state[detalle].kilos}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state[detalle].tarifa}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.round(this.state[detalle].importe, 2)}
                    </TableRowColumn>
                </TableRow>
            )
        }
    },
    renderIvaRow: function () {

        if (this.state['IVA']) {
            return(
                <TableRow  >
                    <TableRowColumn>
                        {this.state['IVA'].descripcion}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state['IVA'].kilos}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state['IVA'].tarifa}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.round(this.state['IVA'].importe, 2)}
                    </TableRowColumn>
                </TableRow>
            )
        }

    },
    renderSelladoRow: function () {

        if (this.state['Sellado']) {
            return(
                <TableRow  >
                    <TableRowColumn>
                        {this.state['Sellado'].descripcion}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state['Sellado'].kilos}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state['Sellado'].tarifa}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.round(this.state['Sellado'].importe, 2)}
                    </TableRowColumn>
                </TableRow>
            )
        }

    },
    renderTotalRow: function () {

        if (this.state['IVA'] && this.state['Sellado']) {
            return(
                <TableRow  >
                    <TableRowColumn>
                        <span style={{fontWeight: '900'}}>Total:</span>
                    </TableRowColumn>
                    <TableRowColumn>
                        <span></span>
                    </TableRowColumn>
                    <TableRowColumn>
                        <span></span>
                    </TableRowColumn>
                    <TableRowColumn>
                        <span style={{fontWeight: '900'}}>{this.round(this.calculateTotal() + this.state['IVA'].importe + this.state['Sellado'].importe, 2)}</span>
                    </TableRowColumn>
                </TableRow>
            )

        }

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

    handleDarDeBajaVentas: function () {
        browserHistory.push('venta/bajaventa');
    }
});

export default VentaInicio;