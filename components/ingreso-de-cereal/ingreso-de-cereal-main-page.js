import React from 'react';

import IngresoDeCerealInicio from './ingreso-de-cereal-inicio';

var IngresoDeCerealMainPage = React.createClass ({

    render() {
        return (
            <div style={{
                    margin: '20px 0 70px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <IngresoDeCerealInicio />
            </div>
        )
    }

});

export default IngresoDeCerealMainPage;


//<IngresoDeCerealMainTabs />