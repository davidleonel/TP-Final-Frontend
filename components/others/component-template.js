import React from 'react';

import MainContentSection from '../main/main-content-section'

var ComponentName = React.createClass ({

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
        return 
    }

});

export default ComponentName;


/*
 $.ajax({
 type: "POST",
 url: url,
 data: data,
 success: success,
 dataType: dataType
 });



*/