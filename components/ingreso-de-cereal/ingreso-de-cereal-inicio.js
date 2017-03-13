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

var IngresioDeCerealInicio = React.createClass ({

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
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/getAll', {
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
            });
        }

        this.filter()
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

    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });

        this.filter();

    },

    render() {
        console.log('states: ', this.state);
        return (
            <div style={{width:'100%'}}>
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
                                 style={{display: 'inline-block',
                                 width: '25%'}}
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
                                    <TableHeaderColumn colSpan="8" tooltip="Super Header" style={{textAlign: 'right'}}>
                                        Para modificar una CP solo debe clickearla
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Agregar CP"
                                            onTouchTap={this.handleAgregarCP}
                                        />
                                    </TableHeaderColumn>
                                </TableRow>
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
                                        Super Footer
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

        browserHistory.push('ingresodecereal/mod/' + selectedItem['_id']);
    },

    handleAgregarCP: function () {
        browserHistory.push('ingresodecereal/altaCP');
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


    handleSelection: function (rowNumber, columnId) {
        var selectedItem = this.state.items[rowNumber];

        browserHistory.push('ingresodecereal/mod/' + selectedItem['_id']);
    }

});

export default IngresioDeCerealInicio;