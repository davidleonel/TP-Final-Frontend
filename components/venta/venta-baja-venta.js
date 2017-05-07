import React from 'react';
import {Link, browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import WarningIcon from 'react-material-icons/icons/alert/warning';
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

var VentaBajaVenta = React.createClass ({
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

            selectedRowsArray: [],
            currentSelectedRows: {},
            deleteConfirmationModal: false,
            deleteConfirmationModal2: false,

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

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Venta de cereal</h1>
                    <p>Listado de las Ventas de cereal segun todas los certificados ya liquidados.</p>
                    <p>Para dar de baja a un registro debe elegirlo primero, puede elegir mas de un registro a la vez.</p>
                    <p>El sistema pedira conficrmacion al momento previo a la baja.</p>
                    <br/>
                    <br/>
                    <div>
                        <Table
                            height={'540px'}
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
                                <TableRow>
                                    <TableRowColumn colSpan={6} style={{textAlign: 'center', 'text-align': 'right', 'padding-bottom': '14px'}}>
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
                                        title={"Se estan por dar de baja liquidacions de ventas."}
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
                                        title={"Los registros fueron dados de baja con exito"}
                                        actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseBajaLiquidacionModal}
                                                />
                                            ]}
                                        modal={false}
                                        open={this.state.deleteConfirmationModal2}
                                    >
                                        {'Sera redireccionado a la pagina principal correpondiente a ventas.'}
                                    </Dialog>
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
    handleRowSelection: function (selectedRows) {
        var itemsLength = this.state.items.length;
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

    handleEliminar: function (event) {
        event.preventDefault();
        this.handleOpenDeleteConfirmationModal();
    },
    handleDeleteConfirmation: function () {
        for (var i = 0; i < this.state.selectedRowsArray.length; i++) {
            var item = this.state.items[this.state.selectedRowsArray[i]];

            var bodyRequested = {habilitado: false};
            var bodyJson = JSON.stringify(bodyRequested);

            var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/update/' + item['_id'], {
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
        this.handleOpenBajaLiquidacionModal();
    },


    handleOpenDeleteConfirmationModal: function (event) {
        this.setState({deleteConfirmationModal: true});
    },

    handleCloseDeleteConfirmationModal: function () {
        this.setState({deleteConfirmationModal: false});
    },

    handleOpenBajaLiquidacionModal: function () {
        this.setState({deleteConfirmationModal2: true});
    },
    handleCloseBajaLiquidacionModal: function () {
        this.setState({deleteConfirmationModal2: false});
        browserHistory.push('venta');
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

});

export default VentaBajaVenta;