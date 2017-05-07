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

var EgresoDeCerealInicio = React.createClass ({

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
            allProductoresEntities: []

        }

    },
    componentDidUpdate: function (nextProps, nextState) {
        if (this.state.currentChoferCuil != nextState.currentChoferCuil){
            this.filter();
        }

        if (this.state.currentProductorCuil != nextState.currentProductorCuil){
            this.filter();
        }
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
        var request = new Request('http://proyecto-final-prim.herokuapp.com/egresoCereal/getAll', {
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
        if (label === 'Chofer') {
            value = this.state.currentChoferCuil;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            }, this.filter());
        }
        if (label === 'Chofer') {
            this.setState({
                currentChoferCuil: payload
            }, this.filter());
        }


    },
    renderSelectFieldsValues: function (label) {
        var values;

        if (label === 'Productor') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Chofer') {
            values = this.state.choferesCuil.map(function (value, key) {
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
        }, this.filter());

    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Egreso de cereal</h1>
                    <p>Para filtrar los egresos que se encuentran en la base de datos, utilice los campos a continuación. </p>
                    <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                        <div style={{ width:'40%'}} >
                            <DatePicker
                                style={{display: 'inline-block', width: '45%', marginRight:'5%'}}
                                textFieldStyle={{width: '100%'}}
                                autoOk={true}
                                DateTimeFormat={global.Intl.DateTimeFormat}
                                cancelLabel='Cerrar'
                                hintText='Fecha desde'
                                ref='Fecha desde'
                                mode="landscape"
                                onChange={this.updateFilterFields.bind(this, 'Fecha desde')}
                            />
                            <DatePicker
                                style={{display: 'inline-block', width: '45%', float: 'right'}}
                                textFieldStyle={{width: '100%'}}
                                autoOk={true}
                                cancelLabel='Cerrar'
                                hintText='Fecha hasta'
                                ref='Fecha hasta'
                                mode="landscape"
                                onChange={this.updateFilterFields.bind(this, 'Fecha hasta')}
                            />
                        </div>
                        <br/>
                        <div>
                            <SelectField
                                labelStyle={styles.selectFieldLabel}
                                iconStyle={styles.selectFieldIcon}
                                style={{height:'40px', width: '40%', float:'left'}}
                                menuStyle={styles.selectFieldMenu}
                                floatingLabelStyle={styles.selectFieldHint}
                                floatingLabelText='Chofer'
                                maxHeight={200}
                                ref='Chofer'
                                value={this.getControlledSelectFieldValue('Chofer')}
                                onChange={this.handleControlledSelectFieldValueChange.bind(this,'Chofer')}
                            >
                                {this.renderSelectFieldsValues('Chofer')}
                            </SelectField>
                            <SelectField
                                labelStyle={styles.selectFieldLabel}
                                iconStyle={styles.selectFieldIcon}
                                style={{float: 'right', height:'40px', width: '40%', marginRight:'17%'}}
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
                        </div>
                        <br/>
                        <br/>
                        <TextField
                            style={styles.textField}
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
                    <div>
                        <Table
                            height={'395px'}
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
                                    <TableHeaderColumn colSpan="4" tooltip="Utilice este botón para limpiar los filtros y traer todo los egresos nuevamente." style={{textAlign: 'left', paddingLeft:'0px'}}>
                                        <RaisedButton
                                            style={{margin:'10px 0px'}}
                                            backgroundColor="#8BC34A"
                                            label="Limpiar"
                                            onTouchTap={this.handleLimpiarFiltros}
                                        />
                                    </TableHeaderColumn>
                                    <TableHeaderColumn colSpan="4" tooltip="Agregar una nueva carta de porte" style={{textAlign: 'right'}}>
                                        Para modificar una CP sólo debe seleccionarla, para agregar una nueva haga click en "Agregar".
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Agregar"
                                            onTouchTap={this.handleAgregarCP}
                                        />
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow style={{width: '100%'}}>
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
                                <TableRow>
                                    <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>

                                    </TableRowColumn>
                                </TableRow>
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

        browserHistory.push('egresodecereal/mod/' + selectedItem['_id']);
    },

    handleAgregarCP: function () {
        browserHistory.push('egresodecereal/altaCP');
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

export default EgresoDeCerealInicio;