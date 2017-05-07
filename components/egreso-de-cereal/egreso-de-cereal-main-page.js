import React from 'react';

import EgresoDeCerealInicio from './egreso-de-cereal-inicio';

var EgresoDeCerealMainPage = React.createClass ({

    render() {
        return (
            <div style={{
                    margin: '20px 0 13px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <EgresoDeCerealInicio />
            </div>
        )
    }

});

export default EgresoDeCerealMainPage;