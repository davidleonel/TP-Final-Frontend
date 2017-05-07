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
    textFieldMain: {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '60%'
    },
    textField: {
        marginTop: '-25px',
    },
    selectField: {
        clear:'left',
        float: 'left',
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


const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

var VentaInicio = React.createClass ({
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
            height: '300px',


            items: [],

            fechaDesde : '',
            fechaHasta: '',
            chofer: '',
            productor: '',
            'Carta de porte': '',


            allCertificadosEntities:[],
            allPuertosEntities:[],
            certificadosNumero: [],
            puertosNombres: [],

        }

    },
    componentDidUpdate: function (nextProps, nextState) {
        if (this.state.currentProductorCuil != nextState.currentProductorCuil){
            this.filter();
        }
        if (this.state.currentEspecieDesc != nextState.currentEspecieDesc){
            this.filter();
        }
        if (this.state.currentCosechaDesc != nextState.currentCosechaDesc){
            this.filter();
        }
    },
    componentDidMount: function() {
        this.getAllPuertos();
        this.getAllCertificados();

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
        var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },


    filter: function () {

    /*    var request = new Request(
            'http://proyecto-final-prim.herokuapp.com/venta/filtrar?' +
            this.returnFilterFields('puerto') +
            this.returnFilterFields('certificado') +
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
*/
    },
    returnFilterFields: function (field) {
      /*  var section = '';
        var fechaDesde = this.state.fechaDesde;
        var fechaHasta = this.state.fechaHasta;
        var currentProductorCuil = this.state.currentProductorCuil;
        var productorSeleccionado = '';
        var currentEspecieDesc = this.state.currentEspecieDesc;
        var especieSeleccionada = '';
        var currentCosehcaDesc = this.state.currentCosechaDesc;
        var cosechaSeleccionada = '';


        this.state.allProductoresEntities.forEach(function (productor) {
            if (productor['cuil'] === currentProductorCuil) {
                productorSeleccionado = productor['_id'];
            }
        });
        this.state.allEspeciesEntities.forEach(function (especie) {
            if (especie['cuil'] === currentEspecieDesc) {
                especieSeleccionada = especie['_id'];
            }
        });
        this.state.allCosechasEntities.forEach(function (cosecha) {
            if (cosecha['cuil'] === currentCosehcaDesc) {
                cosechaSeleccionada = cosecha['_id'];
            }
        });


        if (field === 'fechaDesde' && fechaDesde !== '') {
            section =  ('&fechaDesde=' + fechaDesde)
        }
        if (field === 'fechaHasta' && fechaHasta !== '') {
            section =   ('&fechaHasta=' + fechaHasta)
        }
        if (field === 'productor' && productorSeleccionado !== '') {
            section =   ('&productor=' + productorSeleccionado)
        }
        if (field === 'especie' && productorSeleccionado !== '') {
            section =   ('&especie=' + especieSeleccionada)
        }
        if (field === 'cosecha' && productorSeleccionado !== '') {
            section =   ('&cosecha=' + cosechaSeleccionada)
        }
        return section*/
    },

    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Puerto') {
            value = this.state.currentPuerto;
        }
        if (label === 'Certificado') {
            value = this.state.currentCertificado;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Puerto') {
            this.setState({
                currentPuerto: payload
            }, this.filter());
        }
        if (label === 'Certificado') {
            this.setState({
                currentCertificado: payload
            });
        }

        this.filter()
    },
    renderSelectFieldsValues: function (label) {
        var values;

        if (label === 'Puerto') {
            values = this.state.puertosNombres.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Certificado') {
            values = this.state.certificadosNumero.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },

    handleLimpiarFiltros: function () {
        this.setState({
            puerto: '',
            currentPuerto: '',
            certificado: '',
            currentCertificado: ''
        }, this.filter());


    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Venta de cereal</h1>
                    <p>Para filtrar las ventas que se encuentran en la base de datos, utilice los campos a continuación. </p>
                    <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                        <SelectField
                            labelStyle={styles.selectFieldLabel}
                            iconStyle={styles.selectFieldIcon}
                            style={styles.selectField}
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
                        <SelectField
                            labelStyle={styles.selectFieldLabel}
                            iconStyle={styles.selectFieldIcon}
                            style={styles.selectField}
                            menuStyle={styles.selectFieldMenu}
                            floatingLabelStyle={styles.selectFieldHint}
                            floatingLabelText='Certificado'
                            maxHeight={200}
                            ref='Certificado'
                            value={this.getControlledSelectFieldValue('Certificado')}
                            onChange={this.handleControlledSelectFieldValueChange.bind(this,'Certificado')}
                        >
                            {this.renderSelectFieldsValues('Certificado')}
                        </SelectField>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <Table
                            height={'280px'}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                            onCellClick={this.handleSelection}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="3" tooltip="Limpiar filtro" style={{textAlign: 'left', paddingLeft:'0px'}}>
                                        <RaisedButton
                                            style={{margin:'10px 0px'}}
                                            backgroundColor="#8BC34A"
                                            label="Limpiar"
                                            onTouchTap={this.handleLimpiarFiltros}
                                        />
                                    </TableHeaderColumn>
                                    <TableHeaderColumn colSpan="3" tooltip='Para modificar una Venta solo debe seleccionarla, para agregar una nueva haga click en "Agregar".' style={{textAlign: 'right'}}>
                                        Para modificar una Venta solo debe seleccionarla, para agregar una nueva haga click en "Agregar".
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Agregar"
                                            onTouchTap={this.handleAgregarVenta}
                                        />
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Certificado">Certificado</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Puerto">Puerto</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Localidad">Localidad</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="KG Netos">KG Netos</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Calidad">Calidad</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Precio de Venta">Precio de Venta</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
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
        var puertoNombre = '';
        var puertoLocalidad = '';
        var certificadoNumero = '';
        var certificadoKGNetos = '';
        var certificadoCalidad = '';

        this.state.allPuertosEntities.forEach(function (p) {
            if (p['_id'] === row.puerto) {
                puertoNombre = p.nombre;
                puertoLocalidad = p.localidad;
            }
        });
        this.state.allCertificadosEntities.forEach(function (c) {
            if (c['_id'] === row.certificado) {
                certificadoNumero = c.numero;
                certificadoKGNetos = c['ingreso']['kg_neto'];
                certificadoCalidad = c['ingreso']['calidad'];
            }
        });

        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{certificadoNumero}</TableRowColumn>
                <TableRowColumn>{puertoNombre}</TableRowColumn>
                <TableRowColumn>{puertoLocalidad}</TableRowColumn>
                <TableRowColumn>{certificadoKGNetos}</TableRowColumn>
                <TableRowColumn>{certificadoCalidad}</TableRowColumn>
                <TableRowColumn>{row['precio_venta']}</TableRowColumn>
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

        browserHistory.push('venta/mod/' + selectedItem['_id']);
    },

    handleAgregarVenta: function () {
        browserHistory.push('venta/nuevaVenta');
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
                    puertosNombres: response.data.map(function (puerto) {
                        return puerto['nombre']
                    })
                });

            })
    },
    getAllCertificados: function () {
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
                    allCertificadosEntities: response.data,
                    certificadosNumero: response.data.map(function (certificado) {
                        return certificado['numero']
                    })
                });
            })
    },


});

export default VentaInicio;