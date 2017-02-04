import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    height: 320,
    width: 300,
    padding: '20px',
    textAlign: 'center',
    display: 'inline-block'
};

var LoginForm = React.createClass ({

    render() {
        return (
            <Paper style={style} zDepth={5}>
                <p style={{textAlign:'left'}}>Por favor ingrese sus datos</p>
                <TextField
                    hintText="Usuario"
                    floatingLabelText="Usuario" fullWidth
                    />
                <br />
                <TextField
                    hintText="Contraseña"
                    floatingLabelText="Contraseña"
                    type="password" fullWidth
                    />
                <br />
                <RaisedButton label="Login" primary={true} style={{marginTop: '45px'}} onTouchTap={this.handleSubmit} />
            </Paper>
        )
    }

});

export default LoginForm;