import React from 'react';

import Paper from 'material-ui/Paper';

const mainStyle = {
    marginTop: '10px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    height: '850px'
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
                <div style={{
                    'text-align': 'center',
                    height: '95%',
                    margin: 'auto',
                    width: '50%'
                }}>
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <img src="/assets/logos/logo1.png" alt="logo"/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <img src="/assets/logos/prim.png" alt="logo"/>
                        <br/>
                        <img src="/assets/logos/innovativeSolutions.png" alt="logo"/>
                    </div>
                </div>
            </Paper>
        )
    }

});

export default MainWelcomeSection;

