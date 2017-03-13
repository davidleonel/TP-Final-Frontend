import React from 'react';

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

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    slide: {
        padding: 10
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
        display: 'inline-block',
        verticalAlign: 'top'
    },
    selectField: {
        marginRight: '20px',
        verticalAlign: 'top',
        width: '30%'
    },
    textFieldMain: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '60%'
    },
    selectFieldMain: {
        marginRight: '20px',
        verticalAlign: 'top',
        width: '60%'
    },
    datePicker: {
        verticalAlign: 'bottom',
        display: 'inline-block',
        width: '30%'
    }
};

var CertificadoDeDepositoNuevo = React.createClass ({
    getInitialState: function () {
        return {
            slideIndex: 0,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',


            items: [],

            currentProductorCuil: '',
            productoresCuil: [],
            especiesDesc: [],
            cosechasDesc: [],
            camposNombres: [],
            choferesCuil: [],
            transportistasRazonSocial:[],
            tarifasDesc:[],
            destinosDesc:[],
            calidades: ['Conforme', 'Condicional'],


            allRubrosEntities: [],
            allChoferesEntities: [],
            rubrosDesc:'',

            currentProductorCuil:'',
            currentEspecieDesc:'',
            currentCosechaDesc:'',
            currentCalidad:'',
            currentCampoNombre:'',
            currentChoferCuil:'',
            currentTransportistaRazonSocial:'',
            currentTarifaDesc:'',
            currentDestinatario:'',
            currentDestinoDesc:'',
            currentRemitenteComercial:'',
            currentIntermediario:'',


            Porcentaje0: 0,
            Porcentaje1: 0,
            Porcentaje2: 0,
            Porcentaje3: 0,
            Porcentaje4: 0,
            Porcentaje5: 0,
            Porcentaje6: 0,
            Porcentaje7: 0,
            Bonificacion0: 0,
            Bonificacion1: 0,
            Bonificacion2: 0,
            Bonificacion3: 0,
            Bonificacion4: 0,
            Bonificacion5: 0,
            Bonificacion6: 0,
            Bonificacion7: 0,


            bonificacionReset: true,
            Grado: 0,
            Factor: 0,

            cps: [],
            selectedRowsArray: [],
            KgsBrutosSeleccionadosTotales:0,
        }

    },
    componentDidUpdate: function (nextProps, nextState) {
        if (this.state.selectedRowsArray != nextState.selectedRowsArray){
            this.calculateKgsBrutosSeleccionados();
        }

        if (this.state.KgsBrutosSeleccionadosTotales != nextState.KgsBrutosSeleccionadosTotales){
            this.calculateKgsBrutosSeleccionados();
        }
    },

    componentDidMount: function() {
        this.calculateKgsBrutosSeleccionados();
        this.getAllProductores();
        this.getAllEspecies();
        this.getAllRubros();
        this.getAllCosechas();
        this.getAllChoferes();

        this.makeCPRequest();

        this.setState({
            itemSelected:  this.props.params.identifier
        });

    },

    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },


    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Productor') {
            value = this.state.currentProductorCuil;
        }
        if (label === 'Especie') {
            value = this.state.currentEspecieDesc;
        }
        if (label === 'Cosecha') {
            value = this.state.currentCosechaDesc;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'Especie') {
            this.setState({
                currentEspecieDesc: payload
            });
        }
        if (label === 'Cosecha') {
            this.setState({
                currentCosechaDesc: payload
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
        if (label === 'Especie') {
            values = this.state.especiesDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Cosecha') {
            values = this.state.cosechasDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },


    formatDate: function (ref, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (ref === 'Fecha analisis') {
            this.setState({
                'Fecha analisis': year + '/' + month + '/' + day
            });
        }

        if (ref === 'Fecha emision') {
            this.setState({
                'Fecha emision': year + '/' + month + '/' + day
            });
        }
        if (ref === 'Fecha arribo') {
            this.setState({
                'Fecha arribo': year + '/' + month + '/' + day
            });
        }
        if (ref === 'Fecha vencimiento') {
            this.setState({
                'Fecha vencimiento': year + '/' + month + '/' + day
            });
        }

    },



    render() {
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Cartas de Porte" value={0} />
                    <Tab label="Detalle" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >

                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                                    <div >
                                        <DatePicker
                                            style={{display: 'inline-block', width: '25%'}}
                                            autoOk={true}
                                            DateTimeFormat={global.Intl.DateTimeFormat}
                                            cancelLabel='Cerrar'
                                            hintText='Fecha desde'
                                            ref='Fecha desde'
                                            mode="landscape"
                                            onChange={this.updateFilterFields.bind(this, 'Fecha desde')}
                                            />
                                        <DatePicker
                                            style={{display: 'inline-block', width: '25%'}}
                                            autoOk={true}
                                            cancelLabel='Cerrar'
                                            hintText='Fecha hasta'
                                            ref='Fecha hasta'
                                            mode="landscape"
                                            onChange={this.updateFilterFields.bind(this, 'Fecha hasta')}
                                            />
                                    </div>
                                    <br/>
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Chofer'
                                        maxHeight={200}
                                        ref='Chofer'
                                        value={this.getControlledSelectFieldValue('Chofer')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Chofer')}
                                        >
                                        {this.renderSelectFieldsValues('Chofer')}
                                    </SelectField>
                                    <br/>
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Productor'
                                        maxHeight={200}
                                        ref='Productor'
                                        value={this.getControlledSelectFieldValue('Productor')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Productor')}
                                        >
                                        {this.renderSelectFieldsValues('Productor')}
                                    </SelectField>
                                    <br/>
                                    <TextField
                                        style={{height:'60px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Carta de porte'
                                        floatingLabelText='Carta de porte'
                                        id='Carta de porte'
                                        ref='Carta de porte'
                                        value= {this.state['Carta de porte']}
                                        onChange={this.handleControlledInputChange}
                                        />
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <div>
                                    <Table
                                        height={this.state.height}
                                        fixedHeader= {true}
                                        fixedFooter= {true}
                                        selectable={true}
                                        multiSelectable={true}
                                        onRowSelection={this.handleRowSelection}

                                        >
                                        <TableHeader
                                            displaySelectAll={true}
                                            adjustForCheckbox={true}
                                            enableSelectAll={true}
                                            >
                                            <TableRow>
                                                <TableHeaderColumn tooltip="Carta de Porte">Carta de Porte</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Fecha Emision">Fecha Emision</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Bruto">KG. Bruto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Tara">KG. Tara</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Neto">KG. Neto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Chofer cuil">Chofer cuil</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Chofer nombre">Chofer nombre</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Camion patente">Camion patente</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {true}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                            deselectOnClickaway={false}
                                            >
                                            {this.renderCPRows()}
                                        </TableBody>
                                        <TableFooter
                                            adjustForCheckbox={this.state.showCheckboxes}
                                            >
                                            <TableRow>
                                                <TableRowColumn colSpan="1" style={{textAlign: 'center'}}>
                                                    <TextField
                                                        disabled={true}
                                                        style={{display: 'inline-block', verticalAlign: 'top', width: '90%'}}
                                                        floatingLabelText= 'KGs Brutos Totales'
                                                        id='KgsBrutosSeleccionadosTotales'
                                                        ref='KgsBrutosSeleccionadosTotales'
                                                        value= {this.state['KgsBrutosSeleccionadosTotales']}
                                                        />
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>


                                <RaisedButton
                                    style={{margin:'10px'}}
                                    backgroundColor="#8BC34A"
                                    label="Aceptar"
                                    onTouchTap={this.handleAceptar}
                                    />
                            </Paper>
                        </div>
                    </div>

                    <div>

                    </div>

                </SwipeableViews>
            </div>
        )
    },

    handleRowSelection: function (selectedRows) {
        var cpsLength = this.state.cps.length;
        var selectedRowsLength = selectedRows ? selectedRows.length : 0;
        var object = {};

        for (var i = 0; i < cpsLength; i++) {
            for (var j = 0; j < selectedRowsLength; j++) {
                if (i === selectedRows[j]) {
                    object[i]=true
                }
            }
        }

        this.setState({
            selectedRowsArray: selectedRows,
            currentSelectedRows: object
        });
        this.forceUpdate();
        this.calculateKgsBrutosSeleccionados();
    },

    calculateKgsBrutosSeleccionados: function () {
        var KgsBrutosSeleccionadosTotales = 0;
        var selectedRowsArrayLength = this.state.selectedRowsArray ? this.state.selectedRowsArray.length : 0;

        for (var i = 0; i < selectedRowsArrayLength; i++) {
            var cp = this.state.cps[this.state.selectedRowsArray[i]];

            KgsBrutosSeleccionadosTotales = KgsBrutosSeleccionadosTotales + cp['kg_bruto'];
        }

        this.setState({
            KgsBrutosSeleccionadosTotales: KgsBrutosSeleccionadosTotales
        });

    },

    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },

    renderRows: function () {
        var items = this.state.allEspeciesEntities;
        var currentEspecie = this.state.currentEspecieDesc;
        var especie = [];
        if (items) {
            especie = _.find(items, function (e) {
                if (e['descripcion'] === currentEspecie) {
                    return true
                }
            });

            if (especie && especie.rubros) {
                return (especie.rubros.map(this.renderRow))
            }
        }

    },
    renderRow: function (row, index) {
        var rubro = _.find(this.state.allRubrosEntities, function (r) {
            if (r['_id'] === row['rubro']) {
                return true
            }
        });

        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{rubro['descripcion']}</TableRowColumn>
                <TableRowColumn>
                    <TextField
                        style={styles.textField}
                        id={'Porcentaje' + index}
                        ref='Porcentaje'
                        value= {this.state['Porcentaje' + index]}
                        onChange={this.handleControlledInputChange}
                        onBlur={this.calculateBonificacion.bind(this, index, row['rubro'])}
                        />
                </TableRowColumn>
                <TableRowColumn>
                    <TextField
                        disabled={true}
                        style={styles.textField}
                        id={'Bonificacion' + index}
                        ref='Bonificacion'
                        value= {this.state['Bonificacion' + index]}
                        onChange={this.handleControlledInputChange}
                        onBlur={this.calculateBonificacion.bind(this, index, row['rubro'])}
                        />
                </TableRowColumn>
            </TableRow>
        )
    },
    calculateBonificacion: function (index, rubroID, event) {
        var currentEspecie = this.state.currentEspecieDesc;
        var especieSeleccionada = '';
        this.state.allEspeciesEntities.forEach(function (especie) {
            if (especie['descripcion'] === currentEspecie) {
                especieSeleccionada = especie['_id'];
            }
        });

        var especieID = especieSeleccionada;
        var porcRubro = event.target.value;
        var bonificacionReset = this.state.bonificacionReset;

        var request = new Request(
            'http://proyecto-final-prim.herokuapp.com/analisis/agregarRubro/' +
            rubroID + '/' +
            especieID + '/' +
            porcRubro + '/' +
            bonificacionReset
            , {
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
                console.log('respuesta: ', response);
                this.setState({
                    bonificacionReset:  false,
                    Grado: response.data['grado'],
                    Factor: response.data['factor'],
                    ['Bonificacion' + index]: response.data['bonreb']
                });
            })

    },

    handleAceptar: function () {
        this.makeAceptarRequest();
    },
    makeAceptarRequest: function () {
        var state = this.state;
        var currentProductorCuil = state.currentProductorCuil;
        var currentEspecie = state.currentEspecieDesc;
        var currentCosecha = state.currentCosechaDesc;
        var productorSelecionado = '';
        var especieSeleccionada = '';
        var cosechaSeleccionada = '';
        var rubrosSeleccionados = [];
        var cpsSeleccionadas = [];

        this.state.allProductoresEntities.forEach(function (productor) {
            if (productor['cuil'] === currentProductorCuil) {
                productorSelecionado = productor['_id'];
            }
        });
        this.state.allEspeciesEntities.forEach(function (especie) {
            if (especie['descripcion'] === currentEspecie) {

                especie.rubros.forEach(function (rubro, index) {
                    rubrosSeleccionados.push({"rubro": rubro['rubro'], "porcentaje": state['Porcentaje' + index]});
                });

                especieSeleccionada = especie['_id'];
            }
        });
        this.state.allCosechasEntities.forEach(function (cosecha) {
            if (cosecha['descripcion'] === currentCosecha) {
                cosechaSeleccionada = cosecha['_id'];
            }
        });

        for (var i = 0; i < this.state.selectedRowsArray.length; i++) {
            var cp = this.state.cps[this.state.selectedRowsArray[i]];

            cpsSeleccionadas.push(cp['_id']);
        }

        var bodyRequested = {
            "nro_analisis" : this.state['nroAnalisis'],
            "productor" : productorSelecionado,
            "especie" : especieSeleccionada,
            "cosecha" : cosechaSeleccionada,
            "fecha_analisis" : this.state['Fecha analisis'],
            "costo_analisis": state['Costo'],
            "habilitado": true,
            "ingresos" : cpsSeleccionadas,
            "rubros" : rubrosSeleccionados
        };

        console.log('bodyRequested: ', bodyRequested);
        console.log('bodyRequested: ', bodyRequested);
        console.log('bodyRequested: ', bodyRequested);

        /*fetch(this.getRequest(bodyRequested))
         .then((response) => {
         return response.json()
         })
         .then((response) => {
         console.log('respuesta: ', response);
         /!*this.setState({
         items: response.data
         });*!/
         })*/
    },
    getRequest: function (bodyRequested) {
        var bodyJson = JSON.stringify(bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/analisis/create', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bodyJson
        });

        return request
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
    getAllEspecies: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/especies/getAll', {
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
                    allEspeciesEntities: response.data,
                    especiesDesc: response.data.map(function (especie) {
                        return especie['descripcion']
                    })
                });
            })
    },
    getAllRubros: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/rubros/getAll', {
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
                    allRubrosEntities: response.data,
                    rubrosDesc: response.data.map(function (rubro) {
                        return rubro['descripcion']
                    })
                });
            })
    },
    getAllCosechas: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/cosechas/getAll', {
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
                    allCosechasEntities: response.data,
                    cosechasDesc: response.data.map(function (cosecha) {
                        return cosecha['descripcion']
                    })
                });
            })
    },

    //***********************LOS METODOS CORRESPONDIENTES A LA ULTIMA PESTAÑA DE CARTAS DE PORTE

    makeCPRequest: function () {
        fetch(this.getCPRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    cps: response.data
                });
            })
    },
    getCPRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    renderCPRows: function () {
        var items = this.state.cps;
        if (items) {
            return (items.map(this.renderCPRow))
        }
    },

    renderCPRow: function (row, index) {
        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{row['nro_cp']}</TableRowColumn>
                <TableRowColumn>{row['fecha_emision']}</TableRowColumn>
                <TableRowColumn>{row['kg_bruto']}</TableRowColumn>
                <TableRowColumn>{row['kg_tara']}</TableRowColumn>
                <TableRowColumn>{row['kg_neto']}</TableRowColumn>
                <TableRowColumn>{row.chofer['cuil']}</TableRowColumn>
                <TableRowColumn>{row.chofer['nombre']}</TableRowColumn>
                <TableRowColumn>{row['patente']}</TableRowColumn>
            </TableRow>
        )
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
                console.log('response', response);
                this.setState({
                    cps: response.data
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

    getAllChoferes: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/choferes/getAll', {
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
                    allChoferesEntities: response.data,
                    choferesCuil: response.data.map(function (chofer) {
                        return chofer['cuil']
                    })
                });
            })
    },

});

export default CertificadoDeDepositoNuevo;
