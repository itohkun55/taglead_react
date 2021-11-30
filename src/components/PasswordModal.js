import React,{useState} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import {Modal,Button,Fade,TextField,Select,MenuItem,FormControl,InputLabel} from '@material-ui/core';

import PropTypes from 'prop-types';
import {CLOSE_PASSWORD} from '../lib/ActionTypeString' ;
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


const PasswordModal=(props)=>{
    const open = useSelector(state=>state.user_login.open_password);
    const userlist = useSelector(state => state.auth_login.user_list);
    const dispatch = useDispatch();
    const [msg,setMsg]=useState("");

    const classes=useStyles();
    const [selected,selectUser]=useState({});

    const checkPwd=(pwd)=>{
        if (selected.pwd===pwd){
            setMsg("OK");
            setTimeout(()=>{
                dispatch(login_start(selected.id,pwd));
            },1000);

            
        }
    }




    const handleClose=()=>{
       //props.onClose();
       dispatch({type:CLOSE_PASSWORD});
       
    }

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
                <Fade in={open}>
                    <Box bgcolor="white"  className={classes.memo}>
                        <FormControl className={classes.formControl}>
                            <InputLabel >ユーザー名</InputLabel>
                            <Select
                                onChange={(e)=>{
                                    selectUser(e.target.value);
                                }}
                            >{
                                userlist.map((p)=>{
                                    return(<MenuItem value={p}>{p.name}</MenuItem>)
                                })
                                
                                }
                            </Select>
                        </FormControl>
                            <TextField
                                id="pwd"
                                label="Password"
                                type="password"
                                onChange={(e)=>{
                                    checkPwd(e.target.value);

                                }}
                            />
                            <ul className={classes.ulbutton}>
                                <li> {msg} </li>
                                <li  className={classes.libutton}><Button variant="contained" onClick={handleClose} color="secondary" >キャンセル</Button></li>
                            </ul>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

PasswordModal.propTypes={
    open:PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired
}
   
PasswordModal.defaultProps={
    open:false,
    onClose:()=>{}
}

// const mapStateToAction=(pwd)=>dispatch=>{
//     dispatch({type: PUSH_PASSWORD,pwd});

// }

//export default connect(null,{mapStateToAction})(PasswordModal) ;
export default PasswordModal;
