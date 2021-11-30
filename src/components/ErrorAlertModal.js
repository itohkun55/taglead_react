import React,{useState} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import {Modal,Button,Fade,TextField,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';

import PropTypes from 'prop-types';
import {login_start}  from '../actions';

const useStyles = makeStyles((theme) => ({

    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
    },

    memo:{
        position: 'absolute',
            
        width: '80%',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        borderRadius:15,
        padding: theme.spacing(2, 4, 3),
      },
    ulbutton:{
        display:"flex",
        justifyContent: "flex-end",
        listStyle:"none",
        align:"flex-end",
        
    },
    libutton:{
        margin:10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },

    textarea:{
        width:300,
        height:100
    }

  }));


const ErrorAlertModal=(props)=>{
    const result_error = useSelector(state=>state.error_control.result_error);
    const connect_error = useSelector(state=>state.error_control.connect_error);
    const dispatch = useDispatch();

    const classes=useStyles();

    const handleClose=()=>{
       //props.onClose();
       dispatch({type:CLOSE_PASSWORD});
       
    };

    return(
        <div>
            <Modal
                    
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open }
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
            
            >


                <Box bgcolor="white"  className={classes.memo}>
                        <ul className={classes.ulbutton}>
                            <li> {msg} </li>
                            <li  className={classes.libutton}><Button variant="contained" onClick={handleClose} color="secondary" >キャンセル</Button></li>
                        </ul>
                </Box>
            </Modal>
        </div>
    )
}

ErrorAlertModal.propTypes={
    open:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
}
   
ErrorAlertModal.defaultProps={
    open:false,
    onClose:()=>{}
}

export default ErrorAlertModal;
