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

var IngresoDeCerealRemitenteForm = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            identifier: ''
        }
        ;
    },

    getInitialState: function () {
        return {
            open: false,
            currentLocalidadDesc: '',
            currentIva: '',
            currentRemitenteComercial: '',
            currentIntermediario: ''
        }
    },

    componentDidMount: function() {
        //FETCHES THE CORRESPONDIN VALUES FOR THE DROPDOWNS FIELDS

        this.getAllLocalidades();
        this.getAllEmpresas();
        //this.getAllTipos();
        //this.getAllRemitentesTipos();
        //this.getAllContratos();
        //this.getAllIvas();
        //this.getAllRemitentesComerciales();
        //this.getAllIntermediarios();


},
    getAllLocalidades: function () {
        /*var request = new Request('http://proyecto-final-prim.herokuapp.com/localidades/getAll', {
         method: 'GET',
         headers: new Headers({
         'Content-Type': 'text/plain'
         })
         });

         fetch(request)
         .then((response) => {
         return response.json()
         })
         .then((response) => {
         this.setState({
         localidadesDesc: response.data.map(function (localidad) {
         return localidad['descripcion']
         })
         });
         })*/
        this.setState({
            localidadesDesc: ['Rosario', 'Funes', 'San Nicolas']
        })

    },
    getAllEmpresas: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/productores/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    allProductoresEntities: response.data,
                    productoresCuil: response.data.map(function (productor) {
                        return productor['cuil']
                    })
                });
            })
    },
    getAllEspecies: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/especies/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    allEspeciesEntities: response.data,
                    especiesDesc: response.data.map(function (especie) {
                        return especie['descripcion']
                    })
                });
            })
    },

    render() {
        return(
            <div>
                <Paper zDepth={3} style={{padding: '20px'}}>

                    <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                        <TextField
                            style={styles.textField}
                            hintText= 'CP nro.'
                            floatingLabelText= 'CP nro.'
                        />
                    </div>
                    <br />
                    <div style={{padding: '0 0 10px 10px', display: 'inline-block', border: 'solid black 1px',float:'right', width:'40%' }}>
                        <TextField
                            style={styles.textField}
                            hintText= 'C.T.G nro'
                            floatingLabelText= 'C.T.G'
                            />
                        <Checkbox
                            label="Flete corto"
                            style={styles.checkbox}
                            />

                    </div>
                    <br/>
                    <div style={{width:'100%'}}>
                        <DatePicker style={styles.datePicker} hintText='Fecha emisión' mode="landscape" />

                        <DatePicker style={styles.datePicker} hintText='Fecha de arribo' mode="landscape" />
                        <br />
                        <SelectField
                            style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                            floatingLabelText='Productor'
                            //value={this.state.value}
                            //onChange={this.handleChange}
                            maxHeight={200}
                            >
                            {items}
                        </SelectField>
                        <br />
                        <TextField
                            style={{verticalAlign: 'top', width:'25%'}}
                            hintText= 'CEE'
                            floatingLabelText= 'CEE'
                            />
                        <DatePicker style={styles.datePicker} hintText='Fecha vencimiento' mode="landscape" />
                        <br />
                        <TextField
                            style={{marginRight:'30px', verticalAlign: 'top', width:'30%'}}
                            hintText= 'remitent'
                            floatingLabelText= 'Remitente comercial'
                            />
                        <br />
                        <TextField
                            style={{marginRight:'30px', verticalAlign: 'top', width:'30%'}}
                            hintText= 'Intermediario'
                            floatingLabelText= 'Intermediario'
                            />
                    </div>
                </Paper>
            </div>
        )
    },


    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Propietario C.Porte (Propia/Tercero)') { //PROPIETARIO LO TOMAMOS COMO LA EMPRESA???
            value = this.state.currentEmpresa;
        }



        if (label === 'localidad') {
            value = this.state.currentLocalidadDesc;
        }
        if (label === 'transportista') {
            value = this.state.currentRazonSocialTransportista;
        }
        if (label === 'productor') {
            value =this.state.currentProductorCuil;
        }
        if (label === 'descripcion') {
            value = this.state.currentEspecieDesc;
        }
        if (label === 'estado') {
            value = this.state.currentEstadoCamiones;
        }
        if (label === 'iva') {
            value = this.state.currentIva;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Propietario C.Porte (Propia/Tercero)') {
            this.setState({
                currentEmpresa: payload
            });
        }


        if (label === 'localidad') {
            this.setState({
                currentLocalidadDesc: payload
            });
        }
        if (label === 'transportista') {
            this.setState({
                currentRazonSocialTransportista: payload
            });
        }
        if (label === 'productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'descripcion') {
            this.setState({
                currentEspecieDesc: payload
            });
        }
        if (label === 'estado') {
            this.setState({
                currentEstadoCamiones: payload
            });
        }
        if (label === 'iva') {
            this.setState({
                currentIva: payload
            });
        }

    },
















    makeModRequest: function () {
        fetch(this.getRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                var values = Object.values(response.data);
                var keys = Object.keys(response.data);

                this.setState({
                    item: response.data,
                    fieldsInitialValues: values
                }, function () {

                });

                //TO LOAD THE CURRENT VALUE FOR THE DROPDOWN FIELDS

                this.setState({
                    //currentEmpresaRazonSocial: response.data.localidad,
                    //currentTipo: response.data.localidad,
                    //currentRemitenteTipo: response.data.localidad,
                    //currentContratoDesc: response.data.localidad,
                    currentLocalidadDesc: response.data.remitente_comercial['localidad'],
                    currentIva: response.data.remitente_comercial['iva'],
                    currentRemitenteComercial: response.data.remitente_comercial['cuil'],
                    currentIntermediario: response.data.intermediario['cuil']
                });

                keys.forEach(this.setFieldsValues);
            })
    },
    getRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/getIngresoCereal/' + this.props.identifier, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },
});

export default IngresoDeCerealRemitenteForm;
