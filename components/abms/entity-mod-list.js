import React from 'react';
import {Link, browserHistory} from 'react-router';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from '../../node_modules/material-ui/svg-icons/content/add';


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

var EntityModList = React.createClass ({

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
            items: [],
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: true,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px'
        }
    },

    componentDidMount: function() {
        this.makeRequest();
    },

    render() {
        console.info('estados: ', this.state);
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Paper zDepth={3} style={{width: '850px', padding: '20px'}}>
                    <h1>Modificacion de {this.props.entity}</h1>
                    <br/>
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
                                <TableHeaderColumn colSpan={this.props.headers.length} style={{textAlign: 'left'}}>
                                    Para modificar un registro solo debe hacerle click.
                                </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                {this.props.headers.map(this.renderHeaders)}
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
                                <TableRowColumn colSpan={this.props.headers.length} style={{textAlign: 'center'}}>
                                    Para modificar un registro solo debe hacerle click.
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
        console.log('entro al renderRows');
        console.log('items', items);
        if (items) {
            return (items.map(this.renderRow))
        }
    },

    renderRow: function (row, index) {
        var identifier = this.state.itemSelected;

        return(
            <TableRow key={index} selected={row.selected} >
                {this.renderColumns(row)}
            </TableRow>
        )
    },

    renderColumns: function (row) {
        return (this.props.headers.map(function (header, index) {

                if(header === 'especie'){
                    var especie = row[header];

                    if (especie === null){
                        return <TableRowColumn>{'Sin Especie'}</TableRowColumn>
                    } else {

                        return <TableRowColumn>{especie['descripcion']}</TableRowColumn>
                    }

                } else {
                    return <TableRowColumn>{row[header]}</TableRowColumn>
                }

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
        var selectedItem = this.state.items[rowNumber];

        browserHistory.push('/ABM/mod/' + this.props.entity + '/' + selectedItem['_id']);
    }

});

export default EntityModList;