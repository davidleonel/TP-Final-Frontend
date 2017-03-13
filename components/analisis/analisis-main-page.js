import React from 'react';

import AnalisisInicio from './analisis-inicio';

var AnalisisMainPage = React.createClass ({

    render() {
        return (
            <div style={{
                    margin: '20px 0 13px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <AnalisisInicio />
            </div>
        )
    }

});

export default AnalisisMainPage;