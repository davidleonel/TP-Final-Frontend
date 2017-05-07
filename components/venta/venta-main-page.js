import React from 'react';

import VentaInicio from './venta-inicio';

var VentaMainPage = React.createClass ({

    render() {
        return (
            <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <VentaInicio />
            </div>
        )
    }

});

export default VentaMainPage;