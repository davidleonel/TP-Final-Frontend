import React from 'react';

import Paper from 'material-ui/Paper';

const mainStyle = {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
};

var MainWelcomeSection = React.createClass ({

    propTypes: {
        nombre: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            nombre: 'Roberto'
        };
    },

    render() {
        return (
            <Paper zDepth={3}  style={mainStyle}>
                <div style={{width: '95%', height: '95%'}}>
                    <h1>Bienvenido {this.props.nombre}</h1>

                    <img src="/assets/images/granos1.jpg" alt="granos"
                     style={{
                        height: '100px',
                        padding:'1px',
                        border:'1px solid #BDBDBD',
                        backgroundColor:'#FFD180'
                        }}
                    />

                    <div style={{
                        textAlign: 'justify',
                        textJustify: 'inter-word'
                        }}>

                        <p>
                            Siendo Rosario uno de los Puertos cerealeros más importantes de la Argentina, CEREALTOOLS® pudo obtener amplios conocimientos sobre las necesidades de los Acopiadores de Cereales, Terminales de Embarque, Plantas Acondicionadoras, Cooperativas, Aceiteras, Semilleros, Estaciones Experimentales Agropecuarias, llevados a la práctica por su fundador Jorge Otermin, siempre atento a las innovaciones del mercado, no sólo Nacional sino también Internacional, como Brasil,  Bolivia, Chile, Uruguay, Paraguay, Perú, Puerto Rico, España, Estados Unidos, nuestra empresa fue alcanzando el nivel necesario para poder brindarles los mejores productos y servicios a los mejores costos.
                            Nuestra política es siempre ofrecer a nuestros clientes una excelente calidad y durabilidad de los productos fabricados por nuestra empresa; tales como: caladores sonda,  caladores para bolsa, caladores silo bolsa, homogeneizadores, cuarteadores, termómetros digitales, balanzas P.H y electrónicas,  saca-muestras de aceites para bodegas, tanques, camiones, zarandas reglamentarias.
                            Debido a la trayectoria manifestada, somos distribuidores exclusivos de MEDIDORES DE HUMEDAD – MOTOMCO.
                            Debemos señalar la importancia de sentirnos acompañados y apoyados en nuestros proyectos por nuestros CLIENTES, DISTRIBUIDORES Y PROVEEDORES que colaboran  en nuestra actualizacion de equipos para la comercializacion de los granos y semillas.
                            Es por todo esto lo que nos exige aun más  una tarea eficiente, actualizada y competitiva.
                        </p>
                        <p>
                            Nuestra política es siempre ofrecer a nuestros clientes una excelente calidad y durabilidad de los productos fabricados por nuestra empresa; tales como: caladores sonda,  caladores para bolsa, caladores silo bolsa, homogeneizadores, cuarteadores, termómetros digitales, balanzas P.H y electrónicas,  saca-muestras de aceites para bodegas, tanques, camiones, zarandas reglamentarias.
                        </p>
                        <p>
                            Debido a la trayectoria manifestada, somos distribuidores exclusivos de MEDIDORES DE HUMEDAD – MOTOMCO.
                        </p>
                        <p>
                            Debemos señalar la importancia de sentirnos acompañados y apoyados en nuestros proyectos por nuestros CLIENTES, DISTRIBUIDORES Y PROVEEDORES que colaboran  en nuestra actualizacion de equipos para la comercializacion de los granos y semillas.
                        </p>
                        <p>
                            Es por todo esto lo que nos exige aun más  una tarea eficiente, actualizada y competitiva.
                        </p>
                    </div>
                </div>
            </Paper>
        )
    }

});

export default MainWelcomeSection;