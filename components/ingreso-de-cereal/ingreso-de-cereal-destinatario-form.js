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

var IngresoDeCerealDestinatarioForm = React.createClass ({

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
                            floatingLabelText='Destinatario'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                    </div>
                    <br />
                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <SelectField
                            style={styles.selectField}
                            floatingLabelText='Destino'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                        >
                            {items}
                        </SelectField>
                    </div>
                    <br/>
                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <TextField
                            hintText="Observaciones"
                            floatingLabelText="Observaciones"
                            multiLine={true}
                            rows={10}
                            fullWidth={true}
                            />
                    </div>
                </Paper>
            </div>
        )
    }

});

export default IngresoDeCerealDestinatarioForm;
