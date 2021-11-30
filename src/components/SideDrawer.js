import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch}  from 'react-redux';
//import { Link } from '@material-ui/core';
import { Link,useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import SideMenu from './SideMenu';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Drawer  from '@material-ui/core/Drawer';
import {OPEN_PASSWORD}  from '../lib/ActionTypeString';
import {LogOutButton} from './parts/AuthButtons';


const drawerWidth=240;

const menuStyle=makeStyles((theme)=>({
    door:{
      width:"100%"
    },
    
    loginButtonBefore:{
        animation: "$flash 4s linear infinite",
        background:'gray'
  
  
      },

      listShelf: {
        padding: 0,
        position: "relative"
      },
      
      column: {
        color: "#2d8fdd",
        borderLeft: "solid 6px #2d8fdd",/*左側の線*/
        background: "#f1f8ff",/*背景色*/
        marginBottom: "3px",/*下のバーとの余白*/
        lineHeight: 1.5,
        padding: "0.5em"
      }

}));

const SideDrawer=(props)=>{
    const dispatch=useDispatch();
    const classes=menuStyle();
    const history=useHistory();

    //console.log(" props.ismobile in drawer",props.isMobile);

    return (
        <Drawer 
          anchor={"left"}
          width={200}          
          variant={ props.mobile ? "temporary" :"permanent" }
          open={props.open} 
          onClose={props.onClose}
          >
            {props.mobile &&
              <IconButton onClick={()=>props.onClose()} ><ArrowBackIcon/></IconButton>
            }
            <SideMenu  onClose={ props.mobile &&  props.onClose }/>
      </Drawer>

    )
    
}

export default SideDrawer;
        