import React from 'react';
import {useSelector,useDispatch}  from 'react-redux';
//import { Link } from '@material-ui/core';
import { Link,useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import {LogOutButton} from './parts/AuthButtons';
import { Typography } from '@material-ui/core';



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
        //position: "relative"
      },
      
      header: {
        color: "#ffffff",
        borderLeft: "solid 6px #2d8fdd",/*左側の線*/
        background: "#2d8fdd",/*背景色*/
        marginBottom: "3px",/*下のバーとの余白*/
        lineHeight: 1.5,
        padding: "0.5em"
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

const SideMenu=({onClose=null})=>{
    const dispatch=useDispatch();
    const classes=menuStyle();
    const history=useHistory();
    const username=useSelector(state=>state.auth_login.username);
    const userRank=useSelector(state=>state.auth_login.userRank);

    const onMove=(path="none")=>{
        if (path!=="none"){
          history.push(path);
        }
        if (onClose){
          onClose();
        }

    };

    const menuList=[
      {path:"/favorite" , name:"お気に入り一覧"},
      {path:"/notice" , name:"通知一覧"},
      {path:"/tagconfig" , name:"タグ設定"},
    ];

    return (
        <div>
            <div className={classes.listShelf}>

            <div className={classes.header}>
              <div><Typography variant='button'>{username}</Typography></div>
            </div>
            {
              menuList.map((menu)=>(
                <div className={classes.column} onClick={()=>onMove(menu.path)}><Typography variant='subtitle1' gutterBottom > {menu.name} </Typography></div>
              ))
            }
            {userRank>1 ?
              <div className={classes.column} onClick={()=>onMove("/tagadmin")}><Typography variant='subtitle1' gutterBottom > タグ管理メニュー </Typography></div>
              :
              <div/>
            }
            <div className={classes.column}>
              <LogOutButton />
            </div>

          </div>
        </div>

    )
    
}

export default SideMenu;
        