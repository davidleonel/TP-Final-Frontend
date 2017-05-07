import React from 'react';
import _ from 'lodash';

import {browserHistory} from 'react-router';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DeleteIcon from 'react-material-icons/icons/action/delete';
import WarningIcon from 'react-material-icons/icons/alert/warning';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';


const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0'
    },
    propToggleHeader: {
        margin: '20px auto 10px'
    },
    textField: {
        display: 'block'
    },
    selectField: {
        float: 'right',
        height:'40px',
        width: '65%'
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
        width: '50%'
    }
};
const buttonStyle = {
    marginRight: 20
};

var CertificadoBajaList = React.createClass ({

    propTypes: {
        type: React.PropTypes.string,
        entity: React.PropTypes.string,
        headers: React.PropTypes.array,
        requestParameters: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            entity: 'Certificado de Deposito',
            headers: ['Numero', 'Carta de porte']
        };
    },

    getInitialState: function () {
        return {
            selectedRowsArray: [],
            currentSelectedRows: {},
            deleteConfirmationModal: false,
            deleteConfirmationModal2: false,
            certs: [],
            productoresCuil: [],
            choferesCuil: [],
        }
    },

    componentDidMount: function() {
        this.getAllProductores();
        this.getAllChoferes();

        this.makeCPRequest();
    },

    contextTypes: {
        itemsABorrar: React.PropTypes.array
    },

    render() {
        return (
            <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Baja de certificados de depósito</h1>
                    <p>Listado de los certificados de depósito segun todas las cartas de porta ya certificadas.</p>
                    <p>Use los campos a continuacion para filtrar la tabla de cartas de porte.</p>
                    <p>Para dar de baja a un registro debe elegirlo primero, puede elegir mas de un registro a la vez.</p>
                    <div style={{display: 'inline-block', padding: '0', width:'100%'}}>
                        <div style={{ width:'45%'}} >
                            <DatePicker
                                floatingLabelText= 'Fecha desde'
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
                                floatingLabelText= 'Fecha hasta'
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
                                style={{height:'40px', width: '45%', float:'left', marginRight:'50px'}}
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
                                style={{height:'40px', width: '40%', marginRight:'10%'}}
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
                            height={'350px'}
                            fixedHeader= {true}
                            fixedFooter= {true}
                            selectable={true}
                            multiSelectable= {true}
                            onRowSelection={this.handleRowSelection}
                        >
                            <TableHeader
                                displaySelectAll= {true}
                                adjustForCheckbox={true}
                                enableSelectAll= {true}
                            >
                                <TableRow colSpan={7}>
                                    <TableRowColumn colSpan={7} style={{textAlign: 'center', 'text-align': 'right', 'padding-bottom': '14px'}}>
                                        <RaisedButton
                                            label="Eliminar"
                                            labelPosition="before"
                                            primary={true}
                                            icon={<DeleteIcon style={{paddingBottom: '6px'}} />}
                                            backgroundColor="#D21313"
                                            buttonStyle={{backgroundColor:"#D21313"}}
                                            style={styles.button}
                                            onTouchTap={this.handleEliminar}
                                        />
                                    </TableRowColumn>
                                    <Dialog
                                        title={"Se estan por dar de baja certificados de depósito."}
                                        actions={[
                                            <FlatButton
                                                label="Cancelar"
                                                primary={true}
                                                onTouchTap={this.handleCloseDeleteConfirmationModal}
                                            />,
                                            <FlatButton
                                                label="Aceptar"
                                                primary={true}
                                                disabled={false}
                                                onTouchTap={this.handleDeleteConfirmation}
                                            />
                                        ]}
                                        modal={false}
                                        open={this.state.deleteConfirmationModal}
                                    >

                                    <div style={{marginBottom:'25px', marginTop:'-9px'}}>
                                        {<span>{'Esta seguro que quiere dar de baja ' + this.state.selectedRowsArray.length + ' registros?'}</span>}
                                        {<WarningIcon  style={{height:'90px', width:'90px', marginBottom: '-39px', marginLeft:'35%'}} />}
                                    </div>
                                    </Dialog>
                                    <Dialog
                                        title={"Los registros fueron dados de baja con éxito"}
                                        actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseBajaCertModal}
                                                />
                                            ]}
                                        modal={false}
                                        open={this.state.deleteConfirmationModal2}
                                        >
                                        {'Será redireccionado a la página inicial de certificados de depósito.'}
                                    </Dialog>
                                </TableRow>
                                <TableRow>
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
                                {this.renderCertRows()}
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








    handleChange: function (event) {
        this.setState({height: event.target.value});
    },

    handleEliminar: function (event) {
        event.preventDefault();
        this.handleOpenDeleteConfirmationModal();
    },

    handleDeleteConfirmation: function () {
        for (var i = 0; i < this.state.selectedRowsArray.length; i++) {
            var item = this.state.certs[this.state.selectedRowsArray[i]];

            var bodyRequested = {habilitado: false};
            var bodyJson = JSON.stringify(bodyRequested);

            var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/update/' + item['_id'], {
                method: 'PUT',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                body: bodyJson
            });

            fetch(request)
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                });
        }

        this.handleCloseDeleteConfirmationModal();
        this.handleOpenBajaCertModal();
    },

    handleRowSelection: function (selectedRows) {
        var itemsLength = this.state.certs.length;
        var selectedRowsLength = selectedRows.length;
        var object = {};

        for (var i = 0; i < itemsLength; i++) {
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
    },

    handleOpenDeleteConfirmationModal: function (event) {
        this.setState({deleteConfirmationModal: true});
    },

    handleCloseDeleteConfirmationModal: function () {
        this.setState({deleteConfirmationModal: false});
    },

    handleOpenBajaCertModal: function () {
        this.setState({deleteConfirmationModal2: true});
    },
    handleCloseBajaCertModal: function () {
        this.setState({deleteConfirmationModal2: false});
        browserHistory.push('certificadodedeposito');
    },


    //***********************LOS METODOS CORRESPONDIENTES A LA ULTIMA PESTAÑA DE CARTAS DE PORTE

    makeCPRequest: function () {
        fetch(this.getCPRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    certs: response.data
                });
            })
    },
    getCPRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    renderCertRows: function () {
        var items = this.state.certs;
        if (items) {
            return (items.map(this.renderCertRow))
        }
    },

    renderCertRow: function (row, index) {
        return(
            <TableRow key={index} selected={this.state.currentSelectedRows[index]} >
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
                    certs: response.data
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
        if (label === 'Chofer') {
            value = this.state.currentChoferCuil;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'Chofer') {
            this.setState({
                currentChoferCuil: payload
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
        if (label === 'Chofer') {
            values = this.state.choferesCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },


});

export default CertificadoBajaList;
