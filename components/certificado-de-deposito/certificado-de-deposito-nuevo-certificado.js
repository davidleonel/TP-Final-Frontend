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
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


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
        display: 'block'
    },
    selectField: {
        float: 'right',
        height:'40px',
        width: '65%'
    },
    selectFieldIcon: {
        height:'18px',
        padding: '0',
        top: '-4px'
    },
    selectFieldLabel: {
        top:'-25'
    },
    selectFieldMenu: {
        height:'50%'
    },
    selectFieldHint: {
        top:'7px'
    },
    datePicker: {
        verticalAlign: 'bottom',
        display: 'inline-block',
        width: '50%'
    }
};

var CertificadoDeDepositoNuevo = React.createClass ({
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


            allRubrosEntities: [],
            allChoferesEntities: [],
            rubrosDesc:'',

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


            Porcentaje0: 0,
            Porcentaje1: 0,
            Porcentaje2: 0,
            Porcentaje3: 0,
            Porcentaje4: 0,
            Porcentaje5: 0,
            Porcentaje6: 0,
            Porcentaje7: 0,
            Bonificacion0: 0,
            Bonificacion1: 0,
            Bonificacion2: 0,
            Bonificacion3: 0,
            Bonificacion4: 0,
            Bonificacion5: 0,
            Bonificacion6: 0,
            Bonificacion7: 0,


            bonificacionReset: true,
            Grado: 0,
            Factor: 0,

            cps: [],
            selectedRowsArray: [],
            KgsBrutosSeleccionadosTotales: 0,

            'detalle': [],
            'Nro. de deposito': '',
            'Nro. de carta de porte': '',
            'gastosDesc': [
                'Gastos generales 1116A',
                'Secado',
                'Zaranda',
                'Acarreo',
                'Fumigada',
                'Gastos analisis',
                'Costo carta de porte',
                'Resolucion ONCCA 49-05'
            ],
            ['Gastos generales 1116A']: {
                    descripcion: '',
                    kilos: '',
                    tarifa: '',
                    importe: ''
                },
            ['Secado']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Zaranda']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Acarreo']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Fumigada']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Gastos analisis']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Costo carta de porte']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Resolucion ONCCA 49-05']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['IVA']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },
            ['Sellado']: {
                descripcion: '',
                kilos: '',
                tarifa: '',
                importe: ''
            },

        }

    },

    componentDidMount: function() {
        this.getAllProductores();
        this.getAllChoferes();

        this.makeCPRequest();

        this.setState({
            itemSelected:  this.props.params.identifier
        });

    },
    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    },


    getControlledSelectFieldValue: function (label) {
        var value='';

        if (label === 'Productor') {
            value = this.state.currentProductorCuil;
        }
        if (label === 'Chofer') {
            value = this.state.currentChoferCuil;
        }

        return value
    },
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

        if (label === 'Productor') {
            this.setState({
                currentProductorCuil: payload
            });
        }
        if (label === 'Chofer') {
            this.setState({
                currentChoferCuil: payload
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
        if (label === 'Chofer') {
            values = this.state.choferesCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },


    formatDate: function (ref, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (ref === 'Fecha analisis') {
            this.setState({
                'Fecha analisis': year + '/' + month + '/' + day
            });
        }

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
                    <Tab label="Cartas de Porte" value={0} />
                    <Tab label="Detalle de gastos" value={1} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                    >

                    <div>
                        <div>
                            <Paper zDepth={3} style={{padding: '20px'}}>
                                <h1>Ingreso de un nuevo Certificado de depósito</h1>
                                <p>Use los campos a continuación para filtrar la tabla de cartas de porte.</p>
                                <div style={{display: 'inline-block', padding: '0', width:'60%'}}>
                                    <div style={{ width:'80%'}} >
                                        <DatePicker
                                            floatingLabelText= 'Fecha desde'
                                            style={{display: 'inline-block', width: '45%', marginRight:'5%'}}
                                            textFieldStyle={{width: '100%'}}
                                            autoOk={true}
                                            DateTimeFormat={global.Intl.DateTimeFormat}
                                            cancelLabel='Cerrar'
                                            hintText='Fecha desde'
                                            ref='Fecha desde'
                                            mode="landscape"
                                            onChange={this.updateFilterFields.bind(this, 'Fecha desde')}
                                            />
                                        <DatePicker
                                            floatingLabelText= 'Fecha hasta'
                                            style={{display: 'inline-block', width: '45%', float: 'right'}}
                                            textFieldStyle={{width: '100%'}}
                                            autoOk={true}
                                            cancelLabel='Cerrar'
                                            hintText='Fecha hasta'
                                            ref='Fecha hasta'
                                            mode="landscape"
                                            onChange={this.updateFilterFields.bind(this, 'Fecha hasta')}
                                            />
                                    </div>
                                    <br/>
                                    <div>
                                        <SelectField
                                            labelStyle={styles.selectFieldLabel}
                                            iconStyle={styles.selectFieldIcon}
                                            style={{height:'40px', width: '80%', float:'left'}}
                                            menuStyle={styles.selectFieldMenu}
                                            floatingLabelStyle={styles.selectFieldHint}
                                            floatingLabelText='Chofer'
                                            maxHeight={200}
                                            ref='Chofer'
                                            value={this.getControlledSelectFieldValue('Chofer')}
                                            onChange={this.handleControlledSelectFieldValueChange.bind(this,'Chofer')}
                                            >
                                            {this.renderSelectFieldsValues('Chofer')}
                                        </SelectField>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <div>
                                        <SelectField
                                            labelStyle={styles.selectFieldLabel}
                                            iconStyle={styles.selectFieldIcon}
                                            style={{height:'40px', width: '80%', marginRight:'10%'}}
                                            menuStyle={styles.selectFieldMenu}
                                            floatingLabelStyle={styles.selectFieldHint}
                                            floatingLabelText='Productor'
                                            maxHeight={200}
                                            ref='Productor'
                                            value={this.getControlledSelectFieldValue('Productor')}
                                            onChange={this.handleControlledSelectFieldValueChange.bind(this,'Productor')}
                                            >
                                            {this.renderSelectFieldsValues('Productor')}
                                        </SelectField>
                                    </div>
                                    <TextField
                                        errorText={this.state['Carta de porte' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={styles.textField}
                                        floatingLabelStyle={{lineHeight:'10px'}}
                                        hintStyle={{bottom:'7px'}}
                                        hintText='Carta de porte'
                                        floatingLabelText='Carta de porte'
                                        id='Carta de porte'
                                        ref='Carta de porte'
                                        value= {this.state['Carta de porte']}
                                        onChange={this.handleControlledInputChange}
                                        />
                                </div>


                                <div style={{
                                    border: 'solid black 1px',
                                    float: 'right',
                                    height: '190px',
                                    width: '300px',
                                    paddingLeft: '10px',
                                    marginRight: '30px',
                                    marginTop: '30px'}}
                                    >
                                    <h3 style={{marginBottom: '0px'}} >Detalles del Certificado a crear</h3>
                                    <TextField
                                        errorText={this.state['Nro. de Certificado de deposito' + 'error']}
                                        onBlur={this.handleControlledInputBlur}
                                        style={{height:'60px', width:'285px', color: 'black'}}
                                        floatingLabelStyle={{lineHeight:'10px', color: 'black'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Nro. de Certificado de depósito'
                                        floatingLabelText='Nro. de Certificado de depósito'
                                        id='Nro. de Certificado de deposito'
                                        ref='Nro. de Certificado de deposito'
                                        value= {this.state['Nro. de Certificado de deposito']}
                                        onChange={this.handleControlledInputChange}
                                        />
                                    <TextField
                                        disabled={true}
                                        style={{cursor: 'default', height:'60px', width:'285px', color: 'black'}}
                                        floatingLabelStyle={{lineHeight:'10px', color: 'black'}}
                                        hintStyle={{bottom:'7px'}}
                                        underlineStyle={{width:'100%'}}
                                        hintText='Nro. de carta de porte'
                                        floatingLabelText='Nro. de carta de porte'
                                        id='Nro. de carta de porte'
                                        ref='Nro. de carta de porte'
                                        value= {this.state['Nro. de carta de porte']}
                                        onChange={this.handleControlledInputChange}
                                        />

                                </div>
                                <br/>
                                <br/>
                                <div>
                                    <Table
                                        height={'319px'}
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
                                                <TableHeaderColumn colSpan="8" tooltip="Seleccione la carta de porte correspondiente al Certificado de depósito." style={{textAlign: 'right'}}>
                                                    Seleccione la carta de porte correspondiente al Certificado de depósito.
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        label="Agregar gastos"
                                                        onTouchTap={this.handleAgregarGastos}
                                                        />
                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn tooltip="Carta de Porte">Carta de Porte</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Fecha Emision">Fecha Emision</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Bruto">KG. Bruto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Tara">KG. Tara</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="KG. Neto">KG. Neto</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Chofer cuil">Chofer cuil</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Chofer nombre">Chofer nombre</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Camion patente">Camion patente</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {true}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                            deselectOnClickaway={false}
                                            >
                                            {this.renderCPRows()}
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
                                <h1>Detalles de los gastos correspondientes a la carta de porte seleccionada</h1>
                                <p>Listado de todos los gastos correspondientes con a la carta de porte seleccionada:</p>
                                <div style={{marginTop: '-27px'}}>
                                    <Table
                                        height={'620px'}
                                        fixedHeader= {true}
                                        fixedFooter= {true}
                                        selectable= {false}
                                        multiSelectable= {false}
                                        >
                                        <TableHeader
                                            displaySelectAll= {false}
                                            adjustForCheckbox= {false}
                                            enableSelectAll= {false}
                                            >
                                            <TableRow>
                                                <TableHeaderColumn colSpan="4" tooltip="Al seleccionar los gastos, se calcularán los kilos, tarifas e importes." style={{textAlign: 'right'}}>
                                                    Al seleccionar los gastos, se calcularán los kilos, tarifas e importes.
                                                    <RaisedButton
                                                        style={{margin:'10px'}}
                                                        backgroundColor="#8BC34A"
                                                        label="Aceptar"
                                                        onTouchTap={this.handleAceptar}
                                                        />
                                                </TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn tooltip="Descripción">Descripción</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Kilos">Kilos</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Tarifa">Tarifa</TableHeaderColumn>
                                                <TableHeaderColumn tooltip="Importe">Importe</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox= {false}
                                            showRowHover= {true}
                                            stripedRows= {false}
                                            >
                                            {this.renderGastosRows()}
                                        </TableBody>
                                        <TableFooter
                                            adjustForCheckbox={false}
                                            >
                                        </TableFooter>
                                    </Table>
                                </div>

                                <Dialog
                                    title={"Se está por ingresar un nuevo certificado de depósito a la base de datos"}
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
                                    {"¿Está seguro de que los datos correspondientes al nuevo certificado son correctos?"}
                                </Dialog>
                                <Dialog
                                    title={"El certificado correspondiente a la CP Nro: " + this.state['Nro. de carta de porte'] + " fue ingresado a la base de datos con éxito"}
                                    actions={[
                                                <a target="_blank" href={'http://proyecto-final-prim.herokuapp.com/certificadosDeposito/pdf/' + this.state.newCertificadoId}>
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
                                                    onTouchTap={this.handleCloseAltaCertificadoModal}
                                                />
                                            ]}
                                    modal={false}
                                    open={this.state.altaCertificadoModal}
                                >
                                    {'Para ver el pdf correspondiente al nuevo certificado seleccione la opción "Ver PDF".\n Al seleccionar "OK", será redireccionado a la página de inicio de certificado de depósito.'}
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
                        {"Por favor complete los campos faltantes para continuar."}
                    </Dialog>
                </SwipeableViews>
            </div>
        )
    },
    handleOpenFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: true});
    },
    handleCloseFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: false});
    },


    handleAceptar: function () {

        if (this.state['Nro. de carta de porte'] === '' || this.state['Nro. de Certificado de deposito'] === '') {
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
        this.makeAceptarRequest();
        this.handleCloseAltaConfirmationModal();
        this.setState({altaCertificadoModal: true});
    },
    handleCloseAltaCertificadoModal: function () {
        this.setState({altaCertificadoModal: false});
        browserHistory.push('certificadoDeDeposito');
    },

    makeAceptarRequest: function () {
        var bodyRequested = {
            "gastos":[
                this.state['Gastos generales 1116A'],
                this.state['Secado'],
                this.state['Zaranda'],
                this.state['Acarreo'],
                this.state['Fumigada'],
                this.state['Gastos analisis'],
                this.state['Costo carta de porte'],
                this.state['Resolucion ONCCA 49-05'],
                this.state['IVA'],
                this.state['Sellado']
            ],
            "habilitado": true,
            "numero": this.state['Nro. de Certificado de deposito'],
            "ingreso": this.state['idCPSeleccionada']

        };
        var bodyJson = JSON.stringify(bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/update/' + this.state['certificadoID'] , {
            method: 'Put',
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
                this.setState({
                    'newCertificadoId': response.data['_id']
                });
            })
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

    renderGastosRows: function () {
        var rows = this.state.gastosDesc.map(this.renderGastosRow);

       // rows.push(this.renderIvaRow());
       // rows.push(this.renderSelladoRow());
        rows.push(this.renderTotalRow());

        return rows;
    },
    renderGastosRow: function (detalle, index) {

        if (detalle) {
            return(
                <TableRow key={index} >
                    <TableRowColumn>
                        {this.state[detalle].descripcion}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state[detalle].kilos}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.state[detalle].tarifa}
                    </TableRowColumn>
                    <TableRowColumn>
                        {this.round(this.state[detalle].importe, 2)}
                    </TableRowColumn>
                </TableRow>
            )
        }
    },
    renderIvaRow: function () {

        return(
            <TableRow  >
                <TableRowColumn>
                    {this.state['IVA'].descripcion}
                </TableRowColumn>
                <TableRowColumn>
                    {this.state['IVA'].kilos}
                </TableRowColumn>
                <TableRowColumn>
                    {this.state['IVA'].tarifa}
                </TableRowColumn>
                <TableRowColumn>
                    {this.round(this.state['IVA'].importe, 2)}
                </TableRowColumn>
            </TableRow>
        )
    },
    renderSelladoRow: function () {

        return(
            <TableRow  >
                <TableRowColumn>
                    {this.state['Sellado'].descripcion}
                </TableRowColumn>
                <TableRowColumn>
                    {this.state['Sellado'].kilos}
                </TableRowColumn>
                <TableRowColumn>
                    {this.state['Sellado'].tarifa}
                </TableRowColumn>
                <TableRowColumn>
                    {this.round(this.state['Sellado'].importe, 2)}
                </TableRowColumn>
            </TableRow>
        )
    },
    renderTotalRow: function () {

        return(
            <TableRow  >
                <TableRowColumn>
                    <span style={{fontWeight: '900'}}>Total:</span>
                </TableRowColumn>
                <TableRowColumn>
                    <span></span>
                </TableRowColumn>
                <TableRowColumn>
                    <span></span>
                </TableRowColumn>
                <TableRowColumn>
                    <span style={{fontWeight: '900'}}>{this.round(this.calculateTotal(), 2)}</span>
                </TableRowColumn>
            </TableRow>
        )
    },

    handleRowSelection: function (selectedRows) {
        var index = selectedRows[0];

        this.setState({
            'Nro. de carta de porte': this.state.cps[index]['nro_cp'],
            'idCPSeleccionada': this.state.cps[index]['_id'],
        });

    },
    handleChange: function (value) {
        this.setState({
            slideIndex: value
        });
    },

    calculateTotal: function () {
        var total =
            this.state['Gastos generales 1116A'].importe +
            this.state['Secado'].importe +
            this.state['Zaranda'].importe +
            this.state['Acarreo'].importe +
            this.state['Fumigada'].importe +
            this.state['Gastos analisis'].importe +
            this.state['Costo carta de porte'].importe +
            this.state['Resolucion ONCCA 49-05'].importe;
        return total;
    },

    handleAgregarGastos: function () {
        var request;
        var selladoRequest;
        var ivaRequest;

        this.makeAgregarCertificadoRequest();
        this.handleChange(1);

        this.state.gastosDesc.forEach(function (gastoDesc) {
            request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/gastos/' +
                this.state.idCPSeleccionada + '/' + gastoDesc, {
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
                        [gastoDesc]: response.data
                    });
                });
        }.bind(this));

        ivaRequest = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/gastos/' +
            this.state.idCPSeleccionada + '/IVA?subtotal=' + this.calculateTotal(), {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        fetch(ivaRequest)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    ['IVA']: response.data
                });
            });
        selladoRequest = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/gastos/' +
            this.state.idCPSeleccionada + '/Sellado?subtotal=' + this.calculateTotal(), {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        fetch(selladoRequest)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    ['Sellado']: response.data
                });
            });
    },

    makeAgregarCertificadoRequest: function () {
        var bodyRequested = {
            "numero" : this.state['Nro. de Certificado de deposito'],
            "ingreso" : this.state.idCPSeleccionada,
            "habilitado" : true
        };
        var bodyJson = JSON.stringify(bodyRequested);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/certificadosDeposito/create', {
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
                this.setState({
                    ['certificadoID']: response.data['_id']
                });
            });
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

    //***********************LOS METODOS CORRESPONDIENTES A LA ULTIMA PESTAÑA DE CARTAS DE PORTE

    makeCPRequest: function () {
        fetch(this.getCPRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.setState({
                    cps: response.data
                });
            })
    },
    getCPRequest: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/ingresoCereal/getAll', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },

    renderCPRows: function () {
        var items = this.state.cps;
        if (items) {
            return (items.map(this.renderCPRow))
        }
    },

    renderCPRow: function (row, index) {
        return(
            <TableRow key={index} selected={row.selected} >
                <TableRowColumn>{row['nro_cp']}</TableRowColumn>
                <TableRowColumn>{row['fecha_emision']}</TableRowColumn>
                <TableRowColumn>{row['kg_bruto']}</TableRowColumn>
                <TableRowColumn>{row['kg_tara']}</TableRowColumn>
                <TableRowColumn>{row['kg_neto']}</TableRowColumn>
                <TableRowColumn>{row.chofer['cuil']}</TableRowColumn>
                <TableRowColumn>{row.chofer['nombre']}</TableRowColumn>
                <TableRowColumn>{row['patente']}</TableRowColumn>
            </TableRow>
        )
    },


    updateFilterFields: function (field, event, date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();


        if (field === 'Fecha desde') {
            this.setState({
                fechaDesde: year + '-' + month + '-' + day
            });
        }
        if (field === 'Fecha hasta') {
            this.setState({
                fechaHasta: year + '-' + month + '-' + day
            });
        }

        this.filter();
    },
    filter: function () {

        var request = new Request(
            'http://proyecto-final-prim.herokuapp.com/ingresoCereal/filtrar?' +
            this.returnFilterFields('fechaDesde') +
            this.returnFilterFields('fechaHasta') +
            this.returnFilterFields('chofer') +
            this.returnFilterFields('productor') +
            this.returnFilterFields('cp') ,
            {
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
                    cps: response.data
                });

            })

    },
    returnFilterFields: function (field) {
        var section = '';
        var fechaDesde = this.state.fechaDesde;
        var fechaHasta = this.state.fechaHasta;
        var currentChoferCuil = this.state.currentChoferCuil;
        var choferSeleccionado = null;
        var currentProductorCuil = this.state.currentProductorCuil;
        var productorSeleccionado = '';
        var cartaDePorte = this.state['Carta de porte'];

        this.state.allChoferesEntities.forEach(function (chofer) {
            if (chofer['cuil'] === currentChoferCuil) {
                choferSeleccionado = chofer['_id'];
            }
        });

        this.state.allProductoresEntities.forEach(function (productor) {
            if (productor['cuil'] === currentProductorCuil) {
                productorSeleccionado = productor['_id'];
            }
        });


        if (field === 'fechaDesde' && fechaDesde !== '') {
            section =  ('&fechaDesde=' + fechaDesde)
        }
        if (field === 'fechaHasta' && fechaHasta !== '') {
            section =   ('&fechaHasta=' + fechaHasta)
        }
        if (field === 'chofer' && choferSeleccionado !== null) {
            section =  ('&chofer=' + choferSeleccionado)
        }
        if (field === 'productor' && productorSeleccionado !== '') {
            section =   ('&productor=' + productorSeleccionado)
        }
        if (field === 'cp' && cartaDePorte !== '') {
            section =   ('&nro_cp=' + cartaDePorte)
        }
        return section
    },



});

export default CertificadoDeDepositoNuevo;
