import React from 'react';
import {connect}  from 'react-redux';
import {Button} from '@material-ui/core';
import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.common['Accept'] = 'application/json'
// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'

// 　axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
　//axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const TestAuthAction=(props)=>{
    const onClick=()=>{
        axios.get('http://itohkun55.pythonanywhere.com/api/ok')
        .then(results=>{
            console.log(results);
        }).catch(error=>{
            console.log(error.request);
            console.log(error.config);
            
            console.log(error.name);
            console.log(error.message);
            
        });

        

    

    }

    return(
        <div>
            <Button onClick={onClick}> 押してみそ </Button>
        </div>

    )

}

export default TestAuthAction;
