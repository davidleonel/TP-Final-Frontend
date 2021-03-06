import React from 'react';
import {Link, browserHistory} from 'react-router';

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
        display: 'inline-block',
        verticalAlign: 'top'
    },
    selectField: {
        marginRight: '20px',
        verticalAlign: 'top',
        width: '42%'
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
const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true
    },
    {
        name: 'Randal White',
        status: 'Unemployed'
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
    },
];

import DeleteIcon from 'react-material-icons/icons/action/delete';

var CertificadoDeDeposito = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            name: 'Mary'
        };
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
            height: '510px',


            items: [],

            fechaDesde : '',
            fechaHasta: '',
            chofer: '',
            productor: '',
            'Carta de porte': '',


            currentProductorCuil:'',
            currentChoferCuil:'',

            productoresCuil: [],
            choferesCuil: [],
            allChoferesEntities: [],
            allProductoresEntities: [],

            nroCertificado: '',

        }

    },
    componentDidUpdate: function (nextProps, nextState) {
       /* if (this.state.currentChoferCuil != nextState.currentChoferCuil){
            this.filter();
        }

        if (this.state.currentProductorCuil != nextState.currentProductorCuil){
            this.filter();
        }*/
    },
    componentDidMount: function() {
        this.getAllProductores();
        this.getAllChoferes();

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
    getRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },



    
/*
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
*/

    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        },  this.filtrarCertificado(event.target.value));

    },

    filtrarCertificado: function (nroCert) {
        var request;

        if (nroCert === '') {
            request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAll' , {
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
        } else {
            request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/filtrar/false/' + nroCert , {
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
    //*****************************************************************//
    //falta ver los campos que van se van a usar para el filtrado

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Certificado de Depósito</h1>
                    <p>Para encontrar el certificado deseado rápidamente, si conoce el número de certificado, puede filtrar los certificados que se encuentran en la base de datos usando el campo a continuación. </p>
                    <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                        <TextField
                            style={{display:'inline-block', marginRight:'15px'}}
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
                    </div>
                    <br/>
                    <div>
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={false}
                            multiSelectable={false}
                            onCellClick={this.handleSelection}
                            >
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={false}
                                >
                                <TableRow>
                                    <TableHeaderColumn colSpan="7" tooltip="Para ver un certificado solo debe clickearlo" style={{textAlign: 'right'}}>
                                        Para ver un certificado sólo debe clickearlo
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Generar nuevo Certificado"
                                            onTouchTap={this.handleGenerarNuevoCertificado}
                                            />
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn colSpan="7" tooltip="Para dar de baja algún certificado clickee el botón" style={{textAlign: 'right'}}>
                                        Para dar de baja algún certificado clickee el botón
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            icon={<DeleteIcon style={{paddingBottom: '6px'}} />}
                                            label="Dar de baja"
                                            buttonStyle={{width:'255.6px'}}
                                            onTouchTap={this.handleDarDeBajaCertificado}
                                            />
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Nro. de certificado">Nro. de certificado</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Nro. de carta de porte">Nro. de carta de porte</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Fecha Emisión">Fecha Emision</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="KG. Bruto">KG. Bruto</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="KG. Tara">KG. Tara</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="KG. Neto">KG. Neto</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Calidad">Calidad</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={true}
                                stripedRows={false}
                                >
                                {this.renderRows()}
                            </TableBody>
                            <TableFooter
                                adjustForCheckbox={this.state.showCheckboxes}
                                >

                            </TableFooter>
                        </Table>
                    </div>

                </Paper>
            </div>
        )
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

    handleToggle: function (event, toggled) {
        this.setState({
            [event.target.name]: toggled
        });
    },

    handleChange: function (event) {
        this.setState({height: event.target.value});
    },

    handleSelection: function (rowNumber, columnId) {
        var selectedItem = this.state.items[rowNumber];

        browserHistory.push('certificadodedeposito/listadoCertificadoDeDeposito/' + selectedItem['_id']);
    },

    handleGenerarNuevoCertificado: function () {
        browserHistory.push('certificadodedeposito/nuevoCertificadoDeDeposito');
    },
    handleDarDeBajaCertificado: function () {
        browserHistory.push('certificadodedeposito/bajaCertificadoDeDeposito');
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

export default CertificadoDeDeposito;