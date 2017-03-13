import React from 'react';
import _ from 'lodash';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from '../../node_modules/material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DeleteIcon from 'react-material-icons/icons/action/delete';
import WarningIcon from 'react-material-icons/icons/alert/warning';

const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0'
    },
    propToggleHeader: {
        margin: '20px auto 10px'
    }
};
const buttonStyle = {
    marginRight: 20
};

var EntityBajaList = React.createClass ({

    propTypes: {
        type: React.PropTypes.string,
        entity: React.PropTypes.string,
        headers: React.PropTypes.array,
        requestParameters: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            entity: 'personas',
            headers: ['DNI', 'Nombre', 'Apellido', 'Email']
        };
    },

    getInitialState: function () {
        return {
            selectedRowsArray: [],
            currentSelectedRows: {},
            deleteConfirmationModal: false,
            items: []
        }
    },

    componentDidMount: function() {
        this.makeRequest();
    },

    contextTypes: {
        itemsABorrar: React.PropTypes.array
    },

    render() {
        console.log('states: ', this.state);
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Paper zDepth={3} style={{width: '850px', padding: '20px'}}>
                    <h1>Baja de {this.props.entity}</h1>
                    <br/>
                    <Table
                        height= '300px'
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
                                <TableHeaderColumn colSpan={this.props.headers.length} style={{textAlign: 'left'}}>
                                    Para dar de baja a un registro debe elegirlo primero, puede elegir mas de un registro a la vez.
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                {this.props.headers.map(this.renderHeaders)}
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
                            <TableRow colSpan={this.props.headers.length} >
                                <TableRowColumn colSpan={this.props.headers.length} style={{textAlign: 'center', 'text-align': 'right', 'padding-bottom': '14px'}}>
                                    <RaisedButton
                                        label="Eliminar"
                                        labelPosition="before"
                                        primary={true}
                                        icon={<DeleteIcon style={{paddingBottom: '6px'}} />}
                                        style={styles.button}
                                        onTouchTap={this.handleEliminar}
                                        />
                                </TableRowColumn>

                                <Dialog
                                    title={"Se estan por dar de baja registros."}
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
                                >   <div style={{marginBottom:'25px', marginTop:'-9px'}}>
                                        {<span>{'Esta seguro que quiere dar de baja ' + this.state.selectedRowsArray.length + ' registros?'}</span>}
                                        {<WarningIcon  style={{height:'90px', width:'90px', marginBottom: '-39px', marginLeft:'35%'}} />}
                                    </div>
                                </Dialog>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn colSpan={this.props.headers.length} style={{textAlign: 'center'}}>
                                    Para dar de baja a un registro debe elegirlo primero, puede elegir mas de un registro a la vez.
                                </TableRowColumn>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </Paper>
            </div>
        )
    },

    renderHeaders: function (header) {
        return (<TableHeaderColumn tooltip={header}>{header}</TableHeaderColumn>)
    },

    renderRows: function () {
        var items = this.state.items;

        if (items) {
            return (items.map(this.renderRow))
        }
    },

    renderRow: function (row, index) {
        var identifier = this.state.itemSelected;

        return(
            <TableRow key={index} selected={this.state.currentSelectedRows[index]}>
                {this.renderColumns(row)}
            </TableRow>
        )
    },

    renderColumns: function (row) {
        return (this.props.headers.map(function (header) {
                return <TableRowColumn>{row[header]}</TableRowColumn>
            })
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

    handleEliminar: function (event) {
        event.preventDefault();
        this.handleOpenDeleteConfirmationModal();
    },

    handleDeleteConfirmation: function () {
        var entidad = this.getEntidad();

        for (var i = 0; i < this.state.selectedRowsArray.length; i++) {
            var item = this.state.items[this.state.selectedRowsArray[i]];

            var bodyRequested = {habilitado: false};
            var bodyJson = JSON.stringify(bodyRequested);

            var request = new Request('https://proyecto-final-prim.herokuapp.com/'+ entidad + '/update/' + item['_id'], {
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
                    console.log(response);
                });
        }

        this.handleCloseDeleteConfirmationModal();
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

    handleOpenDeleteConfirmationModal: function (event) {
        this.setState({deleteConfirmationModal: true});
    },

    handleCloseDeleteConfirmationModal: function () {
        this.setState({deleteConfirmationModal: false});
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
        var request = new Request('https://proyecto-final-prim.herokuapp.com/' + this.props.requestParameters.url, {
            method: this.props.requestParameters.method,
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    handleSelection: function (rowNumber, columnId) {
       /* var selectedItem = this.state.items[rowNumber];

        browserHistory.push('/ABM/mod/' + this.props.entity + '/' + selectedItem['_id']);*/
    },


    //El metodo mas pedorro
    getEntidad: function () {
        var entidad;

        if (this.props.entity === 'persona') {
            entidad = 'personas'
        }
        if (this.props.entity === 'empleado') {
            entidad = 'empleados'
        }
        if (this.props.entity === 'usuario') {
            entidad = 'users'
        }
        if (this.props.entity === 'chofer') {
            entidad = 'choferes'
        }
        if (this.props.entity === 'transportista') {
            entidad = 'transportistas'
        }
        if (this.props.entity === 'productor') {
            entidad = 'productores'
        }
        if (this.props.entity === 'cereal') {
            entidad = 'cereales'
        }
        if (this.props.entity === 'especie') {
            entidad = 'especies'
        }
        if (this.props.entity === 'tarifa') {
            entidad = 'tarifas'
        }
        if (this.props.entity === 'mermasHumedad') {
            entidad = 'mermasHumedad'
        }
        if (this.props.entity === 'rubro') {
            entidad = 'rubros'
        }
        if (this.props.entity === 'camion') {
            entidad = 'camiones'
        }
        if (this.props.entity === 'destino') {
            entidad = 'destinos'
        }
        if (this.props.entity === 'campo') {
            entidad = 'campos'
        }
        if (this.props.entity === 'cosecha') {
            entidad = 'cosechas'
        }
        if (this.props.entity === 'empresa') {
            entidad = 'empresas'
        }

        return entidad;
    }

});

export default EntityBajaList;