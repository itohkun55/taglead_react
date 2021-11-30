import React from 'react';
import {useSelector} from 'react-redux';
import {CircularProgress}  from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const styles=makeStyles((theme)=>({
    loadingRoot:{
        display:"absolute",
        zIndex:200000,
        //background:"#888",
        //opacity:0.1,
        padding:"10px",
        height:"100vh",
        //top:0
         
    },
       
    loadingCircle :{
        //background:"#888",
        //marginTop:"0%",
        display: "flex",
        justifyContent: "center",
        marginTop:"30%",
        alignItems: "center",
        opacity:0.5
    }
}));

export const CirculerSelf=()=>{
    const classes=styles();
    return(
        <div className={classes.loadingRoot}>
            <div className={classes.loadingCircle} >
                <CircularProgress 
                    color="success"  
                    size={60}   
                />
            </div>
        </div>

    )
}


const CirculerLoading=(props)=>{
    

    const isLoad = useSelector(state => state.auth_login.isLoad,false);

    return (
            <div>
                {props.isModal ?

                    <Modal open={isLoad} closeAfterTransition onClose={()=>{}} >    
                        <CirculerSelf/>
                    </Modal>
                : isLoad ?
                    <CirculerSelf />
                :<div/>
                }
            </div>
    )

}

export default CirculerLoading;