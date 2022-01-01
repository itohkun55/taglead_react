import { Typography } from '@material-ui/core';
import React, {useState} from 'react';
import {useSelector } from 'react-redux';

const ExpandText=({txtSource,limit})=>{
    const [expanded,setExpanded]=useState(false);
    if (!txtSource) return (<div/>);
    
    if (txtSource.length<limit) return (
        <div style={{whiteSpace: 'pre-line'}}>
            <Typography variant='body1' >{txtSource}</Typography>
        </div>); 

    return (
        <div>
        {expanded?
            <div>
                <span style={{whiteSpace: 'pre-line'}} ><Typography variant='body1' >{txtSource}</Typography></span>
                <span onClick={()=>setExpanded(false)} ><Typography variant='body1' ><b>元に戻す</b></Typography></span>
            </div>
        :
        <div>
            <span style={{whiteSpace: 'pre-line'}}><Typography variant='body1' >{txtSource.substring(0,limit)}....</Typography></span>
            <span onClick={()=>setExpanded(true)} ><Typography variant='body1' ><b>残りを開く</b></Typography></span>
        </div>
        }
        </div>
    )
};


export default  ExpandText;