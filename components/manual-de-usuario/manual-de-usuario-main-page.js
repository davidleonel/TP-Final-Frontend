import React from 'react';

import { CardStack, Card } from 'react-cardstack';
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

import CloudDownloadIcon from 'react-material-icons/icons/file/cloud-download';

var style = {
    cardHeading: {
        padding:'10px',
        fontFamily: 'arial, sans-serif',
        textShadow: '0px 2px 3px #665'
    },
    cardHeadingABM: {
        padding:'10px',
        fontFamily: 'arial, sans-serif',
        textShadow: '0px 2px 3px #665',
        height:'100px'
    },
    cardParagraph: {
        paddingLeft:'20px',
        paddingRight:'10px',
        fontFamily: 'arial, sans-serif',
        textShadow: '0px 2px 3px #665'
    },
    cardList: {
        margiTop:'-50px',
        paddingLeft:'75px',
        paddingRight:'10px',
        fontFamily: 'arial, sans-serif',
        textShadow: '0px 2px 3px #665',
    }
};

var ManualDeUsuarioMainPage = React.createClass ({
    getInitialState: function () {
        return {
            deleteConfirmationModal: false,
        }
    },

    render() {
        return (
            <div style={{width:'100%'}}>
                <Paper zDepth={3} style={{padding: '20px'}}>
                    <h1>Manual de usuario</h1>
                    <p> Aqui encontrara una rapida respuesta a los temas y pregutas mas frequentes sobre el comportamiento del sistema. </p>
                    <p> En caso de no encontrar la respuesta a su pregunta aqui, puede descargar la version completa del Manual de usuario como pdf, presionando el boton.</p>
                    <a href="../../assets/manual/PRIM-manual-de-usuario.pdf" download>
                        <RaisedButton
                            label="Descargar manual completo"
                            labelPosition="before"
                            primary={true}
                            icon={<CloudDownloadIcon style={{paddingBottom: '6px'}} />}
                            onTouchTap={this.handleImprimir}
                        />

                    </a>

                    <Dialog
                        title="Gracias por descargar el manual de PRIM!"
                        actions={[
                                                <FlatButton
                                                    label="Aceptar"
                                                    primary={true}
                                                    disabled={false}
                                                    onTouchTap={this.handleImprimirAccept}
                                                />
                                            ]}
                        modal={false}
                        open={this.state.deleteConfirmationModal}
                    >
                        {'Muchas gracias por descargar el manual completo :)'}
                    </Dialog>

                    <h2>Introducción</h2>
                    <p>
                        El manual de usuario expone los procesos que el usuario puede realizar con el sistema implantado,
                        instruyéndolo en su uso y en la solución de los problemas que puedan suceder durante la operación.
                        A continuación, se detallan  todas las características que tienen los programas y la forma de acceder
                        e introducir la información. Este manual permitirá a los usuarios conocer en detalle qué
                        actividades deberán desarrollar para la consecución de los objetivos del sistema. Reúne
                        la información, normas y documentación necesarias para que el usuario conozca y utilice
                        adecuadamente la aplicación desarrollada.
                    </p>

                    <h2>Descripción del producto</h2>
                    <p >
                        El sistema presentará los siguientes módulos: Gestión de Datos (clientes, proveedores,
                        corredores, campos y camiones), Acopio, Gestión Comercial y Facturación.
                    </p>
                    <ul>
                        <li>
                            Gestión de Datos: se almacenarán en una Base de Datos los datos de productores,
                            corredores, proveedores, campos y camiones de transporte. También se permitirá la
                            baja y la modificación de los mismos. </li>
                        <li>
                            Gestión de Acopio: contendrá las funciones necesarias para registrar los datos de
                            la producción, transporte y almacenamiento de granos de los productores.
                        </li>
                        <li>
                            Gestión Comercial: se registrarán los datos de las distintas transacciones
                            comerciales de cereales/oleaginosas; esto incluye los datos del comprador y la
                            asignación de un corredor como intermediario en la operación.
                        </li>
                        <li>
                            Gestión de Compra-Venta de insumos: en este módulo se registrarán los datos.
                        </li>
                        <li>
                            Facturación: se registrarán los comprobantes comerciales.
                        </li>
                    </ul>
                    <br/>
                    <h2>Preguntas frecuentes de los flujos principales del sistema.</h2>
                    <p >
                        A continuacion se responden las preguntas mas frecuentes con las cuales un usuario del sistema puede encontrarse.
                    </p>
                    <br/>
                    <div style={{marginLeft:'200px'}} >
                        <CardStack
                            height={400}
                            width={1400}
                            background='rgb(139, 195, 74)'
                            hoverOffset={25}
                        >

                            <Card background='rgb(139, 195, 74)'>
                                <h1 style={style.cardHeadingABM}>ABMs</h1>
                                <p style={style.cardParagraph}>
                                    Los ABMs constituyen el alta, modificación y baja de las entidades que utiliza el sistema
                                    para poder funcionar. Las mismas son: camión, campo, chofer, cosecha, destino, empleado,
                                    empresa, especie, merma y humedad, productor, rubro, tarifa, transportista y usuario.
                                </p>
                                <p style={style.cardParagraph}>
                                    Los procesos antes mencionados son los mismos para todas las entidades. Por lo tanto, se describirán las tres por separado.
                                    Recuerde que la seccion de ABMs se puede acceder desde la pagina principal de vienvenida del sistema o desde cualquier
                                    otra pagina abriendo el menu principal, haciendo click en el boton circular que aparece en la parte superior derecha.
                                </p>
                                <p style={style.cardParagraph}>
                                    Para dar de alta/baja/modificar una entidad, el usuario deberá hacer clic en el botón “ABM” en el menú del sistema. A continuación
                                    se desplegará otro menú con todas las entidades existentes en el mismo. El usuario
                                    seleccionará la entidad en la cual quiere operar y luego hará clic en “Alta”, “Modificación” o “Baja”
                                </p>

                            </Card>

                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>Alta</h2>
                                <p style={style.cardParagraph}>
                                    El sistema mostrará un formulario de ingreso. El usuario ingresará aquellos campos obligatorios
                                    y/o opcionales y, una vez, finalizado, hará clic en “Confirmar”. Si la entidad pudo ser
                                    dada de alta exitosamente, el sistema mostrará un mensaje de éxito; caso contrario,
                                    un mensaje de error explicando el por qué. El ususario podra dar de alta a cantidad de entidades que desea pero
                                    solo podra hacerlo de a una a la vez.
                                </p>
                                <p style={style.cardParagraph} >
                                    En el caso de la baja de cualquier entidad, podra efectuar muchas bajas en el mismo procedimiento, esto esta hecho de tal forma
                                    para poder agilizar dicha transaccion.
                                </p>
                            </Card>

                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>Baja</h2>
                                <p style={style.cardParagraph}>
                                    El sistema mostrará una lista con todos los registros existentes para esa entidad. Si se
                                    desea dar de baja uno o más de ellos, entonces el usuario deberá seleccionarlos a través
                                    de los checkbox. Una vez finalizado, el usuario hará clic en el botón “dar de baja”.
                                    Se mostrará una ventana emergente confirmando la acción. Si la/s entidad/entidades pude/n
                                    ser eliminada/s exitosamente, el sistema mostrará un mensaje de éxito; caso contrario,
                                    un mensaje de error explicando el por qué.
                                    ¡Importante! Al dar de baja una entidad el sistema registra la fecha de baja de la misma,
                                    no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá ser utilizado en el sistema.
                                </p>
                            </Card>

                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>Modificacion</h2>
                                <p style={style.cardParagraph}>
                                    El sistema mostrará una lista con todos los registros existentes para esa entidad.
                                    Si se desea modificar alguno de ellos, entonces el usuario deberá hacer clic en el
                                    botón “modificar”. El sistema permitirá visualizar el formulario con los datos actuales
                                    existentes. El usuario modificará aquellos campos que considere necesario y luego hará
                                    clic en “Confirmar”. Si la entidad pude ser modificada exitosamente, el sistema mostrará
                                    un mensaje de éxito; caso contrario, un mensaje de error explicando el por qué.
                                </p>
                            </Card>

                        </CardStack>
                        <br/>
                        <CardStack
                            height={400}
                            width={1400}
                            background='rgb(139, 195, 74)'
                            hoverOffset={25}
                        >
                            <Card background='rgb(139, 195, 74)'>
                                <h1 style={style.cardHeadingABM}>Ingreso de cereal</h1>
                                <p style={style.cardParagraph}>
                                    Los ingresos de cerales/granos a los silos se corresponden con los datos en la Carta de porte
                                    que se obtiene al momento de la llegada de un nuevo camion al deposito. En este momento todos
                                    los datos que se encuentran en dicha Carta de porte deben ser ingresados en el sistema
                                    utilizando el formulario correspondiente.
                                </p>
                                <p style={style.cardParagraph}>
                                    Al dar de baja un ingreso el sistema registra la fecha de baja de la
                                    misma, no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá
                                    ser utilizado en el sistema.
                                </p>
                                <p style={style.cardParagraph}>
                                    Al terminar de ingresar todos los datos usted sera reenviado a la pagina de inicio de la seccion de
                                    Ingresos de cereal, una vez aqui usted podra seguir los flujos que desee. Estos siendo, generar un nuevo Ingreso,
                                    Dar de baja o modificar algun Ingreso que ya este en la Base de Datos.
                                </p>

                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo genero un nuevo ingreso de cereal?</h2>
                                <p style={style.cardParagraph}>
                                    Para generar un nuevo Ingreso de cereal, primero debemos ir a la pagina principal de Ingreso de cereal utilizando
                                    el menu principal, hacemos click en la opcion que dice "Ingreso de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos las Egreso de cereal registradas en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes el nuevo Ingreso de cereal. Estos datos se encuentran en la Carta de porte
                                    presentada a la entrada, correspondiente.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la ultima pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si el Ingreso de cereal fue generada con exito el sistema lo comunicara
                                    y redireccionara a la pagina principal de Ingreso de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo modifico/doy de baja un ingreso de cereal?</h2>

                                <p style={style.cardParagraph}>
                                    Para modificar un Igreso de cereal que ya se encuentra en la base de datos,
                                    primero debemos ir a la pagina principal de Igresos utilizando
                                    el menu principal, hacemos click en la opcion que dice "Ingreso de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estado en la pagina principal correpondiente a Ingresos de cereal, hacer click en el registro deseado,
                                    dentro de la tabla principal,(la cual muestra todos los Ingresos registradas en la BD).
                                    Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos modificar
                                    todos los datos del Ingreso en cuestion.
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez terminado el ingreso de datos se debe clickear en el boton verde "Aceptar". Si la modificacion
                                    fue registrada con exito el sistema lo comunicara y redireccionara a la pagina principal de Ingreso de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>Entidades a tenes en cuenta</h2>
                                <p style={style.cardParagraph}>
                                    Las siguientes son las entidades a tener en cuenta a la hora de generar un nuevo Ingreso de cereal o nueva Carta de porte. Todos estos
                                    se pueden encontrar en la Carata de porte que entrega el chofer del camion que transporta dicho cereal/granos.
                                </p>
                                <ul style={style.cardList}>
                                    <li>destino</li>
                                    <li>destinatario</li>
                                    <li>tarifa</li>
                                    <li>transportista</li>
                                    <li>chofer</li>
                                    <li>cosecha</li>
                                    <li>especie</li>
                                    <li>intermediario</li>
                                    <li>procedencia</li>
                                </ul>
                            </Card>

                        </CardStack>
                        <br/>
                        <CardStack
                                height={400}
                                width={1400}
                                background='rgb(139, 195, 74)'
                                hoverOffset={25}
                            >
                                <Card background='rgb(139, 195, 74)'>
                                    <h1 style={style.cardHeadingABM}>Analisis de cereal</h1>
                                    <p style={style.cardParagraph}>
                                        El analisis de los cereales /granos se lleva a cabo una vez que este mismo fue depositado en
                                        los silos. Todo Ingreso debe pasar por la etapa de Analisis, en la cual se testeara la calidad de dicho
                                        Ingreso para poder darle una calificacion adecuada.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Cada Ingreso se califica en una categoria a la cual se le da un Factor y un Grado. De esto depende muchos de los gastos
                                        que se le cobraran al cliente a la hora de ejecutar la Venta.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Al dar de baja un ingreso el sistema registra la fecha de baja de la
                                        misma, no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá
                                        ser utilizado en el sistema.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Al terminar de ingresar todos los datos usted sera reenviado a la pagina de inicio de la seccion de
                                        Analisis de cereal, una vez aqui usted podra seguir los flujos que desee. Estos siendo, generar un nuevo Analisis,
                                        Dar de baja o modificar algun Analisis que ya este en la Base de Datos.
                                    </p>

                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo genero un nuevo analisis?</h2>
                                    <p style={style.cardParagraph}>
                                        Para generar un nuevo analsiis de cereal primero debemos ir a la pagina principal de Analisis utilizando
                                        el menu principal, hacemos click en la opcion que dice "Analisis".
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez estado en la pagina principal correpondiente a Analisis de cereal, hacer click en el boton verde,
                                        a la derecha de la tabla principal,(la cual muestra todos los Analisis registrados en la BD), que dice "Agregar".
                                        Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                        correspondientes al nuevo Analisis de cereal.
                                    </p>
                                    <p style={style.cardParagraph}>
                                       Una vez elegida la "Especie" el sistema mostrara los rubros correspondientes con dicha Especie. Se deben a gregar
                                        los porcentajes para cada rubro de la Especie seleccionada. El sistema calculara la bonificacion/rebaja y
                                        el factor junto con el grado final.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Como ultimo paso se debe ir hacia la segunda pestaña de la pagina la cual nos muestra una lista de Cartas de porte,
                                        de esa lista debemos elegir las Cartas de porte correspondientes con el analisis. Una vez terminado el ingreso de datos
                                        se debe clickear en el boton verde "Aceptar". Si el ingreso fue registrado con exito el sistema lo comunicara
                                        y redireccionara a la pagina principal de Analisis de cereal.
                                    </p>
                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo modifico un analisis previamente generado?</h2>
                                    <p style={style.cardParagraph}>
                                        Para modificar un analsiis de cereal que ya se encuentra en la base de datos,
                                        primero debemos ir a la pagina principal de Analisis utilizando
                                        el menu principal, hacemos click en la opcion que dice "Analisis".
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez estado en la pagina principal correpondiente a Analisis de cereal, hacer click en el registro deseado,
                                        dentro de la tabla principal,(la cual muestra todos los Analisis registrados en la BD).
                                        Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos modificar
                                        todos los datos de Analisis en cuestion.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez terminado el ingreso de datos se debe clickear en el boton verde "Aceptar". Si la modificacion
                                        fue registrada con exito el sistema lo comunicara y redireccionara a la pagina principal de Analisis de cereal.
                                    </p>
                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo doy de baja un Analisis?</h2>
                                    <p style={style.cardParagraph}>
                                        Para dar de baja un analsiis de cereal que ya se encuentra en la base de datos,
                                        primero debemos ir a la pagina principal de Analisis utilizando
                                        el menu principal, hacemos click en la opcion que dice "Analisis".
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez estado en la pagina principal correpondiente a Analisis de cereal, hacer click en el registro deseado,
                                        dentro de la tabla principal,(la cual muestra todos los Analisis registrados en la BD).
                                        Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos dar de baja
                                        el Analisis en cuestion.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Al hacer esto se abrira una ventana emergente la cual nos preguntara si estamos seguros de queres ar de baja
                                        dicho Analisis. Aqui debemos responder positivamente. Si el registro fue dado de baja exitosamente el sistema
                                        lo enunciara y usted sera redireccionado a la pagina principal de Analisis.
                                    </p>
                                </Card>
                            </CardStack>
                        <br/>
                        <CardStack
                                height={400}
                                width={1400}
                                background='rgb(139, 195, 74)'
                                hoverOffset={25}
                            >
                                <Card background='rgb(139, 195, 74)'>
                                    <h1 style={style.cardHeadingABM}>Certificado de deposito</h1>
                                    <p style={style.cardParagraph}>
                                        El Certificado de deposito solo sera posible para los Ingresos ya registrados en la Base de Datos.
                                        Todo Analisis debe pasar por la etapa de Certificado, en la cual se calculan los gastos correspondientes a dicho Analsis
                                        y se da un total que se le cobrara al cliente al momento e la Venta de dicho Ingreso.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Cada Certicado de deposito se corresponde con una Carta de porte, la cual a su vez se corresponde con un Analsis. A este Analsis
                                        le corresponden varios gastos asociados a los procesos de analsis que se llevaron a cabo para dicho Igreso.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Al dar de baja un ingreso el sistema registra la fecha de baja de la
                                        misma, no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá
                                        ser utilizado en el sistema.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Al terminar de ingresar todos los datos usted sera reenviado a la pagina de inicio de la seccion de
                                        Certificado de deposito, una vez aqui usted podra seguir los flujos que desee. Estos siendo, generar un nuevo Certificado de deposito,
                                        Dar de baja o modificar algun Certificado de deposito que ya este en la Base de Datos.
                                    </p>

                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo registro un nuevo Certificado de depósito?</h2>

                                    <p style={style.cardParagraph}>
                                        Para generar un nuevo Certificado de deposito, primero debemos ir a la pagina principal de Certificado de depósito utilizando
                                        el menu principal, hacemos click en la opcion que dice "Certificado de depósito".
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez estado en la pagina principal correpondiente, hacer click en el boton verde,
                                        a la derecha de la tabla principal,(la cual muestra todos los Certificado de depósito registrados en la BD), que dice "Agregar".
                                        Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                        correspondientes al nuevo Certificado de depósito.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        En esta nueva pagina debemos ingresar el Nro. de Certificado de deposito y seleccionar la Carta de porte correspondiente al Deposito.
                                        Una vez hecho esto, debemos hacer click en el boton que dice "Agregar Gastos",
                                        al hacer esto seremos llevados a la segunda pestaña de la pagina la cual nos mostrara los detalles de los gastos
                                        correspondientes a la Carta de Porte previamente seleccionada.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Como ultimo paso estando en la segunda pestaña de la pagina
                                        se debe clickear en el boton verde "Aceptar". Si el Certificado de deposito fue generado con exito el sistema lo comunicara
                                        y redireccionara a la pagina principal de Certificado de deposito de cereal.
                                    </p>
                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo modificar un Certificado de depósito de cereales?</h2>

                                    <p style={style.cardParagraph}>
                                        Los certificados de deposito de cereales/granos no pueden ser modificados ua vez ya generados,
                                        Esto es asi ya que los Certificados tienen solamente dos campos que podrian prestarse a modificaciones,
                                        todos los demas campos son calculados por el sistema en funcion a los datos del Ingreso y el Analisis.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Por esta razon si desea modificar un Certificado ya registrado, debe eliminarlo y crearlo nuevamente con los datos correctos.
                                    </p>
                                </Card>
                                <Card background='#2980B9'>
                                    <h2 style={style.cardHeadingABM}>¿Cómo dar de baja un Certificado de depósito ya registrado?</h2>

                                    <p style={style.cardParagraph}>
                                        Para dar de baja un Certificado de deposito, primero debemos ir a la pagina principal de Certificado de depósito utilizando
                                        el menu principal, hacemos click en la opcion que dice "Certificado de depósito".
                                    </p>
                                    <p style={style.cardParagraph}>
                                        Una vez estando en la pagina principal correpondiente, hacer click en el boton,
                                        a la derecha de la tabla principal,(la cual muestra todos los Certificado de depósito registrados en la BD),
                                        que dice "Dar de baja".
                                        Este boton nos redireccionara a una nueva pagina en la cual podremos ver un listado de todos los Certificados de deposito
                                        registrados en la base de datos.
                                    </p>
                                    <p style={style.cardParagraph}>
                                        En esta nueva pagina podremos seleccionar el/los Certificado de deposito que se desean dar de baja.
                                        Una vez hecho esto, debemos hacer click en el boton rojo que dice "Eliminar",
                                    </p>
                                    <p style={style.cardParagraph}>
                                        El sistema nos preguntara si realmente deseamos dar de baja los registros seleccionados.
                                        A lo cual debemos responder positivamente. Si el Certificado de deposito fue dado de baja
                                        con exito el sistema lo comunicara
                                        y redireccionara a la pagina principal de Certificado de deposito de cereal.
                                    </p>
                                </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo genero el PDF de el nuevo Certificado?</h2>

                                <p style={style.cardParagraph}>
                                    Para generar un PDF del nuevo Certificado de deposito, primero debemos ir a la pagina principal de Certificado de depósito utilizando
                                    el menu principal, hacemos click en la opcion que dice "Certificado de depósito".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estado en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos los Certificado de depósito registrados en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes al nuevo Certificado de depósito.
                                </p>
                                <p style={style.cardParagraph}>
                                    En esta nueva pagina debemos ingresar el Nro. de Certificado de deposito y seleccionar la Carta de porte correspondiente al Deposito.
                                    Una vez hecho esto, debemos hacer click en el boton que dice "Agregar Gastos",
                                    al hacer esto seremos llevados a la segunda pestaña de la pagina la cual nos mostrara los detalles de los gastos
                                    correspondientes a la Carta de Porte previamente seleccionada.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la segunda pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si el Certificado de deposito fue generado con exito el sistema lo comunicara
                                    y nos dara la opcion de generar el PDF correspondiente a el nuevo Certificado, para generarlo debemos hacer click en el boton que dice
                                    "Ver PDF", al hacer esto una nueva pestaña es abrira en la cual podremos ver, descargar e imprimir el PDF corresponiente.
                                </p>
                            </Card>

                            </CardStack>
                        <br/>
                        <CardStack
                            height={400}
                            width={1400}
                            background='rgb(139, 195, 74)'
                            hoverOffset={25}
                        >
                            <Card background='rgb(139, 195, 74)'>
                                <h1 style={style.cardHeadingABM}>Venta de cereales</h1>
                                <p style={style.cardParagraph}>
                                    La venta de cereales/granos se lleva a cabo una vez que se genero el ingreso, analisis y certificado correspondiente. Al
                                    momento de generar una venta se tiene en cuenta toda la informacion que se Ingreso en la seccion
                                    de Ingreso de cereal, Analisis de cereal y Certificado de deposito. COn toda esta informacion se calcula el porcentaje que la compania
                                    tendra como ganancia deducido del total de la venta y se genera el formulario correspondiente con dicho Venta.
                                </p>
                                <p style={style.cardParagraph}>
                                    Cada Venta de cereal se corresponde con una Carta de porte, la cual a su vez se corresponde con un Analsis. A este Analsis
                                    le corresponden varios gastos asociados a los procesos de analsis que se llevaron a cabo para dicho Igreso.
                                </p>
                                <p style={style.cardParagraph}>
                                    Al dar de baja una Venta el sistema registra la fecha de baja de la
                                    misma, no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá
                                    ser utilizado en el sistema.
                                </p>
                                <p style={style.cardParagraph}>
                                    Al terminar de ingresar todos los datos usted sera reenviado a la pagina de inicio de la seccion de
                                    Ventas de cereal, una vez aqui usted podra seguir los flujos que desee. Estos siendo, generar una nueva venta de cereal,
                                    Dar de baja o modificar alguna Venta de cereal que ya este en la Base de Datos.
                                </p>

                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo liquido una venta de granos/cereales?</h2>

                                <p style={style.cardParagraph}>
                                    Para generar una nueva Venta de cereal, primero debemos ir a la pagina principal de Ventas de cereal utilizando
                                    el menu principal, hacemos click en la opcion que dice "Venta de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos las Ventas de cereal registradas en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes a la nueva Venta de Cereal.
                                </p>
                                <p style={style.cardParagraph}>
                                    En esta nueva pagina debemos ingresar el Productor,Puerto, la informacion correspondiente al Grado y Factor, Los detalles de venta
                                    y seleccionar el Certificado correspondiente a la Venta.
                                    Una vez hecho esto, debemos hacer click en el boton que dice "Calcular Liquidacion",
                                    al hacer esto seremos llevados a la segunda pestaña de la pagina la cual nos mostrara los detalles de los gastos
                                    correspondientes al Certificado de Deposito previamente seleccionado.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la segunda pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si la Venta del cereal fue generada con exito el sistema lo comunicara
                                    y redireccionara a la pagina principal de Ventas de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo modificar una Venta de cereales?</h2>

                                <p style={style.cardParagraph}>
                                    Para modificar una Venta de cereal que ya se encuentra en la base de datos,
                                    primero debemos ir a la pagina principal de Ventas utilizando
                                    el menu principal, hacemos click en la opcion que dice "Venta de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estado en la pagina principal correpondiente a Ventas de cereal, hacer click en el registro deseado,
                                    dentro de la tabla principal,(la cual muestra todos las Ventas registradas en la BD).
                                    Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos modificar
                                    todos los datos de la Venta en cuestion.
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez terminado el ingreso de datos se debe clickear en el boton verde "Aceptar". Si la modificacion
                                    fue registrada con exito el sistema lo comunicara y redireccionara a la pagina principal de Ventas de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo dar de baja una Venta ya registrada?</h2>

                                <p style={style.cardParagraph}>
                                    Para dar de baja una Venta de cereal, primero debemos ir a la pagina principal de Venta de cereales utilizando
                                    el menu principal, hacemos click en la opcion que dice "Venta de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton,
                                    a la derecha de la tabla principal,(la cual muestra todos las Ventas de cereal registrados en la BD),
                                    que dice "Dar de baja".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ver un listado de todos las Vetnas
                                    registradas en la base de datos.
                                </p>
                                <p style={style.cardParagraph}>
                                    En esta nueva pagina podremos seleccionar la/las Ventas de cereal que se desean dar de baja.
                                    Una vez hecho esto, debemos hacer click en el boton rojo que dice "Eliminar",
                                </p>
                                <p style={style.cardParagraph}>
                                    El sistema nos preguntara si realmente deseamos dar de baja los registros seleccionados.
                                    A lo cual debemos responder positivamente. Si la Venta de cereal fue dada de baja
                                    con exito el sistema lo comunicara
                                    y redireccionara a la pagina principal de Ventas de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo genero el PDF de la nueva Venta?</h2>

                                <p style={style.cardParagraph}>
                                    Para generar una nueva Venta de cereal, primero debemos ir a la pagina principal de Ventas de cereal utilizando
                                    el menu principal, hacemos click en la opcion que dice "Venta de cereal".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos las Ventas de cereal registradas en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes a la nueva Venta de Cereal.
                                </p>
                                <p style={style.cardParagraph}>
                                    En esta nueva pagina debemos ingresar el Productor,Puerto, la informacion correspondiente al Grado y Factor, Los detalles de venta
                                    y seleccionar el Certificado correspondiente a la Venta.
                                    Una vez hecho esto, debemos hacer click en el boton que dice "Calcular Liquidacion",
                                    al hacer esto seremos llevados a la segunda pestaña de la pagina la cual nos mostrara los detalles de los gastos
                                    correspondientes al Certificado de Deposito previamente seleccionado.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la segunda pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si la Venta del cereal fue generada con exito el sistema lo comunicara
                                    y nos dara la opcion de generar el PDF correspondiente a la nueva Venta, para generarlo debemos hacer click en el boton que dice
                                    "Ver PDF", al hacer esto una nueva pestaña es abrira en la cual podremos ver, descargar e imprimir el PDF corresponiente.
                                </p>

                            </Card>
                        </CardStack>
                        <br/>
                        <CardStack
                        height={400}
                        width={1400}
                        background='rgb(139, 195, 74)'
                        hoverOffset={25}
                    >
                        <Card background='rgb(139, 195, 74)'>
                            <h1 style={style.cardHeading}>Egreso de cereales vendidos</h1>
                            <p style={style.cardParagraph}>
                                El Egreso de cereales/granos o generacion de una nueva Carta de Porte,
                                se lleva a cabo una vez que se genero el ingreso, analisis, certificado y venta correspondiente. Al
                                momento de generar un Egreso se tiene en cuenta toda la informacion necesaria para completar
                                una carta de porte. Con toda esta informacion se genera el formulario correspondiente para dicho Egreso.
                            </p>
                            <p style={style.cardParagraph}>
                                Cada Egreso de cereal se corresponde con una Carta de porte, la cual a su vez se corresponde con un Analsis. A este Analsis
                                le corresponden varios gastos asociados a los procesos de analsis que se llevaron a cabo para dicho Igreso. Luego del Analis se genera
                                el Certificado de deposito y consecuentemente la Venta. Cada egreso se corresponde con una venta.
                            </p>
                            <p style={style.cardParagraph}>
                                Al dar de baja un Egreso de cereal/ Carata de porte el sistema registra la fecha de baja de la
                                misma, no se eliminará el registro de la base de datos. Una vez dado de baja, no podrá
                                ser utilizado en el sistema.
                            </p>
                            <p style={style.cardParagraph}>
                                Al terminar de ingresar todos los datos usted sera reenviado a la pagina de inicio de la seccion de
                                Egreso de cereal, una vez aqui usted podra seguir los flujos que desee. Estos siendo, generar un nuevo Egreso de cereal,
                                Dar de baja o modificar algun Egreso/Carta de porte que ya este en la Base de Datos.
                            </p>

                        </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo genero un nuevo Egreso de cereal?</h2>
                                <p style={style.cardParagraph}>
                                    Para generar un nuevo Egreso de cereal, primero debemos ir a la pagina principal de Egreso de cereal utilizando
                                    el menu principal, hacemos click en la opcion que dice "Generar Carta de porte".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos las Egreso de cereal registradas en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes el nuevo Egreso de cereal.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la ultima pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si el Egreso de cereal fue generada con exito el sistema lo comunicara
                                    y redireccionara a la pagina principal de Egresos de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo modifico un Engreso de cereal?</h2>

                                <p style={style.cardParagraph}>
                                    Para modificar un Egreso de cereal que ya se encuentra en la base de datos,
                                    primero debemos ir a la pagina principal de Egresos utilizando
                                    el menu principal, hacemos click en la opcion que dice "Generar Carta de porte".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estado en la pagina principal correpondiente a Egreso de cereal, hacer click en el registro deseado,
                                    dentro de la tabla principal,(la cual muestra todos los Egresos registradas en la BD).
                                    Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos modificar
                                    todos los datos del Engreso en cuestion.
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez terminado el ingreso de datos se debe clickear en el boton verde "Aceptar". Si la modificacion
                                    fue registrada con exito el sistema lo comunicara y redireccionara a la pagina principal de Engreso de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo doy de baja un Engreso de cereal?</h2>

                                <p style={style.cardParagraph}>
                                    Para dar de baja un Egreso de cereal que ya se encuentra en la base de datos,
                                    primero debemos ir a la pagina principal de Egresos utilizando
                                    el menu principal, hacemos click en la opcion que dice "Generar Carta de porte".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estado en la pagina principal correpondiente a Egreso de cereal, hacer click en el registro deseado,
                                    dentro de la tabla principal,(la cual muestra todos los Egresos registradas en la BD).
                                    Al seleccionar un registro el sistema nos redireccionara a una nueva pagina en la cual podremos dar de baja
                                    el Engreso en cuestion.
                                </p>
                                <p style={style.cardParagraph}>
                                    En esta nueva pagina podremos seleccionar el/los Egresos de cereal que se desean dar de baja.
                                    Una vez hecho esto, debemos hacer click en el boton rojo que dice "Eliminar",
                                </p>
                                <p style={style.cardParagraph}>
                                    El sistema nos preguntara si realmente deseamos dar de baja los registros seleccionados.
                                    A lo cual debemos responder positivamente. Si el Egreso de cereal fue dado de baja
                                    con exito el sistema lo comunicara
                                    y redireccionara a la pagina principal de Egresos de cereal.
                                </p>
                            </Card>
                            <Card background='#2980B9'>
                                <h2 style={style.cardHeadingABM}>¿Cómo genero el PDF de el nuevo Egreso de cereal?</h2>

                                <p style={style.cardParagraph}>
                                    Para generar un nuevo Egreso de cereal, primero debemos ir a la pagina principal de Egreso de cereal utilizando
                                    el menu principal, hacemos click en la opcion que dice "Generar Carta de porte".
                                </p>
                                <p style={style.cardParagraph}>
                                    Una vez estando en la pagina principal correpondiente, hacer click en el boton verde,
                                    a la derecha de la tabla principal,(la cual muestra todos las Egreso de cereal registradas en la BD), que dice "Agregar".
                                    Este boton nos redireccionara a una nueva pagina en la cual podremos ingresar todos los datos
                                    correspondientes el nuevo Egreso de cereal.
                                </p>
                                <p style={style.cardParagraph}>
                                    Como ultimo paso estando en la ultima pestaña de la pagina
                                    se debe clickear en el boton verde "Aceptar". Si el Egreso de cereal fue generado con exito el sistema lo comunicara
                                    y nos dara la opcion de generar el PDF correspondiente a el nuevo Egreso, para generarlo debemos hacer click en el boton que dice
                                    "Ver PDF", al hacer esto una nueva pestaña es abrira en la cual podremos ver, descargar e imprimir el PDF corresponiente.
                                </p>
                            </Card>
                    </CardStack>
                    </div>
                </Paper>
            </div>
        )
    },

    handleImprimir: function () {
        event.preventDefault();
        this.handleOpenImprimirModal();
    },

    handleImprimirAccept: function () {
        this.handleCloseImprimirModal();
    },

    handleOpenImprimirModal: function (event) {
        this.setState({deleteConfirmationModal: true});
    },
    handleCloseImprimirModal: function () {
        this.setState({deleteConfirmationModal: false});
    },


});

export default ManualDeUsuarioMainPage;