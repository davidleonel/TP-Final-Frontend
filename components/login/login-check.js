import React from 'react';

import {browserHistory} from 'react-router';


var LoginCheck = React.createClass ({

    contextTypes: {
        logeado: React.PropTypes.bool,
    },

    componentDidMount: function() {
        this.loginCheck();
    },

    render() {
        return(
            <div></div>
        )
    },

    loginCheck: function () {
        if (this.context.logeado) {
            browserHistory.push('welcome');
        } else {
            browserHistory.push('login');
        }
    }


});

export default LoginCheck;
