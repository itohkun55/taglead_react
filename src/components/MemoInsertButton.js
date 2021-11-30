import React,{useState} from 'react';
import {useDispatch}  from 'react-redux';
import {Fab,Menu,MenuItem,Popover,Breadcrumbs,Link,Typography}  from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';


//import {pushNewMemo}  from '../actions';
import {FREE_MODAL_OPEN,FORMED_MODAL_OPEN} from '../lib/ActionTypeString';
import { EmailOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fabButton:{
        position:"fixed",
        bottom:10,
        right:10,
        zIndex:100

    },
    Iconspace:{
      marginRight:theme.spacing(2),
      marginLeft:theme.spacing(2),

    }


  }));
  

const MemoInsertButton=(props)=>{
    const dispatch=useDispatch();

    //どこをクリックしても消せるようにしたいのでstateはreduxに振る
    const [bmenu,showMenu]=React.useState(null);
    const [anchorEl,setAnchorEl]=useState(null);

    const onClick=(event)=>{
        showMenu(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const menuPushEvent =(action,e )=>{
        e.preventDefault();
        setAnchorEl(null);
        
        showMenu(null);
        props.onModalOpen(action);
    };
    const onClose=(event)=>{
        console.log("close");
        showMenu(null);
        setAnchorEl(null);
    };
   
    const modalIcons=[
      {action: FREE_MODAL_OPEN ,icon: <MailOutlineIcon fontSize="large" />},
      {action: "dm" ,icon: <RecordVoiceOverIcon fontSize="large" />},
      {action: FORMED_MODAL_OPEN ,icon: <CreateIcon fontSize="large" />},
    ];

    const classes = useStyles();

    return(
        <div >
            <Fab 
            className={classes.fabButton}
            onClick={onClick}
            color="primary" 
            aria-label="add"
            aria-haspopup="true">
                <AddIcon/>
            
                
            </Fab>

            <Popover
                    anchorEl={anchorEl}
                    
                    onClose={onClose}
                    
                    open={Boolean(bmenu)}
                    anchorOrigin={{
                    vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                >

                <Breadcrumbs aria-label="breadcrumb">
                    {
                      modalIcons.map((d)=>{
                        return (
                            <Link color="inherit" href="/" onClick={(e)=>menuPushEvent(d.action,e)}>
                              <div className={classes.Iconspace}>{d.icon}</div>
                          </Link>
                        )
                      })

                    }

                </Breadcrumbs>
            </Popover>
        </div>

    )
}

export default MemoInsertButton;

