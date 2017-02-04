import React from 'react';

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

const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}

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
        width: '30%'
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

var AnalisisNuevoAnalisis = React.createClass ({

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
            height: '300px'
        }
    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <div style={{display: 'inline-block', padding: '0 0 10px 10px', width:'100%'}}>
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Tipo de Remitente'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                        >
                            {items}
                        </SelectField>
                        <br/>
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Remitente'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                        >
                            {items}
                        </SelectField>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Remitente descripcion'
                            floatingLabelText= 'Remitente descripcion'
                        />
                        <br />
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Especie'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                        >
                            {items}
                        </SelectField>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Especie descripcion'
                            floatingLabelText= 'Especie descripcion'
                        />
                        <br />
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Cosecha'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                        >
                            {items}
                        </SelectField>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Cosecha descripcion'
                            floatingLabelText= 'Cosecha descripcion'
                        />
                    </div>
                    <div style={{display: 'inline-block', padding: '0 0 10px 10px', width:'60%'}}>
                        <TextField
                            style={{display: 'inline-block', verticalAlign: 'top', width: '30%', marginRight:'20px'}}
                            hintText= 'Muestra'
                            floatingLabelText= 'Muestra'
                        />
                        <TextField
                            style={{display: 'inline-block', verticalAlign: 'top', width: '30%'}}
                            hintText= 'Nro. Analisis'
                            floatingLabelText= 'Nro. Analisis'
                        />
                        <TextField
                            style={{display: 'inline-block', verticalAlign: 'top', width: '30%'}}
                            hintText= 'Nro. Analisis'
                            floatingLabelText= 'Nro. Boletin'
                        />
                        <br/>
                        <DatePicker style={{display: 'inline-block', width: '50%'}} hintText='Fecha analisis' mode="landscape" />
                        <br/>
                        <TextField
                            style={{display: 'inline-block', verticalAlign: 'top', width: '30%'}}
                            hintText= 'Costo'
                            floatingLabelText= 'Costo'
                        />
                        </div>

                        <div style={{paddingLeft:'15px', width:'30%', border: 'solid black 1px', float:'right'}}>
                            <TextField
                                style={{display: 'inline-block', verticalAlign: 'top', width: '90%'}}
                                hintText= 'Factor'
                                floatingLabelText= 'Factor'
                            />
                            <br/>
                            <TextField
                                style={{display: 'inline-block', verticalAlign: 'top', width: '90%'}}
                                hintText= 'Grado'
                                floatingLabelText= 'Grado'
                            />
                        </div>
                    <br/>

                    <div>
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                                        Super Header
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn tooltip="Codigo">Codigo</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Rubro de Analisis">Remitente</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="% Rubro">Factor</TableHeaderColumn>
                                    <TableHeaderColumn tooltip="Bonificacion / Rebaja">Grados</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                            >
                                {tableData.map( (row, index) => (
                                    <TableRow key={index} selected={row.selected}>
                                        <TableRowColumn>{index}</TableRowColumn>
                                        <TableRowColumn>{row.name}</TableRowColumn>
                                        <TableRowColumn>{row.status}</TableRowColumn>
                                    </TableRow>
                                ))}
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

    handleToggle: function (event, toggled) {
        this.setState({
            [event.target.name]: toggled
        });
    },

    handleChange: function (event) {
        this.setState({height: event.target.value});
    }

});

export default AnalisisNuevoAnalisis;