import React from 'react';

import {browserHistory} from 'react-router';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


import DeleteIcon from 'react-material-icons/icons/action/delete';


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


var IngresoDeCerealModTabs = React.createClass ({

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

            allDestinosEntities: [],
            allChoferesEntities: [],
            allTransportistasEntities: [],
            allTarifasEntities: [],
            allEspeciesEntities: [],
            allCosechasEntities: [],
            allCamposEntities: [],
            productoresCuil: [],
            especiesDesc: [],
            cosechasDesc: [],
            camposNombres: [],
            choferesCuil: [],
            transportistasRazonSocial:[],
            tarifasDesc:[],
            destinosDesc:[],
            calidades: ['conforme', 'condicional'],
            mermasHumedadPorc: [],


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

            defaultFechaEmision:'',
            defaultFechaArribo:'',
            defaultFechaVencimiento:'',

            Bruto: 0,
            Tara: 0,
            PesoNeto: 0,
            '% Humedad': 0,
            '% Zarandeo': 0,
            '% Volátil': 0,
            'Kgs. Humedad': 0,
            'Kgs. Zarandeo': 0,
            'Kgs. Volátil': 0,
            Total: 0,
            'Neto Final': 0,

            fieldsMissingModal: false,
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
        this.getAllMermasHumedad();

        this.setState({
            itemSelected:  this.props.params.identifier
        });

        this.makeModRequest();
        this.calculateTarifaTotal();
    },

    //MENEJO DE ERRORES
    handleControlledInputBlur: function (event) {
        if (event.target.value === '') {
            this.setState({
                [event.target.id + 'error']: 'Este campo es requerido.'
            });
        }  else {
            this.setState({
                [event.target.id + 'error']: false
            });
        }

    },
    
    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        }, this.calculateGranosBox(event.target.id, event.target.value));

        if (event.target.value === '') {
            this.setState({
                [event.target.id + 'error']: 'Este campo es requerido.'
            });
        }
    },

    calculateGranosBox: function (id, value) {
        this.calculatePesoNeto();

        if (id === '% Humedad') {
            this.calculateKgsHumedad(value);
        }
        if (id === '% Zarandeo') {
            this.calculateKgsZarandeo(value);
        }
        if (id === '% Volátil') {
            this.calculateKgsVolatil(value);
        }

        this.calculateNetoFinal();
    },
    calculatePesoNeto: function () {
        var neto = this.state['Bruto'] - this.state['Tara'];

        this.setState({
            PesoNeto: neto
        }, this.forceUpdate());
    },
    calculateKgsHumedad: function (porcHumedad) {

        var ph = parseInt(porcHumedad);
        var kgsHumedad = (this.state.PesoNeto * ph) / 100;

        this.setState({
            'Kgs. Humedad': kgsHumedad,
            Total: kgsHumedad + this.state['Kgs. Zarandeo'] + this.state['Kgs. Volátil']
        });
    },
    calculateKgsZarandeo: function (porcZarandeo) {
        var pz = parseInt(porcZarandeo);
        var pesoNeto = this.state.PesoNeto;
        var kgsHumedad = parseInt(this.state['Kgs. Humedad']);
        var kgsZarandeo = (pesoNeto - kgsHumedad) * pz / 100;

        this.setState({
            'Kgs. Zarandeo': kgsZarandeo,
            Total: this.state['Kgs. Humedad'] + kgsZarandeo + this.state['Kgs. Volátil']
        });
    },
    calculateKgsVolatil: function (porcVolatil) {
        var pesoNeto = this.state.PesoNeto;
        var kgsHumedad = this.state['Kgs. Humedad'];
        var kgsZarandeo = this.state['Kgs. Zarandeo'];
        var kgsVolatil = (pesoNeto - kgsHumedad - kgsZarandeo)* porcVolatil / 100;

        this.setState({
            'Kgs. Volátil': kgsVolatil,
            Total: this.state['Kgs. Humedad'] + this.state['Kgs. Zarandeo'] + kgsVolatil
        });
    },
    calculateNetoFinal: function () {
        this.setState({
            'Neto Final': this.state['PesoNeto'] - this.state['Total']
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
        if (label === 'Merma Humedad') {
            value = this.state.currentMermaHumedad;
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
        if (label === 'Merma Humedad') {
            this.state.allMermasHumedadEntities.forEach(function (merma) {
                if (merma['porc_merma_humedad'] === payload) {
                    this.setState({
                        '% Humedad': merma['porc_humedad']
                    });
                    this.calculateKgsHumedad(merma['porc_humedad']);
                }
            }.bind(this));

            this.setState({
                currentMermaHumedad: payload
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
        if (label === 'Merma Humedad') {
            values = this.state.mermasHumedadPorc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },

    calculateTarifaTotal: function () {
        return (
            this.state['Tarifa de transporte']  * this.state['currentKMSRecorridos']
        )
    },

    formatDate: function (ref, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (ref === 'Fecha emision') {
            this.setState({
                'Fecha emision': year + '/' + month + '/' + day,
                defaultFechaEmision: date
            });
        }
        if (ref === 'Fecha arribo') {
            this.setState({
                'Fecha arribo': year + '/' + month + '/' + day,
                defaultFechaArribo: date
            });
        }
        if (ref === 'Fecha vencimiento') {
            this.setState({
                'Fecha vencimiento': year + '/' + month + '/' + day,
                defaultFechaVencimiento: date
            });
        }
    },

    round: function (value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    },



    render() {
        return (
            <div style={{
                    marginTop: '20px',
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
                                <h1>Ingreso de datos del remitente</h1>
                                <p>Modifique los datos correspondientes al remitente del ingreso seleccionado. </p>
                                <p>Para dar de baja el ingreso seleccionado, utilice el boton rojo al final de esta pestaña. </p>
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px', marginLeft:'-10px'}}>
                                    <TextField
                                        errorText={this.state['nroCP' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
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
                                        errorText={this.state['C.T.G nro' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={styles.textField}
                                        hintText= 'C.T.G nro'
                                        floatingLabelText= 'C.T.G'
                                        id='ctgNro'
                                        ref='ctgNro'
                                        value= {this.state.ctgNro}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <Toggle
                                        style={{marginBottom: '16',marginTop: '26px'}}
                                        labelStyle={{width:'auto', marginRight:'142px'}}
                                        label= "Flete corto"
                                        defaultToggled={this.state.fleteCorto}
                                        id="Flete corto"
                                        ref="Flete corto"
                                        onToggle={this.setFleteCortoValue}

                                    />

                                </div>
                                <br/>
                                <div style={{width:'100%'}}>
                                    <DatePicker
                                        style={styles.datePicker}
                                        hintText='Fecha emisión'
                                        mode="landscape"
                                        ref='Fecha emision'
                                        onChange={this.formatDate.bind(this, 'Fecha emision')}
                                        value={this.state.defaultFechaEmision}
                                        floatingLabelText= 'Fecha emisión'/>

                                    <DatePicker
                                        style={styles.datePicker}
                                        hintText='Fecha de arribo'
                                        mode="landscape"
                                        ref='Fecha arribo'
                                        onChange={this.formatDate.bind(this, 'Fecha arribo')}
                                        value={this.state.defaultFechaArribo}
                                        floatingLabelText= 'Fecha arribo'
                                        />
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
                                        errorText={this.state['CEE' + 'error']}
                                        style={{verticalAlign: 'top', width:'25%'}}
                                        hintText= 'CEE'
                                        floatingLabelText= 'CEE'
                                        id= 'CEE'
                                        ref= 'CEE'
                                        value= {this.state.CEE}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <DatePicker
                                        style={styles.datePicker}
                                        hintText='Fecha vencimiento'
                                        mode="landscape"
                                        ref='Fecha vencimiento'
                                        onChange={this.formatDate.bind(this, 'Fecha vencimiento')}
                                        value={this.state.defaultFechaVencimiento}
                                        floatingLabelText= 'Fecha vencimiento'
                                        />
                                    <br />
                                    <SelectField
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'40%'}}
                                        floatingLabelText='Remitente Comercial'
                                        maxHeight={200}
                                        ref='remitenteComercial'
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

                                    <div style={{display: 'inline-block', width: '20%', float:'right', textAlign:'right', marginRight:'5px', marginTop:'30px'}}>
                                        <RaisedButton
                                            label="Dar de baja"
                                            labelPosition="before"
                                            primary={true}
                                            icon={<DeleteIcon style={{paddingBottom: '6px'}} />}
                                            backgroundColor="#D21313"
                                            buttonStyle={{backgroundColor:"#D21313"}}
                                            onTouchTap={this.handleDarDeBaja}
                                        />
                                        <Dialog
                                            title="Se estan por dar de baja registros."
                                            actions={[
                                                <FlatButton
                                                    label="Cancelar"
                                                    primary={true}
                                                    onTouchTap={this.handleCloseDeleteConfirmationModal}
                                                />,
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleDeleteConfirmation}
                                                />
                                            ]}
                                            modal={false}
                                            open={this.state.deleteConfirmationModal}
                                        >
                                            {'Esta seguro que quiere dar de baja la carta de porte: ' + this.state['nroCP'] + '?'}
                                        </Dialog>
                                        <Dialog
                                            title={"Ingreso de cereal Nro: " + this.state['nroCP'] + ", dado de baja con exito"}
                                            actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseIngresoDadoDeBajaModal}
                                                />
                                            ]}
                                            modal={false}
                                            open={this.state.ingresoDadoDeBaja}
                                        >
                                            {'Sera redireccionado a la pagina de inicio de ingreso de cereal.'}
                                        </Dialog>

                                    </div>
                                </div>

                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de datos de los granos</h1>
                                <p>Modifique los datos correspondientes a los granos del ingreso seleccinado. </p>
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
                                        errorText={this.state['Bruto' + 'error']}
                                        style={{marginRight: '5%', display: 'inline-block', verticalAlign: 'top'}}
                                        hintText= 'Bruto'
                                        floatingLabelText= 'Bruto'
                                        id='Bruto'
                                        ref='Bruto'
                                        value= {this.state['Bruto']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        errorText={this.state['Tara' + 'error']}
                                        style={{marginRight: '5%', display: 'inline-block', verticalAlign: 'top'}}
                                        hintText= 'Tara'
                                        floatingLabelText= 'Tara'
                                        id='Tara'
                                        ref='Tara'
                                        value= {this.state['Tara']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <TextField
                                        disabled={true}
                                        style={{display: 'inline-block', verticalAlign: 'top', cursor: 'default', marginTop:'25px'}}
                                        id='Neto'
                                        ref='Neto'
                                        value= {this.round(this.state['PesoNeto'], 2)}
                                    />
                                    <br/>
                                    <SelectField
                                        style={styles.selectField}
                                        floatingLabelText='Merma Humedad'
                                        maxHeight={200}
                                        ref='Merma Humedad'
                                        value={this.getControlledSelectFieldValue('Merma Humedad')}
                                        onChange={this.handleControlledSelectFieldValueChange.bind(this,'Merma Humedad')}
                                    >
                                        {this.renderSelectFieldsValues('Merma Humedad')}
                                    </SelectField>

                                    <div style={{marginTop:'10px', padding: '0 0 10px 10px'}}>
                                        <p style={{marginBottom: '0'}}>MERMA</p>
                                        <div style={{margin: '0 0 0 10px'}}>
                                            <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>%</p>
                                            <TextField
                                                disabled={true}
                                                style={{cursor: 'default', display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Humedad'
                                                floatingLabelText= '% Humedad'
                                                id='% Humedad'
                                                ref='% Humedad'
                                                value= {this.state['% Humedad']}
                                            />
                                            <TextField
                                                errorText={this.state['% Zarandeo' + 'error']}
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Zarandeo'
                                                floatingLabelText= '% Zarandeo'
                                                id='% Zarandeo'
                                                ref='% Zarandeo'
                                                value= {this.state['% Zarandeo']}
                                                onChange={this.handleControlledInputChange}
                                                onBlur={this.handleControlledInputChange}
                                            />
                                            <TextField
                                                errorText={this.state['% Volátil' + 'error']}
                                                style={{display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= '% Volátil'
                                                floatingLabelText= '% Volátil'
                                                id='% Volátil'
                                                ref='% Volátil'
                                                value= {this.state['% Volátil']}
                                                onChange={this.handleControlledInputChange}
                                                onBlur={this.handleControlledInputChange}
                                            />
                                            <br/>
                                            <p style={{display: 'inline-block', verticalAlign: 'bottom', width:'10%'}}>Kgs.</p>
                                            <TextField
                                                disabled={true}
                                                style={{verticalAlign: 'bottom', cursor: 'default', display: 'inline-block', marginRight:'8px', width:'15%'}}
                                                id='Kgs. Humedad'
                                                ref='Kgs. Humedad'
                                                value= {this.round(this.state['Kgs. Humedad'], 2)}
                                            />
                                            <TextField
                                                disabled={true}
                                                style={{verticalAlign: 'bottom', cursor: 'default', display: 'inline-block', marginRight:'8px', width:'15%'}}
                                                id='Kgs. Zarandeo'
                                                ref='Kgs. Zarandeo'
                                                value= {this.round(this.state['Kgs. Zarandeo'], 2)}
                                            />
                                            <TextField
                                                disabled={true}
                                                style={{verticalAlign: 'bottom', cursor: 'default', display: 'inline-block', marginRight:'8px', width:'15%'}}
                                                id='Kgs. Volátil'
                                                ref='Kgs. Volátil'
                                                value= {this.round(this.state['Kgs. Volátil'], 2)}
                                            />

                                            <TextField
                                                disabled={true}
                                                style={{verticalAlign: 'bottom', cursor: 'default', display: 'inline-block', marginLeft:'10px', width:'224px'}}
                                                hintText= 'Total'
                                                floatingLabelText= 'Total'
                                                id='Total'
                                                ref='Total'
                                                value= {this.round(this.state['Total'], 2)}
                                            />

                                            <TextField
                                                disabled={true}
                                                style={{cursor: 'default', display: 'inline-block', marginLeft:'80px', verticalAlign: 'top', width: '135px'}}
                                                hintText= 'Neto Final'
                                                floatingLabelText= 'Neto Final'
                                                id='Neto Final'
                                                ref='Neto Final'
                                                value= {this.round(this.state['Neto Final'], 2)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de datos de transporte</h1>
                                <p>Modifique los datos correspondientes al transporte del ingreso seleccionado. </p>
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
                                        errorText={this.state['Patente' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{marginRight:'10px', verticalAlign: 'top', width:'20%'}}
                                        hintText= 'Patente'
                                        floatingLabelText= 'Patente'
                                        id= 'patente'
                                        ref= 'patente'
                                        value= {this.state['patente']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <Toggle
                                        style={{marginBottom: '16',marginTop: '26px'}}
                                        labelStyle={{width:'auto', marginRight:'142px'}}
                                        label= "Flete pago"
                                        defaultToggled={this.state.fletePago}
                                        id="Flete pago"
                                        ref="Flete pago"
                                        onToggle={this.setFletePagoValue}

                                    />
                                </div>
                                <br />
                                <div style={{padding: '0 0 10px 10px', border: 'solid black 1px'}}>
                                    <TextField
                                        disabled={true}
                                        errorText={this.state['Tarifa de transporte' + 'error']}
                                        style={{display: 'inline-block', verticalAlign: 'top', cursor: 'default', width:'350px'}}
                                        hintText= 'Tarifa de transporte'
                                        floatingLabelText= 'Tarifa de transporte'
                                        id= 'Tarifa de transporte'
                                        ref= 'Tarifa de transporte'
                                        value= {this.state['Tarifa de transporte']}
                                    />
                                    <br/>
                                    <TextField
                                        errorText={this.state['Kms. recorridos' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={styles.textFieldMain}
                                        hintText= 'Kms. recorridos'
                                        floatingLabelText= 'Kms. recorridos'
                                        id= 'currentKMSRecorridos'
                                        ref= 'currentKMSRecorridos'
                                        value= {this.state['currentKMSRecorridos']}
                                        onChange={this.handleControlledInputChange}
                                    />
                                    <br />
                                    <TextField //monto calculado seguo los kilometros y la tarifa
                                        disabled={true}
                                        style={{display: 'inline-block', verticalAlign: 'top', cursor: 'default', width:'500px'}}
                                        hintText= 'Tarifa Total'
                                        floatingLabelText= 'Tarifa Total'
                                        id= 'Tarifa Total'
                                        ref= 'Tarifa Total'
                                        value= {this.round(this.calculateTarifaTotal(), 2)}
                                    />
                                </div>
                                <br />
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de datos del destinatario</h1>
                                <p>Modifique los datos correspondientes al destinatario del ingreso seleccionado. </p>
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
                                        errorText={this.state['Observaciones' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
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

                                <Dialog
                                    title={"Se esta por modificar la carta de porte Nro: " + this.state['nroCP']}
                                    actions={[
                                                <FlatButton
                                                    label="Cancelar"
                                                    primary={true}
                                                    onTouchTap={this.handleCloseModConfirmationModal}
                                                />,
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleModConfirmationModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.modConfirmationModal}
                                >
                                    {"Esta seguro que los datos correspondientes a la carta de porte Nro: " + this.state['nroCP'] + " son correctos?"}
                                </Dialog>
                                <Dialog
                                    title={"La  carta de porte Nro: " + this.state['nroCP'] + " fue ingresada a la base de datos con exito"}
                                    actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseModCPModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.modCPModal}
                                >
                                    {'Sera redireccionado a la pagina de inicio de ingreso de cereal.'}
                                </Dialog>


                            </Paper>
                        </div>
                    </div>
                    <Dialog
                        title={"Faltan campos por completar!!"}
                        actions={[

                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseFieldsMissingModal}
                                                />
                                            ]}
                        modal={false}
                        open={this.state.fieldsMissingModal}
                    >
                        {"Por favor complete los campos faltates para continuar."}
                    </Dialog>
                </SwipeableViews>
            </div>
        );
    },

    //MISSING FIELDS
    getRefsValues: function (key) {

        if (this.refs[key].props.value != null) {
            return this.refs[key].props.value
        } else {
            if(this.refs[key].state != null){
                if (this.refs[key].state.date != null) {
                    return this.refs[key].state.date
                }
                if (this.refs[key].state.switched != null) {
                    return this.refs[key].state.switched
                }
            }
        }
    },
    handleOpenFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: true});
    },
    handleCloseFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: false});
    },

    handleAceptar: function () {
        var keys = (Object.keys(this.refs));
        var values = keys.map(this.getRefsValues);
        var object = {};

        keys.map(function (key, index) {
            object[key] = values[index]
        });


        if (_.includes(values, undefined, 0)) {

            this.handleOpenFieldsMissingModal();

        } else {
            this.handleOpenModConfirmationModal();
        }

        //this.handleOpenModConfirmationModal();
    },
    handleOpenModConfirmationModal: function (event) {
        this.setState({modConfirmationModal: true});

    },
    handleCloseModConfirmationModal: function () {
        this.setState({modConfirmationModal: false});
    },

    handleModConfirmationModal: function () {
        this.makeRequest();
        this.handleCloseModConfirmationModal();
        this.setState({modCPModal: true});
    },
    handleCloseModCPModal: function () {
        this.setState({modCPModal: false});
        browserHistory.push('ingresodecereal');
    },

    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },
    
    handleDarDeBaja: function () {
        event.preventDefault();
        this.handleOpenDeleteConfirmationModal();
    },
    handleOpenDeleteConfirmationModal: function (event) {
        this.setState({deleteConfirmationModal: true});
    },
    handleDeleteConfirmation: function () {
        var bodyRequested = {habilitado: false};
        var bodyJson = JSON.stringify(bodyRequested);

        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/update/' + this.props.params.identifier, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: bodyJson
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                console.log(response);
            });

        this.handleCloseDeleteConfirmationModal();
        this.handleIngresoDadoDeBajaModal();
    },
    handleCloseDeleteConfirmationModal: function () {
        this.setState({deleteConfirmationModal: false});
    },

    handleIngresoDadoDeBajaModal: function () {
        this.setState({ingresoDadoDeBaja: true});
    },
    handleCloseIngresoDadoDeBajaModal: function () {
        this.setState({ingresoDadoDeBaja: false});

        browserHistory.push('ingresodecereal');
    },

    makeRequest: function () {

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
        var currentMermaHumedad = this.state.currentMermaHumedad;
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
            "fecha_emision": this.state['defaultFechaEmision'],
            "ctg": this.state['ctgNro'],
            "flete_corto": this.state['fleteCorto'],
            "fecha_arribo": this.state['defaultFechaArribo'],
            "productor": productorSelecionado,
            "cee": this.state['CEE'],
            "fecha_vencimiento": this.state['defaultFechaVencimiento'],
            "remitente_comercial": remitenteComercialSeleccionado,
            "intermediario": intermediarioSeleccionado,


            "especie" : especieSeleccionada,
            "cosecha" : cosechaSeleccionada,
            "calidad" : this.state['currentCalidad'],
            "procedencia" : procedenciaSeleccionada,
            "kg_bruto" : this.state['Bruto'],
            "kg_tara" : this.state['Tara'],
            "kg_neto" : this.state['PesoNeto'],
            "porc_humedad" : this.state['% Humedad'],
            "porc_merma_humedad": currentMermaHumedad,
            "porc_zarandeo" : this.state['% Zarandeo'],
            "porc_volatil" : this.state['% Volátil'],
            "kgs_merma_humedad": this.state['Kgs. Humedad'],
            "kgs_merma_zarandeo": this.state['Kgs. Zarandeo'],
            "kgs_merma_volatil": this.state['Kgs. Volátil'],
            "kgs_neto_final": this.state['Neto Final'],

            "chofer" : choferSeleccionado,
            "transportista" : transportistaSeleccionado,
            "patente" : this.state['patente'],
            "flete_pago" : this.state.fletePago,
            "tipo_tarifa" : '58f9315be1a9d5001185400e',
            "kms_recorridos" : this.state['currentKMSRecorridos'],
            "tarifa" : this.calculateTarifaTotal(),


            "destinatario": destinatarioSeleccionado,
            "destino": destinoSeleccionado,
            "observaciones": this.state['Observaciones'],
            "habilitado": true
        };
        console.log('objeto del body:', bodyRequested);

        fetch(this.getRequest(bodyRequested))
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                /*this.setState({
                 items: response.data
                 });*/
            })
    },
    getRequest: function (bodyRequested) {
        var bodyJson = JSON.stringify(bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/update/' + this.props.params.identifier, {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
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
        var request = new Request('http://proyecto-final-prim.herokuapp.com/tarifas/58f9315be1a9d5001185400e', {
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
                console.log(response.data);
                this.setState({
                    'Tarifa de transporte': response.data.tarifa,
                    currentTarifa: response.data
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
    getAllMermasHumedad: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/mermasHumedad/getAll', {
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
                    allMermasHumedadEntities: response.data,
                    mermasHumedadPorc: response.data.map(function (merma) {
                        return merma['porc_merma_humedad']
                    })
                });
            })
    },

    //PARA RECUPERAR TODOS LOS DATOS DE LAS CP ELEGIDA
    makeModRequest: function () {
        fetch(this.getModRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    currentCP: response.data,
                   // fieldsInitialValues: values
                });

                //TO LOAD THE CURRENT VALUE FOR THE DROPDOWN FIELDS

                var emision = new Date(response.data['fecha_emision']);
                var arribo = new Date(response.data['fecha_arribo']);
                var vencimiento = new Date(response.data['fecha_vencimiento']);

                emision.setDate(emision.getDate() + 1);
                arribo.setDate(arribo.getDate() + 1);
                vencimiento.setDate(vencimiento.getDate() + 1);

                this.setState({
                    nroCP: response.data['nro_cp'],
                    defaultFechaEmision: emision,
                    defaultFechaArribo: arribo,
                    fleteCorto: response.data['flete_corto'],
                    ctgNro: response.data.ctg,
                    currentProductorCuil: response.data.productor['cuil'],
                    CEE: response.data.cee,
                    defaultFechaVencimiento: vencimiento,
                    currentRemitenteComercial: response.data['remitente_comercial']['cuil'],
                    currentIntermediario: response.data.intermediario['cuil'],

                    currentEspecieDesc: response.data.especie['descripcion'],
                    currentCosechaDesc: response.data.cosecha['descripcion'],
                    currentCalidad: response.data['calidad'],
                    currentCampoNombre: response.data.procedencia['nombre'], //procedencia
                    currentMermaHumedad: response.data['porc_merma_humedad'],
                    Bruto: response.data['kg_bruto'],
                    Tara: response.data['kg_tara'],
                    PesoNeto: response.data['kg_neto'],
                    '% Humedad': response.data['porc_humedad'],
                    '% Zarandeo': response.data['porc_zarandeo'],
                    '% Volátil': response.data['porc_volatil'],
                    '% Calidad': response.data['porc_calidad'],

                    'Kgs. Humedad': response.data['kgs_merma_humedad'],
                    'Kgs. Zarandeo': response.data['kgs_merma_zarandeo'],
                    'Kgs. Volátil': response.data['kgs_merma_volatil'],
                    'Neto Final': response.data['kgs_neto_final'],


                    currentChoferCuil: response.data.chofer['cuil'],
                    currentTransportistaRazonSocial: response.data.transportista['razon_social'],
                    patente: response.data['patente'],
                    fletePago: response.data['flete_pago'],
                    currentTarifaDesc: response.data['tipo_tarifa']['descripcion'],
                    currentKMSRecorridos: response.data['kms_recorridos'],
                    currentTarifaNRO: response.data.tarifa,

                    currentDestinatario: response.data.destinatario['cuil'],
                    currentDestinoDesc: response.data.destino['descripcion'],
                    Observaciones: response.data.observaciones

                });
            })
    },
    getModRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/getIngresoCereal/' + this.props.params.identifier, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },
});

export default IngresoDeCerealModTabs;
