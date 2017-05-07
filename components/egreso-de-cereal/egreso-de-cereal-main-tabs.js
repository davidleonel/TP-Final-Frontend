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
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';

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


var EgresoDeCerealMainTabs = React.createClass ({

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
            allCertificadosEntities: [],
            allPuertosEntities: [],
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
            currentMermaHumedad:'',
            currentTarifaTarifa: 0,
            'Kms. recorridos': 0,


            nroCP: '',

            fleteCorto: false,
            fletePago: false,

            Bruto: 0,
            Tara: 0,
            PesoNeto: 0,
            '% Humedad': 0,
            '% Zarandeo': 0,
            '% Volátil': 0,
            'Kgs. Humedad': '',
            'Kgs. Zarandeo': '',
            'Kgs. Volátil': '',
            Total: 0,
            'Neto Final': 0,

            fieldsMissingModal: false
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

        this.getAllPuertos();
        this.getAllCertificados();

        this.setState({
            itemSelected:  this.props.params.identifier
        });

        this.makeVentasRequest();
    },

    makeVentasRequest: function () {
        fetch(this.getVentasRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    items: response.data
                });
            })
    },
    getVentasRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/getLiquidacionesPendientes', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
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
            this.state['Tarifa de transporte']  * this.state['Kms. recorridos']
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


    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        }, this.calculateGranosBox(event.target.id, event.target.value));

        if (event.target.id === 'nroLiquidacion') {
            this.filtrarCertificado(event.target.value);
        }
    },

    filtrarCertificado: function (nroLiquidacion) {
        var request;

        if (nroLiquidacion === '') {
            request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/getLiquidacionesPendientes' , {
                method: 'Get',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            fetch(request)
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    this.setState({
                        items: response.data
                    });
                })
        } else {
            request = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/filtrar/' + nroLiquidacion , {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            fetch(request)
                .then((response) => {
                    return response.json()
                })
                .then((response) => {
                    this.setState({
                        items: response.data
                    });
                })
        }

    },


    calculateGranosBox: function (id, value) {
        console.log('state humedad', this.state['% Humedad']);
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
        console.log('neto', this.state['PesoNeto']);
        console.log('total', this.state['Total']);
        this.setState({
            'Neto Final': this.state['PesoNeto'] - this.state['Total']
        });
    },

    //MENEJO DE ERRORES
    handleControlledInputBlur: function (event) {
        if (event.target.value === '') {
            this.setState({
                [event.target.id + 'error']: 'Este campo es requerido.'
            });
        }
        else {
            this.setState({
                [event.target.id + 'error']: false
            });
        }

    },

    handleRowSelection: function (selectedRows) {
        var index = selectedRows[0];
        var request;
        var certificado = {};
        var productor = {};
        var especie = {};
        var cosecha = {};
        var procedencia = {};

        console.log('venta Seleccionada:', this.state.items[index]);


        request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getCertificado/' + this.state.items[index].certificado , {
            method: 'Get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request)
            .then((response) => {
                return response.json()
            }).then((response) => {
                certificado = response.data;
                console.log('certificado Seleccionada:', response.data);
            }).then((response) => {
                request = new Request('http://proyecto-final-prim.herokuapp.com/productores/' + certificado.ingreso.productor , {
                    method: 'Get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                });

                fetch(request)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        productor = response.data;
                        console.log('productor Seleccionado:', response.data);
                    })
                    .then((response) => {
                    console.log('productor.cuil', productor.cuil);

                    this.state.allEspeciesEntities.forEach(function (esp) {
                        if (esp['_id'] === certificado.ingreso.especie) {
                            especie = esp;
                        }
                    });

                    this.state.allCosechasEntities.forEach(function (cos) {
                        if (cos['_id'] === certificado.ingreso.cosecha) {
                            cosecha = cos;
                        }
                    });

                    this.state.allCamposEntities.forEach(function (cam) {
                        if (cam['_id'] === certificado.ingreso.procedencia) {
                            procedencia = cam;
                        }
                    });

                    console.log('certificado.ingreso.calidad', certificado.ingreso.calidad);
                    console.log('certificado.ingreso.["kgs_merma_volatil"]', certificado.ingreso["kgs_merma_volatil"]);
                    console.log('certificado.ingreso.["porc_volatil"]', certificado.ingreso["porc_volatil"]);

                    this.setState({
                        'currentLiquidacion': this.state.items[index],
                        'certificadoSeleccionado': certificado,
                        'C.T.G nro': certificado.ingreso.ctg,
                        'CEE': certificado.ingreso.cee,
                        'currentProductorCuil': productor.cuil,
                        'currentEspecieDesc': especie.descripcion,
                        'currentCosechaDesc': cosecha.descripcion,
                        'currentCalidad': certificado.ingreso.calidad,
                        'currentCampoNombre': procedencia.nombre,
                        'Bruto': certificado.ingreso['kg_bruto'],
                        'PesoNeto' :certificado.ingreso['kg_neto'],
                        'Tara': certificado.ingreso['kg_tara'],
                        'Neto Final': certificado.ingreso['kgs_neto_final'],
                        'currentMermaHumedad': certificado.ingreso["porc_merma_humedad"],
                        'Kgs. Humedad': certificado.ingreso["kgs_merma_humedad"],
                        'Kgs. Zarandeo': certificado.ingreso["kgs_merma_zarandeo"],
                        'Kgs. Volátil': certificado.ingreso["kgs_merma_volatil"],
                        '% Humedad':  certificado.ingreso["porc_humedad"],
                        '% Zarandeo': certificado.ingreso["porc_zarandeo"],
                        '% Volátil': certificado.ingreso["porc_volatil"]

                    });
                });
        });

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
                    <Tab label="Liquidacion" value={0} />
                    <Tab label="Remitente" value={1} />
                    <Tab label="Granos" value={2} />
                    <Tab label="Transporte" value={3} />
                    <Tab label="Destinatario" value={4} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Liquidación</h1>
                                <p>Seleccione de la tabla la Liquidación para la cual se va a generar el Egreso. </p>
                                <p>Si conoce el número de la Liquidación/Orden buscada, puede ingresarlo en el campo siguiente para facilitar la búsqueda. </p>
                                <div>
                                    <TextField
                                        style={{display:'inline-block', marginRight:'15px', left:'0px'}}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Nro. de Liquidación'
                                        floatingLabelText='Nro. de Liquidación'
                                        id='nroLiquidacion'
                                        ref='nroLiquidacion'
                                        value= {this.state['nroLiquidacion']}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
                                    />
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Table
                                        height={'280px'}
                                        fixedHeader= {true}
                                        fixedFooter= {true}
                                        selectable={true}
                                        multiSelectable= {false}
                                        onRowSelection={this.handleRowSelection}
                                    >
                                        <TableHeader
                                            displaySelectAll= {false}
                                            adjustForCheckbox={true}
                                            enableSelectAll= {false}
                                        >
                                            <TableRow>
                                                <TableHeaderColumn colSpan="7" tooltip="" style={{textAlign: 'left', paddingLeft:'0px'}}>

                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn tooltip="Nro. Orden">Nro. Orden</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Nro. Certificado">Nro. Certificado</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Puerto">Puerto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Localidad">Localidad</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG Netos">KG Netos</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Calidad">Calidad</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Precio de Venta">Precio de Venta</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {true}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                            deselectOnClickaway={false}
                                        >
                                            {this.renderVentasRows()}
                                        </TableBody>
                                        <TableFooter
                                            adjustForCheckbox={this.state.showCheckboxes}
                                        >
                                        </TableFooter>
                                    </Table>
                                </div>

                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de datos del remitente</h1>
                                <p>Ingrese los datos correspondientes al remitente del ingreso. </p>
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
                                        errorText={this.state['CEE' + 'error']}
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
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Paper>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de datos de los granos</h1>
                                <p>Ingrese los datos correspondientes a los granos del ingreso. </p>
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
                                        style={{display: 'inline-block', verticalAlign: 'top', cursor: 'default'}}
                                        hintText= 'Neto'
                                        floatingLabelText= 'Neto'
                                        id='Neto'
                                        ref='Neto'
                                        value= {this.round(this.state['PesoNeto'], 2)}
                                        onChange={this.handleControlledInputChange}
                                        onBlur={this.handleControlledInputChange}
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
                                                style={{cursor: 'default', display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Humedad'
                                                floatingLabelText= 'Kgs. Humedad'
                                                id='Kgs. Humedad'
                                                ref='Kgs. Humedad'
                                                value= {this.round(this.state['Kgs. Humedad'], 2)}
                                            />
                                            <TextField
                                                disabled={true}
                                                style={{cursor: 'default', display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Zarandeo'
                                                floatingLabelText= 'Kgs. Zarandeo'
                                                id='Kgs. Zarandeo'
                                                ref='Kgs. Zarandeo'
                                                value= {this.round(this.state['Kgs. Zarandeo'], 2)}
                                            />
                                            <TextField
                                                disabled={true}
                                                style={{cursor: 'default', display: 'inline-block', marginRight:'8px', verticalAlign: 'top', width:'15%'}}
                                                hintText= 'Kgs. Volátil'
                                                floatingLabelText= 'Kgs. Volátil'
                                                id='Kgs. Volátil'
                                                ref='Kgs. Volátil'
                                                value= {this.round(this.state['Kgs. Volátil'], 2)}
                                            />

                                            <TextField
                                                disabled={true}
                                                style={{cursor: 'default', display: 'inline-block', marginLeft:'10px', verticalAlign: 'top', width:'224px'}}
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
                                <p>Ingrese los datos correspondientes al transporte del ingreso. </p>
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
                                        id= 'Kms. recorridos'
                                        ref= 'Kms. recorridos'
                                        value= {this.state['Kms. recorridos']}
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
                                <p>Ingrese los datos correspondientes al destinatario del ingreso. </p>
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
                                    title="Se está por dar de alta una nueva carta de porte correspondiente a un egreso de cereal."
                                    actions={[
                                                <FlatButton
                                                    label="Cancelar"
                                                    primary={true}
                                                    onTouchTap={this.handleCloseAltaConfirmationModal}
                                                />,
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleAltaConfirmationModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.altaConfirmationModal}
                                >
                                    {'¿Está seguro que los datos correspondientes a la nueva carta de porte son correctos?'}
                                </Dialog>
                                <Dialog
                                    title={"La nueva carta de porte fue ingresada a la base de datos con éxito"}
                                    actions={[
                                               <a target="_blank" href={'http://proyecto-final-prim.herokuapp.com/egresoCereal/pdf/' + this.state.newEgresoId}>
                                                    <FlatButton
                                                        label="Ver PDF"
                                                        primary={true}
                                                        disabled={false}
                                                    />
                                                </a>,
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseAltaCPModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.altaCPModal}
                                >
                                    {'Para ver el pdf correspondiente al nuevo egreso seleccione la opción "Ver PDF".\n Al seleccionar "OK", será redireccionado a la página de inicio de egreso de cereal.'}
                                </Dialog>
                            </Paper>
                        </div>
                    </div>
                    <Dialog
                        title={"Faltan campos por completar!"}
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

    renderVentasRows: function () {
        var items = this.state.items;

        if (items) {
            return (items.map(this.renderVentasRow))
        }
    },
    renderVentasRow: function (row, index) {
        var puertoNombre = '';
        var puertoLocalidad = '';
        var certificadoNumero = '';
        var certificadoKGNetos = '';
        var certificadoCalidad = '';

        this.state.allPuertosEntities.forEach(function (p) {
            if (p['_id'] === row.puerto) {
                puertoNombre = p.nombre;
                puertoLocalidad = p.localidad;
            }
        });
        this.state.allCertificadosEntities.forEach(function (c) {
            if (c['_id'] === row.certificado) {
                certificadoNumero = c.numero;
                certificadoKGNetos = c['ingreso']['kg_neto'];
                certificadoCalidad = c['ingreso']['calidad'];
            }
        });

        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{row['nro_orden']}</TableRowColumn>
                <TableRowColumn>{certificadoNumero}</TableRowColumn>
                <TableRowColumn>{puertoNombre}</TableRowColumn>
                <TableRowColumn>{puertoLocalidad}</TableRowColumn>
                <TableRowColumn>{certificadoKGNetos}</TableRowColumn>
                <TableRowColumn>{certificadoCalidad}</TableRowColumn>
                <TableRowColumn>{row['precio_venta']}</TableRowColumn>
            </TableRow>
        )
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

        //if (_.includes(values, undefined, 0)) {
        if (
            this.state['nroCP'] === '' ||
            this.state['Fecha emision'] === '' ||
            this.state['C.T.G nro'] === '' ||
            this.state['fleteCorto'] === '' ||
            this.state['Fecha arribo'] === '' ||
            this.state['currentProductorCuil'] === '' ||
            this.state['CEE'] === '' ||
            this.state['Fecha vencimiento'] === '' ||
            this.state['currentRemitenteComercial'] === '' ||
            this.state['currentIntermediario'] === '' ||
            this.state['currentEspecieDesc'] === '' ||
            this.state['currentCosechaDesc'] === '' ||
            this.state['currentCalidad'] === '' ||
            this.state['currentCampoNombre'] === '' ||
            this.state['Bruto'] === '' ||
            this.state['Tara'] === '' ||
            this.state['PesoNeto'] === '' ||
            this.state['% Humedad'] === '' ||
            this.state['currentMermaHumedad'] === '' ||
            this.state['% Zarandeo'] === '' ||
            this.state['% Volátil'] === '' ||
            this.state['Kgs. Humedad'] === '' ||
            this.state['Kgs. Zarandeo'] === '' ||
            this.state['Kgs. Volátil'] === '' ||
            this.state['Neto Final'] === '' ||
            this.state['currentChoferCuil'] === '' ||
            this.state['currentTransportistaRazonSocial'] === '' ||
            this.state['Patente'] === '' ||
            this.state['Kms. recorridos'] === '' ||
            this.state['currentDestinatario'] === '' ||
            this.state['currentDestinoDesc'] === ''
        ) {
            this.handleOpenFieldsMissingModal();

        } else {
            this.handleOpenAltaConfirmationModal();
        }

        //this.handleOpenAltaConfirmationModal();
    },
    handleOpenAltaConfirmationModal: function (event) {
        this.setState({altaConfirmationModal: true});

    },
    handleCloseAltaConfirmationModal: function () {
        this.setState({altaConfirmationModal: false});
    },

    handleAltaConfirmationModal: function () {
        this.makeRequest();
        this.handleCloseAltaConfirmationModal();
        this.setState({altaCPModal: true});
    },
    handleCloseAltaCPModal: function () {


        this.setState({altaCPModal: false});
        browserHistory.push('egresodecereal');
    },

    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },

    makeRequest: function () {

        var newEgresoId = '';

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

        console.log('this.state.currentLiquidacion[id)', this.state.currentLiquidacion['_id']);

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


            "especie": especieSeleccionada,
            "cosecha": cosechaSeleccionada,
            "calidad": this.state['currentCalidad'],
            "procedencia": procedenciaSeleccionada,
            "kg_bruto": this.state['Bruto'],
            "kg_tara": this.state['Tara'],
            "kg_neto": this.state['PesoNeto'],
            "porc_humedad": this.state['% Humedad'],
            "porc_merma_humedad": currentMermaHumedad,
            "porc_zarandeo": this.state['% Zarandeo'],
            "porc_volatil": this.state['% Volátil'],
            "kgs_merma_humedad": this.state['Kgs. Humedad'],
            "kgs_merma_zarandeo": this.state['Kgs. Zarandeo'],
            "kgs_merma_volatil": this.state['Kgs. Volátil'],
            "kgs_neto_final": this.state['Neto Final'],

            "chofer": choferSeleccionado,
            "transportista": transportistaSeleccionado,
            "patente": this.state['Patente'],
            "flete_pago": this.state.fletePago,

            "kms_recorridos": this.state['Kms. recorridos'],
            "tarifa": this.calculateTarifaTotal(),


            "destinatario": destinatarioSeleccionado,
            "destino": destinoSeleccionado,
            "observaciones": this.state['Observaciones'],
            "habilitado": true,

            "liquidacion": this.state.currentLiquidacion['_id']

        };

        fetch(this.getRequest(bodyRequested))
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                newEgresoId = response.data['_id'];
                this.setState({
                    'newEgresoId': response.data['_id']
                });
            })
            .then((response) => {
                var ventaEntregadoJson = JSON.stringify({"entregado": true});

                var ingresoRequest = new Request('http://proyecto-final-prim.herokuapp.com/liquidacion/update/' + this.state.currentLiquidacion['_id'], {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: ventaEntregadoJson
                });

                fetch(ingresoRequest)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        console.log('salio bien');
                        console.log('repsonse: ', response);
                    })
            })
    },

    getRequest: function (bodyRequested) {
        var bodyJson = JSON.stringify(bodyRequested);
        console.log('bodyJson:', bodyJson);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/egresoCereal/create', {
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

    getAllPuertos: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/puertos/getAll', {
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
                    allPuertosEntities: response.data,
                    puertosNombres: response.data.map(function (puerto) {
                        return puerto['nombre']
                    })
                });

            })
    },
    getAllCertificados: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/getAll', {
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
                    allCertificadosEntities: response.data,
                    certificadosNumero: response.data.map(function (certificado) {
                        return certificado['numero']
                    })
                });
            })
    },
});

export default EgresoDeCerealMainTabs;
