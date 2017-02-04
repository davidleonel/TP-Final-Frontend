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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}
const styles = {
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

var IngresoDeCerealGranosForm = React.createClass ({

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
            open: false
        }
    },

    render() {
        return(
            <div>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Especie'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                        <TextField //dropdown muestra desc select id
                            style={{width: '15%'}}
                            hintText= 'Cosecha'
                            floatingLabelText= 'Cosecha'
                            />
                        <br />
                        <SelectField //como el iva un drop inventado
                            style={styles.selectField}
                            floatingLabelText='Calidad'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                    </div>
                    <br />
                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <SelectField //hace referenia al remitente
                            style={styles.selectFieldMain}
                            floatingLabelText='Procedencia'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                    </div>
                    <br />
                    <div style={{padding: '0 0 10px 10px', display: 'inline-block', border: 'solid black 1px', width:'60%' }}>
                        <TextField
                            style={styles.textField}
                            hintText= 'Bruto'
                            floatingLabelText= 'Bruto'
                            />
                        <TextField
                            style={styles.textField}
                            hintText= 'Tara'
                            floatingLabelText= 'Tara'
                        />
                        <TextField  //bruto menos tara
                            style={styles.textField}
                            hintText= 'Neto'
                            floatingLabelText= 'Neto'
                        />
                        <br/>
                        <TextField //viene de merma humedad dropdown
                            style={styles.textField}
                            hintText= '% Humedad'
                            floatingLabelText= '% Humedad'
                        />

                        <div style={{marginTop:'10px', padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                            <p style={{marginBottom: '0'}}>MERMA</p>
                            <div style={{margin: '0 0 0 10px'}}>
                                <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>%</p>
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= '% Humedad'
                                    floatingLabelText= '% Humedad'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= '% Zarandeo'
                                    floatingLabelText= '% Zarandeo'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= '% Volátil'
                                    floatingLabelText= '% Volátil'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= '% Calidad'
                                    floatingLabelText= '% Calidad'
                                />
                                <br/>
                                <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>Kgs.</p>
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= 'Kgs. Humedad'
                                    floatingLabelText= 'Kgs. Humedad'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= 'Kgs. Zarandeo'
                                    floatingLabelText= 'Kgs. Zarandeo'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= 'Kgs. Volátil'
                                    floatingLabelText= 'Kgs. Volátil'
                                />
                                <TextField
                                    style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                    hintText= 'Kgs. Calidad'
                                    floatingLabelText= 'Kgs. Calidad'
                                />

                                <TextField
                                    style={{display: 'inline-block', marginLeft:'10px', verticalAlign: 'top', width:'15%'}}
                                    hintText= 'Total'
                                    floatingLabelText= 'Total'
                                />
                            </div>
                       </div>
                        <br/>
                        <TextField
                            style={{display: 'inline-block', marginLeft:'15px', verticalAlign: 'top', width:'40%'}}
                            hintText= 'Neto Final'
                            floatingLabelText= 'Neto Final'
                        />
                    </div>
                    <br/>
                </Paper>
            </div>
        )
    }

});

export default IngresoDeCerealGranosForm;
