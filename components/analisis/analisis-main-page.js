import React from 'react';

import AnalisisInicio from './analisis-inicio';
import AnalisisNuevoAnalisis from './analisis-nuevo-analisis';


var AnalisisMainPage = React.createClass ({

    propTypes: {
        handleMainSectionChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            name: 'Mary'
        };
    },

    getInitialState: function () {
        return {
            open: false
        }
    },

    render() {
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    width:'95%'
                    }}>
                <AnalisisNuevoAnalisis />
            </div>
        )
    }

});

export default AnalisisMainPage;