import React from 'react';
import _ from 'lodash';

import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import DoneAllIcon from 'react-material-icons/icons/action/done-all';


const styles = {
    mainDiv: {
        alignItems:'center',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0 70px 0'
    },

    mainPaper:{
        padding: '20px',
        width: '620px'
    },
    formFieldsDiv: {
        padding:'0 40px'
    },
    botonAltaAceptar: {
        margin: 12,
        float: 'right'
    },
    toggle: {
        marginBottom: 16
    }
};

var AltaForm = React.createClass ({

    propTypes: {
        type: React.PropTypes.string,
        entity: React.PropTypes.string,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                label: React.PropTypes.string,
                type: React.PropTypes.string
            })
        ),
        requestParameters: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            type: 'Alta',
            items: []
        };
    },

    getInitialState: function () {
        return {
            rubrosSelected: [],
            currentRubrosDeEspecie: [],
            transportistasCod: [],
            localidadesDesc: [],
            productoresCuil: [],
            rubrosDesc: [],
            especiesDesc: [],
            ivas: ['Régimen Simplificado', 'Responsable Inscripto', 'Exento', 'Consumidor Final'],
            estadoCamiones: ['Disponible', 'No disponible'],

            altaConfirmationModal: false,
            altaABMModal: false,
            fieldsMissingModal: false
        }

    },
    componentDidMount: function() {
        //FETCHES THE CORRESPONDIN VALUES FOR THE DROPDOWNS FIELDS

        //ALTA && MOD
        if (this.props.type === 'Alta' || this.props.type === 'Modificacion') {
            //CHOFER
            if (this.props.entity === 'chofer') {
                this.getAllTransportistas();
            }
            //ESPECIE
            if (this.props.entity === 'especie') {
                this.getAllRubros();
            }
            //PRODUCTOR
            if (this.props.entity === 'productor') {
                this.getAllTransportistas();
            }
            //CAMPO
            if (this.props.entity === 'campo') {
                this.getAllProductores();
            }
            //MERMASHUMEDAD
            if (this.props.entity === 'mermasHumedad') {
                this.getAllEspecies();
            }

        }

        //BAJA
        if (this.props.type === 'Baja') {
            //this.makeModRequest();
        }

        //MOD
        if (this.props.type === 'Modificacion') {
            this.makeModRequest();
        }
    },

    render() {
        return (
            <div style={styles.mainDiv}>
                <Paper zDepth={3} style={styles.mainPaper}>
                    <h1>{this.props.type} de {this.props.entity}</h1>

                    <div style={styles.formFieldsDiv}>
                        {this.props.items.map(this.renderItems)}
                    </div>

                    <RaisedButton
                        icon={<DoneAllIcon style={{paddingBottom: '6px'}} />}
                        style={styles.botonAltaAceptar}
                        backgroundColor="#8BC34A"
                        label="Aceptar"
                        onTouchTap={this.handleAceptar}
                        />
                </Paper>

                <Dialog
                    title={"Se esta por ingresar un nuevo registro a la base de datos"}
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
                    {"Esta seguro que los datos correspondientes son correctos?"}
                </Dialog>
                <Dialog
                    title={"El nuevo registro fue ingresado a la base de datos con exito"}
                    actions={[
                                                <FlatButton
                                                    label="OK"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleCloseAltaABMModal}
                                                />
                                            ]}
                    modal={false}
                    open={this.state.altaABMModal}
                    >
                    {'Sera redireccionado a la pagina de inicio.'}
                </Dialog>




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


            </div>
        );

    },

    renderItems: function (item, key) {
        var label;
        var node;


        if (item.type === 'input') {
            node = (
                <TextField
                    errorText={this.state[item.label + 'error']}
                    style={{height:'60px', display:'block'}}
                    underlineStyle={{borderColor: '#8BC34A'}}
                    underlineFocusStyle={{borderColor: '#4CAF50'}}
                    floatingLabelFocusStyle={{color: '#4CAF50'}}
                    floatingLabelStyle={{lineHeight:'10px'}}
                    hintStyle={{bottom:'7px'}}
                    fullWidth
                    ref={[item.label]}
                    onChange={this.handleControlledInputChange}
                    onBlur={this.handleControlledInputBlur}
                    value= {this.state[item.label]}
                    hintText= {this.toTitleCase(item.label)}
                    floatingLabelText= {this.toTitleCase(item.label)}
                    key= {key}
                    id={item.label}
                />
            );
        }

        if (item.type === 'password') {
            node = (
                <TextField
                    errorText={this.state[item.label + 'error']}
                    onBlur={this.handleControlledInputBlur}
                    style={{height:'60px'}}
                    floatingLabelStyle={{lineHeight:'10px'}}
                    hintStyle={{bottom:'7px'}}
                    ref={[item.label]}
                    onChange={this.handleControlledInputChange}
                    value= {this.state[item.label]}
                    hintText={this.toTitleCase(item.label)}
                    floatingLabelText={this.toTitleCase(item.label)}
                    type="password" fullWidth
                    key= {key}
                    id={item.label}
                />
            );
        }

        if (item.type === 'toggle') {
            node = (
                <Toggle
                    style={{marginBottom: '16',marginTop: '26px'}}
                    labelStyle={{width:'auto', marginRight:'142px'}}
                    ref={[item.label]}
                    label= {this.toTitleCase(item.label)}
                    key= {key}
                    defaultToggled={this.getDefaultToggleValue()}
                    onToggle={this.setHabilitadoValue}
                    id={item.label}
                />
            );
        }

        if (item.type === 'select-field') {
            node = (
                <SelectField
                    style={{display:'block', marginTop: '-26px', width:'100%'}}
                    menuStyle={{width:'100%'}}
                    labelStyle={{top:'28px'}}
                    underlineStyle={{borderColor: '#8BC34A'}}
                    underlineFocusStyle={{borderColor: '#4CAF50'}}
                    floatingLabelFocusStyle={{color: '#4CAF50'}}
                    ref={[item.label]}
                    floatingLabelText={this.toTitleCase(item.label)}
                    value={this.getControlledSelectFieldValue(item.label)}
                    onChange={this.handleControlledSelectFieldValueChange.bind(this, item.label)}
                    maxHeight={200}
                    key= {key}
                    id={item.label}
                >
                    {this.renderSelectFieldsValues(item.label)}
                </SelectField>
            );
        }

        if (item.type === 'date-picker') {
            node = (
                <DatePicker
                    style={{marginTop: '-7px', width: '100%'}}
                    labelStyle={{top:'28px'}}
                    textFieldStyle={{height: '67px', width: '100%'}}
                    underlineStyle={{borderColor: '#8BC34A'}}
                    underlineFocusStyle={{borderColor: '#4CAF50'}}
                    floatingLabelFocusStyle={{color: '#4CAF50'}}
                    floatingLabelText={this.toTitleCase(item.label)}
                    autoOk={true}
                    cancelLabel='Cerrar'
                    ref={[item.label]}
                    hintText={this.toTitleCase(item.label)}
                    mode="landscape"
                    key= {key}
                    />
            );
        }

        if (item.type === 'checkbox-group') {
            node = (
                <div style={{paddingTop: '5px'}}>
                    <p>Rubros: </p>
                    {this.renderRubrosCheckBoxGroup()}
                </div>
                
            );
        }

        return node;
    },

    toTitleCase: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    renderRubrosCheckBoxGroup: function () {
        var group = this.state.rubrosDesc.map(this.renderRubroCheckBox);
        
        return group
    },
    renderRubroCheckBox: function (value, key) {
        return (
            <Checkbox
                onCheck={this.rubroCheckboxSelect.bind(this, value)}
                label={value}
                style={styles.checkbox}
                defaultChecked={this.defaultRubroCheckbox(value)}
            />
        )
    },
    cleanRubrosDeEspecie: function () {
        var rubrosDeEspecies = this.state.currentRubrosDeEspecie;
        var rubros = [];

        rubrosDeEspecies.forEach(function (r) {
            rubros.push(r['rubro']);
        });

        this.setState({
            currentRubrosDeEspecie: rubros
        });

    },
    defaultRubroCheckbox: function (value) {
        var currentRubros = this.state.currentRubrosDeEspecie;
        var checked = false;


        this.state.allRubrosEntities.forEach(function (rubro) {
            currentRubros.forEach(function (rubroDeEspecie) {
                 if (rubro['_id'] === rubroDeEspecie && rubro['descripcion'] === value) {
                     checked = true
                 }
            });
        });

        return checked

    },

    rubroCheckboxSelect: function (value, event, checked) {
        var rubrosSelected = this.state.rubrosSelected;

        this.state.allRubrosEntities.forEach( function (rubro, index) {
                if (rubro.descripcion === value) {
                    if (checked === true) {
                        rubrosSelected.push(rubro["_id"]);
                    }

                    if (checked === false) {
                        _.pull(rubrosSelected, rubro["_id"]);
                    }
                }
        });

        this.setState({
            rubrosSelected: rubrosSelected
        });

    },
    //SETS THE VALUES FOR THE CORRESPONDING DROPDOWNS
    renderSelectFieldsValues: function (label) {
        var values;

      /*  if (label === 'localidad') {
            values = this.state.localidadesDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }*/
        if (label === 'transportista') {
            values = this.state.transportistasCod.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'productor') {
            values = this.state.productoresCuil.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'descripcion') {
            values = this.state.especiesDesc.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'iva') {
            values = this.state.ivas.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }
        if (label === 'estado') {
            values = this.state.estadoCamiones.map(function (value, key) {
                return <MenuItem value={value} key={key} primaryText={value}/>
            })
        }

        return values
    },
    //HANDLERS FOR CONTROLLED FIELDS VALUE CHANGES
        //crea y updetea estados segun los labels de los campos que tengo
        //le mete el valor actual del campo
        //ejemplo ---- cuil: 32435574
    handleControlledInputChange: function (event) {
        this.setState({
            [event.target.id]: event.target.value,
            [event.target.id + 'error']: ''
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
    handleOpenFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: true});
    },
    handleCloseFieldsMissingModal: function () {
        this.setState({fieldsMissingModal: false});
    },
   
   
        //guarda el valor actual de cada dropdown en un estado aparte
        //solo updetea el estado del valor seleccionado para cada field
    handleControlledSelectFieldValueChange: function (label, event, key, payload) {

       /* if (label === 'localidad') {
            this.setState({
                currentLocalidadDesc: payload
            });
        }*/
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
        //permite cambiar el valor de cada droppdown ya que son controladas
        //lo hacen entre este metodo y el de arriba
        //el de arriba updetea el estado segun el valor elegido y este metodo pasa ese estado al valor del field
        //solo muestra el estado en el field como valor seleccionado
    getControlledSelectFieldValue: function (label) {
        var value='';

       /* if (label === 'localidad') {
            value = this.state.currentLocalidadDesc;
        }*/
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

    //GETS THE VALUES FROM THE DIFFERENT FIELDS ON THE FORM ONCE SUBMITTED
    //aca esta la magia
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
    //EXECUTED ONCE THE FORM IS SUBMITTED, CREATES OBJECT FOR THE API AND SENDS IT
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
            this.handleOpenAltaConfirmationModal();
        }
    },

    handleSubmit: function () {
        var keys = (Object.keys(this.refs));
        var values = keys.map(this.getRefsValues);
        var object = {};

        keys.map(function (key, index) {
                object[key] = values[index]
            });

        if (this.props.entity === 'mermasHumedad')  {
            var especieSelecionada;

            this.state.allEspeciesEntities.forEach(function (especie) {
                if (especie['descripcion'] === object['descripcion']) {
                    especieSelecionada = _.extend(especieSelecionada, especie);
                }
            });

            object = _.omit(object, ['descripcion']);
            object = _.extend(object, {especie: especieSelecionada['_id']});
        }

        if (this.props.entity === 'campo')  {
            var productorSelecionado;

            this.state.allProductoresEntities.forEach(function (productor) {
                if (productor['cuil'] === object['productor']) {
                    productorSelecionado = _.extend(productorSelecionado, productor);
                }
            });

            object = _.omit(object, ['productor']);
            object = _.extend(object, {productor: productorSelecionado['_id']});

        }

        if (this.props.entity === 'chofer')  {
            var transportistaSelecionado;
            this.state.allTransportistasEntities.forEach(function (transportista) {
                if (transportista['razon_social'] === object['transportista']) {
                    transportistaSelecionado = _.extend(transportistaSelecionado, transportista);
                }
            });

            object = _.omit(object, ['transportista']);
            object = _.extend(object, {transportista: transportistaSelecionado['_id']});
        }

        if (this.props.entity === 'especie')  {
            var rubrosSeleccionados = [];
            var rubrosSeleccionadosID = this.state.rubrosSelected;

            rubrosSeleccionadosID.forEach(function (rubroID, index) {
                rubrosSeleccionados.push({"rubro": rubroID})
            });
            object = _.omit(object, ['transportista']);
            object = _.extend(object, {rubros: rubrosSeleccionados});
        }

        if (this.props.type === 'Alta') {
            this.handleAltaRequest(object);
        }

        if (this.props.type === 'Modificacion') {
            this.handleModRequest(object);
        }
    },
    handleAltaRequest: function (requestBody) {
        var entidad = this.getEntidad();
        var bodyJson = JSON.stringify(requestBody);
        var request = new Request('http://proyecto-final-prim.herokuapp.com/' + entidad + '/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyJson
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
            })
    },
    handleModRequest: function (requestBody) {
        var entidad = this.getEntidad();
        var bodyJson = JSON.stringify(requestBody);

        var request = new Request('http://proyecto-final-prim.herokuapp.com/' + entidad + '/update/' + this.props.requestParameters.identifier, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: bodyJson
        });

        fetch(request)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
            })
    },

    

    handleOpenAltaConfirmationModal: function (event) {
        this.setState({altaConfirmationModal: true});

    },
    handleCloseAltaConfirmationModal: function () {
        this.setState({altaConfirmationModal: false});
    },

    handleAltaConfirmationModal: function () {
        this.handleSubmit();
        this.handleCloseAltaConfirmationModal();
        this.setState({altaABMModal: true});
    },
    handleCloseAltaABMModal: function () {
        this.setState({altaABMModal: false});
        browserHistory.push('/welcome');
    },

//***************DE ACA PARA ABAJO NO HAY MUCHA MAGIA ********************************

    //SOLO PARA MODIFICACION******************
    //FOR MODIFICACION, SETS THE ORIGINAL VALUES FROM THE API, ON THE FORM FIELDS
    setFieldsValues: function (key, index) {
        this.setState({
            [key]: this.state.fieldsInitialValues[index]
        });
    },
    //EXECUTED ON MOUNT FOR WHENEVER MOD IS USED, FETCHES DATA FROM API
    //este metodo es el que guarda el valor que viene del modlist por primera vez
    makeModRequest: function () {
        fetch(this.getRequest())
            .then((response) => {
                return response.json()
            })
            .then((response) => {

                if (response.data) {
                    var values = Object.values(response.data);
                    var keys = Object.keys(response.data);

                    this.setState({
                        items: response.data,
                        fieldsInitialValues: values
                    }, function () {

                    });

                    //TO LOAD THE CURRENT VALUE FOR THE DROPDOWN FIELDS
                    if (this.props.entity === 'chofer') {
                        this.setState({
                            currentRazonSocialTransportista: response.data.transportista['razon_social'],
                            currentIva: response.data.iva
                        });
                    }
                    if (this.props.entity === 'camion') {
                        this.setState({
                            currentEstadoCamion: response.data.estado
                        });
                    }
                    if (this.props.entity === 'campo') {
                        this.setState({
                            currentProductorCuil: response.data.productor['cuil']
                        });
                    }
                    if (this.props.entity === 'mermasHumedad') {
                        if (response.data.especie) {
                            this.setState({
                                currentEspecieDesc: response.data.especie['descripcion']
                            });
                        } else {
                            this.setState({
                                currentEspecieDesc: 'Sin especificar'
                            });
                        }

                    }
                    if (this.props.entity === 'especie') {
                        if (response.data.rubros) {
                            this.setState({
                                currentRubrosDeEspecie: response.data.rubros
                            });
                            this.cleanRubrosDeEspecie();
                        }
                    }

                    keys.forEach(this.setFieldsValues);

                } else {
                }

            })
    },
    
    getRequest: function () {
        var request = new Request('https://proyecto-final-prim.herokuapp.com/' + this.props.requestParameters.url, {
            method: this.props.requestParameters.method,
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });

        return request
    },
    //****************************************

    //SET AND GET HABILITADO VALUE
    getDefaultToggleValue: function () {
        if (this.state.items) {
            return this.state.habilitado
        } else {return false}
    },
    setHabilitadoValue: function () {
        this.setState({
            habilitado: !this.state.habilitado
        });
    },
    //GETS ALL THE VALUES FROM THE API FOR THE CORRESPONDING DROPDOWNS
    //solo se usan para llenar los valors de los estados cuando recien renderisa el componente
    //PARA LOS DROPDOWNS
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
                    transportistasCod: response.data.map(function (transportista) {
                        return transportista['razon_social']
                    })
                });
            })
    },
    getAllRubros: function () {
        var request = new Request('http://proyecto-final-prim.herokuapp.com/rubros/getAll', {
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
                    allRubrosEntities: response.data,
                    rubrosDesc: response.data.map(function (rubro) {
                        return rubro['descripcion']
                    })
                });
            })
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
    //El metodo mas pedorro
    getEntidad: function () {
        var entidad;

        if (this.props.entity === 'empleado') {
            entidad = 'empleados'
        }
        if (this.props.entity === 'usuario') {
            entidad = 'users'
        }
        if (this.props.entity === 'chofer') {
            entidad = 'choferes'
        }
        if (this.props.entity === 'transportista') {
            entidad = 'transportistas'
        }
        if (this.props.entity === 'productor') {
            entidad = 'productores'
        }
        if (this.props.entity === 'cereal') {
            entidad = 'cereales'
        }
        if (this.props.entity === 'especie') {
            entidad = 'especies'
        }
        if (this.props.entity === 'tarifa') {
            entidad = 'tarifas'
        }
        if (this.props.entity === 'mermasHumedad') {
            entidad = 'mermasHumedad'
        }
        if (this.props.entity === 'rubro') {
            entidad = 'rubros'
        }
        if (this.props.entity === 'camion') {
            entidad = 'camiones'
        }
        if (this.props.entity === 'destino') {
            entidad = 'destinos'
        }
        if (this.props.entity === 'campo') {
            entidad = 'campos'
        }
        if (this.props.entity === 'cosecha') {
            entidad = 'cosechas'
        }
        if (this.props.entity === 'empresa') {
            entidad = 'empresas'
        }
        if (this.props.entity === 'puerto') {
            entidad = 'puertos'
        }

        return entidad;
    }
});

export default AltaForm;