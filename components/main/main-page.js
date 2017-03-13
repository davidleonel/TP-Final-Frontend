import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MainMenuBar from './main-menu-bar';

//***********THEME********************
import {
    lightGreen500, lightGreen700, lightGreen400,
    redA200,brown400,
    grey100, grey300, grey400, grey500,
    cyan500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
//----------
const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: lightGreen500,
        primary2Color: lightGreen700,
        primary3Color: lightGreen400,
        accent1Color: brown400,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    },
    appBar: {
        height: 50
    }
});
//***********THEME********************





var MainPage = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            paginaActual: 'pricipal'
        }
    },

    render() {
        return(
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <MainMenuBar />
                    {this.props.children}
                </div>
             </MuiThemeProvider>
        )
    }

});

export default MainPage;