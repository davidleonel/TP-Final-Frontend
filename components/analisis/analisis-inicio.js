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

const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

var AnalisisInicio = React.createClass ({
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
            especiesDesc: [],
            cosechasDesc: [],
            allProductoresEntities: [],
            allEspeciesEntities: [],
            allCosechasEntities: []

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
        this.getAllProductores();
        this.getAllEspecies();
        this.getAllCosechas();

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
        var request = new Request('http://proyecto-final-prim.herokuapp.com/analisis/getAll', {
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
            'http://proyecto-final-prim.herokuapp.com/analisis/filtrar?' +
            this.returnFilterFields('fechaDesde') +
            this.returnFilterFields('fechaHasta') +
            this.returnFilterFields('productor') +
            this.returnFilterFields('especie') +
            this.returnFilterFields('cosecha') ,
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
        return section
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
            }, this.filter());
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

        this.filter()
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

    handleLimpiarFiltros: function () {
        console.log('entro al limpiarfiltros');
        this.setState({
            fechaDesde : null,
            fechaHasta: null,
            productor: '',
            currentProductorCuil: '',
            especie: '',
            currentEspecieDesc: '',
            cosecha: '',
            currentCosechaDesc: '',
        }, this.filter());


    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
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
                        <SelectField
                            labelStyle={styles.selectFieldLabel}
                            iconStyle={styles.selectFieldIcon}
                            style={styles.selectField}
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
                        <br/>
                        <div style={{marginTop: '45px'}}>
                            <SelectField
                                labelStyle={styles.selectFieldLabel}
                                iconStyle={styles.selectFieldIcon}
                                style={styles.selectField}
                                menuStyle={styles.selectFieldMenu}
                                floatingLabelStyle={styles.selectFieldHint}
                                floatingLabelText='Especie'
                                maxHeight={200}
                                ref='Especie'
                                value={this.getControlledSelectFieldValue('Especie')}
                                onChange={this.handleControlledSelectFieldValueChange.bind(this,'Especie')}
                            >
                                {this.renderSelectFieldsValues('Especie')}
                            </SelectField>
                            <SelectField
                                labelStyle={styles.selectFieldLabel}
                                iconStyle={styles.selectFieldIcon}
                                style={{ float: 'right', marginRight:'15%', height:'40px', width: '40%'}}
                                menuStyle={styles.selectFieldMenu}
                                floatingLabelStyle={styles.selectFieldHint}
                                floatingLabelText='Cosecha'
                                maxHeight={200}
                                ref='Cosecha'
                                value={this.getControlledSelectFieldValue('Cosecha')}
                                onChange={this.handleControlledSelectFieldValueChange.bind(this,'Cosecha')}
                            >
                                {this.renderSelectFieldsValues('Cosecha')}
                            </SelectField>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <Table
                            height={'450px'}
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
                                    <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'left', paddingLeft:'0px'}}>
                                        <RaisedButton
                                            style={{margin:'10px 0px'}}
                                            backgroundColor="#8BC34A"
                                            label="Limpiar"
                                            onTouchTap={this.handleLimpiarFiltros}
                                        />
                                    </TableHeaderColumn>
                                    <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'right'}}>
                                        Para modificar un Analisis solo debe seleccionarlo, para agregar uno nuevo haga click en "Agregar".
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Agregar"
                                            onTouchTap={this.handleAgregarAnalisis}
                                            />
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Fecha">Fecha</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Nro.">Nro.</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Costo">Costo</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Remitente">Remitente</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Especie">Especie</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Cosecha">Cosecha</TableHeaderColumn>
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
                <TableRowColumn>{row['fecha_analisis']}</TableRowColumn>
                <TableRowColumn>{row['nro_analisis']}</TableRowColumn>
                <TableRowColumn>{row['costo_analisis']}</TableRowColumn>
                <TableRowColumn>{row.productor['cuil']}</TableRowColumn>
                <TableRowColumn>{row.especie['descripcion']}</TableRowColumn>
                <TableRowColumn>{row.cosecha['descripcion']}</TableRowColumn>
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

        browserHistory.push('analisis/mod/' + selectedItem['_id']);
    },

    handleAgregarAnalisis: function () {
        browserHistory.push('analisis/nuevoAnalisis');
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


});

export default AnalisisInicio;