import React from 'react';
import {connect}  from 'react-redux';

import {inputTest} from '../actions';

const TestForm=props=>(
    <button onClick={(e)=>{
        e.preventDefault();
        props.inputTest();
    }}>
    Push!!
    </button>
)


export default connect (null,{inputTest})(TestForm); 
    

