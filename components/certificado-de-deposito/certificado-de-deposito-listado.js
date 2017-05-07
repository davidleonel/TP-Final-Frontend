import React from 'react';

import {browserHistory} from 'react-router';
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

var CertificadoDeDepositoListado = React.createClass ({
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

            cert: {},
            ingreso: {},
        }

    },

    componentDidMount: function() {
        this.makeCertRequest();
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
                    marginTop: '20px',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Detalles correspondientes al certificado de venta seleccionado</h1>
                    <p>A continuación se listan todos los gastos correspondientes al certificado de venta seleccionado:</p>

                    <div>
                        <TextField
                            style={{height:'60px', width:'285px', color: 'black'}}
                            floatingLabelStyle={{lineHeight:'10px', color: 'black'}}
                            hintStyle={{bottom:'7px'}}
                            underlineStyle={{width:'100%'}}
                            hintText='Nro. de Certificado de depósito'
                            floatingLabelText='Nro. de Certificado de depósito'
                            id='Nro. de Certificado de deposito'
                            ref='Nro. de Certificado de deposito'
                            value= {this.state.cert['numero']}
                            />
                        <br/>
                        <TextField
                            disabled={true}
                            style={{cursor: 'default', height:'60px', width:'285px', color: 'black'}}
                            floatingLabelStyle={{lineHeight:'10px', color: 'black'}}
                            hintStyle={{bottom:'7px'}}
                            underlineStyle={{width:'100%'}}
                            hintText='Nro. de carta de porte'
                            floatingLabelText='Nro. de carta de porte'
                            id='Nro. de carta de porte'
                            ref='Nro. de carta de porte'
                            value= {this.state.ingreso['nro_cp']}
                            />
                        <TextField
                            disabled={true}
                            style={{cursor: 'default', height:'60px', width:'285px', color: 'black', marginLeft:'20px'}}
                            floatingLabelStyle={{lineHeight:'10px', color: 'black'}}
                            hintStyle={{bottom:'7px'}}
                            underlineStyle={{width:'100%'}}
                            hintText='Liquidado'
                            floatingLabelText='Liquidado'
                            id='Liquidado'
                            ref='Liquidado'
                            value= {this.state.cert['Liquidado']}
                            />
                        <br/>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{marginTop: '-27px'}}>
                        <Table
                            height={'477px'}
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
                                    <TableHeaderColumn colSpan="2" tooltip="Al hacer click en el botón 'Ver PDF', se abrirá una nueva pestaña en la cual usted podrá ver, bajar o imprimir el pdf correspondiente al certificado." style={{textAlign: 'left'}}>
                                    <a target="_blank" href={'http://proyecto-final-prim.herokuapp.com/certificadosDeposito/pdf/' + this.state.cert['_id']}>
                                        <RaisedButton
                                            style={{marginLeft:'-20px', marginRight:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Ver PDF"
                                            primary={true}
                                            disabled={false}
                                        />
                                    </a>
                                        Al hacer click en el botón 'Ver PDF', se abrirá una nueva pestaña en la cual usted podrá ver, bajar o imprimir el pdf correspondiente al certificado.
                                    </TableHeaderColumn>
                                    <TableHeaderColumn colSpan="2" tooltip="Volver a la página principal de Certificado de Depósito." style={{textAlign: 'right'}}>
                                        Volver a la página principal de Certificado de Deposito.
                                        <RaisedButton
                                            style={{margin:'10px'}}
                                            backgroundColor="#8BC34A"
                                            label="Volver"
                                            onTouchTap={this.handleVolver}
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
                                {this.renderCertRows()}
                                {this.renderTotalRow()}

                            </TableBody>
                            <TableFooter
                                adjustForCheckbox={false}
                                >
                            </TableFooter>
                        </Table>
                    </div>

                    <Dialog
                        title={"Se está por ingresar un nuevo certificado de depósito a la base de datos"}
                        actions={[
                                                <FlatButton
                                                    label="Cancelar"
                                                    primary={true}
                                                    onTouchTap={this.handleCloseAltaConfirmationModal}
                                                />,
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleAltaConfirmationModal}
                                                />
                                            ]}
                        modal={false}
                        open={this.state.altaConfirmationModal}
                        >
                        {"¿Está seguro que los datos correspondientes al nuevo certificado son correctos?"}
                    </Dialog>
                    <Dialog
                        title={"El certificado correspondiente a la CP Nro: " + this.state['Nro. de carta de porte'] + " fue ingresado a la base de datos con éxito"}
                        actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseAltaCertificadoModal}
                                                />
                                            ]}
                        modal={false}
                        open={this.state.altaCertificadoModal}
                        >
                        {'Será redireccionado a la página de inicio de certificado de depósito.'}
                    </Dialog>


                </Paper>
            </div>
        )
    },

    makeCertRequest: function () {
        fetch(this.getCertRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    cert: response.data,
                    ingreso: response.data.ingreso
                });
            })
    },
    getCertRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getCertificado/' + this.props.params.identifier, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    renderCertRows: function () {
        var items = this.state.cert.gastos;
        if (items) {
            return (items.map(this.renderCertRow))
        }
    },
    renderCertRow: function (row, index) {
        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{row['descripcion']}</TableRowColumn>
                <TableRowColumn>{row['kilos']}</TableRowColumn>
                <TableRowColumn>{row['tarifa']}</TableRowColumn>
                <TableRowColumn>{this.round(row['importe'], 2)}</TableRowColumn>
            </TableRow>
        )
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
                    <span></span>
                </TableRowColumn>
                <TableRowColumn>
                    <span style={{fontWeight: '900'}}>{this.round(this.calculateTotal(), 2)}</span>
                </TableRowColumn>
            </TableRow>
        )
    },
    calculateTotal: function () {
        var total = 0;

        if (this.state.cert.gastos) {
            this.state.cert.gastos.forEach(function (gasto) {
                total= total + gasto.importe;
            });
        }

        return total;
    },

    handleVolver: function () {
        browserHistory.push('certificadoDeDeposito');
    },
});

export default CertificadoDeDepositoListado;