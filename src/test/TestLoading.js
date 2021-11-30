import React from 'react'
import {Button,Modal,Accordion,AccordionSummary,AccordionDetails,Collapse,CircularProgress}  from '@material-ui/core';
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core';

import ButtonSample from './ButtonSample';

const styles=makeStyles((theme)=>({
    loadingRoot:{
        background:"#888",
        opacity:0.3,
        height:"100vh",
        top:0
         
    },
       
    loadingCircle :{
        zIndex:2000,
        background:"#888",
        //marginTop:"0%",
        display: "flex",
        justifyContent: "center",
        marginTop:"30%",
        alignItems: "center",
        //opacity:0.5
    }
}));


const TestLoading=(props)=>{
    const classes=styles();


    return (
        <div className={classes.loadingRoot}>AAAA
           
             <div>後に書いてあるもの</div>
             <div className={classes.loadingCircle} ><CircularProgress color="inherit" /></div>

        </div>
    )

}

export default TestLoading;