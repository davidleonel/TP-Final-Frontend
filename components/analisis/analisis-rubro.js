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


var AnalisisRubro = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            name: 'Mary'
        };
    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <div style={{display: 'inline-block', padding: '0 0 10px 10px', height:'290px',  width:'45%'}}>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Especie'
                            floatingLabelText= 'Especie'
                        />
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Especie descripcion'
                            floatingLabelText= 'Especie descripcion'
                        />
                        <br/>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Cod. Rubro'
                            floatingLabelText= 'Cod. Rubro'
                        />
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Cod. Rubro descripcion'
                            floatingLabelText= 'Cod. Rubro descripcion'
                        />
                        <br/>
                        <TextField
                            style={styles.textFieldMain}
                            hintText= 'Porcentaje'
                            floatingLabelText= 'Porcentaje'
                        />
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

export default AnalisisRubro;