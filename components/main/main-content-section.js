import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import TabPanel from '../others/tab-panel';

var MainContentSection = React.createClass ({


    render() {
        return (
            <div style={{margin: '50px 50px 50px 500px'}}>
                <Paper zDepth={3} style={{width: '700px', padding: '20px'}}>
                    <h1>Alta de administrador</h1>
                    <TextField
                    hintText="Ingrese nombre por favor."
                    floatingLabelText="Nombre" fullWidth
                    />
                    <br />
                    <TextField
                        hintText="Ingrese apellido por favor."
                        floatingLabelText="Apellido" fullWidth
                    />
                    <br />
                    <TextField
                        hintText="Ingrese DNI por favor."
                        floatingLabelText="DNI" fullWidth
                    />
                    <br />
                    <TextField
                        hintText="Ingrese email por favor."
                        floatingLabelText="Email" fullWidth
                    />
                    <br />
                    <TextField
                    hintText="Ingrese contraseña por favor."
                    floatingLabelText="Contraseña" fullWidth
                    type="password"
                    />
                    <br />
                    <TextField
                        hintText="Ingrese contraseña nuevamente por favor."
                        floatingLabelText="Contraseña confirmacion"
                        type="password" fullWidth
                    />

                    <RaisedButton label="Aceptar" primary={true} style={{margin: 12}} onTouchTap={this.handleSubmit} />
                </Paper>

                <TabPanel></TabPanel>
            </div>
        )
    },

    handleSubmit: function () {
        fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699')
            .then((response) => {
                return response.json()
            })
            .then((recurso) => {
                console.log(recurso)
            })
    }
});

export default MainContentSection;