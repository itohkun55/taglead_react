import React,{useState} from 'react';
import {connect,useSelector,useDispatch}  from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import {Modal,Button,Collapse,FormControlLabel,Typography} from '@material-ui/core';

import PropTypes from 'prop-types';
import {SET_LOGOUT,DONE_LOGOUT} from '../lib/ActionTypeString' ;

const useStyles = makeStyles((theme) => ({

    modal:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
    },

    memo:{
       // position: 'absolute',
            
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


const LogOutModal=(props)=>{

    const classes=useStyles();
    const dispatch=useDispatch();
    const [checked,setChecked]=useState(true);
    
    const showLogOut=()=>{

        setChecked(false);
        dispatch({type:DONE_LOGOUT});

        setTimeout(()=>{

            props.onClose();
            
            setChecked(true);
        },1000);

    };

    const handleClose=()=>{
       props.onClose();
    };

    return(
        <div>
            <Modal
                    
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.open }
                className={classes.modal}
                onClose={handleClose}
                closeAfterTransition
            
            >
            <div>
                <Collapse in={checked}>
                    <Box bgcolor="white"  className={classes.memo}>
                    <Typography variants="h4"  gutterBottom>
                        ログアウトしますか？
                        </Typography>                    
                    <Button variant="contained" onClick={showLogOut} color="primary" >OK</Button>
                    </Box>
                </Collapse>
                <Collapse in={!checked}>
                    <Box bgcolor="white"  className={classes.memo}>
                        <Typography variants="h4"  gutterBottom>
                            ログアウトしました。
                        </Typography>
                        
                    </Box>
                </Collapse>
            </div>
            </Modal>
        </div>
    )
}

LogOutModal.propTypes={
    open:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
}
   
LogOutModal.defaultProps={
    open:false,
    onClose:()=>{}
}

// const mapStateToAction=(pwd)=>dispatch=>{
//     dispatch({type: PUSH_PASSWORD,pwd});

// }

export default LogOutModal;
//export default connect(null,{mapStateToAction})(LogOutModal;


