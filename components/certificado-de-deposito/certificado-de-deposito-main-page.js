import React from 'react';

import CertificadoDeDepositoInicio from './certificado-de-deposito-inicio';

var CertificadoDeDepositoMainPage = React.createClass ({

    render() {
        return (
            <div style={{
                    margin: '20px 0 13px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <CertificadoDeDepositoInicio />
            </div>
        )
    }

});

export default CertificadoDeDepositoMainPage;