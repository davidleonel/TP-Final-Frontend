import React from 'react';

import ABMForm from './abms/abm-form';
import EntityBajaList from './abms/entity-baja-list';
import EntityModList from './abms/entity-mod-list';


//ALTAS FORM FIELDS
//estos label deben coincidir con los nombre en los campos de la BD
const camionAltaFormFields = [
    {label: 'patente', type: 'input'},
    {label: 'marca', type: 'input'},
    {label: 'modelo', type: 'input'},
    {label: 'año', type: 'input'}, //nro
    {label: 'estado', type: 'select-field'},
    {label: 'capacidad', type: 'input'},//nro
    {label: 'fecha_seguro', type: 'date-picker'},
    {label: 'habilitado', type: 'toggle'}
];
const choferAltaFormFields = [
    {label: 'nombre', type: 'input'},
    {label: 'apellido', type: 'input'},
    {label: 'cuil', type: 'input'},
    {label: 'dni', type: 'input'},
    {label: 'fecha de nacimiento', type: 'date-picker'},
    {label: 'localidad', type: 'input'},
    {label: 'direccion', type: 'input'},
    {label: 'telefono', type: 'input'},
    {label: 'nro_carnet', type: 'input'},
    {label: 'transportista', type: 'select-field'},
    {label: 'iva', type: 'select-field'},
    {label: 'habilitado', type: 'toggle'}
];
const cosechaAltaFormFields = [
    {label: 'descripcion', type: 'input'},
    {label: 'habilitado', type: 'toggle'}
];
const destinoAltaFormFields = [
    {label: 'descripcion', type: 'input'},
    {label: 'domicilio', type: 'input'},
    {label: 'localidad', type: 'input'},
    {label: 'provincia', type: 'input'},
    {label: 'pais', type: 'select-field'},
    {label: 'habilitado', type: 'toggle'}
];
const especieAltaFormFields = [
    {label: 'descripcion', type: 'input'},
    {label: 'habilitado', type: 'toggle'}
];
const mermasHumedadAltaFormFields = [
    {label: 'descripcion', type: 'select-field'}, //falta indicar que la descripcion es de la especie
    {label: 'porc_humedad', type: 'input'},
    {label: 'porc_merma_humedad', type: 'input'},
    {label: 'habilitado', type: 'toggle'}
];
const productorAltaFormFields = [
    {label: 'nombre', type: 'input'},
    {label: 'apellido', type: 'input'},
    {label: 'cuil', type: 'input'},
    {label: 'dni', type: 'input'},
    {label: 'fecha de nacimiento', type: 'date-picker'},
    {label: 'telefono', type: 'input'},
    {label: 'direccion', type: 'input'},
    {label: 'localidad', type: 'input'},
    {label: 'iva', type: 'select-field'},
    {label: 'habilitado', type: 'toggle'}
];
const rubroAltaFormFields = [
    {label: 'descripcion', type: 'input'},
    {label: 'habilitado', type: 'toggle'}
];
const tarifaAltaFormFields = [
    {label: 'descripcion', type: 'input'},
    {label: 'tarifa', type: 'input'},// nro
    {label: 'habilitado', type: 'toggle'}
];
const transportistaAltaFormFields = [
    {label: 'razon_social', type: 'input'},
    {label: 'cuit', type: 'input'},
    {label: 'telefono', type: 'input'},
    {label: 'localidad', type: 'input'},
    {label: 'domicilio', type: 'input'},
    {label: 'iva', type: 'select-field'},
    {label: 'habilitado', type: 'toggle'}
];
const empleadoAltaFormFields = [
    {label: 'nombre', type: 'input'},
    {label: 'apellido', type: 'input'},
    {label: 'cuil', type: 'input'},
    {label: 'dni', type: 'input'},
    {label: 'direccion', type: 'input'},
    {label: 'telefono', type: 'input'},
    {label: 'fecha de nacimiento', type: 'date-picker'},
    {label: 'habilitado', type: 'toggle'}
];
const usuarioAltaFormFields = [
    {label: 'usuario', type: 'input'},
    {label: 'contraseña', type: 'password'},
    {label: 'habilitado', type: 'toggle'}
];
const campoAltaFormFields = [
    {label: 'productor', type: 'select-field'}, // cuil
    {label: 'nombre', type: 'input'},
    {label: 'localidad', type: 'input'},
    {label: 'direccion', type: 'input'},
    {label: 'hectareas', type: 'input'},
    {label: 'habilitado', type: 'toggle'}
];
const empresaAltaFormFields = [
    {label: 'razon_social', type: 'input'},
    {label: 'cuit', type: 'input'},
    {label: 'localidad', type: 'input'},
    {label: 'domicilio', type: 'input'},
    {label: 'iva', type: 'select-field'},
    {label: 'habilitado', type: 'toggle'}
];

/*const cerealAltaFormFields = [
    {label: 'nro cp', type: 'select-field'},
    {label: 'fecha de emision', type: 'date-picker'},
    {label: 'ctg', type: 'input'},
    {label: 'flete corto', type: 'toggle'},
    {label: 'fecha de arribo', type: 'date-picker'},
    {label: 'cod productor', type: 'select-field'},
    {label: 'cee', type: 'input'},
    {label: 'fecha de vencimiento', type: 'date-picker'}
];*/ //FALTA DECIDIR QUE HACER CON EL CEREAL

//HEADERS FOR THE MODLIST
const headersMod = {
    camion: ['patente', 'marca', 'modelo', 'estado'],
    campo: ['nombre', 'direccion', 'hectareas', 'localidad'],
    chofer: ['dni', 'nombre', 'apellido', 'nro_carnet'],
    cosecha: ['descripcion'],
    destino: ['descripcion', 'domicilio', 'localidad', 'provincia', 'pais'],
    empleado: ['dni', 'cuil', 'nombre', 'apellido'],
    empresa: ['razon_social', 'cuit', 'domicilio', 'localidad'],
    especie: ['descripcion'],
    mermasHumedad: ['especie', 'porc_humedad', 'porc_merma_humedad'],
    productor: ['cuil', 'dni', 'nombre', 'apellido', 'localidad'],
    rubro: ['descripcion'],
    tarifa: ['descripcion', 'tarifa'],
    transportista: ['cuit', 'razon_social', 'localidad'],
    usuario: ['usuario', 'contraseña']
};

//URLs TO MAKE REQUEST for modLIST** to GETALL
const requestParameters = {
    //EMPLEADO
    empleadoAlta: {
        url: 'empleados/create',
        method: 'POST'
    },
    empleadoBaja: {
        url: 'empleados/getAll',
        method: 'GET'
    },
    empleadoModList: {
        url: 'empleados/getAll',
        method: 'GET'
    },
    //USUARIO
    usuarioAlta: {
        url: 'users/create',
        method: 'POST'
    },
    usuarioBaja: {
        url: 'users/getAll',
        method: 'GET'
    },
    usuarioModList: {
        url: 'users/getAll',
        method: 'GET'
    },
    //CHOFER
    choferAlta: {
      url: 'choferes/create',
      method: 'POST'
    },
    choferBaja: {
        url: 'choferes/getAll',
        method: 'GET'
    },
    choferModList: {
        url: 'choferes/getAll',
        method: 'GET'
    },
    //TRANSPORTISTA
    transportistaAlta: {
        url: 'transportistas/create',
        method: 'POST'
    },
    transportistaBaja: {
        url: 'transportistas/getAll',
        method: 'GET'
    },
    transportistaModList: {
        url: 'transportistas/getAll',
        method: 'GET'
    },
    //PRODUCTOR
    productorAlta: {
        url: 'productores/create',
        method: 'POST'
    },
    productorBaja: {
        url: 'productores/getAll',
        method: 'GET'
    },
    productorModList: {
        url: 'productores/getAll',
        method: 'GET'
    },
    //CEREAL
    cerealAlta: {
        url: 'cereales/create',
        method: 'POST'
    },
    cerealBaja: {
        url: 'cereales/getAll',
        method: 'GET'
    },
    cerealModList: {
        url: 'cereales/getAll',
        method: 'GET'
    },
    //ESPECIE
    especieAlta: {
        url: 'especies/create',
        method: 'POST'
    },
    especieBaja: {
        url: 'especies/getAll',
        method: 'GET'
    },
    especieModList: {
        url: 'especies/getAll',
        method: 'GET'
    },
    //TARIFA
    tarifaAlta: {
        url: 'tarifas/create',
        method: 'POST'
    },
    tarifaBaja: {
        url: 'tarifas/getAll',
        method: 'GET'
    },
    tarifaModList: {
        url: 'tarifas/getAll',
        method: 'GET'
    },
    //MERMASHUMEDAD
    mermasHumedadAlta: {
        url: 'mermasHumedad/create',
        method: 'POST'
    },
    mermasHumedadBaja: {
        url: 'mermasHumedad/getAll',
        method: 'GET'
    },
    mermasHumedadModList: {
        url: 'mermasHumedad/getAll',
        method: 'GET'
    },
    //RUBRO
    rubroAlta: {
        url: 'rubros/create',
        method: 'POST'
    },
    rubroBaja: {
        url: 'rubros/getAll',
        method: 'GET'
    },
    rubroModList: {
        url: 'rubros/getAll',
        method: 'GET'
    },
    //CAMION
    camionAlta: {
        url: 'camiones/create',
        method: 'POST'
    },
    camionBaja: {
        url: 'camiones/getAll',
        method: 'GET'
    },
    camionModList: {
        url: 'camiones/getAll',
        method: 'GET'
    },
    //DESTINO
    destinoAlta: {
        url: 'destinos/create',
        method: 'POST'
    },
    destinoBaja: {
        url: 'destinos/getAll',
        method: 'GET'
    },
    destinoModList: {
        url: 'destinos/getAll',
        method: 'GET'
    },
    //CAMPO
    campoAlta: {
        url: 'campos/create',
        method: 'POST'
    },
    campoBaja: {
        url: 'campos/getAll',
        method: 'GET'
    },
    campoModList: {
        url: 'campos/getAll',
        method: 'GET'
    },
    //COSECHA
    cosechaAlta: {
        url: 'cosechas/create',
        method: 'POST'
    },
    cosechaBaja: {
        url: 'cosechas/getAll',
        method: 'GET'
    },
    cosechaModList: {
        url: 'cosechas/getAll',
        method: 'GET'
    },
    //EMPRESA
    empresaAlta: {
        url: 'empresas/create',
        method: 'POST'
    },
    empresaBaja: {
        url: 'empresas/getAll',
        method: 'GET'
    },
    empresaModList: {
        url: 'empresas/getAll',
        method: 'GET'
    }
    
    
    
/*    choferMod: {
        url: 'choferes/update/' + this.props.params.identifier,
        identifier: this.props.params.identifier,
        method: 'PUT'
    }*/
};

var RoutingComponent = React.createClass ({

    getInitialState: function () {
        return {
            open: false
        }
    },

    render() {
        return <div>
            {this.fetchABMComponent()}
            {this.fetchModId()}
        </div>
    },

    fetchABMComponent: function () {
        var forward = this.props.params.type;
        var mainContent = '';

        //EMPLEADO
        if (forward === 'empleadoAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='empleado' items={empleadoAltaFormFields} requestParameters={requestParameters.empleadolAlta} />)
        }
        if (forward === 'empleadoBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='empleado' headers={headersMod.empleado} requestParameters={requestParameters.empleadoBaja} />)
        }
        if (forward === 'empleadoModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='empleado' headers={headersMod.empleado} requestParameters={requestParameters.empleadoModList} />)
        }
        //USUARIO
        if (forward === 'usuarioAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='usuario' items={usuarioAltaFormFields} requestParameters={requestParameters.usuariolAlta} />)
        }
        if (forward === 'usuarioBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='usuario' headers={headersMod.usuario} requestParameters={requestParameters.usuarioBaja} />)
        }
        if (forward === 'usuarioModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='usuario' headers={headersMod.usuario} requestParameters={requestParameters.usuarioModList} />)
        }
        //CHOFER
        if (forward === 'choferAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='chofer' items={choferAltaFormFields} requestParameters={requestParameters.choferMod} />)
        }
        if (forward === 'choferBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='chofer' headers={headersMod.chofer} requestParameters={requestParameters.choferBaja} />)
        }
        if (forward === 'choferModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='chofer' headers={headersMod.chofer} requestParameters={requestParameters.choferModList} />)
        }
        //TRANSPORTISTA
        if (forward === 'transportistaAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='transportista' items={transportistaAltaFormFields} requestParameters={requestParameters.transportistaAlta} />)
        }
        if (forward === 'transportistaBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='transportista' headers={headersMod.transportista} requestParameters={requestParameters.transportistaBaja} />)
        }
        if (forward === 'transportistaModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='transportista' headers={headersMod.transportista} requestParameters={requestParameters.transportistaModList} />)
        }
        //PRODUCTOR
        if (forward === 'productorAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='productor' items={productorAltaFormFields}requestParameters={requestParameters.productorAlta}  />)
        }
        if (forward === 'productorBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='productor' headers={headersMod.productor} requestParameters={requestParameters.productorBaja} />)
        }
        if (forward === 'productorModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='productor' headers={headersMod.productor} requestParameters={requestParameters.productorModList} />)
        }
        //ESPECIE
        if (forward === 'especieAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='especie' items={especieAltaFormFields} requestParameters={requestParameters.especieAlta} />)
        }
        if (forward === 'especieBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='especie' headers={headersMod.especie} requestParameters={requestParameters.especieBaja} />)
        }
        if (forward === 'especieModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='especie' headers={headersMod.especie} requestParameters={requestParameters.especieModList} />)
        }
        //TARIFA
        if (forward === 'tarifaAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='tarifa' items={tarifaAltaFormFields} requestParameters={requestParameters.tarifaAlta} />)
        }
        if (forward === 'tarifaBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='tarifa' headers={headersMod.tarifa} requestParameters={requestParameters.tarifaBaja} />)
        }
        if (forward === 'tarifaModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='tarifa' headers={headersMod.tarifa} requestParameters={requestParameters.tarifaModList} />)
        }
        //MERMASHUMEDAD
        if (forward === 'mermasHumedadAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='mermasHumedad' items={mermasHumedadAltaFormFields} requestParameters={requestParameters.mermasHumedadAlta} />)
        }
        if (forward === 'mermasHumedadBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='mermasHumedad' headers={headersMod.mermasHumedad} requestParameters={requestParameters.mermasHumedadBaja} />)
        }
        if (forward === 'mermasHumedadModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='mermasHumedad' headers={headersMod.mermasHumedad} requestParameters={requestParameters.mermasHumedadModList} />)
        }
        //RUBRO
        if (forward === 'rubroAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='rubro' items={rubroAltaFormFields} requestParameters={requestParameters.rubroAlta} />)
        }
        if (forward === 'rubroBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='rubro' headers={headersMod.rubro} requestParameters={requestParameters.rubroBaja} />)
        }
        if (forward === 'rubroModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='rubro' headers={headersMod.rubro} requestParameters={requestParameters.rubroModList} />)
        }
        //CAMION
        if (forward === 'camionAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='camion' items={camionAltaFormFields} requestParameters={requestParameters.camionAlta} />)
        }
        if (forward === 'camionBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='camion' headers={headersMod.camion} requestParameters={requestParameters.camionBaja} />)
        }
        if (forward === 'camionModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='camion' headers={headersMod.camion} requestParameters={requestParameters.camionModList} />)
        }
        //DESTINO
        if (forward === 'destinoAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='destino' items={destinoAltaFormFields} requestParameters={requestParameters.destinoAlta} />)
        }
        if (forward === 'destinoBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='destino' headers={headersMod.destino} requestParameters={requestParameters.destinoBaja} />)
        }
        if (forward === 'destinoModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='destino' headers={headersMod.destino} requestParameters={requestParameters.destinoModList} />)
        }
        //CAMPO
        if (forward === 'campoAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='campo' items={campoAltaFormFields} requestParameters={requestParameters.campoAlta} />)
        }
        if (forward === 'campoBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='campo' headers={headersMod.campo} requestParameters={requestParameters.campoBaja} />)
        }
        if (forward === 'campoModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='campo' headers={headersMod.campo} requestParameters={requestParameters.campoModList} />)
        }
        //COSECHA
        if (forward === 'cosechaAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='cosecha' items={cosechaAltaFormFields} requestParameters={requestParameters.cosechaAlta} />)
        }
        if (forward === 'cosechaBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='cosecha' headers={headersMod.cosecha} requestParameters={requestParameters.cosechaBaja} />)
        }
        if (forward === 'cosechaModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='cosecha' headers={headersMod.cosecha} requestParameters={requestParameters.cosechaModList} />)
        }
        //EMPRESA
        if (forward === 'empresaAltaForm') {
            mainContent = (<ABMForm type='Alta' entity='empresa' items={empresaAltaFormFields} requestParameters={requestParameters.empresaAlta} />)
        }
        if (forward === 'empresaBajaForm') {
            mainContent = (<EntityBajaList type='Baja' entity='empresa' headers={headersMod.empresa} requestParameters={requestParameters.empresaBaja} />)
        }
        if (forward === 'empresaModForm') {
            mainContent = (<EntityModList type='Modificacion' entity='empresa' headers={headersMod.empresa} requestParameters={requestParameters.empresaModList} />)
        }

        return mainContent
    },

    fetchModId: function () {
        var id = this.props.params.identifier;
        var entity = this.props.params.entity;
        var mainContent;

        if (id) {//todos los request son de getONE habria que sacarlo de aca y hacer un objeto como el que esta hecho para modLIST

            //EMPLEADO
            if (entity === 'empleado') {
                mainContent = (<ABMForm type='Modificacion' entity='empleado' items={empleadoAltaFormFields} requestParameters={{
                                        url: 'empleados/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //USUARIO
            if (entity === 'usuario') {
                mainContent = (<ABMForm type='Modificacion' entity='usuario' items={usuarioAltaFormFields} requestParameters={{
                                        url: 'users/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //CHOFER
            if (entity === 'chofer') {
                mainContent = (<ABMForm type='Modificacion' entity='chofer' items={choferAltaFormFields} requestParameters={{
                                        url: 'choferes/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //TRANSPORTISTA
            if (entity === 'transportista') {
                mainContent = (<ABMForm type='Modificacion' entity='transportista' items={transportistaAltaFormFields} requestParameters={{
                                        url: 'transportistas/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //PRODUCTOR
            if (entity === 'productor') {
                mainContent = (<ABMForm type='Modificacion' entity='productor' items={productorAltaFormFields} requestParameters={{
                                        url: 'productores/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //ESPECIE
            if (entity === 'especie') {
                mainContent = (<ABMForm type='Modificacion' entity='especie' items={especieAltaFormFields} requestParameters={{
                                        url: 'especies/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //TARIFA
            if (entity === 'tarifa') {
                mainContent = (<ABMForm type='Modificacion' entity='tarifa' items={tarifaAltaFormFields} requestParameters={{
                                        url: 'tarifas/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //MERMASHUMEDAD
            if (entity === 'mermasHumedad') {
                mainContent = (<ABMForm type='Modificacion' entity='mermasHumedad' items={mermasHumedadAltaFormFields} requestParameters={{
                                        url: 'mermasHumedad/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //RUBRO
            if (entity === 'rubro') {
                mainContent = (<ABMForm type='Modificacion' entity='rubro' items={rubroAltaFormFields} requestParameters={{
                                        url: 'rubros/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //CAMION
            if (entity === 'camion') {
                mainContent = (<ABMForm type='Modificacion' entity='camion' items={camionAltaFormFields} requestParameters={{
                                        url: 'camiones/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                                />)
            }
            //COSECHA
            if (entity === 'cosecha') {
                mainContent = (<ABMForm type='Modificacion' entity='cosecha' items={cosechaAltaFormFields} requestParameters={{
                                        url: 'cosechas/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //EMPRESA
            if (entity === 'empresa') {
                mainContent = (<ABMForm type='Modificacion' entity='empresa' items={empresaAltaFormFields} requestParameters={{
                                        url: 'empresas/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                />)
            }
            //CAMPO
            if (entity === 'campo') {
                mainContent = (<ABMForm type='Modificacion' entity='campo' items={campoAltaFormFields} requestParameters={{
                                        url: 'campos/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                    />)
            }
            //DESTINO
            if (entity === 'destino') {
                mainContent = (<ABMForm type='Modificacion' entity='destino' items={destinoAltaFormFields} requestParameters={{
                                        url: 'destinos/' + this.props.params.identifier,
                                        identifier: this.props.params.identifier,
                                        method: 'GET'
                                        }}
                    />)
            }
        }
        return mainContent
    }
});

export default RoutingComponent;