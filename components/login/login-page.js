import React from 'react';

import LoginForm from './login-form';

var LoginPage = React.createClass ({

    render() {
        return (
            <div style={{
                    margin: '10px 0 0 0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems:'center'
                    }}>
                <LoginForm/>
            </div>
        )
    }

});

export default LoginPage;