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

var IngresoDeCerealTransporteForm = React.createClass ({

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
                            floatingLabelText='Chofer'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>

                        <br />
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Transportista'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                        <TextField
                            style={{marginRight:'10px', verticalAlign: 'top', width:'20%'}}
                            hintText= 'Patente'
                            floatingLabelText= 'Patente'
                            />
                        <Toggle
                            style={{marginBottom: '16',marginTop: '26px'}}
                            labelStyle={{width:'auto', marginRight:'142px'}}
                            label= 'Flete Pago'
                            defaultToggled={false}
                            onToggle={{}}
                        />
                    </div>
                    <br />
                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <SelectField //tarifa desc
                            style={styles.selectFieldMain}
                            floatingLabelText='Tipo de tarifa'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>

                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Kms'
                            floatingLabelText= 'Kms. recorridos'
                            />
                        <br />
                        <TextField //monto calculado seguo los kilometros y la tarifa
                            style={styles.textFieldMain}
                            hintText= 'tarifa'
                            floatingLabelText= 'Tarifa'
                            />
                    </div>
                    <br />
                </Paper>
            </div>
        )
    }

});

export default IngresoDeCerealTransporteForm;
