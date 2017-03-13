import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';


import IngresoDeCerealRemitenteForm from './ingreso-de-cereal-remitente-form';
import IngresoDeCerealTransporteForm from './ingreso-de-cereal-transporte-form';
import IngresoDeCerealDestinatarioForm from './ingreso-de-cereal-destinatario-form';
import IngresoDeCerealGranosForm from './ingreso-de-cereal-granos-form';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    },
    slide: {
        padding: 10
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

const items = [];
for (let i = 0; i < 100; i++ ) {
    items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
}


var IngresoDeCerealMainTabs = React.createClass ({

    getInitialState: function () {
        return {
            slideIndex: 0,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',


            items: [],

            currentProductorCuil: '',
            productoresCuil: [],
            especiesDesc: [],
            cosechasDesc: [],
            camposNombres: [],
            choferesCuil: [],
            transportistasRazonSocial:[],
            tarifasDesc:[],
            destinosDesc:[],
            calidades: ['Conforme', 'Condicional'],


            currentProductorCuil:'',
            currentEspecieDesc:'',
            currentCosechaDesc:'',
            currentCalidad:'',
            currentCampoNombre:'',
            currentChoferCuil:'',
            currentTransportistaRazonSocial:'',
            currentTarifaDesc:'',
            currentDestinatario:'',
            currentDestinoDesc:'',
            currentRemitenteComercial:'',
            currentIntermediario:'',

            nroCP: '',

            fleteCorto: false,
            fletePago: false,

        }

    },
    componentDidMount: function() {
        this.getAllProductores();
        this.getAllEspecies();
        this.getAllCosechas();
        this.getAllProcedencias();
        this.getAllChoferes();
        this.getAllTransportistas();
        this.getAllTarifas();
        this.getAllDestinos();

        this.setState({
                itemSelected:  this.props.params.identifier
        });

    },

    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });

    },

    setFleteCortoValue: function () {
        this.setState({
            fleteCorto: !this.state.fleteCorto
        });
    },
    setFletePagoValue: function () {
        this.setState({
            fletePago: !this.state.fletePago
        });
    },

    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Productor') {
            value = this.state.currentProductorCuil;
        }
        if (label === 'Especie') {
            value = this.state.currentEspecieDesc;
        }
        if (label === 'Cosecha') {
            value = this.state.currentCosechaDesc;
        }
        if (label === 'Calidad') {
            value = this.state.currentCalidad;
        }
        if (label === 'Procedencia') {
            value = this.state.currentCampoNombre;
        }
        if (label === 'Chofer') {
            value = this.state.currentChoferCuil;
        }
        if (label === 'Transportista') {
            value = this.state.currentTransportistaRazonSocial;
        }
        if (label === 'Tarifa') {
            value = this.state.currentTarifaDesc;
        }
        if (label === 'Destinatario') {
            value = this.state.currentDestinatario;
        }
        if (label === 'Destino') {
            value = this.state.currentDestinoDesc;
        }
        if (label === 'RemitenteComercial') {
            value = this.state.currentRemitenteComercial;
        }
        if (label === 'Intermediario') {
            value = this.state.currentIntermediario;
        }


        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'Especie') {
            this.setState({
                currentEspecieDesc: payload
            });
        }
        if (label === 'Cosecha') {
            this.setState({
                currentCosechaDesc: payload
            });
        }
        if (label === 'Calidad') {
            this.setState({
                currentCalidad: payload
            });
        }
        if (label === 'Procedencia') {
            this.setState({
                currentCampoNombre: payload
            });
        }
        if (label === 'Chofer') {
            this.setState({
                currentChoferCuil: payload
            });
        }
        if (label === 'Transportista') {
            this.setState({
                currentTransportistaRazonSocial: payload
            });
        }
        if (label === 'Tarifa') {
            var currenttarifaTarifa = '';

            this.state.allTarifasEntities.forEach(function (tarifa) {
                if (tarifa['descripcion'] === payload) {
                    currenttarifaTarifa = tarifa['tarifa'];
                }
            });

            this.setState({
                currentTarifaDesc: payload,
                currentTarifaTarifa: currenttarifaTarifa
            });
        }
        if (label === 'Destinatario') {
            this.setState({
                currentDestinatario: payload
            });
        }
        if (label === 'Destino') {
            this.setState({
                currentDestinoDesc: payload
            });
        }
        if (label === 'RemitenteComercial') {
            this.setState({
                currentRemitenteComercial: payload
            });
        }
        if (label === 'Intermediario') {
            this.setState({
                currentIntermediario: payload
            });
        }


    },
    renderSelectFieldsValues: function (label) {
        var values;

        if (label === 'Productor') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Especie') {
            values = this.state.especiesDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Cosecha') {
            values = this.state.cosechasDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Calidad') {
            values = this.state.calidades.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Procedencia') {
            values = this.state.camposNombres.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Chofer') {
            values = this.state.choferesCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Transportista') {
            values = this.state.transportistasRazonSocial.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Tarifa') {
            values = this.state.tarifasDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Destinatario') { //usamos los productores
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Destino') {
            values = this.state.destinosDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'RemitenteComercial') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'Intermediario') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },


    /*setDatesValues: function (ref, event, date) {

        if (ref === 'Fecha emision') {
            this.setState({
                'Fecha emision': date
            });
        }
        if (ref === 'Fecha arribo') {
            this.setState({
                'Fecha arribo': date
            });
        }
        if (ref === 'Fecha vencimiento') {
            this.setState({
                'Fecha vencimiento': date
            });
        }
    },*/

    calculateTarifaTotal: function () {
        return (
            this.state.currentTarifaTarifa  * this.state['Kms. recorridos']
        )

    },

    formatDate: function (ref, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (ref === 'Fecha emision') {
            this.setState({
                'Fecha emision': year + '/' + month + '/' + day
            });
        }
        if (ref === 'Fecha arribo') {
            this.setState({
                'Fecha arribo': year + '/' + month + '/' + day
            });
        }
        if (ref === 'Fecha vencimiento') {
            this.setState({
                'Fecha vencimiento': year + '/' + month + '/' + day
            });
        }
    },



    render() {
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    >
                    <Tab label="Remitente" value={0} />
                    <Tab label="Granos" value={1} />
                    <Tab label="Transporte" value={2} />
                    <Tab label="Destinatario" value={3} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>

                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <TextField
                                        style={styles.textField}
                                        hintText= 'CP nro.'
                                        floatingLabelText= 'CP nro.'
                                        id='nroCP'
                                        ref='nroCP'
                                        value= {this.state['nroCP']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', display: 'inline-block', border: 'solid black 1px',float:'right', width:'40%' }}>
                                    <TextField
                                        style={styles.textField}
                                        hintText= 'C.T.G nro'
                                        floatingLabelText= 'C.T.G'
                                        id='C.T.G nro'
                                        ref='C.T.G nro'
                                        value= {this.state['C.T.G nro']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <Toggle
                                        style={{marginBottom: '16',marginTop: '26px'}}
                                        labelStyle={{width:'auto', marginRight:'142px'}}
                                        label= "Flete corto"
                                        defaultToggled={false}
                                        id="Flete corto"
                                        ref="Flete corto"
                                        onToggle={this.setFleteCortoValue}

                                    />

                                </div>
                                <br/>
                                <div style={{width:'100%'}}>
                                    <DatePicker style={styles.datePicker} hintText='Fecha emisión' mode="landscape" ref='Fecha emision' onChange={this.formatDate.bind(this, 'Fecha emision')} />

                                    <DatePicker style={styles.datePicker} hintText='Fecha de arribo' mode="landscape" ref='Fecha arribo' onChange={this.formatDate.bind(this, 'Fecha arribo')} />
                                    <br />
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Productor'
                                        maxHeight={200}
                                        ref='Productor'
                                        value={this.getControlledSelectFieldValue('Productor')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Productor')}
                                    >
                                        {this.renderSelectFieldsValues('Productor')}
                                    </SelectField>
                                    <br />
                                    <TextField
                                        style={{verticalAlign: 'top', width:'25%'}}
                                        hintText= 'CEE'
                                        floatingLabelText= 'CEE'
                                        id= 'CEE'
                                        ref= 'CEE'
                                        value= {this.state['CEE']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <DatePicker style={styles.datePicker} hintText='Fecha vencimiento' mode="landscape" ref='Fecha vencimiento' onChange={this.formatDate.bind(this, 'Fecha vencimiento')}  />
                                    <br />
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Remitente Comercial'
                                        maxHeight={200}
                                        ref='RemitenteComercial'
                                        value={this.getControlledSelectFieldValue('RemitenteComercial')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'RemitenteComercial')}
                                        >
                                        {this.renderSelectFieldsValues('RemitenteComercial')}
                                    </SelectField>
                                    <br />
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Intermediario'
                                        maxHeight={200}
                                        ref='Intermediario'
                                        value={this.getControlledSelectFieldValue('Intermediario')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Intermediario')}
                                        >
                                        {this.renderSelectFieldsValues('Intermediario')}
                                    </SelectField>
                                </div>
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Especie'
                                        maxHeight={200}
                                        ref='Especie'
                                        value={this.getControlledSelectFieldValue('Especie')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Especie')}
                                    >
                                        {this.renderSelectFieldsValues('Especie')}
                                    </SelectField>
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Cosecha'
                                        maxHeight={200}
                                        ref='Cosecha'
                                        value={this.getControlledSelectFieldValue('Cosecha')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Cosecha')}
                                    >
                                        {this.renderSelectFieldsValues('Cosecha')}
                                    </SelectField>
                                    <br />
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Calidad'
                                        maxHeight={200}
                                        ref='Calidad'
                                        value={this.getControlledSelectFieldValue('Calidad')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Calidad')}
                                    >
                                        {this.renderSelectFieldsValues('Calidad')}
                                    </SelectField>
                                    <br />
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField // viene de campo
                                        style={styles.selectField}
                                        floatingLabelText='Procedencia'
                                        maxHeight={200}
                                        ref='Procedencia'
                                        value={this.getControlledSelectFieldValue('Procedencia')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Procedencia')}
                                    >
                                        {this.renderSelectFieldsValues('Procedencia')}
                                    </SelectField>
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', display: 'inline-block', border: 'solid black 1px', width:'60%' }}>
                                    <TextField
                                        style={styles.textField}
                                        hintText= 'Bruto'
                                        floatingLabelText= 'Bruto'
                                        id='Bruto'
                                        ref='Bruto'
                                        value= {this.state['Bruto']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        style={styles.textField}
                                        hintText= 'Tara'
                                        floatingLabelText= 'Tara'
                                        id='Tara'
                                        ref='Tara'
                                        value= {this.state['Tara']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <TextField  //bruto menos tara
                                        style={styles.textField}
                                        hintText= 'Neto'
                                        floatingLabelText= 'Neto'
                                        id='Neto'
                                        ref='Neto'
                                        value= {this.state['Neto']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <TextField //viene de merma humedad dropdown
                                        style={styles.textField}
                                        hintText= '% Humedad'
                                        floatingLabelText= '% Humedad'
                                        id='Humedad'
                                        ref='Humedad'
                                        value= {this.state['Humedad']}
                                        onChange={this.handleControlledInputChange}
                                    />

                                    <div style={{marginTop:'10px', padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                        <p style={{marginBottom: '0'}}>MERMA</p>
                                        <div style={{margin: '0 0 0 10px'}}>
                                            <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>%</p>
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Humedad'
                                                floatingLabelText= '% Humedad'
                                                id='% Humedad'
                                                ref='% Humedad'
                                                value= {this.state['% Humedad']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Zarandeo'
                                                floatingLabelText= '% Zarandeo'
                                                id='% Zarandeo'
                                                ref='% Zarandeo'
                                                value= {this.state['% Zarandeo']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Volátil'
                                                floatingLabelText= '% Volátil'
                                                id='% Volátil'
                                                ref='% Volátil'
                                                value= {this.state['% Volátil']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Calidad'
                                                floatingLabelText= '% Calidad'
                                                id='% Calidad'
                                                ref='% Calidad'
                                                value= {this.state['% Calidad']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <br/>
                                            <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>Kgs.</p>
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Humedad'
                                                floatingLabelText= 'Kgs. Humedad'
                                                id='Kgs. Humedad'
                                                ref='Kgs. Humedad'
                                                value= {this.state['Kgs. Humedad']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Zarandeo'
                                                floatingLabelText= 'Kgs. Zarandeo'
                                                id='Kgs. Zarandeo'
                                                ref='Kgs. Zarandeo'
                                                value= {this.state['Kgs. Zarandeo']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Volátil'
                                                floatingLabelText= 'Kgs. Volátil'
                                                id='Kgs. Volátil'
                                                ref='Kgs. Volátil'
                                                value= {this.state['Kgs. Volátil']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Calidad'
                                                floatingLabelText= 'Kgs. Calidad'
                                                id='Kgs. Calidad'
                                                ref='Kgs. Calidad'
                                                value= {this.state['Kgs. Calidad']}
                                                onChange={this.handleControlledInputChange}
                                            />

                                            <TextField
                                                style={{display: 'inline-block', marginLeft:'10px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Total'
                                                floatingLabelText= 'Total'
                                                id='Total'
                                                ref='Total'
                                                value= {this.state['Total']}
                                                onChange={this.handleControlledInputChange}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <TextField
                                        style={{display: 'inline-block', marginLeft:'15px', verticalAlign: 'top', width:'40%'}}
                                        hintText= 'Neto Final'
                                        floatingLabelText= 'Neto Final'
                                        id='Neto Final'
                                        ref='Neto Final'
                                        value= {this.state['Neto Final']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                </div>
                                <br/>
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Chofer'
                                        maxHeight={200}
                                        ref='Chofer'
                                        value={this.getControlledSelectFieldValue('Chofer')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Chofer')}
                                    >
                                        {this.renderSelectFieldsValues('Chofer')}
                                    </SelectField>
                                    <br />
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Transportista'
                                        maxHeight={200}
                                        ref='Transportista'
                                        value={this.getControlledSelectFieldValue('Transportista')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Transportista')}
                                    >
                                        {this.renderSelectFieldsValues('Transportista')}
                                    </SelectField>
                                    <TextField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'20%'}}
                                        hintText= 'Patente'
                                        floatingLabelText= 'Patente'
                                        id= 'Patente'
                                        ref= 'Patente'
                                        value= {this.state['Patente']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <Toggle
                                        style={{marginBottom: '16',marginTop: '26px'}}
                                        labelStyle={{width:'auto', marginRight:'142px'}}
                                        label= "Flete pago"
                                        defaultToggled={false}
                                        id="Flete pago"
                                        ref="Flete pago"
                                        onToggle={this.setFletePagoValue}

                                    />
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Tarifa'
                                        maxHeight={200}
                                        ref='Tarifa'
                                        value={this.getControlledSelectFieldValue('Tarifa')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Tarifa')}
                                    >
                                        {this.renderSelectFieldsValues('Tarifa')}
                                    </SelectField>

                                    <TextField
                                        style={styles.textFieldMain}
                                        hintText= 'Kms. recorridos'
                                        floatingLabelText= 'Kms. recorridos'
                                        id= 'Kms. recorridos'
                                        ref= 'Kms. recorridos'
                                        value= {this.state['Kms. recorridos']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <br />
                                    <TextField //monto calculado seguo los kilometros y la tarifa
                                        disabled={true}
                                        style={styles.textFieldMain}
                                        hintText= 'Tarifa Total'
                                        floatingLabelText= 'Tarifa Total'
                                        id= 'Tarifa Total'
                                        ref= 'Tarifa Total'
                                        value= {this.calculateTarifaTotal()}
                                    />
                                </div>
                                <br />
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Destinatario'
                                        maxHeight={200}
                                        ref='Destinatario'
                                        value={this.getControlledSelectFieldValue('Destinatario')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Destinatario')}
                                    >
                                        {this.renderSelectFieldsValues('Destinatario')}
                                    </SelectField>
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Destino'
                                        maxHeight={200}
                                        ref='Destino'
                                        value={this.getControlledSelectFieldValue('Destino')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Destino')}
                                    >
                                        {this.renderSelectFieldsValues('Destino')}
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
                                        id= 'Observaciones'
                                        ref= 'Observaciones'
                                        value= {this.state['Observaciones']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                </div>

                                <RaisedButton
                                    style={{margin:'10px'}}
                                    backgroundColor="#8BC34A"
                                    label="Aceptar"
                                    onTouchTap={this.handleAceptar}
                                />
                            </Paper>
                        </div>
                    </div>
                </SwipeableViews>
            </div>
        );
    },






    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },

    handleAceptar: function () {
        this.makeRequest();
    },

    makeRequest: function () {
        console.log('states: ', this.state);

        var currentProductorCuil = this.state.currentProductorCuil;
        var currentDestinatarioCuil = this.state.currentDestinatario;
        var currentRemitenteComercialCuil = this.state.currentRemitenteComercial;
        var currentIntermediarioCuil = this.state.currentIntermediario;
        var currentDestinoDesc = this.state.currentDestinoDesc;
        var currentChoferCuil = this.state.currentChoferCuil;
        var currentTransportista = this.state.currentTransportistaRazonSocial;
        var currentTarifa = this.state.currentTarifaDesc;
        var currentEspecie = this.state.currentEspecieDesc;
        var currentCosecha = this.state.currentCosechaDesc;
        var currentProcedencia = this.state.currentCampoNombre;
        var productorSelecionado = '';
        var destinatarioSeleccionado = '';
        var remitenteComercialSeleccionado = '';
        var intermediarioSeleccionado = '';
        var destinoSeleccionado = '';
        var choferSeleccionado ='';
        var transportistaSeleccionado = '';
        var tarifaSeleccionada = '';
        var especieSeleccionada = '';
        var cosechaSeleccionada = '';
        var procedenciaSeleccionada = '';

        this.state.allProductoresEntities.forEach(function (productor) {
            if (productor['cuil'] === currentProductorCuil) {
                productorSelecionado = productor['_id'];
            }
            if (productor['cuil'] === currentDestinatarioCuil) {
                destinatarioSeleccionado = productor['_id'];
            }
            if (productor['cuil'] === currentRemitenteComercialCuil) {
                remitenteComercialSeleccionado = productor['_id'];
            }
            if (productor['cuil'] === currentIntermediarioCuil) {
                intermediarioSeleccionado = productor['_id'];
            }
        });
        this.state.allDestinosEntities.forEach(function (destino) {
            if (destino['descripcion'] === currentDestinoDesc) {
                destinoSeleccionado = destino['_id'];
            }
        });
        this.state.allChoferesEntities.forEach(function (chofer) {
            if (chofer['cuil'] === currentChoferCuil) {
                choferSeleccionado = chofer['_id'];
            }
        });
        this.state.allTransportistasEntities.forEach(function (transportista) {
            if (transportista['razon_social'] === currentTransportista) {
                transportistaSeleccionado = transportista['_id'];
            }
        });
        this.state.allTarifasEntities.forEach(function (tarifa) {
            if (tarifa['descripcion'] === currentTarifa) {
                tarifaSeleccionada = tarifa['_id'];
            }
        });
        this.state.allEspeciesEntities.forEach(function (especie) {
            if (especie['descripcion'] === currentEspecie) {
                especieSeleccionada = especie['_id'];
            }
        });
        this.state.allCosechasEntities.forEach(function (cosecha) {
            if (cosecha['descripcion'] === currentCosecha) {
                cosechaSeleccionada = cosecha['_id'];
            }
        });
        this.state.allCamposEntities.forEach(function (campo) {
            if (campo['nombre'] === currentProcedencia) {
                procedenciaSeleccionada = campo['_id'];
            }
        });


        var bodyRequested = {
            "nro_cp": this.state['nroCP'],
            "fecha_emision": this.state['Fecha emision'],
            "ctg": this.state['C.T.G nro'],
            "flete_corto": this.state['fleteCorto'],
            "fecha_arribo": this.state['Fecha arribo'],
            "productor": productorSelecionado,
            "cee": this.state['CEE'],
            "fecha_vencimiento": this.state['Fecha vencimiento'],
            "remitente_comercial": remitenteComercialSeleccionado,
            "intermediario": intermediarioSeleccionado,


             "especie" : especieSeleccionada,
             "cosecha" : cosechaSeleccionada,
             "calidad" : this.state['currentCalidad'],
             "procedencia" : procedenciaSeleccionada,
             "kg_bruto" : 1000,
             "kg_tara" : 35,
             "kg_neto" : 965,
             "porc_humedad" : 10,
             "porc_zarandeo" : 5,
             "porc_volatil" : 3,
             "porc_calidad" : 4,


             "chofer" : choferSeleccionado,
             "transportista" : transportistaSeleccionado,
             "patente" : this.state['Patente'],
             "flete_pago" : this.state.fletePago,
             "tipo_tarifa" : tarifaSeleccionada,
             "kms_recorridos" : this.state['Kms. recorridos'],
             "tarifa" : this.calculateTarifaTotal(),


            "destinatario": destinatarioSeleccionado,
            "destino": destinoSeleccionado,
            "observaciones": this.state['Observaciones'],
            "habilitado": true
        };

        fetch(this.getRequest(bodyRequested))
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                console.log('respuesta: ', response);
                /*this.setState({
                    items: response.data
                });*/
            })
    },

    getRequest: function (bodyRequested) {
        var bodyJson = JSON.stringify(bodyRequested);
console.log('bodyRequested', bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/create', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bodyJson
        });

        return request
    },




    getAllProductores: function () {
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
    getAllTransportistas: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/transportistas/getAll', {
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
                    allTransportistasEntities: response.data,
                    transportistasRazonSocial: response.data.map(function (transportista) {
                        return transportista['razon_social']
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
    getAllCosechas: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/cosechas/getAll', {
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
                    allCosechasEntities: response.data,
                    cosechasDesc: response.data.map(function (cosecha) {
                        return cosecha['descripcion']
                    })
                });
            })
    },
    getAllProcedencias: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/campos/getAll', {
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
                    allCamposEntities: response.data,
                    camposNombres: response.data.map(function (campo) {
                        return campo['nombre']
                    })
                });
            })
    },
    getAllChoferes: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/choferes/getAll', {
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
                    allChoferesEntities: response.data,
                    choferesCuil: response.data.map(function (chofer) {
                        return chofer['cuil']
                    })
                });
            })
    },
    getAllTarifas: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/tarifas/getAll', {
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
                    allTarifasEntities: response.data,
                    tarifasDesc: response.data.map(function (tarifa) {
                        return tarifa['descripcion']
                    })
                });
            })
    },
    getAllDestinos: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/destinos/getAll', {
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
                    allDestinosEntities: response.data,
                    destinosDesc: response.data.map(function (destino) {
                        return destino['descripcion']
                    })
                });
            })
    },
});

export default IngresoDeCerealMainTabs;
