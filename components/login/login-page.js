import React from 'react';

import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    mainWrapper: {
        height: '100%',
        width: '100%',
        display:'flex,',
        alignItems:'center'

    },
    mainForm: {
        height: '590px',
        width: '1500px',
        padding: '20px',
        marginTop:'125px',
        marginLeft:'180px'
    },
    formTextField: {
        width: '300px'
    }
};
var LoginPage = React.createClass ({

    contextTypes: {
        logeado: React.PropTypes.bool,
    },

    render() {
        return (
            <div style={style.mainWrapper}>
                <Paper style={style.mainForm} zDepth={5}>

                    <div style={{display:'inline-block', width:'50%', position: 'relative', top: '-35px', left:'15px'}}>
                        <h2 style={{fontSize: '50px'}}>Bienvenido a Prim</h2>
                        <div style={{width:'509px', padding: '35px', border: '1px rgba(113, 190, 99, 0.41) solid'}}>
                            <h4 style={{textAlign:'left'}}>Por favor ingrese sus datos</h4>
                            <TextField
                               style={style.formTextField}
                               underlineStyle={{width:'500px'}}
                               hintText="Usuario"
                               floatingLabelText="Usuario"
                               ref="Usuario"
                            />
                            <br />
                            <TextField
                               style={style.formTextField}
                               underlineStyle={{width:'500px'}}
                               hintText="Contraseña"
                               floatingLabelText="Contraseña"
                               type="password"
                               ref="Contraseña"
                            />
                            <br />
                            <RaisedButton label="Login" primary={true} style={{marginTop: '45px'}} onTouchTap={this.handleSubmit} />
                        </div>
                    </div>

                    <div style={{display:'inline-block', width:'50%', position: 'relative', top:'30px', left:'95px'}}>
                        <img src="/assets/logos/logo1.png" alt="logo" style={{height:'390px'}}/>
                        <img src="/assets/logos/prim.png" alt="logo"/>
                        <img src="/assets/logos/innovativeSolutions.png" alt="logo"/>
                    </div>

                    <h3 style={{clear: 'both', position: 'relative', left: '19px'}}> Si no recuerda su usuario/contraseña o no posee un usuario por favor contacte a un administrador de su empresa. </h3>

                </Paper>
            </div>
        )
    },

    handleSubmit: function () {
        var usuario = this.refs['Usuario'].input.value;
        var contraseña = this.refs['Contraseña'].input.value;
        var bodyRequested = {
            "usuario": usuario,
            "contraseña": contraseña
        };
        var bodyJson = JSON.stringify(bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/login/', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bodyJson
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                if (response.error) {
                    console.log(response.message);
                } else {
                    this.context.logeado = true;
                    browserHistory.push('welcome');
                }
            });
    }

});

export default LoginPage;